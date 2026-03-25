/* ============================================
   SOS Planet — Tutorial & Progressive Unlock Engine
   Guided onboarding, level-based feature gating,
   tooltip tours, adaptive nav, unlock celebrations
   ============================================ */

var PlanetTutorial = (function() {
  'use strict';

  // ---- Journey levels & unlock map ----
  var JOURNEY_LEVELS = [
    { level: 0, name: 'Bienvenue', unlock: ['index'], description: 'Tu viens d\'arriver' },
    { level: 1, name: 'Premiers pas', unlock: ['engagements','carbone'], trigger: 'onboarding_complete', description: '3 engagements choisis' },
    { level: 2, name: 'Explorateur', unlock: ['defis','compteurs'], trigger: 'day_2', description: 'Ton premier defi' },
    { level: 3, name: 'Connecte', unlock: ['amis'], trigger: 'day_3_or_3_engagements_checked', description: 'Invite tes amis' },
    { level: 4, name: 'Curieux', unlock: ['pfas','biodiversite','oceans','air','eau','sols','forets','energie','dechets'], trigger: 'day_4_or_level_2', description: 'Decouvre les domaines' },
    { level: 5, name: 'Engage', unlock: ['groupes','affinites','social'], trigger: 'day_5_or_1_friend', description: 'Rejoins un groupe' },
    { level: 6, name: 'Citoyen', unlock: ['carte','alertes'], trigger: 'day_6_or_5_engagements', description: 'Explore autour de toi' },
    { level: 7, name: 'Solidaire', unlock: ['entraide','echanges','communaute'], trigger: 'day_7_or_1_group', description: 'Aide les autres' },
    { level: 8, name: 'Expert', unlock: ['experts','tendances','scanner'], trigger: 'level_5_xp_or_10_engagements', description: 'Tu maitrises' },
    { level: 9, name: 'Leader', unlock: ['partage','profil','sources'], trigger: 'level_7_xp_or_5_friends', description: 'Inspire les autres' },
    { level: 10, name: 'Gardien', unlock: ['ALL'], trigger: 'level_10_xp', description: 'Tout est debloque' }
  ];

  // ---- Page-to-level map (for quick lookup) ----
  var PAGE_UNLOCK_LEVEL = {};
  JOURNEY_LEVELS.forEach(function(jl) {
    jl.unlock.forEach(function(pageId) {
      if (pageId !== 'ALL') {
        PAGE_UNLOCK_LEVEL[pageId] = jl.level;
      }
    });
  });

  // ---- Page level names for display ----
  var LEVEL_NAMES = {};
  JOURNEY_LEVELS.forEach(function(jl) {
    LEVEL_NAMES[jl.level] = jl.name;
  });

  // ---- Tutorial tooltip definitions per page ----
  var PAGE_TUTORIALS = {
    'index': [
      { target: '.today-section', text: 'Voici tes engagements du jour. Coche "Oui" quand tu as fait une action.' },
      { target: '.dash-streak-badge', text: 'Ta serie de jours consecutifs. Ne la perds pas !' },
      { target: '.xp-section', text: 'Ta barre d\'XP. Chaque action te rapproche du niveau suivant.' },
      { target: null, text: 'C\'est tout pour aujourd\'hui ! Reviens demain.' }
    ],
    'defis': [
      { target: '.daily-card,.section', text: 'Voici le defi du jour. Accepte-le et gagne des XP bonus !' },
      { target: null, text: 'Tu peux aussi defier tes amis quand tu en auras invite.' }
    ],
    'amis': [
      { target: null, text: 'Invite 5 amis par WhatsApp pour multiplier ton impact !' },
      { target: null, text: 'Tu verras ici ce que font tes amis.' }
    ],
    'engagements': [
      { target: '.tabs-wrap,.tabs', text: 'Explore les 400 engagements classes par domaine.' },
      { target: null, text: 'Coche ceux que tu fais deja et gagne des XP !' }
    ],
    'carbone': [
      { target: null, text: 'Calcule ton empreinte carbone en quelques questions.' },
      { target: null, text: 'Tu verras combien tu peux economiser chaque annee.' }
    ],
    'compteurs': [
      { target: null, text: 'Voici tout l\'impact de tes actions : CO2, eau, dechets...' },
      { target: null, text: 'Ces compteurs augmentent a chaque engagement tenu !' }
    ],
    'carte': [
      { target: null, text: 'Decouvre les initiatives ecologiques autour de toi.' },
      { target: null, text: 'Ajoute tes bons plans pour aider ta communaute !' }
    ],
    'groupes': [
      { target: null, text: 'Rejoins des groupes thematiques pour echanger.' },
      { target: null, text: 'Cree ton propre groupe si tu ne trouves pas le tien !' }
    ],
    'scanner': [
      { target: null, text: 'Scanne un produit pour connaitre son impact ecologique.' },
      { target: null, text: 'Compare et fais de meilleurs choix au quotidien.' }
    ]
  };

  // ---- localStorage keys ----
  var KEYS = {
    journeyLevel: 'planet_journey',
    unlockAll: 'planet_unlock_all',
    tutoPrefix: 'planet_tuto_seen_',
    lastUnlockNotif: 'planet_last_unlock_notif',
    engagementsCheckedCount: 'planet_eng_checked_total',
    friendsCount: 'planet_friends_count',
    groupsJoined: 'planet_groups_joined'
  };

  // ---- Helpers ----
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch(e) { return null; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }

  // ---- Get current journey level ----
  function getJourneyLevel() {
    // ?unlock=all overrides
    if (window.location.search.indexOf('unlock=all') !== -1) {
      save(KEYS.unlockAll, true);
      save(KEYS.journeyLevel, 10);
      return 10;
    }
    if (load(KEYS.unlockAll) === true) return 10;
    return load(KEYS.journeyLevel) || 0;
  }

  function setJourneyLevel(level) {
    var current = load(KEYS.journeyLevel) || 0;
    if (level > current) {
      save(KEYS.journeyLevel, level);
      return true; // Level changed
    }
    return false;
  }

  // ---- Check if page is unlocked ----
  function isUnlocked(pageId) {
    var level = getJourneyLevel();
    if (level >= 10) return true;
    var required = PAGE_UNLOCK_LEVEL[pageId];
    if (required === undefined) return true; // Unknown page = always accessible
    return level >= required;
  }

  // ---- Get all unlocked pages ----
  function getUnlockedPages() {
    var level = getJourneyLevel();
    var pages = [];
    JOURNEY_LEVELS.forEach(function(jl) {
      if (jl.level <= level) {
        jl.unlock.forEach(function(p) {
          if (p !== 'ALL' && pages.indexOf(p) === -1) pages.push(p);
        });
      }
    });
    if (level >= 10) {
      Object.keys(PAGE_UNLOCK_LEVEL).forEach(function(p) {
        if (pages.indexOf(p) === -1) pages.push(p);
      });
    }
    return pages;
  }

  // ---- Get next unlock info for a locked page ----
  function getUnlockInfo(pageId) {
    var required = PAGE_UNLOCK_LEVEL[pageId];
    if (required === undefined) return null;
    var jl = JOURNEY_LEVELS[required];
    return {
      level: required,
      name: jl ? jl.name : '',
      description: jl ? jl.description : ''
    };
  }

  // ---- Show locked overlay ----
  function showLocked(pageId) {
    var info = getUnlockInfo(pageId);
    if (!info) return;
    var currentLevel = getJourneyLevel();
    var pct = Math.min(100, Math.round((currentLevel / info.level) * 100));

    // Create overlay
    var overlay = document.createElement('div');
    overlay.id = 'planet-locked-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,22,40,0.95);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;animation:pt-fadeIn .3s ease-out';

    overlay.innerHTML =
      '<div style="max-width:400px;width:100%;text-align:center">' +
        '<div style="font-size:4rem;margin-bottom:16px;opacity:0.7">&#x1F512;</div>' +
        '<div style="font-size:1.3rem;font-weight:900;color:#FBBF24;margin-bottom:8px">Niveau ' + info.level + ' requis — ' + info.name + '</div>' +
        '<div style="font-size:.95rem;color:#9CA3AF;margin-bottom:20px">' + info.description + '</div>' +
        '<div style="background:rgba(255,255,255,0.08);border-radius:12px;height:14px;overflow:hidden;margin:0 auto 8px;max-width:280px">' +
          '<div style="height:100%;border-radius:12px;background:linear-gradient(90deg,#10B981,#34D399);width:' + pct + '%;transition:width .8s"></div>' +
        '</div>' +
        '<div style="font-size:.8rem;color:#9CA3AF;margin-bottom:24px">Niveau actuel : ' + currentLevel + '/' + info.level + '</div>' +
        '<div style="font-size:.9rem;color:#E8E4DC;margin-bottom:24px">Continue tes engagements pour debloquer !</div>' +
        '<a href="index.html" style="display:inline-block;padding:14px 36px;border:none;border-radius:30px;background:#10B981;color:#fff;font-size:1rem;font-weight:700;text-decoration:none;cursor:pointer">Retour a l\'accueil</a>' +
      '</div>';

    document.body.appendChild(overlay);
  }

  // ---- Tutorial tooltips ----
  function showTutorial(pageId, customSteps) {
    var key = KEYS.tutoPrefix + pageId;
    if (localStorage.getItem(key)) return;

    var steps = customSteps || PAGE_TUTORIALS[pageId];
    if (!steps || steps.length === 0) return;

    // Wait for DOM to be ready
    setTimeout(function() { _runTutorial(pageId, steps, 0); }, 600);
  }

  function _runTutorial(pageId, steps, idx) {
    if (idx >= steps.length) {
      localStorage.setItem(KEYS.tutoPrefix + pageId, '1');
      _cleanupTutorial();
      return;
    }

    _cleanupTutorial();

    var step = steps[idx];
    var total = steps.length;

    // Dark overlay
    var overlay = document.createElement('div');
    overlay.id = 'pt-tuto-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10001;animation:pt-fadeIn .2s ease-out';

    // Tooltip bubble
    var tooltip = document.createElement('div');
    tooltip.id = 'pt-tuto-tooltip';
    tooltip.style.cssText = 'position:fixed;z-index:10002;max-width:340px;width:calc(100% - 40px);background:#1A1B22;border:2px solid #FBBF24;border-radius:16px;padding:20px;box-shadow:0 10px 40px rgba(0,0,0,0.5);animation:pt-fadeIn .3s ease-out';

    // Position tooltip
    var targetEl = null;
    if (step.target) {
      targetEl = document.querySelector(step.target);
    }

    tooltip.innerHTML =
      '<div style="font-size:.75rem;color:#FBBF24;font-weight:700;margin-bottom:8px">' + (idx + 1) + '/' + total + '</div>' +
      '<div style="font-size:.95rem;color:#E8E4DC;line-height:1.5;margin-bottom:16px">' + step.text + '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between">' +
        '<a id="pt-tuto-skip" style="font-size:.75rem;color:#9CA3AF;cursor:pointer;text-decoration:underline">Passer le tuto</a>' +
        '<button id="pt-tuto-next" style="padding:10px 24px;border:none;border-radius:20px;background:#FBBF24;color:#1A1B22;font-size:.9rem;font-weight:800;cursor:pointer">' +
          (idx < total - 1 ? 'Suivant' : 'Compris !') +
        '</button>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.appendChild(tooltip);

    // Position based on target element
    if (targetEl) {
      var rect = targetEl.getBoundingClientRect();
      var tooltipTop = rect.bottom + 12;
      if (tooltipTop + 200 > window.innerHeight) {
        tooltipTop = rect.top - 200;
        if (tooltipTop < 10) tooltipTop = window.innerHeight / 2 - 100;
      }
      tooltip.style.top = Math.max(10, tooltipTop) + 'px';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';

      // Highlight target
      targetEl.style.position = targetEl.style.position || 'relative';
      targetEl.style.zIndex = '10001';
      targetEl.style.boxShadow = '0 0 0 4px #FBBF24, 0 0 20px rgba(251,191,36,0.4)';
      targetEl.style.borderRadius = targetEl.style.borderRadius || '12px';
      targetEl.setAttribute('data-pt-highlighted', '1');
    } else {
      tooltip.style.top = '50%';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translate(-50%, -50%)';
    }

    // Bind events
    document.getElementById('pt-tuto-next').addEventListener('click', function() {
      _unhighlightAll();
      _runTutorial(pageId, steps, idx + 1);
    });
    document.getElementById('pt-tuto-skip').addEventListener('click', function() {
      _unhighlightAll();
      localStorage.setItem(KEYS.tutoPrefix + pageId, '1');
      _cleanupTutorial();
    });
    overlay.addEventListener('click', function() {
      _unhighlightAll();
      _runTutorial(pageId, steps, idx + 1);
    });
  }

  function _unhighlightAll() {
    var highlighted = document.querySelectorAll('[data-pt-highlighted]');
    for (var i = 0; i < highlighted.length; i++) {
      highlighted[i].style.zIndex = '';
      highlighted[i].style.boxShadow = '';
      highlighted[i].removeAttribute('data-pt-highlighted');
    }
  }

  function _cleanupTutorial() {
    var overlay = document.getElementById('pt-tuto-overlay');
    if (overlay) overlay.remove();
    var tooltip = document.getElementById('pt-tuto-tooltip');
    if (tooltip) tooltip.remove();
    _unhighlightAll();
  }

  // ---- Unlock celebration ----
  function showUnlockCelebration(levelInfo) {
    // Get feature names unlocked at this level
    var features = levelInfo.unlock.filter(function(p) { return p !== 'ALL'; });
    var featureNames = {
      'engagements': '400 engagements',
      'carbone': 'Calculateur carbone',
      'defis': 'Defis quotidiens',
      'compteurs': 'Compteurs d\'impact',
      'amis': 'Invite tes amis',
      'pfas': 'Dossier PFAS',
      'biodiversite': 'Biodiversite',
      'oceans': 'Oceans & Plastique',
      'air': 'Qualite de l\'air',
      'eau': 'Eau potable',
      'sols': 'Sols & Agriculture',
      'forets': 'Forets',
      'energie': 'Energie & Climat',
      'dechets': 'Dechets',
      'groupes': 'Groupes thematiques',
      'affinites': 'Groupes d\'affinite',
      'social': 'Fil social',
      'carte': 'Carte interactive',
      'alertes': 'Alertes environnement',
      'entraide': 'Entraide',
      'echanges': 'Echanges & Troc',
      'communaute': 'Communaute',
      'experts': 'Experts',
      'tendances': 'Tendances',
      'scanner': 'Scanner produit',
      'partage': 'Partager',
      'profil': 'Mon profil',
      'sources': 'Sources'
    };

    var featList = features.map(function(f) {
      return featureNames[f] || f;
    }).join(', ');

    var overlay = document.createElement('div');
    overlay.id = 'pt-unlock-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:10003;display:flex;align-items:center;justify-content:center;padding:20px;animation:pt-fadeIn .3s ease-out';

    overlay.innerHTML =
      '<div style="max-width:400px;width:100%;text-align:center;animation:pt-bounceIn .5s ease-out">' +
        '<div style="font-size:4rem;margin-bottom:12px">&#x1F389;</div>' +
        '<div style="font-size:1.4rem;font-weight:900;color:#FBBF24;margin-bottom:8px">Niveau ' + levelInfo.level + ' — ' + levelInfo.name + ' !</div>' +
        '<div style="font-size:1rem;color:#E8E4DC;margin-bottom:12px">Tu as debloque :</div>' +
        '<div style="font-size:.95rem;color:#10B981;font-weight:700;margin-bottom:20px;line-height:1.6">' + featList + '</div>' +
        '<div style="font-size:.85rem;color:#9CA3AF;margin-bottom:20px">' + levelInfo.description + '</div>' +
        (features.length > 0 ? '<a href="' + features[0] + '.html" style="display:inline-block;padding:14px 36px;border:none;border-radius:30px;background:#10B981;color:#fff;font-size:1rem;font-weight:700;text-decoration:none;cursor:pointer;margin-bottom:10px">Essayer maintenant</a><br>' : '') +
        '<a id="pt-unlock-close" style="font-size:.8rem;color:#9CA3AF;cursor:pointer;text-decoration:underline">Fermer</a>' +
      '</div>';

    document.body.appendChild(overlay);

    // Confetti
    _spawnConfetti(50);

    // Close handlers
    setTimeout(function() {
      var closeBtn = document.getElementById('pt-unlock-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          overlay.remove();
        });
      }
    }, 100);
  }

  function _spawnConfetti(count) {
    var container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10004;overflow:hidden';
    document.body.appendChild(container);
    var colors = ['#10B981','#FBBF24','#3B82F6','#EF4444','#8B5CF6','#EC4899','#F59E0B'];
    for (var i = 0; i < count; i++) {
      var piece = document.createElement('div');
      piece.style.cssText = 'position:absolute;width:' + (8 + Math.random() * 8) + 'px;height:' + (8 + Math.random() * 8) + 'px;top:-20px;opacity:0;border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';background:' + colors[Math.floor(Math.random() * colors.length)] + ';left:' + (Math.random() * 100) + '%;animation:pt-confetti ' + (1 + Math.random()) + 's ease-out ' + (Math.random() * 0.5) + 's forwards';
      container.appendChild(piece);
    }
    setTimeout(function() { container.remove(); }, 2500);
  }

  // ---- Auto-check triggers & promote level ----
  function checkAndPromote() {
    var current = getJourneyLevel();
    if (current >= 10) return current;
    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}

    // Calculate days since join
    var daysSinceJoin = 0;
    if (user && user.joinDate) {
      var joinDate = new Date(user.joinDate);
      var now = new Date();
      daysSinceJoin = Math.floor((now - joinDate) / 86400000) + 1;
    }

    // Get engagement stats
    var totalEngChecked = 0;
    if (user && user.todayChecked) {
      Object.keys(user.todayChecked).forEach(function(k) {
        if (user.todayChecked[k] === 'yes') totalEngChecked++;
      });
    }
    var storedCheckedTotal = load(KEYS.engagementsCheckedCount) || 0;
    var engChecked = Math.max(storedCheckedTotal, totalEngChecked);

    var friendsCount = load(KEYS.friendsCount) || 0;
    var groupsJoined = load(KEYS.groupsJoined) || 0;
    var userXP = user ? (user.xp || 0) : 0;
    var userLevel = 1;
    var XP_LEVELS = [0, 30, 80, 150, 250, 350, 500, 700, 900, 1000];
    for (var xi = XP_LEVELS.length - 1; xi >= 0; xi--) {
      if (userXP >= XP_LEVELS[xi]) { userLevel = xi + 1; break; }
    }
    var engagementCount = user && user.engagements ? user.engagements.length : 0;

    var newLevel = current;

    // Level 0 -> 1: onboarding complete
    if (current < 1 && user && user.pseudo) {
      newLevel = 1;
    }
    // Level 1 -> 2: day 2 or any engagement checked
    if (current < 2 && newLevel >= 1 && (daysSinceJoin >= 2 || engChecked >= 1)) {
      newLevel = 2;
    }
    // Level 2 -> 3: day 3 or 3 engagements checked
    if (current < 3 && newLevel >= 2 && (daysSinceJoin >= 3 || engChecked >= 3)) {
      newLevel = 3;
    }
    // Level 3 -> 4: day 4 or XP level 2+
    if (current < 4 && newLevel >= 3 && (daysSinceJoin >= 4 || userLevel >= 2)) {
      newLevel = 4;
    }
    // Level 4 -> 5: day 5 or 1 friend
    if (current < 5 && newLevel >= 4 && (daysSinceJoin >= 5 || friendsCount >= 1)) {
      newLevel = 5;
    }
    // Level 5 -> 6: day 6 or 5 engagements
    if (current < 6 && newLevel >= 5 && (daysSinceJoin >= 6 || engagementCount >= 5)) {
      newLevel = 6;
    }
    // Level 6 -> 7: day 7 or 1 group joined
    if (current < 7 && newLevel >= 6 && (daysSinceJoin >= 7 || groupsJoined >= 1)) {
      newLevel = 7;
    }
    // Level 7 -> 8: XP level 5+ or 10 engagements
    if (current < 8 && newLevel >= 7 && (userLevel >= 5 || engagementCount >= 10)) {
      newLevel = 8;
    }
    // Level 8 -> 9: XP level 7+ or 5 friends
    if (current < 9 && newLevel >= 8 && (userLevel >= 7 || friendsCount >= 5)) {
      newLevel = 9;
    }
    // Level 9 -> 10: XP level 10
    if (current < 10 && newLevel >= 9 && userLevel >= 10) {
      newLevel = 10;
    }

    if (newLevel > current) {
      save(KEYS.journeyLevel, newLevel);
      // Show celebration for the highest newly unlocked level
      var lastNotif = load(KEYS.lastUnlockNotif) || 0;
      if (newLevel > lastNotif) {
        save(KEYS.lastUnlockNotif, newLevel);
        var jl = JOURNEY_LEVELS[newLevel];
        if (jl) {
          setTimeout(function() { showUnlockCelebration(jl); }, 500);
        }
      }
    }

    return newLevel;
  }

  // ---- Track engagement check (call this when user checks an engagement) ----
  function trackEngagementCheck() {
    var count = load(KEYS.engagementsCheckedCount) || 0;
    count++;
    save(KEYS.engagementsCheckedCount, count);
    checkAndPromote();
  }

  // ---- Track friend added ----
  function trackFriendAdded() {
    var count = load(KEYS.friendsCount) || 0;
    count++;
    save(KEYS.friendsCount, count);
    checkAndPromote();
  }

  // ---- Track group joined ----
  function trackGroupJoined() {
    var count = load(KEYS.groupsJoined) || 0;
    count++;
    save(KEYS.groupsJoined, count);
    checkAndPromote();
  }

  // ---- Unlock all (for testing/demos) ----
  function unlockAll() {
    save(KEYS.unlockAll, true);
    save(KEYS.journeyLevel, 10);
  }

  // ---- Reset tutorial (for "?" button) ----
  function resetTutorialForPage(pageId) {
    localStorage.removeItem(KEYS.tutoPrefix + pageId);
    showTutorial(pageId);
  }

  // ---- Adaptive bottom nav ----
  function adaptBottomNav() {
    var nav = document.querySelector('.bottom-nav');
    if (!nav) return;
    var level = getJourneyLevel();

    // Nav configuration per level range
    var navConfig;
    if (level <= 3) {
      navConfig = [
        { href: 'index.html', icon: '&#x1F3E0;', label: 'Accueil' },
        { href: 'engagements.html', icon: '&#x2705;', label: 'Engagements', minLevel: 1 },
        { href: 'compteurs.html', icon: '&#x1F4CA;', label: 'Mon impact', minLevel: 2 }
      ];
    } else if (level <= 6) {
      navConfig = [
        { href: 'index.html', icon: '&#x1F3E0;', label: 'Accueil' },
        { href: 'defis.html', icon: '&#x1F3C6;', label: 'Defis' },
        { href: 'social.html', icon: '&#x1F465;', label: 'Social', minLevel: 5 },
        { href: 'compteurs.html', icon: '&#x1F4CA;', label: 'Impact' }
      ];
    } else {
      navConfig = [
        { href: 'index.html', icon: '&#x1F3E0;', label: 'Accueil' },
        { href: 'defis.html', icon: '&#x1F3C6;', label: 'Defis' },
        { href: 'social.html', icon: '&#x1F465;', label: 'Social' },
        { href: 'carte.html', icon: '&#x1F5FA;&#xFE0F;', label: 'Carte' },
        { href: 'compteurs.html', icon: '&#x1F4CA;', label: 'Impact' }
      ];
    }

    // Determine current page
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Build new nav content
    var html = '';
    navConfig.forEach(function(item) {
      var isLocked = item.minLevel && level < item.minLevel;
      var isActive = currentPath === item.href;
      if (isLocked) {
        html += '<a href="#" onclick="return false" style="opacity:0.3;pointer-events:none"><span>' + item.icon + '</span>&#x1F512;</a>';
      } else {
        html += '<a href="' + item.href + '"' + (isActive ? ' class="active"' : '') + '><span>' + item.icon + '</span>' + item.label + '</a>';
      }
    });

    nav.innerHTML = html;
  }

  // ---- Help button ("?") ----
  function addHelpButton(pageId) {
    var btn = document.createElement('button');
    btn.id = 'pt-help-btn';
    btn.innerHTML = '?';
    btn.style.cssText = 'position:fixed;bottom:90px;left:16px;width:40px;height:40px;border-radius:50%;border:2px solid rgba(255,255,255,0.15);background:rgba(10,22,40,0.9);color:#9CA3AF;font-size:1.1rem;font-weight:900;cursor:pointer;z-index:99;display:flex;align-items:center;justify-content:center;transition:all .2s;box-shadow:0 2px 10px rgba(0,0,0,0.3)';
    btn.addEventListener('mouseenter', function() {
      btn.style.borderColor = '#FBBF24';
      btn.style.color = '#FBBF24';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.borderColor = 'rgba(255,255,255,0.15)';
      btn.style.color = '#9CA3AF';
    });
    btn.addEventListener('click', function() {
      resetTutorialForPage(pageId);
    });
    document.body.appendChild(btn);
  }

  // ---- Beginner progress card (for index.html) ----
  function renderBeginnerCard() {
    var level = getJourneyLevel();
    if (level >= 4) return null; // Not a beginner anymore

    var user = null;
    try { user = JSON.parse(localStorage.getItem('planet_user')); } catch(e) {}
    var daysSinceJoin = 1;
    if (user && user.joinDate) {
      var joinDate = new Date(user.joinDate);
      daysSinceJoin = Math.floor((new Date() - joinDate) / 86400000) + 1;
    }

    var missions = [
      { day: 1, label: 'Choisis tes engagements', done: level >= 1 },
      { day: 2, label: 'Fais ton premier check', done: level >= 2 },
      { day: 3, label: 'Explore tes compteurs', done: level >= 3 },
      { day: 4, label: 'Decouvre les domaines', done: level >= 4 },
      { day: 5, label: 'Rejoins la communaute', done: level >= 5 },
      { day: 6, label: 'Explore la carte', done: level >= 6 },
      { day: 7, label: 'Tout debloque !', done: level >= 7 }
    ];

    var html = '<div style="background:linear-gradient(135deg,rgba(251,191,36,0.15),rgba(16,185,129,0.1));border:1px solid rgba(251,191,36,0.3);border-radius:16px;padding:20px;margin-bottom:16px">';
    html += '<div style="font-size:1rem;font-weight:800;color:#FBBF24;margin-bottom:12px">Parcours debutant — Jour ' + Math.min(daysSinceJoin, 7) + '/7</div>';

    missions.forEach(function(m) {
      var isCurrent = m.day === Math.min(daysSinceJoin, 7) && !m.done;
      html += '<div style="display:flex;align-items:center;gap:10px;padding:6px 0;' + (isCurrent ? 'color:#FBBF24;font-weight:700' : m.done ? 'color:#10B981' : 'color:#9CA3AF;opacity:0.5') + '">';
      html += '<span style="font-size:.9rem">' + (m.done ? '&#x2705;' : isCurrent ? '&#x1F449;' : '&#x1F512;') + '</span>';
      html += '<span style="font-size:.85rem">' + m.label + '</span>';
      html += '</div>';
    });

    html += '</div>';
    return html;
  }

  // ---- Determine which sections to show/hide on index.html ----
  function getHomepageVisibility() {
    var level = getJourneyLevel();
    return {
      showQuickActions: level >= 2,
      showDomains: level >= 4,
      showVideos: level >= 4,
      showSocialFeed: level >= 5,
      showInvitePrompt: level >= 3,
      showPersonalizedFeed: level >= 7,
      showCommunityCounter: level >= 2,
      showBeginnerCard: level < 4
    };
  }

  // ---- Inject global CSS for tutorial animations ----
  function _injectStyles() {
    if (document.getElementById('pt-styles')) return;
    var style = document.createElement('style');
    style.id = 'pt-styles';
    style.textContent =
      '@keyframes pt-fadeIn{0%{opacity:0}100%{opacity:1}}' +
      '@keyframes pt-bounceIn{0%{transform:scale(0.3);opacity:0}50%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}' +
      '@keyframes pt-confetti{0%{opacity:1;transform:translateY(0) rotate(0deg) scale(1)}100%{opacity:0;transform:translateY(100vh) rotate(720deg) scale(0.3)}}';
    document.head.appendChild(style);
  }

  // ---- Auto-init on page load ----
  function init(pageId) {
    _injectStyles();

    // Check URL param for unlock all
    if (window.location.search.indexOf('unlock=all') !== -1) {
      unlockAll();
    }

    // Auto-promote based on triggers
    checkAndPromote();

    // Check if page is locked (skip for index.html)
    if (pageId && pageId !== 'index') {
      if (!isUnlocked(pageId)) {
        showLocked(pageId);
        return; // Don't do anything else
      }
    }

    // Adapt bottom nav
    adaptBottomNav();

    // Add help button
    if (pageId) {
      addHelpButton(pageId);
    }

    // Show tutorial if first visit
    if (pageId) {
      showTutorial(pageId);
    }
  }

  // ---- Public API ----
  return {
    JOURNEY_LEVELS: JOURNEY_LEVELS,
    PAGE_UNLOCK_LEVEL: PAGE_UNLOCK_LEVEL,
    getJourneyLevel: getJourneyLevel,
    setJourneyLevel: setJourneyLevel,
    isUnlocked: isUnlocked,
    getUnlockedPages: getUnlockedPages,
    getUnlockInfo: getUnlockInfo,
    showLocked: showLocked,
    showTutorial: showTutorial,
    showUnlockCelebration: showUnlockCelebration,
    checkAndPromote: checkAndPromote,
    trackEngagementCheck: trackEngagementCheck,
    trackFriendAdded: trackFriendAdded,
    trackGroupJoined: trackGroupJoined,
    unlockAll: unlockAll,
    resetTutorialForPage: resetTutorialForPage,
    adaptBottomNav: adaptBottomNav,
    addHelpButton: addHelpButton,
    renderBeginnerCard: renderBeginnerCard,
    getHomepageVisibility: getHomepageVisibility,
    init: init
  };
})();
