/* ============================================
   SOS Planet — Geolocation Alerts
   Request geolocation, match alerts, seasonal
   ============================================ */

var PlanetAlerts = (function() {
  'use strict';

  var GEO_KEY = 'planet_user_geo';
  var ALERTS_SEEN_KEY = 'planet_alerts_seen';

  // ---- Alert database (prototype: Paris region defaults + seasonal March 2026) ----
  var ALL_ALERTS = [
    // Meteo — mars 2026 (realiste)
    { id: 'meteo-1', cat: 'meteo', severity: 'info', title: 'Giboulees de mars', desc: 'Alternance averses et eclaircies prevue cette semaine. Temperatures 8-14°C en Ile-de-France. Parapluie conseille.', source: 'Meteo-France', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 200 },
    { id: 'meteo-2', cat: 'meteo', severity: 'info', title: 'UV : index modere (3-4)', desc: 'Indice UV 3-4 en mars. Protection solaire legere recommandee si exposition prolongee entre 12h et 15h.', source: 'Meteo-France', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 300 },
    { id: 'meteo-3', cat: 'meteo', severity: 'attention', title: 'Gelees matinales possibles', desc: 'Temperatures nocturnes proches de 0°C en fin de semaine. Attention aux plantations precoces et conduites agricoles.', source: 'Meteo-France', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 200 },

    // Environnement — allergies et nuisibles de saison
    { id: 'env-1', cat: 'environnement', severity: 'attention', title: 'Pollens : bouleau et frene', desc: 'Debut de saison pollinique. Risque allergique eleve pour les pollens de bouleau et frene en region parisienne. Consultez le bulletin RNSA.', source: 'RNSA (Reseau National de Surveillance Aerobiologique)', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 200 },
    { id: 'env-2', cat: 'environnement', severity: 'attention', title: 'Chenilles processionnaires', desc: 'Debut de descente des chenilles processionnaires du pin. Ne pas toucher ! Risque de reactions cutanees et respiratoires. Eloignez enfants et animaux.', source: 'ARS / FREDON', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 300 },
    { id: 'env-3', cat: 'environnement', severity: 'info', title: 'Saison des tiques', desc: 'Les tiques sont actives des mars. Apres chaque promenade en foret, inspectez-vous et retirez les tiques dans les 24h.', source: 'ARS / Sante publique France', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 300 },

    // Pollution — qualite air et PFAS
    { id: 'pol-1', cat: 'pollution', severity: 'attention', title: 'Episode particules fines possible', desc: 'Conditions anticycloniques favorisant l\'accumulation de PM2.5 et PM10 en Ile-de-France. Limitez les efforts physiques intenses en exterieur.', source: 'Airparif / Atmo France', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 80 },
    { id: 'pol-2', cat: 'pollution', severity: 'danger', title: 'PFAS detectes dans l\'eau', desc: 'Des concentrations de PFAS superieures aux seuils UE ont ete mesurees dans plusieurs captages d\'Ile-de-France. Consultez la carte interactive.', source: 'ARS / Forever Pollution Project', date: '2026-03-20', lat: 48.8566, lng: 2.3522, radius: 80 },
    { id: 'pol-3', cat: 'pollution', severity: 'attention', title: 'Site BASOL a proximite', desc: '3 sites pollues BASOL identifies dans un rayon de 5 km autour de votre position.', source: 'BASOL / Georisques', date: '2026-03-18', lat: 48.8566, lng: 2.3522, radius: 30 },

    // Nature — observations de saison
    { id: 'nat-1', cat: 'nature', severity: 'info', title: 'Retour des hirondelles', desc: 'Les hirondelles rustiques arrivent en France. Signalez vos premieres observations sur Faune-France ou BirdLab.', source: 'LPO', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 300 },
    { id: 'nat-2', cat: 'nature', severity: 'info', title: 'Floraison des cerisiers', desc: 'Debut de floraison des cerisiers a Paris (Parc de Sceaux, Jardin des Plantes). Pic prevu debut avril.', source: 'Obs. Phenoclim', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 50 },
    { id: 'nat-3', cat: 'nature', severity: 'info', title: 'Grenouilles et crapauds en migration', desc: 'Les amphibiens traversent les routes pour rejoindre les mares. Prudence en voiture le soir, signalez les points de passage.', source: 'SHF / LPO', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 300 },

    // Risques
    { id: 'risk-1', cat: 'risques', severity: 'info', title: 'Risque inondation modere', desc: 'Nappes phreatiques encore hautes apres l\'hiver. Surveillez les niveaux si vous etes en zone inondable.', source: 'Vigicrues / BRGM', date: '2026-03-24', lat: 48.8566, lng: 2.3522, radius: 150 },

    // Saison — mars 2026
    { id: 'saison-1', cat: 'saison', severity: 'info', title: 'Fruits et legumes de mars', desc: 'De saison : poireaux, endives, epinards, chou-fleur, radis, pommes, poires, kiwis. Privilegiez les circuits courts !', source: 'ADEME / Calendrier de saison', date: '2026-03-01', lat: 0, lng: 0, radius: 9999 },
    { id: 'saison-2', cat: 'saison', severity: 'info', title: 'Earth Hour — 29 mars', desc: 'Samedi 29 mars a 20h30 : eteignez vos lumieres pendant 1 heure. Evenement mondial WWF.', source: 'WWF France', date: '2026-03-24', lat: 0, lng: 0, radius: 9999 },
    { id: 'saison-3', cat: 'saison', severity: 'info', title: 'Journee mondiale de l\'eau — 22 mars', desc: '2 milliards de personnes n\'ont toujours pas acces a l\'eau potable. Chaque geste compte.', source: 'ONU', date: '2026-03-22', lat: 0, lng: 0, radius: 9999 },
    { id: 'saison-4', cat: 'saison', severity: 'info', title: 'Equinoxe de printemps', desc: 'Le printemps a commence le 20 mars. Les jours rallongent de 3 minutes par jour. Ideal pour les balades nature.', source: 'IMCCE', date: '2026-03-20', lat: 0, lng: 0, radius: 9999 },
    { id: 'saison-5', cat: 'saison', severity: 'info', title: 'Semaine du developpement durable', desc: 'Du 30 mars au 5 avril : participez a la Semaine europeenne du developpement durable. Evenements pres de chez vous.', source: 'Ministere Transition Ecologique', date: '2026-03-24', lat: 0, lng: 0, radius: 9999 }
  ];

  // ---- Geolocation ----
  function requestGeolocation(callback) {
    if (!navigator.geolocation) {
      callback(null, 'Geolocalisation non disponible');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        var geo = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        try { localStorage.setItem(GEO_KEY, JSON.stringify(geo)); } catch(e) {}
        callback(geo, null);
      },
      function(err) {
        // Default to Paris
        var geo = { lat: 48.8566, lng: 2.3522 };
        try { localStorage.setItem(GEO_KEY, JSON.stringify(geo)); } catch(e) {}
        callback(geo, 'Position par defaut : Paris');
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }

  function getSavedGeo() {
    try { return JSON.parse(localStorage.getItem(GEO_KEY)); } catch(e) { return null; }
  }

  // ---- Distance (Haversine) ----
  function distanceKm(lat1, lng1, lat2, lng2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLng = (lng2 - lng1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // ---- Match alerts to position ----
  function getAlertsForPosition(lat, lng) {
    return ALL_ALERTS.filter(function(a) {
      if (a.radius >= 9999) return true; // global/seasonal
      return distanceKm(lat, lng, a.lat, a.lng) <= a.radius;
    });
  }

  function getAlertsByCategory(alerts) {
    var cats = {};
    alerts.forEach(function(a) {
      if (!cats[a.cat]) cats[a.cat] = [];
      cats[a.cat].push(a);
    });
    return cats;
  }

  // ---- Severity ranking ----
  function severityRank(s) {
    var ranks = { danger: 4, alerte: 3, attention: 2, info: 1 };
    return ranks[s] || 0;
  }

  function sortBySeverity(alerts) {
    return alerts.slice().sort(function(a, b) {
      return severityRank(b.severity) - severityRank(a.severity);
    });
  }

  // ---- City name from coords (simplified) ----
  function getCityName(lat, lng) {
    // Prototype: simple distance-based lookup
    var cities = [
      { name: 'Paris', lat: 48.8566, lng: 2.3522 },
      { name: 'Lyon', lat: 45.7640, lng: 4.8357 },
      { name: 'Marseille', lat: 43.2965, lng: 5.3698 },
      { name: 'Toulouse', lat: 43.6047, lng: 1.4442 },
      { name: 'Nice', lat: 43.7102, lng: 7.2620 },
      { name: 'Nantes', lat: 47.2184, lng: -1.5536 },
      { name: 'Strasbourg', lat: 48.5734, lng: 7.7521 },
      { name: 'Montpellier', lat: 43.6108, lng: 3.8767 },
      { name: 'Bordeaux', lat: 44.8378, lng: -0.5792 },
      { name: 'Lille', lat: 50.6292, lng: 3.0573 },
      { name: 'Rennes', lat: 48.1173, lng: -1.6778 },
      { name: 'Reims', lat: 49.2583, lng: 4.0317 }
    ];
    var nearest = cities[0], minDist = Infinity;
    cities.forEach(function(c) {
      var d = distanceKm(lat, lng, c.lat, c.lng);
      if (d < minDist) { minDist = d; nearest = c; }
    });
    return minDist < 50 ? nearest.name : 'votre zone';
  }

  // ---- Seasonal alerts by date ----
  function getSeasonalAlerts() {
    var month = new Date().getMonth(); // 0-based
    var seasonal = {
      0: ['Janvier : poireaux, choux, clémentines, pommes'],
      1: ['Fevrier : endives, mâche, oranges, pamplemousses'],
      2: ['Mars : poireaux, epinards, radis, pommes, kiwis'],
      3: ['Avril : asperges, radis, fraises, rhubarbe'],
      4: ['Mai : cerises, fraises, petits pois, artichauts'],
      5: ['Juin : tomates, courgettes, cerises, abricots'],
      6: ['Juillet : tomates, aubergines, peches, melons'],
      7: ['Aout : tomates, poivrons, figues, prunes'],
      8: ['Septembre : raisin, figues, choux, potiron'],
      9: ['Octobre : courges, champignons, chataignes, pommes'],
      10: ['Novembre : endives, poireaux, clémentines, kiwis'],
      11: ['Decembre : choux, carottes, oranges, clémentines']
    };
    return seasonal[month] || [];
  }

  return {
    requestGeolocation: requestGeolocation,
    getSavedGeo: getSavedGeo,
    getAlertsForPosition: getAlertsForPosition,
    getAlertsByCategory: getAlertsByCategory,
    sortBySeverity: sortBySeverity,
    getCityName: getCityName,
    getSeasonalAlerts: getSeasonalAlerts,
    ALL_ALERTS: ALL_ALERTS
  };
})();
