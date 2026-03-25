/* ============================================
   SOS Planet — Social Engine
   Friends, Groups, Challenges, Milestones, Sharing
   localStorage persistence
   ============================================ */

var PlanetSocial = (function() {
  'use strict';

  var KEYS = {
    friends: 'planet_friends',
    groups: 'planet_groups',
    challenges: 'planet_challenges',
    milestones: 'planet_milestones',
    notifications: 'planet_notifications',
    journeyDay: 'planet_journey_day',
    journeyStart: 'planet_journey_start',
    lastReminder: 'planet_last_reminder'
  };

  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }
  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  // ---- DEMO DATA ----
  var DEMO_FRIENDS = [
    { id: 'marie', name: 'Marie', level: 5, xp: 342, streak: 12, avatar: 'M', color: '#EC4899' },
    { id: 'karim', name: 'Karim', level: 3, xp: 180, streak: 5, avatar: 'K', color: '#3B82F6' },
    { id: 'sophie', name: 'Sophie', level: 7, xp: 520, streak: 21, avatar: 'S', color: '#8B5CF6' },
    { id: 'lucas', name: 'Lucas', level: 2, xp: 80, streak: 2, avatar: 'L', color: '#F59E0B' },
    { id: 'emma', name: 'Emma', level: 4, xp: 250, streak: 8, avatar: 'E', color: '#10B981' }
  ];

  var DEMO_ACTIVITIES = [
    { user: 'Marie', text: 'a fait ses 3 engagements', icon: '✅', time: 'il y a 2h' },
    { user: 'Karim', text: 'est passe niveau 3', icon: '🌿', time: 'il y a 5h' },
    { user: 'Sophie', text: 'a releve le defi 7 repas vege', icon: '🏆', time: 'hier' },
    { user: 'Lucas', text: 'a invite 2 amis', icon: '👥', time: 'hier' },
    { user: 'Emma', text: 'a economise 50 kg CO2 ce mois', icon: '🌍', time: 'il y a 2 jours' },
    { user: 'Sophie', text: 'a unlocked le badge "Foret"', icon: '🌲', time: 'il y a 2 jours' },
    { user: 'Marie', text: 'a commence le defi Zéro Dechet', icon: '♻️', time: 'il y a 3 jours' },
    { user: 'Karim', text: 'a partage sa carte de profil', icon: '📸', time: 'il y a 3 jours' },
    { user: 'Emma', text: 'a rejoint le groupe Famille Klein', icon: '👨‍👩‍👧‍👦', time: 'il y a 4 jours' },
    { user: 'Lucas', text: 'a fait son premier engagement', icon: '🌱', time: 'il y a 4 jours' },
    { user: 'Sophie', text: 'a depasse les 500 XP', icon: '💯', time: 'il y a 5 jours' },
    { user: 'Marie', text: 'a termine le defi 5 jours sans voiture', icon: '🚲', time: 'il y a 5 jours' },
    { user: 'Karim', text: 'a plante un arbre', icon: '🌳', time: 'il y a 6 jours' },
    { user: 'Emma', text: 'a atteint 8 jours de streak', icon: '🔥', time: 'il y a 6 jours' },
    { user: 'Lucas', text: 'a rejoint SOS Planet', icon: '🎉', time: 'il y a 7 jours' }
  ];

  var DEMO_GROUPS = [
    {
      id: 'famille-klein',
      name: 'Famille Klein',
      type: 'Famille',
      code: 'PLAN-FKL42N',
      members: [
        { name: 'Emmanuel', xp: 420, level: 6 },
        { name: 'Marie', xp: 342, level: 5 },
        { name: 'Sophie', xp: 520, level: 7 },
        { name: 'Lucas', xp: 80, level: 2 }
      ],
      totalXP: 1240,
      currentChallenge: 'Zero dechet cette semaine',
      challengeProgress: 60
    },
    {
      id: 'equipe-marketing',
      name: 'Equipe Marketing — Danone',
      type: 'Entreprise',
      code: 'PLAN-DAN0NE',
      members: generateFakeMembers(23),
      totalXP: 8400,
      currentChallenge: '5 jours sans voiture',
      challengeProgress: 40
    }
  ];

  function generateFakeMembers(count) {
    var names = ['Alice','Bob','Clara','David','Eva','Fabrice','Gaelle','Hugo','Ines','Julien','Karine','Leo','Manon','Nadia','Olivier','Pauline','Quentin','Rose','Samuel','Therese','Ugo','Valerie','William'];
    var members = [];
    for (var i = 0; i < count && i < names.length; i++) {
      members.push({ name: names[i], xp: Math.floor(Math.random() * 600) + 50, level: Math.floor(Math.random() * 8) + 1 });
    }
    members.sort(function(a, b) { return b.xp - a.xp; });
    return members;
  }

  var CHALLENGE_TYPES = [
    { id: 'zero-dechet', name: 'Zero dechet', durations: ['1 jour', '3 jours', '1 semaine'] },
    { id: 'pas-voiture', name: 'Pas de voiture', durations: ['1 jour', '3 jours', '1 semaine'] },
    { id: 'repas-vege', name: 'Repas vegetarien', durations: ['1 repas', '1 jour', '3 jours'] },
    { id: 'douche-5min', name: 'Douche 5 min max', durations: ['1 jour', '3 jours', '1 semaine'] },
    { id: 'zero-achat', name: 'Zero achat neuf', durations: ['1 semaine', '1 mois'] },
    { id: 'invite-amis', name: 'Inviter 3 amis', durations: ['sans limite'] },
    { id: 'ramasser-dechets', name: 'Ramasser 10 dechets', durations: ['1 sortie'] }
  ];

  var DAILY_CHALLENGES = [
    { title: 'Zero dechet aujourd\'hui', icon: '♻️' },
    { title: 'Pas de viande aujourd\'hui', icon: '🥗' },
    { title: 'Pas de voiture aujourd\'hui', icon: '🚲' },
    { title: 'Douche de 3 min max', icon: '🚿' },
    { title: 'Ramasse 5 dechets dehors', icon: '🗑️' },
    { title: 'Pas d\'achat en ligne', icon: '🛒' },
    { title: 'Eteins tous les appareils en veille', icon: '🔌' }
  ];

  var MILESTONE_DEFS = [
    { id: 'first-engage', icon: '🌱', text: 'Premier engagement', check: function(u) { return u && u.engagements && u.engagements.length >= 1; } },
    { id: 'streak-7', icon: '🔥', text: '7 jours de streak', check: function(u) { return u && u.streak >= 7; } },
    { id: 'streak-30', icon: '🔥', text: '30 jours de streak', check: function(u) { return u && u.streak >= 30; } },
    { id: 'co2-100', icon: '💯', text: '100 kg CO2 economises', check: function(u) { return u && u.xp >= 100; } },
    { id: 'co2-500', icon: '🌍', text: '500 kg CO2 economises', check: function(u) { return u && u.xp >= 500; } },
    { id: 'level-arbre', icon: '🌳', text: 'Niveau Arbre atteint', check: function(u) { return u && u.level >= 5; } },
    { id: 'friends-5', icon: '👥', text: '5 amis recrutes', check: function(u) { var f = getFriends(); return f.length >= 5; } },
    { id: 'challenge-done', icon: '🏆', text: 'Defi zero dechet reussi', check: function(u) { return u && u.badges && u.badges.indexOf('challenge1') !== -1; } }
  ];

  // ---- FRIENDS ----
  function getFriends() {
    var friends = load(KEYS.friends);
    if (!friends || friends.length === 0) {
      friends = DEMO_FRIENDS.slice();
      save(KEYS.friends, friends);
    }
    return friends;
  }

  function addFriend(friend) {
    var friends = getFriends();
    friends.push(friend);
    save(KEYS.friends, friends);
    return friends;
  }

  function removeFriend(id) {
    var friends = getFriends();
    friends = friends.filter(function(f) { return f.id !== id; });
    save(KEYS.friends, friends);
    return friends;
  }

  // ---- GROUPS ----
  function getGroups() {
    var groups = load(KEYS.groups);
    if (!groups || groups.length === 0) {
      groups = DEMO_GROUPS.slice();
      save(KEYS.groups, groups);
    }
    return groups;
  }

  function createGroup(name, type, description) {
    var groups = getGroups();
    var code = 'PLAN-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    var group = {
      id: 'group-' + Date.now(),
      name: name,
      type: type,
      description: description || '',
      code: code,
      members: [{ name: user ? user.pseudo : 'Moi', xp: user ? user.xp : 0, level: user ? getCurrentLevelNum(user.xp) : 1 }],
      totalXP: user ? user.xp : 0,
      currentChallenge: null,
      challengeProgress: 0
    };
    groups.push(group);
    save(KEYS.groups, groups);
    return group;
  }

  function joinGroup(code) {
    var groups = getGroups();
    var group = groups.find(function(g) { return g.code.toUpperCase() === code.toUpperCase(); });
    if (!group) return null;
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    group.members.push({ name: user ? user.pseudo : 'Moi', xp: user ? user.xp : 0, level: user ? getCurrentLevelNum(user.xp) : 1 });
    group.totalXP += (user ? user.xp : 0);
    save(KEYS.groups, groups);
    return group;
  }

  function getCurrentLevelNum(xp) {
    var LEVELS = [
      { level: 1, xp: 0 }, { level: 2, xp: 30 }, { level: 3, xp: 80 },
      { level: 4, xp: 150 }, { level: 5, xp: 250 }, { level: 6, xp: 350 },
      { level: 7, xp: 500 }, { level: 8, xp: 700 }, { level: 9, xp: 900 },
      { level: 10, xp: 1000 }
    ];
    var lv = 1;
    for (var i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].xp) { lv = LEVELS[i].level; break; }
    }
    return lv;
  }

  // ---- CHALLENGES ----
  function getActiveChallenges() {
    var challenges = load(KEYS.challenges);
    if (!challenges) challenges = [];
    // Clean expired
    var now = Date.now();
    challenges = challenges.filter(function(c) { return !c.endTime || c.endTime > now; });
    save(KEYS.challenges, challenges);
    return challenges;
  }

  function createChallenge(type, duration, friendId) {
    var challenges = getActiveChallenges();
    var durationMs = parseDuration(duration);
    var challenge = {
      id: 'ch-' + Date.now(),
      type: type,
      duration: duration,
      friendId: friendId || null,
      startTime: Date.now(),
      endTime: durationMs ? Date.now() + durationMs : null,
      progress: 0,
      target: getTargetForDuration(duration),
      completed: false
    };
    challenges.push(challenge);
    save(KEYS.challenges, challenges);
    return challenge;
  }

  function parseDuration(dur) {
    if (dur === '1 jour') return 86400000;
    if (dur === '3 jours') return 3 * 86400000;
    if (dur === '1 semaine') return 7 * 86400000;
    if (dur === '1 mois') return 30 * 86400000;
    if (dur === '1 repas') return 86400000;
    if (dur === '1 sortie') return 86400000;
    return null;
  }

  function getTargetForDuration(dur) {
    if (dur === '1 jour') return 1;
    if (dur === '3 jours') return 3;
    if (dur === '1 semaine') return 7;
    if (dur === '1 mois') return 30;
    if (dur === '1 repas') return 1;
    if (dur === '1 sortie') return 1;
    if (dur === 'sans limite') return 3;
    return 1;
  }

  function incrementChallengeProgress(challengeId) {
    var challenges = getActiveChallenges();
    var ch = challenges.find(function(c) { return c.id === challengeId; });
    if (!ch || ch.completed) return null;
    ch.progress++;
    if (ch.progress >= ch.target) ch.completed = true;
    save(KEYS.challenges, challenges);
    return ch;
  }

  // ---- DAILY CHALLENGE ----
  function getDailyChallenge() {
    var dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return DAILY_CHALLENGES[dayOfYear % DAILY_CHALLENGES.length];
  }

  function getWeeklyChallenge() {
    var d = new Date();
    var start = new Date(d.getFullYear(), 0, 1);
    var week = Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7);
    var weeklyChallenges = [
      { title: '5 jours sans voiture', icon: '🚲', target: 5, unit: 'jours' },
      { title: '7 repas vegetariens', icon: '🥗', target: 7, unit: 'repas' },
      { title: '5 douches de 5 min max', icon: '🚿', target: 5, unit: 'douches' },
      { title: 'Trier ses dechets 5 jours', icon: '♻️', target: 5, unit: 'jours' },
      { title: '3 trajets en velo', icon: '🚲', target: 3, unit: 'trajets' }
    ];
    return weeklyChallenges[week % weeklyChallenges.length];
  }

  // ---- MILESTONES ----
  function getMilestones() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    var earned = [];
    MILESTONE_DEFS.forEach(function(m) {
      if (m.check(user)) {
        earned.push({ id: m.id, icon: m.icon, text: m.text, date: user ? (user.joinDate || '2026-03-24') : '2026-03-24' });
      }
    });
    // Always add "Premier engagement" with join date for demo
    if (earned.length === 0 && user) {
      earned.push({ id: 'first-engage', icon: '🌱', text: 'Premier engagement', date: user.joinDate || today() });
    }
    return earned;
  }

  // ---- STREAK DANGER ----
  function isStreakInDanger() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    if (!user || !user.lastActiveDate) return false;
    var lastDate = new Date(user.lastActiveDate + 'T00:00:00');
    var now = new Date();
    var diff = now - lastDate;
    // If last action was > 20h ago and we haven't checked in today
    return diff > 20 * 3600 * 1000 && user.lastActiveDate !== today();
  }

  function getStreakDangerHours() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    if (!user || !user.lastActiveDate) return 0;
    var lastDate = new Date(user.lastActiveDate + 'T23:59:59');
    var now = new Date();
    var remaining = lastDate.getTime() + 86400000 - now.getTime();
    return Math.max(0, Math.floor(remaining / 3600000));
  }

  // ---- SHARE URL ----
  function getShareURL() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    var pseudo = user ? user.pseudo : 'ami';
    return 'https://sos-planet.pages.dev?ref=' + encodeURIComponent(pseudo);
  }

  function getShareMessage() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    var co2 = user ? user.xp : 0;
    var url = getShareURL();
    return 'Je me suis engage a sauver la planete 🌍 J\'ai deja economise ' + co2 + ' kg CO2. Tu me rejoins ? 👉 ' + url;
  }

  // ---- 7-DAY JOURNEY ----
  function getJourneyDay() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    if (!user || !user.joinDate) return 0;
    var joinDate = new Date(user.joinDate);
    var now = new Date();
    var diff = Math.floor((now - joinDate) / 86400000) + 1;
    return Math.min(diff, 8); // 8 means journey complete
  }

  function isJourneyActive() {
    return getJourneyDay() <= 7;
  }

  // ---- DAILY REMINDER ----
  function needsReminder() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    if (!user) return false;
    var t = today();
    if (user.todayDate === t) {
      // Check if any engagements not checked
      var unchecked = false;
      if (user.engagements) {
        user.engagements.forEach(function(e) {
          if (!user.todayChecked || !user.todayChecked[e.id]) unchecked = true;
        });
      }
      return unchecked;
    }
    return true;
  }

  // ---- NOTIFICATIONS ----
  function getNotifications() {
    return load(KEYS.notifications) || [];
  }

  function addNotification(notif) {
    var notifs = getNotifications();
    notifs.unshift({ id: 'n-' + Date.now(), text: notif, time: new Date().toISOString(), read: false });
    if (notifs.length > 50) notifs = notifs.slice(0, 50);
    save(KEYS.notifications, notifs);
  }

  // ---- RANKINGS (fake) ----
  var COMMUNE_RANKINGS = [
    { name: 'Strasbourg', xp: 142000, members: 3400 },
    { name: 'Paris', xp: 890000, members: 18200 },
    { name: 'Lyon', xp: 245000, members: 5100 },
    { name: 'Nantes', xp: 198000, members: 4200 },
    { name: 'Bordeaux', xp: 176000, members: 3800 },
    { name: 'Lille', xp: 134000, members: 2900 },
    { name: 'Toulouse', xp: 167000, members: 3600 },
    { name: 'Rennes', xp: 112000, members: 2400 },
    { name: 'Montpellier', xp: 98000, members: 2100 },
    { name: 'Grenoble', xp: 87000, members: 1900 },
    { name: 'Nice', xp: 145000, members: 3100 },
    { name: 'Marseille', xp: 210000, members: 4500 },
    { name: 'Clermont-Ferrand', xp: 56000, members: 1200 },
    { name: 'Angers', xp: 67000, members: 1400 },
    { name: 'Dijon', xp: 54000, members: 1100 },
    { name: 'Brest', xp: 43000, members: 900 },
    { name: 'Rouen', xp: 72000, members: 1500 },
    { name: 'Caen', xp: 38000, members: 800 },
    { name: 'Metz', xp: 45000, members: 950 },
    { name: 'Mulhouse', xp: 32000, members: 700 },
    { name: 'La Rochelle', xp: 48000, members: 1000 },
    { name: 'Pau', xp: 29000, members: 620 },
    { name: 'Bayonne', xp: 26000, members: 550 },
    { name: 'Perpignan', xp: 34000, members: 720 },
    { name: 'Limoges', xp: 22000, members: 470 },
    { name: 'Colmar', xp: 18000, members: 380 },
    { name: 'Vannes', xp: 21000, members: 440 },
    { name: 'Tours', xp: 61000, members: 1300 },
    { name: 'Amiens', xp: 39000, members: 830 },
    { name: 'Reims', xp: 52000, members: 1100 },
    { name: 'Saint-Etienne', xp: 41000, members: 870 },
    { name: 'Le Havre', xp: 36000, members: 760 },
    { name: 'Besancon', xp: 28000, members: 590 },
    { name: 'Orleans', xp: 44000, members: 930 },
    { name: 'Poitiers', xp: 31000, members: 660 },
    { name: 'Valence', xp: 19000, members: 400 },
    { name: 'Chambery', xp: 24000, members: 510 },
    { name: 'Annecy', xp: 35000, members: 740 },
    { name: 'Ajaccio', xp: 14000, members: 300 },
    { name: 'Troyes', xp: 17000, members: 360 },
    { name: 'Chartres', xp: 15000, members: 320 },
    { name: 'Avignon', xp: 42000, members: 890 },
    { name: 'Aix-en-Provence', xp: 68000, members: 1450 },
    { name: 'Nancy', xp: 58000, members: 1240 },
    { name: 'Le Mans', xp: 33000, members: 700 },
    { name: 'Toulon', xp: 47000, members: 1000 },
    { name: 'Dunkerque', xp: 20000, members: 420 },
    { name: 'Saint-Malo', xp: 16000, members: 340 },
    { name: 'La Roche-sur-Yon', xp: 13000, members: 280 },
    { name: 'Quimper', xp: 19000, members: 400 }
  ];
  COMMUNE_RANKINGS.sort(function(a, b) { return b.xp - a.xp; });

  var COUNTRY_RANKINGS = [
    { name: 'Suede', flag: '🇸🇪', xp: 4200000 },
    { name: 'Danemark', flag: '🇩🇰', xp: 3800000 },
    { name: 'France', flag: '🇫🇷', xp: 3500000 },
    { name: 'Pays-Bas', flag: '🇳🇱', xp: 3200000 },
    { name: 'Norvege', flag: '🇳🇴', xp: 3000000 },
    { name: 'Finlande', flag: '🇫🇮', xp: 2800000 },
    { name: 'Allemagne', flag: '🇩🇪', xp: 2500000 },
    { name: 'Belgique', flag: '🇧🇪', xp: 2200000 },
    { name: 'Suisse', flag: '🇨🇭', xp: 2000000 },
    { name: 'Portugal', flag: '🇵🇹', xp: 1800000 },
    { name: 'Espagne', flag: '🇪🇸', xp: 1600000 },
    { name: 'Italie', flag: '🇮🇹', xp: 1400000 },
    { name: 'Canada', flag: '🇨🇦', xp: 1200000 },
    { name: 'Japon', flag: '🇯🇵', xp: 1100000 },
    { name: 'Royaume-Uni', flag: '🇬🇧', xp: 1000000 }
  ];

  // ---- AFFINITY GROUPS ----
  var AFFINITY_KEY = 'planet_affinity_groups';

  function getAffinityGroups() {
    try { return JSON.parse(localStorage.getItem(AFFINITY_KEY)) || []; } catch(e) { return []; }
  }

  function joinAffinityGroup(groupId) {
    var groups = getAffinityGroups();
    if (groups.length >= 5) return false;
    if (groups.indexOf(groupId) !== -1) return false;
    groups.push(groupId);
    try { localStorage.setItem(AFFINITY_KEY, JSON.stringify(groups)); } catch(e) {}
    return true;
  }

  function leaveAffinityGroup(groupId) {
    var groups = getAffinityGroups();
    groups = groups.filter(function(g) { return g !== groupId; });
    try { localStorage.setItem(AFFINITY_KEY, JSON.stringify(groups)); } catch(e) {}
    return groups;
  }

  // ---- Q&A SYSTEM ----
  var QA_KEY = 'planet_qa_questions';

  function getQAQuestions() {
    try { return JSON.parse(localStorage.getItem(QA_KEY)) || []; } catch(e) { return []; }
  }

  function postQuestion(title, desc, cat, location) {
    var qs = getQAQuestions();
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    var q = {
      id: 'q-' + Date.now(),
      title: title,
      desc: desc || '',
      cat: cat,
      author: user ? user.pseudo : 'Anonyme',
      date: today(),
      votes: 0,
      location: location || '',
      answers: []
    };
    qs.unshift(q);
    save(QA_KEY, qs);
    return q;
  }

  function postAnswer(questionId, text) {
    var qs = getQAQuestions();
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    var q = qs.find(function(x) { return x.id === questionId; });
    if (!q) return null;
    var a = {
      id: 'a-' + Date.now(),
      author: user ? user.pseudo : 'Anonyme',
      text: text,
      votes: 0,
      best: false,
      date: today()
    };
    q.answers.push(a);
    save(QA_KEY, qs);
    return a;
  }

  function voteQuestion(questionId, delta) {
    var qs = getQAQuestions();
    var q = qs.find(function(x) { return x.id === questionId; });
    if (q) {
      q.votes = Math.max(0, q.votes + delta);
      save(QA_KEY, qs);
    }
    return q;
  }

  function voteAnswer(questionId, answerId, delta) {
    var qs = getQAQuestions();
    var q = qs.find(function(x) { return x.id === questionId; });
    if (q && q.answers) {
      var a = q.answers.find(function(x) { return x.id === answerId; });
      if (a) { a.votes = Math.max(0, a.votes + delta); save(QA_KEY, qs); return a; }
    }
    return null;
  }

  // ---- MAP PINS ----
  var PINS_KEY = 'planet_map_pins';

  function getMapPins() {
    try { return JSON.parse(localStorage.getItem(PINS_KEY)) || []; } catch(e) { return []; }
  }

  function addMapPin(pin) {
    var pins = getMapPins();
    pin.id = 'p-' + Date.now();
    pins.push(pin);
    try { localStorage.setItem(PINS_KEY, JSON.stringify(pins)); } catch(e) {}
    return pin;
  }

  function filterMapPins(types) {
    var pins = getMapPins();
    if (!types || types.length === 0) return pins;
    return pins.filter(function(p) { return types.indexOf(p.type) !== -1; });
  }

  // ---- MENTOR SYSTEM ----
  function getMentor() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    if (!user) return null;
    var level = getCurrentLevelNum(user.xp || 0);
    if (level >= 5) return null; // No mentor needed, you ARE a mentor
    // Auto-assign Sophie (level 7) as mentor
    var friends = getFriends();
    var mentor = friends.find(function(f) { return f.level >= 5; });
    return mentor || { name: 'Sophie', level: 7, avatar: 'S', color: '#8B5CF6' };
  }

  function canBeMentor() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    if (!user) return false;
    return getCurrentLevelNum(user.xp || 0) >= 5;
  }

  // ---- EXPERT BADGE DETECTION ----
  function checkExpertBadge() {
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    if (!user) return [];
    var qs = getQAQuestions();
    var domainCounts = {};
    var domainPositive = {};
    qs.forEach(function(q) {
      if (q.answers) {
        q.answers.forEach(function(a) {
          if (a.author === user.pseudo) {
            if (!domainCounts[q.cat]) { domainCounts[q.cat] = 0; domainPositive[q.cat] = 0; }
            domainCounts[q.cat]++;
            if (a.votes > 0) domainPositive[q.cat]++;
          }
        });
      }
    });
    var expertDomains = [];
    Object.keys(domainCounts).forEach(function(d) {
      if (domainCounts[d] >= 50) {
        var pct = domainCounts[d] > 0 ? (domainPositive[d] / domainCounts[d]) * 100 : 0;
        if (pct >= 80) expertDomains.push(d);
      }
    });
    return expertDomains;
  }

  // ---- NOTIFICATION BADGE COUNTER ----
  function getUnreadNotificationCount() {
    var notifs = getNotifications();
    var count = 0;
    notifs.forEach(function(n) { if (!n.read) count++; });
    return count;
  }

  function markNotificationsRead() {
    var notifs = getNotifications();
    notifs.forEach(function(n) { n.read = true; });
    save(KEYS.notifications, notifs);
  }

  // ---- TREND DATA GENERATION ----
  function generateTrendData() {
    var names = ['Marie','Karim','Sophie','Lucas','Emma','Pierre','Claire','Marc','Julie','Hugo'];
    var actions = ['a composte','a fait du velo','a trie ses dechets','a economise de l\'eau','a mange vege','a pris le train','a repare un objet','a fait ses courses en vrac'];
    var emojis = ['🌿','🚲','♻️','💧','🥗','🚂','🔧','🛒'];
    var idx = Math.floor(Math.random() * names.length);
    var aidx = Math.floor(Math.random() * actions.length);
    return {
      user: names[idx],
      action: actions[aidx],
      emoji: emojis[aidx],
      text: names[idx] + ' ' + actions[aidx] + ' ' + emojis[aidx]
    };
  }

  function getTrendStats() {
    return {
      usersToday: 12847 + Math.floor(Math.random() * 500),
      usersWeek: 89234 + Math.floor(Math.random() * 2000),
      usersMonth: 342156 + Math.floor(Math.random() * 5000),
      co2ThisWeek: 847,
      co2LastWeek: 756,
      growthPercent: 12
    };
  }

  // ---- PUBLIC API ----
  return {
    KEYS: KEYS,
    DEMO_FRIENDS: DEMO_FRIENDS,
    DEMO_ACTIVITIES: DEMO_ACTIVITIES,
    DEMO_GROUPS: DEMO_GROUPS,
    CHALLENGE_TYPES: CHALLENGE_TYPES,
    DAILY_CHALLENGES: DAILY_CHALLENGES,
    MILESTONE_DEFS: MILESTONE_DEFS,
    COMMUNE_RANKINGS: COMMUNE_RANKINGS,
    COUNTRY_RANKINGS: COUNTRY_RANKINGS,
    getFriends: getFriends,
    addFriend: addFriend,
    removeFriend: removeFriend,
    getGroups: getGroups,
    createGroup: createGroup,
    joinGroup: joinGroup,
    getActiveChallenges: getActiveChallenges,
    createChallenge: createChallenge,
    incrementChallengeProgress: incrementChallengeProgress,
    getDailyChallenge: getDailyChallenge,
    getWeeklyChallenge: getWeeklyChallenge,
    getMilestones: getMilestones,
    isStreakInDanger: isStreakInDanger,
    getStreakDangerHours: getStreakDangerHours,
    getShareURL: getShareURL,
    getShareMessage: getShareMessage,
    getJourneyDay: getJourneyDay,
    isJourneyActive: isJourneyActive,
    needsReminder: needsReminder,
    getNotifications: getNotifications,
    addNotification: addNotification,
    getCurrentLevelNum: getCurrentLevelNum,
    // v5: Affinity groups
    getAffinityGroups: getAffinityGroups,
    joinAffinityGroup: joinAffinityGroup,
    leaveAffinityGroup: leaveAffinityGroup,
    // v5: Q&A
    getQAQuestions: getQAQuestions,
    postQuestion: postQuestion,
    postAnswer: postAnswer,
    voteQuestion: voteQuestion,
    voteAnswer: voteAnswer,
    // v5: Map pins
    getMapPins: getMapPins,
    addMapPin: addMapPin,
    filterMapPins: filterMapPins,
    // v5: Mentor
    getMentor: getMentor,
    canBeMentor: canBeMentor,
    // v5: Expert
    checkExpertBadge: checkExpertBadge,
    // v5: Notifications
    getUnreadNotificationCount: getUnreadNotificationCount,
    markNotificationsRead: markNotificationsRead,
    // v5: Trends
    generateTrendData: generateTrendData,
    getTrendStats: getTrendStats
  };
})();
