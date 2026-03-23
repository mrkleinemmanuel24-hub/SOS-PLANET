/* ============================================
   SOS Planet — Core Engine
   Engagement tracking, scoring, badges, counters
   localStorage persistence + i18n structure
   ============================================ */

var PlanetEngine = (function() {
  'use strict';

  // ---- i18n structure (FR, ready for EN/DE/ES) ----
  var i18n = {
    fr: {
      levels: {
        graine: 'Graine',
        pousse: 'Pousse',
        arbre: 'Arbre',
        foret: 'Fort',
        planete: 'Planete'
      },
      badges: {
        first: 'Premier engagement',
        ten: '10 engagements',
        fifty: '50 engagements',
        hundred: '100 engagements',
        streak7: '7 jours de suite',
        streak30: '30 jours de suite',
        carbon500: '500 kg CO2',
        carbon1000: '1 tonne CO2',
        water10k: '10 000 L eau',
        allDomains: 'Tous les domaines'
      },
      units: {
        kgCO2: 'kg CO2',
        tCO2: 't CO2',
        liters: 'L eau',
        kg: 'kg dechets',
        euros: 'EUR',
        km: 'km',
        trees: 'arbres eq.'
      }
    }
  };

  var LANG = 'fr';

  // ---- localStorage keys ----
  var KEYS = {
    engagements: 'planet_engagements',
    score: 'planet_score',
    streak: 'planet_streak',
    lastActive: 'planet_last_active',
    badges: 'planet_badges',
    carbonSaved: 'planet_carbon_saved',
    waterSaved: 'planet_water_saved',
    wasteSaved: 'planet_waste_saved',
    carFreeKm: 'planet_carfree_km',
    moneySaved: 'planet_money_saved',
    globalCounter: 'planet_global_counter',
    history: 'planet_history',
    exchanges: 'planet_exchanges',
    alerts: 'planet_alerts_seen',
    communityActions: 'planet_community_actions'
  };

  // ---- Level thresholds ----
  var LEVELS = [
    { name: 'Graine', min: 0, max: 50, icon: 'seed' },
    { name: 'Pousse', min: 50, max: 200, icon: 'sprout' },
    { name: 'Arbre', min: 200, max: 500, icon: 'tree' },
    { name: 'Fort', min: 500, max: 1000, icon: 'forest' },
    { name: 'Planete', min: 1000, max: Infinity, icon: 'planet' }
  ];

  // ---- Badge definitions ----
  var BADGE_DEFS = [
    { id: 'first', name: 'Premier engagement', condition: function(s) { return s.totalEngagements >= 1; } },
    { id: 'ten', name: '10 engagements', condition: function(s) { return s.totalEngagements >= 10; } },
    { id: 'fifty', name: '50 engagements', condition: function(s) { return s.totalEngagements >= 50; } },
    { id: 'hundred', name: '100 engagements', condition: function(s) { return s.totalEngagements >= 100; } },
    { id: 'streak7', name: '7 jours de suite', condition: function(s) { return s.streak >= 7; } },
    { id: 'streak30', name: '30 jours de suite', condition: function(s) { return s.streak >= 30; } },
    { id: 'carbon500', name: '500 kg CO2', condition: function(s) { return s.carbonSaved >= 500; } },
    { id: 'carbon1000', name: '1 tonne CO2', condition: function(s) { return s.carbonSaved >= 1000; } },
    { id: 'water10k', name: '10 000 L eau', condition: function(s) { return s.waterSaved >= 10000; } },
    { id: 'allDomains', name: 'Tous les domaines', condition: function(s) { return s.domainsCount >= 30; } }
  ];

  // ---- Helpers ----
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }
  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  // ---- Engagement tracking ----
  function getEngagements() {
    return load(KEYS.engagements) || {};
  }
  function setEngagement(id, checked, impact) {
    var engs = getEngagements();
    if (checked) {
      engs[id] = { date: today(), impact: impact || {} };
    } else {
      delete engs[id];
    }
    save(KEYS.engagements, engs);
    recalculate();
    return engs;
  }
  function isEngaged(id) {
    var engs = getEngagements();
    return !!engs[id];
  }

  // ---- Score calculation ----
  function recalculate() {
    var engs = getEngagements();
    var totalCO2 = 0, totalWater = 0, totalWaste = 0, totalMoney = 0;
    var domains = {};
    var keys = Object.keys(engs);
    keys.forEach(function(id) {
      var imp = engs[id].impact || {};
      totalCO2 += imp.co2 || 0;
      totalWater += imp.water || 0;
      totalWaste += imp.waste || 0;
      totalMoney += imp.money || 0;
      if (imp.domain) domains[imp.domain] = true;
    });

    save(KEYS.carbonSaved, totalCO2);
    save(KEYS.waterSaved, totalWater);
    save(KEYS.wasteSaved, totalWaste);
    save(KEYS.moneySaved, totalMoney);

    // Score = total CO2 saved (in kg)
    var score = totalCO2;
    save(KEYS.score, score);

    // Streak
    updateStreak();

    // Badges
    var state = {
      totalEngagements: keys.length,
      carbonSaved: totalCO2,
      waterSaved: totalWater,
      streak: load(KEYS.streak) || 0,
      domainsCount: Object.keys(domains).length
    };
    var earned = [];
    BADGE_DEFS.forEach(function(b) {
      if (b.condition(state)) earned.push(b.id);
    });
    save(KEYS.badges, earned);

    // Update global counter
    var global = load(KEYS.globalCounter) || 17432891;
    save(KEYS.globalCounter, global);

    return { score: score, co2: totalCO2, water: totalWater, waste: totalWaste, money: totalMoney, engagements: keys.length, badges: earned };
  }

  function updateStreak() {
    var last = load(KEYS.lastActive);
    var t = today();
    var streak = load(KEYS.streak) || 0;
    if (last === t) return streak;
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var yStr = yesterday.toISOString().slice(0, 10);
    if (last === yStr) {
      streak++;
    } else if (last !== t) {
      streak = 1;
    }
    save(KEYS.streak, streak);
    save(KEYS.lastActive, t);
    return streak;
  }

  // ---- Level ----
  function getLevel(score) {
    if (score === undefined) score = load(KEYS.score) || 0;
    for (var i = LEVELS.length - 1; i >= 0; i--) {
      if (score >= LEVELS[i].min) return LEVELS[i];
    }
    return LEVELS[0];
  }

  // ---- Counters ----
  function getPersonalCounters() {
    return {
      co2: load(KEYS.carbonSaved) || 0,
      water: load(KEYS.waterSaved) || 0,
      waste: load(KEYS.wasteSaved) || 0,
      carFreeKm: load(KEYS.carFreeKm) || 0,
      money: load(KEYS.moneySaved) || 0,
      trees: Math.round((load(KEYS.carbonSaved) || 0) / 22),
      streak: load(KEYS.streak) || 0,
      score: load(KEYS.score) || 0,
      engagements: Object.keys(getEngagements()).length,
      badges: load(KEYS.badges) || [],
      level: getLevel()
    };
  }

  function getGlobalCounter() {
    var base = 17432891;
    var stored = load(KEYS.globalCounter);
    return stored || base;
  }

  function incrementGlobalCounter(amount) {
    var current = getGlobalCounter();
    current += (amount || 1);
    save(KEYS.globalCounter, current);
    return current;
  }

  // ---- History ----
  function addHistory(entry) {
    var hist = load(KEYS.history) || [];
    hist.unshift({ date: today(), data: entry });
    if (hist.length > 100) hist = hist.slice(0, 100);
    save(KEYS.history, hist);
  }

  function getHistory() {
    return load(KEYS.history) || [];
  }

  // ---- Format helpers ----
  function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return Math.round(n).toLocaleString('fr-FR');
  }

  function formatCO2(kg) {
    if (kg >= 1000) return (kg / 1000).toFixed(1) + ' t CO2';
    return Math.round(kg) + ' kg CO2';
  }

  // ---- Public API ----
  return {
    getEngagements: getEngagements,
    setEngagement: setEngagement,
    isEngaged: isEngaged,
    recalculate: recalculate,
    getLevel: getLevel,
    getPersonalCounters: getPersonalCounters,
    getGlobalCounter: getGlobalCounter,
    incrementGlobalCounter: incrementGlobalCounter,
    addHistory: addHistory,
    getHistory: getHistory,
    formatNumber: formatNumber,
    formatCO2: formatCO2,
    LEVELS: LEVELS,
    BADGE_DEFS: BADGE_DEFS,
    i18n: i18n,
    KEYS: KEYS
  };
})();
