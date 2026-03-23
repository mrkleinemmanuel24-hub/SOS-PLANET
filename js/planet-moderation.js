/* ============================================
   SOS Planet — Content Moderation
   Blacklist, rate limiting, report system
   ============================================ */

var PlanetModeration = (function() {
  'use strict';

  var MODERATION = {
    blacklist: ['connard','putain','merde','encule','nique','salaud','pute','bordel','fdp','ntm','pd','tapette','negro','nazi','hitler','enfoiré','batard','fils de pute','ta gueule','ta mere','tg','stfu','fuck','shit','bitch','asshole','dick','cunt'],
    politicalTerms: ['vote','election','parti','droite','gauche','macron','melenchon','lepen','zemmour','rn','lfi','ps','lr','eelv','reconquete','bardella','attal','borne'],
    spamPatterns: ['achetez','promo','bitcoin','crypto','forex','gagnez','cliquez ici','offre exclusive','gratuit','casino','pari','viagra','cialis','whatsapp','telegram'],
    maxCapsPercent: 40,
    maxLength: 500,
    minLength: 5,
    rateLimit: 10,
    ratePeriod: 3600000
  };

  var REPORT_KEY = 'planet_reports';
  var RATE_KEY = 'planet_rate_posts';

  function normalize(text) {
    return text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  function checkBlacklist(text) {
    var norm = normalize(text);
    for (var i = 0; i < MODERATION.blacklist.length; i++) {
      var word = MODERATION.blacklist[i];
      var re = new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
      if (re.test(norm)) {
        return { blocked: true, reason: 'Contenu inapproprie detecte. Merci de reformuler.' };
      }
    }
    return { blocked: false };
  }

  function checkPolitical(text) {
    var norm = normalize(text);
    var count = 0;
    for (var i = 0; i < MODERATION.politicalTerms.length; i++) {
      if (norm.indexOf(MODERATION.politicalTerms[i]) !== -1) count++;
    }
    if (count >= 2) {
      return { blocked: true, reason: 'SOS Planet est apolitique. Pas de contenu politique svp.' };
    }
    return { blocked: false };
  }

  function checkSpam(text) {
    var norm = normalize(text);
    for (var i = 0; i < MODERATION.spamPatterns.length; i++) {
      if (norm.indexOf(MODERATION.spamPatterns[i]) !== -1) {
        return { blocked: true, reason: 'Contenu promotionnel detecte. Pas de pub ici.' };
      }
    }
    return { blocked: false };
  }

  function checkCaps(text) {
    if (text.length < 10) return { blocked: false };
    var upper = text.replace(/[^A-Z]/g, '').length;
    var alpha = text.replace(/[^a-zA-Z]/g, '').length;
    if (alpha > 0 && (upper / alpha) * 100 > MODERATION.maxCapsPercent) {
      return { blocked: true, reason: 'Trop de majuscules. Ecrivez normalement svp.' };
    }
    return { blocked: false };
  }

  function checkLength(text) {
    if (text.length < MODERATION.minLength) {
      return { blocked: true, reason: 'Message trop court (min ' + MODERATION.minLength + ' caracteres).' };
    }
    if (text.length > MODERATION.maxLength) {
      return { blocked: true, reason: 'Message trop long (max ' + MODERATION.maxLength + ' caracteres).' };
    }
    return { blocked: false };
  }

  function checkRateLimit() {
    var posts = [];
    try { posts = JSON.parse(localStorage.getItem(RATE_KEY)) || []; } catch(e) { posts = []; }
    var now = Date.now();
    posts = posts.filter(function(t) { return now - t < MODERATION.ratePeriod; });
    if (posts.length >= MODERATION.rateLimit) {
      return { blocked: true, reason: 'Limite atteinte (' + MODERATION.rateLimit + ' posts/heure). Reessayez plus tard.' };
    }
    posts.push(now);
    try { localStorage.setItem(RATE_KEY, JSON.stringify(posts)); } catch(e) {}
    return { blocked: false };
  }

  function moderateContent(text) {
    var checks = [
      checkLength(text),
      checkBlacklist(text),
      checkPolitical(text),
      checkSpam(text),
      checkCaps(text),
      checkRateLimit()
    ];
    for (var i = 0; i < checks.length; i++) {
      if (checks[i].blocked) return checks[i];
    }
    return { blocked: false, reason: '' };
  }

  // ---- Report system ----
  function reportPost(postId) {
    var reports = {};
    try { reports = JSON.parse(localStorage.getItem(REPORT_KEY)) || {}; } catch(e) { reports = {}; }
    if (!reports[postId]) reports[postId] = 0;
    reports[postId]++;
    try { localStorage.setItem(REPORT_KEY, JSON.stringify(reports)); } catch(e) {}
    return reports[postId];
  }

  function getReportCount(postId) {
    var reports = {};
    try { reports = JSON.parse(localStorage.getItem(REPORT_KEY)) || {}; } catch(e) { reports = {}; }
    return reports[postId] || 0;
  }

  function isHidden(postId) {
    return getReportCount(postId) >= 3;
  }

  return {
    moderateContent: moderateContent,
    reportPost: reportPost,
    getReportCount: getReportCount,
    isHidden: isHidden,
    MODERATION: MODERATION
  };
})();
