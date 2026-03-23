# SOS PLANET — Document de Vision Fondateur

**Version** : 1.0
**Date** : 22 mars 2026
**Auteur** : Emmanuel Klein
**Statut** : Document fondateur — Cartographie, Priorisation, Architecture

---

> *"La planète n'a pas besoin de héros. Elle a besoin que des milliards de gens fassent de petits gestes informés."*
> — Philosophie SOS Planet

---

## Table des matières

1. [Contexte et philosophie](#contexte)
2. [ÉTAPE 1 — Cartographie exhaustive (100 modules)](#etape-1)
3. [ÉTAPE 2 — Top 20 prioritaires](#etape-2)
4. [ÉTAPE 3 — Architecture SOS Planet](#etape-3)
5. [ÉTAPE 4 — Les 5 premiers modules à construire](#etape-4)
6. [ÉTAPE 5 — Vision monétisation](#etape-5)
7. [ÉTAPE 6 — Impact mesurable](#etape-6)
8. [Annexes — Sources de données](#annexes)

---

## Contexte et philosophie {#contexte}

### Qui sommes-nous

Emmanuel Klein, développeur solo, a construit 20+ plateformes SOS (Animal, Droit, Solfège, Agricole, Agglo, Mairies, Renov'Intelligence...). Chaque projet suit la même philosophie :

- **Gratuit et accessible** pour le grand public
- **Orientation, jamais de diagnostic** — on informe, on ne prescrit pas
- **Science + Empathie + Technologie** — données ouvertes, langage humain, PWA mobile-first
- **Stack sobre** : HTML/CSS/JS pur, Cloudflare Pages, localStorage, zéro framework lourd
- **Empreinte numérique minimale** — pas de tracking, pas de cookies tiers, hébergement green

### Pourquoi SOS Planet

L'urgence climatique et écologique est documentée. Ce qui manque : des **outils concrets, gratuits, en français**, qui transforment l'information scientifique en **actions immédiates** pour les citoyens, les collectivités et les entreprises.

SOS Planet n'est pas un énième site d'information. C'est une **boîte à outils environnementale** — chaque module résout un problème précis avec des données réelles.

### Contraintes techniques

| Contrainte | Choix |
|---|---|
| Langage | HTML / CSS / JS vanilla |
| Hébergement | Cloudflare Pages (gratuit, CDN mondial, green) |
| Persistance | localStorage + Cloudflare D1 si besoin |
| Format | PWA installable, offline-first |
| Langue | Français (i18n prévue Phase 2) |
| Design | Mobile-first, accessible RGAA/WCAG AA |
| APIs | Gratuites uniquement (ADEME, data.gouv.fr, Copernicus...) |
| Tracking | Aucun — privacy by design |

---

## ÉTAPE 1 — Cartographie exhaustive {#etape-1}

### 100 modules identifiés, classés par domaine

Légende :
- **Impact** : potentiel de réduction d'impact environnemental (1-5)
- **Faisabilité** : réalisable en solo avec stack actuelle (1-5)

---

### A. CLIMAT & ÉNERGIE (modules 1-15)

| # | Module | Description | Cible | Données | Impact | Faisabilité |
|---|--------|-------------|-------|---------|--------|-------------|
| 1 | **SOS Carbone** | Calculateur d'empreinte carbone personnelle avec plan de réduction | Citoyens | ADEME Base Carbone, data.gouv.fr | 5 | 5 |
| 2 | **SOS Énergie** | Diagnostic conso énergétique du foyer + recommandations | Ménages | ADEME, Enedis Open Data, RTE éCO2mix | 5 | 4 |
| 3 | **SOS Climat Local** | Projections climatiques pour ta commune (2030-2050-2100) | Citoyens, élus | DRIAS Météo-France, Copernicus C3S | 4 | 3 |
| 4 | **SOS Électricité Verte** | Mix électrique en temps réel + quand consommer pour polluer moins | Ménages | Electricity Maps API, RTE éCO2mix | 4 | 5 |
| 5 | **SOS Rénovation** | Lien vers Renov'Intelligence existant — calcul DPE + aides | Propriétaires | ADEME, MaPrimeRénov | 5 | 5 (existe) |
| 6 | **SOS Chaleur** | Alerte canicule + carte îlots fraîcheur + conseils adaptation | Vulnérables, élus | Météo-France API, data.gouv.fr | 4 | 4 |
| 7 | **SOS Isolation** | Évaluer les déperditions thermiques de son logement simplement | Propriétaires | ADEME, DPE open data | 4 | 4 |
| 8 | **SOS Solaire** | Potentiel solaire de mon toit + rentabilité + démarches | Propriétaires | cadastre-solaire.fr, PVGIS (EU) | 4 | 3 |
| 9 | **SOS Hydrogène** | Carte des stations H2, état de la filière, calcul pertinence | Transporteurs, curieux | data.gouv.fr, H2 Mobility | 2 | 3 |
| 10 | **SOS Géothermie** | Potentiel géothermique de mon terrain + démarches | Propriétaires | BRGM InfoTerre, géothermies.fr | 3 | 3 |
| 11 | **SOS Nucléaire** | Carte des centrales, rayon sécurité, plan iode, transparence | Riverains | ASN, IRSN, data.gouv.fr | 3 | 4 |
| 12 | **SOS Biomasse** | Calculer si le chauffage bois est pertinent + impact particules | Ménages ruraux | ADEME, Atmo France | 3 | 4 |
| 13 | **SOS Compteur** | Lire et comprendre sa facture énergie, détecter les anomalies | Ménages | Enedis Linky data, GRDF | 4 | 4 |
| 14 | **SOS Précarité Énergie** | Identifier si on est en précarité + toutes les aides disponibles | Ménages modestes | ONPE, data.gouv.fr, CAF | 5 | 4 |
| 15 | **SOS Marée** | Potentiel énergie marémotrice + éolien offshore de ma côte | Élus littoraux | Copernicus Marine, Météo-France | 2 | 2 |

---

### B. BIODIVERSITÉ & NATURE (modules 16-30)

| # | Module | Description | Cible | Données | Impact | Faisabilité |
|---|--------|-------------|-------|---------|--------|-------------|
| 16 | **SOS Biodiversité** | Inventaire biodiversité de ma commune + espèces menacées | Citoyens, élus | GBIF, INPN, OpenObs | 4 | 4 |
| 17 | **SOS Arbres** | Identifier un arbre par photo, signaler abattage suspect | Citoyens | PlantNet API, OpenStreetMap | 4 | 4 |
| 18 | **SOS Oiseaux** | Identifier un oiseau au chant/photo, signaler espèces en déclin | Naturalistes, curieux | eBird API, Xeno-canto, LPO data | 3 | 3 |
| 19 | **SOS Abeilles** | Signaler un essaim, trouver un apiculteur, état des pollinisateurs | Citoyens | ITSAP, data.gouv.fr | 3 | 4 |
| 20 | **SOS Forêt** | Suivi déforestation temps réel + alertes feux de forêt France | Citoyens, élus | Global Forest Watch, EFFIS, FIRMS | 5 | 3 |
| 21 | **SOS Zones Humides** | Carte des zones humides, leur importance, signaler dégradation | Citoyens, élus | SDAGE, data.gouv.fr, Ramsar | 3 | 3 |
| 22 | **SOS Tourbières** | Identifier et protéger les tourbières (puits carbone majeurs) | Associations, élus | INPN, Pôle-relais tourbières | 2 | 3 |
| 23 | **SOS Corail** | État des récifs outre-mer, actions de protection, bénévolat | Citoyens outre-mer | ICRI, Allen Coral Atlas, IFRECOR | 3 | 3 |
| 24 | **SOS Rewilding** | Carte des projets de ré-ensauvagement + comment participer | Associations, citoyens | ASPAS, Rewilding Europe | 3 | 4 |
| 25 | **SOS Jardin** | Guide permaculture personnalisé selon sol + climat + surface | Jardiniers | sol.data.gouv.fr, Météo-France | 4 | 4 |
| 26 | **SOS Haies** | Importance des haies champêtres + comment planter + aides | Agriculteurs, citoyens | PAC data, Afac-Agroforesteries | 3 | 4 |
| 27 | **SOS Invasives** | Identifier espèces invasives + signaler + protocole éradication | Naturalistes, élus | INPN, DAISIE, EASIN | 3 | 3 |
| 28 | **SOS Glaciers** | Suivi fonte des glaciers alpins + impact eau potable | Alpins, curieux | Copernicus, GLIMS, WGMS | 3 | 3 |
| 29 | **SOS Loup** | Cohabitation élevage/loup, aides bergers, données attaques | Éleveurs, curieux | ONCFS/OFB, data.gouv.fr | 2 | 4 |
| 30 | **SOS Chasse** | Dates d'ouverture, zones de battue, sécurité promeneurs | Promeneurs, chasseurs | OFB, arrêtés préfectoraux | 3 | 3 |

---

### C. POLLUTION & SANTÉ ENVIRONNEMENTALE (modules 31-48)

| # | Module | Description | Cible | Données | Impact | Faisabilité |
|---|--------|-------------|-------|---------|--------|-------------|
| 31 | **SOS Air** | Qualité de l'air en temps réel + alertes + conseils santé | Tous, asthmatiques | OpenAQ, Atmo France, PREV'AIR | 5 | 5 |
| 32 | **SOS Eau Potable** | Qualité de mon eau du robinet + polluants détectés | Ménages | ARS, data.eaufrance.fr | 5 | 5 |
| 33 | **SOS Pesticides** | Carte des épandages, distances habitations, risques santé | Riverains agricoles | Registre phyto, data.gouv.fr, BNVD | 4 | 3 |
| 34 | **SOS Microplastiques** | Sources de microplastiques chez soi + comment réduire | Ménages | Études ANSES, littérature | 4 | 5 |
| 35 | **SOS PFAS** | Carte contamination PFAS + eau + produits à éviter | Citoyens | Forever Pollution Project, ARS | 5 | 4 |
| 36 | **SOS Perturbateurs** | Scanner produits cosmétiques/ménagers pour perturbateurs endocriniens | Ménages, parents | Open Food Facts, CosmEthics data | 4 | 3 |
| 37 | **SOS Amiante** | Vérifier si mon immeuble est amené + démarches | Propriétaires, locataires | DPE data, data.gouv.fr | 4 | 4 |
| 38 | **SOS Radon** | Potentiel radon de mon adresse + mesures de protection | Propriétaires | IRSN carte radon | 3 | 5 |
| 39 | **SOS Bruit** | Carte du bruit + mesurer dB avec micro phone + signaler | Urbains | data.gouv.fr PPBE, cartes bruit | 3 | 4 |
| 40 | **SOS Lumière** | Carte pollution lumineuse + signaler éclairage public excessif | Citoyens, astronomes | VIIRS nighttime, ANPCEN | 3 | 4 |
| 41 | **SOS Ondes** | Carte des antennes + mesure exposition + comprendre les normes | Citoyens | ANFR cartoradio, data.gouv.fr | 3 | 4 |
| 42 | **SOS Plomb** | Risque saturnisme par adresse + canalisations plomb + démarches | Familles, locataires | ARS, CREP data | 4 | 4 |
| 43 | **SOS Sites Pollués** | Carte BASOL/BASIAS sites pollués près de chez moi | Acheteurs, riverains | BASOL, BASIAS, SIS, Géorisques | 4 | 4 |
| 44 | **SOS Zoonoses** | Risques maladies animaux-humains selon région + prévention | Eleveurs, ruraux | InVS, Plateforme ESA, WAHIS | 3 | 3 |
| 45 | **SOS Antibiorésistance** | Comprendre le risque AMR + gestes pour réduire antibiotiques | Tous | ANSM, ANSES, WHO GLASS | 3 | 4 |
| 46 | **SOS Pandémie** | Suivi émergences zoonotiques + conseils prévention | Tous | WHO, ECDC, ProMED | 3 | 3 |
| 47 | **SOS Nitrates** | Zones vulnérables + qualité eau souterraine | Agriculteurs, riverains | ADES, data.eaufrance.fr | 3 | 3 |
| 48 | **SOS Sols** | Santé de mon sol agricole/jardin + cartographie érosion | Agriculteurs, jardiniers | GIS Sol, Réseau RMQS, LUCAS | 3 | 3 |

---

### D. DÉCHETS & ÉCONOMIE CIRCULAIRE (modules 49-60)

| # | Module | Description | Cible | Données | Impact | Faisabilité |
|---|--------|-------------|-------|---------|--------|-------------|
| 49 | **SOS Tri** | Scanner un produit → où et comment le trier (consignes locales) | Ménages | Citeo data, Open Food Facts | 5 | 4 |
| 50 | **SOS Déchetterie** | Trouver la déchetterie la plus proche + horaires + déchets acceptés | Ménages | data.gouv.fr, OpenStreetMap | 4 | 5 |
| 51 | **SOS Compost** | Où composter (obligation 2024) + guide compostage + composteurs collectifs | Ménages | data.gouv.fr, réseau compost citoyen | 4 | 5 |
| 52 | **SOS Réparation** | Trouver un réparateur local + bonus réparation + tutoriels | Consommateurs | Annuaire réparation, iFixit | 4 | 4 |
| 53 | **SOS Recyclage** | Que deviennent mes déchets ? Parcours réel du déchet en France | Éducatif | ADEME, éco-organismes | 3 | 4 |
| 54 | **SOS Plastique** | Audit plastique de ma cuisine + alternatives concrètes | Ménages | Études ADEME, Zero Waste | 4 | 5 |
| 55 | **SOS Textile** | Impact de ma garde-robe + où donner + repair cafés mode | Consommateurs | ReFashion, ADEME mode data | 4 | 4 |
| 56 | **SOS Électronique** | Durée de vie, réparabilité, où recycler DEEE | Consommateurs | Indice réparabilité, ecosystem | 4 | 4 |
| 57 | **SOS Anti-Gaspi** | Réduire gaspillage alimentaire au foyer — planification repas | Ménages | ADEME anti-gaspi, Open Food Facts | 5 | 4 |
| 58 | **SOS Vrac** | Carte des magasins vrac + consigne + circuits courts | Consommateurs | OpenStreetMap, Réseau Vrac | 3 | 4 |
| 59 | **SOS Upcycling** | Idées créatives pour réutiliser avant de jeter — générateur | Créatifs, éducatif | Communautaire | 2 | 5 |
| 60 | **SOS Minerais** | Impact extraction minière de mes appareils + alternatives | Consommateurs, éducatif | USGS, EU CRM list | 2 | 3 |

---

### E. ALIMENTATION & AGRICULTURE (modules 61-72)

| # | Module | Description | Cible | Données | Impact | Faisabilité |
|---|--------|-------------|-------|---------|--------|-------------|
| 61 | **SOS Assiette** | Impact carbone de mon repas + suggestions bas carbone | Ménages | ADEME Agribalyse, Open Food Facts | 5 | 4 |
| 62 | **SOS Saisons** | Calendrier fruits & légumes de saison + producteurs locaux | Consommateurs | data.gouv.fr, AMAP | 4 | 5 |
| 63 | **SOS Labels** | Décoder les labels alimentaires (AB, AOP, HVE, C'est qui le patron...) | Consommateurs | INAO, Agence Bio | 3 | 5 |
| 64 | **SOS Circuits Courts** | Carte AMAP, marchés, drive fermier, vente directe | Consommateurs | OpenStreetMap, data.gouv.fr | 4 | 4 |
| 65 | **SOS Viande** | Calculer l'impact de ma conso viande + transition progressive | Ménages | FAO, ADEME Agribalyse | 4 | 4 |
| 66 | **SOS Permaculture** | Conception d'un jardin en permaculture pas à pas | Jardiniers | Sol, climat, plantes compagnes | 3 | 3 |
| 67 | **SOS Agroforesterie** | Intégrer des arbres dans sa parcelle agricole + aides PAC | Agriculteurs | Afac, chambre agriculture | 3 | 3 |
| 68 | **SOS Semences** | Trouver semences paysannes + réseau semenciers + droit | Jardiniers, agriculteurs | RSP, Kokopelli | 2 | 4 |
| 69 | **SOS Soja** | D'où vient le soja de mon alimentation (via élevage) + déforestation | Éducatif | Trase, CIF, IDH | 3 | 3 |
| 70 | **SOS Huile de Palme** | Détecter huile de palme dans produits + alternatives | Consommateurs | Open Food Facts, RSPO | 3 | 4 |
| 71 | **SOS Pêche** | Quels poissons consommer de façon durable + zones de pêche | Consommateurs | IFREMER, MSC, Mr Goodfish | 3 | 4 |
| 72 | **SOS Agriculture Régénérative** | Principes + carte des fermes engagées + résultats carbone | Agriculteurs, curieux | Pour une Agriculture du Vivant | 3 | 3 |

---

### F. TRANSPORT & MOBILITÉ (modules 73-80)

| # | Module | Description | Cible | Données | Impact | Faisabilité |
|---|--------|-------------|-------|---------|--------|-------------|
| 73 | **SOS Mobilité** | Comparateur CO2 de trajets (voiture/train/avion/vélo/bus) | Voyageurs | ADEME, SNCF CO2, Google Directions | 5 | 4 |
| 74 | **SOS Vélo** | Itinéraires cyclables + aides achat vélo + ateliers réparation | Cyclistes | OpenStreetMap, data.gouv.fr vélo | 4 | 4 |
| 75 | **SOS Covoiturage** | Agrégateur covoiturage pour un trajet (BlaBlaCar, Karos, Klaxit) | Automobilistes | APIs covoiturage, data.gouv.fr | 4 | 3 |
| 76 | **SOS Avion** | Impact réel d'un vol + compensation réelle vs greenwashing | Voyageurs | Atmosfair, DGAC | 4 | 5 |
| 77 | **SOS Voiture** | Comparer impact achat véhicule (thermique/hybride/élec) | Acheteurs | ADEME Car Labelling, Carlabelling | 4 | 4 |
| 78 | **SOS Télétravail** | Calculer le CO2 évité par le télétravail + optimiser bureau maison | Salariés | ADEME étude télétravail 2020 | 3 | 5 |
| 79 | **SOS Livraison** | Impact CO2 de mes livraisons + alternatives locales | E-acheteurs | Études ADEME dernière mile | 3 | 4 |
| 80 | **SOS Vacances** | Calculer bilan carbone de mes vacances + alternatives éco | Vacanciers | ADEME, ATR Tourisme durable | 3 | 4 |

---

### G. EAU & OCÉANS (modules 81-88)

| # | Module | Description | Cible | Données | Impact | Faisabilité |
|---|--------|-------------|-------|---------|--------|-------------|
| 81 | **SOS Eau** | Consommation d'eau domestique + plan économies + restrictions | Ménages | data.eaufrance.fr, Propluvia | 5 | 5 |
| 82 | **SOS Sécheresse** | Carte restrictions eau en temps réel + gestes + projections | Tous | Propluvia, Météo-France | 4 | 5 |
| 83 | **SOS Océan** | État de l'océan + plastiques + que faire au quotidien | Littoraux, éducatif | Copernicus Marine, Surfrider | 3 | 4 |
| 84 | **SOS Plage** | Qualité eau de baignade + méduses + algues vertes | Baigneurs | ARS, data.gouv.fr baignade | 3 | 5 |
| 85 | **SOS Inondation** | Risque inondation de mon adresse + préparation + alerte | Riverains | Géorisques, Vigicrues | 4 | 4 |
| 86 | **SOS Rivière** | État écologique de ma rivière + signaler pollution | Riverains | data.eaufrance.fr, SANDRE | 3 | 3 |
| 87 | **SOS Pluie** | Récupération eau de pluie — calculateur + réglementation + ROI | Propriétaires | Météo-France pluvio, réglementation | 3 | 5 |
| 88 | **SOS Eau Virtuelle** | Eau cachée dans mes produits alimentaires + industriels | Éducatif | Water Footprint Network, FAO | 3 | 4 |

---

### H. URBANISME & HABITAT (modules 89-94)

| # | Module | Description | Cible | Données | Impact | Faisabilité |
|---|--------|-------------|-------|---------|--------|-------------|
| 89 | **SOS Artificialisation** | Suivi ZAN (Zéro Artificialisation Nette) de ma commune | Élus, citoyens | OCS GE, data.gouv.fr, Cerema | 4 | 3 |
| 90 | **SOS Végétalisation** | Guide pour végétaliser son balcon/toit/cour + espèces adaptées | Urbains | Données bioclimatiques | 3 | 5 |
| 91 | **SOS Îlot Chaleur** | Cartographier les îlots de chaleur + solutions rafraîchissement | Élus, urbanistes | Copernicus LST, Cerema | 4 | 3 |
| 92 | **SOS Béton** | Alternatives bas carbone pour la construction + calculateur | BTP, architectes | FDES INIES, RE2020 | 3 | 3 |
| 93 | **SOS Toiture Verte** | Guide toiture végétalisée + ROI + réglementation | Propriétaires, copros | ADIVET, études CSTB | 2 | 4 |
| 94 | **SOS Logement Vert** | Score environnemental global de mon logement (énergie + eau + déchets + bio) | Ménages | DPE, ARS, data.gouv.fr | 4 | 3 |

---

### I. NUMÉRIQUE & TECH RESPONSABLE (modules 95-98)

| # | Module | Description | Cible | Données | Impact | Faisabilité |
|---|--------|-------------|-------|---------|--------|-------------|
| 95 | **SOS Numérique** | Empreinte carbone de mon usage digital + plan de sobriété | Tous | ADEME, GreenIT.fr, Shift Project | 4 | 5 |
| 96 | **SOS Email** | Impact de ma boîte mail + nettoyage + désabonnement intelligent | Tous | Études ADEME email | 3 | 4 |
| 97 | **SOS Streaming** | Impact CO2 du streaming vidéo + réglages éco (qualité, WiFi) | Jeunes, tous | Shift Project, IEA | 3 | 5 |
| 98 | **SOS Cloud** | Impact de mon stockage cloud + nettoyage fichiers inutiles | Tous | Études GreenIT | 2 | 4 |

---

### J. JUSTICE CLIMATIQUE & ENGAGEMENT (modules 99-100)

| # | Module | Description | Cible | Données | Impact | Faisabilité |
|---|--------|-------------|-------|---------|--------|-------------|
| 99 | **SOS Climat Justice** | Carte des inégalités climatiques + vulnérabilités par commune | Tous, associations | INSEE, Observatoire inégalités | 3 | 3 |
| 100 | **SOS Engagement** | Trouver une asso/collectif écolo près de chez moi + pétitions | Citoyens motivés | RNA data.gouv.fr, Change.org | 4 | 4 |

---

**TOTAL : 100 modules identifiés couvrant 10 domaines**

Résumé par domaine :

| Domaine | Modules | Impact moyen | Faisabilité moyenne |
|---------|---------|-------------|---------------------|
| Climat & Énergie | 15 | 3.7 | 3.8 |
| Biodiversité & Nature | 15 | 3.1 | 3.5 |
| Pollution & Santé Env. | 18 | 3.6 | 3.8 |
| Déchets & Éco. Circulaire | 12 | 3.5 | 4.3 |
| Alimentation & Agriculture | 12 | 3.3 | 3.8 |
| Transport & Mobilité | 8 | 3.8 | 4.1 |
| Eau & Océans | 8 | 3.5 | 4.3 |
| Urbanisme & Habitat | 6 | 3.3 | 3.5 |
| Numérique & Tech | 4 | 3.0 | 4.5 |
| Justice & Engagement | 2 | 3.5 | 3.5 |

---

## ÉTAPE 2 — Top 20 prioritaires {#etape-2}

### Méthodologie de scoring

Chaque module est évalué sur 4 axes (note de 1 à 5) :

- **Impact** (I) : réduction mesurable d'impact environnemental
- **Faisabilité** (F) : réalisable en solo, données dispo, stack compatible
- **Urgence** (U) : le problème nécessite une réponse immédiate
- **Originalité** (O) : peu ou pas d'outils gratuits équivalents en français

**Score composite** = I x F x U x O (max théorique = 625)

### Classement Top 20

| Rang | Module | I | F | U | O | Score | Domaine |
|------|--------|---|---|---|---|-------|---------|
| 1 | **SOS Carbone** | 5 | 5 | 5 | 4 | **500** | Climat |
| 2 | **SOS Air** | 5 | 5 | 5 | 4 | **500** | Pollution |
| 3 | **SOS Eau Potable** | 5 | 5 | 5 | 4 | **500** | Pollution |
| 4 | **SOS Tri** | 5 | 4 | 5 | 5 | **500** | Déchets |
| 5 | **SOS PFAS** | 5 | 4 | 5 | 5 | **500** | Pollution |
| 6 | **SOS Eau** | 5 | 5 | 5 | 3 | **375** | Eau |
| 7 | **SOS Sécheresse** | 4 | 5 | 5 | 4 | **400** | Eau |
| 8 | **SOS Anti-Gaspi** | 5 | 4 | 4 | 4 | **320** | Alimentation |
| 9 | **SOS Assiette** | 5 | 4 | 4 | 4 | **320** | Alimentation |
| 10 | **SOS Mobilité** | 5 | 4 | 4 | 4 | **320** | Transport |
| 11 | **SOS Compost** | 4 | 5 | 5 | 3 | **300** | Déchets |
| 12 | **SOS Saisons** | 4 | 5 | 3 | 4 | **240** | Alimentation |
| 13 | **SOS Électricité Verte** | 4 | 5 | 4 | 4 | **320** | Énergie |
| 14 | **SOS Numérique** | 4 | 5 | 3 | 4 | **240** | Numérique |
| 15 | **SOS Microplastiques** | 4 | 5 | 4 | 4 | **320** | Pollution |
| 16 | **SOS Précarité Énergie** | 5 | 4 | 5 | 3 | **300** | Énergie |
| 17 | **SOS Forêt** | 5 | 3 | 5 | 4 | **300** | Biodiversité |
| 18 | **SOS Plastique** | 4 | 5 | 4 | 3 | **240** | Déchets |
| 19 | **SOS Biodiversité** | 4 | 4 | 4 | 4 | **256** | Biodiversité |
| 20 | **SOS Engagement** | 4 | 4 | 4 | 4 | **256** | Justice |

### Synthèse des priorités

Les 5 modules du MVP partagent des caractéristiques communes :
- Données ouvertes disponibles immédiatement (ADEME, OpenAQ, ARS, data.gouv.fr)
- Interface simple : formulaire ou géolocalisation -> résultat immédiat
- Impact mesurable et communicable
- Aucun concurrent gratuit complet en français
- Réalisables chacun en 2-5 jours de dev

---

## ÉTAPE 3 — Architecture SOS Planet {#etape-3}

### 3.1 Structure de la homepage

```
SOS PLANET
==========

[Barre de recherche : "Que voulez-vous protéger ?"]

--- Mon Tableau de Bord ---
[Empreinte carbone : XX t CO2]  [Eau : XX L/j]  [Score Planet : XX/100]
[Série : 14 jours]  [Actions réalisées : 42]  [Impact total : X kg CO2]

--- Modules par thème (grille d'icônes) ---

CLIMAT & ÉNERGIE          POLLUTION & SANTÉ
  SOS Carbone               SOS Air
  SOS Énergie               SOS Eau Potable
  SOS Électricité Verte     SOS PFAS
  SOS Rénovation*           SOS Microplastiques
  ...                        ...

DÉCHETS & CIRCULAIRE      ALIMENTATION
  SOS Tri                   SOS Assiette
  SOS Compost               SOS Saisons
  SOS Anti-Gaspi            SOS Circuits Courts
  ...                        ...

TRANSPORT & MOBILITÉ       EAU & OCÉANS
  SOS Mobilité              SOS Eau
  SOS Vélo                  SOS Sécheresse
  SOS Avion                 SOS Plage
  ...                        ...

BIODIVERSITÉ               NUMÉRIQUE
  SOS Biodiversité          SOS Numérique
  SOS Forêt                 SOS Email
  SOS Arbres                SOS Streaming
  ...                        ...

--- Liens écosystème SOS ---
[SOS Animal] [Renov'Intelligence] [SOS Droit] [SOS Agglo]

--- Footer ---
Sources : ADEME, GIEC, data.gouv.fr | Vie privée | Open source
```

### 3.2 Organisation de 50+ modules

**Stratégie de navigation à 3 niveaux** :

1. **Recherche intelligente** : barre de recherche avec autocomplétion sur les 100 modules + synonymes ("eau du robinet" -> SOS Eau Potable)

2. **Navigation par besoin** (6 entrées principales) :
   - "Mon logement" -> Énergie, Rénovation, Eau, Air intérieur, Radon
   - "Mon alimentation" -> Assiette, Saisons, Anti-Gaspi, Labels, Viande
   - "Mes déplacements" -> Mobilité, Vélo, Avion, Covoiturage
   - "Ma santé" -> Air, Eau potable, PFAS, Pesticides, Bruit
   - "Mon quartier" -> Biodiversité locale, Compost, Déchetterie, Bruit
   - "La planète" -> Forêt, Océan, Climat, Glaciers, Engagement

3. **Navigation thématique** : grille d'icônes par domaine (10 domaines, cf. ÉTAPE 1)

### 3.3 Gamification : Score Planet

**Concept central** : chaque utilisateur a un **Score Planet** (0-100) qui évolue avec ses actions.

```
SCORE PLANET : 67/100  [==============------]
Niveau : Colibri Engagé

--- Détail par domaine ---
Énergie :     ████████░░ 78/100
Alimentation: ██████░░░░ 62/100
Transport :   █████░░░░░ 53/100
Déchets :     ████████░░ 81/100
Numérique :   ██████░░░░ 60/100
Eau :         ███████░░░ 72/100
```

**Mécanismes de gamification** :

| Mécanisme | Description | Implémentation |
|-----------|-------------|----------------|
| **Score Planet** | Score composite 0-100 sur 6 domaines | localStorage, calcul côté client |
| **Niveaux** | 10 niveaux (Graine -> Forêt Primaire) | Seuils à 10, 20, 30... 100 |
| **Streaks** | Jours consécutifs avec au moins 1 action | localStorage date check |
| **Défis hebdo** | 1 défi par semaine ("0 plastique lundi") | Rotation automatique |
| **Badges** | 50 badges pour jalons (1er calcul carbone, 100L eau économisés...) | localStorage achievements |
| **Impact cumulé** | Tonnes CO2, litres eau, kg déchets évités | Compteur persistant |
| **Classement commune** | Impact agrégé par code postal (anonymisé) | Cloudflare D1 optionnel |

**Niveaux** :

| Niveau | Seuil | Nom | Icône |
|--------|-------|-----|-------|
| 1 | 0-10 | Graine | semis |
| 2 | 11-20 | Pousse | jeune plante |
| 3 | 21-30 | Bourgeon | bouton floral |
| 4 | 31-40 | Fleur | fleur éclose |
| 5 | 41-50 | Arbuste | buisson |
| 6 | 51-60 | Jeune Arbre | arbre feuillu |
| 7 | 61-70 | Colibri Engagé | oiseau |
| 8 | 71-80 | Gardien de la Forêt | arbre majestueux |
| 9 | 81-90 | Sentinelle de la Terre | globe vert |
| 10 | 91-100 | Forêt Primaire | forêt ancienne |

### 3.4 Liens avec l'écosystème SOS existant

| Projet existant | Lien vers SOS Planet | Module(s) connecté(s) |
|-----------------|---------------------|-----------------------|
| **SOS Animal / SOS Toutou** | Bien-être animal, biodiversité | SOS Biodiversité, SOS Rewilding |
| **SOS Agricole** | Agriculture durable, zoonoses | SOS Agriculture Régénérative, SOS Zoonoses |
| **Renov'Intelligence** | Rénovation énergétique = SOS Rénovation | SOS Énergie, SOS Isolation |
| **SOS Agglo** | Collectivités : plans climat, ZAN | SOS Artificialisation, SOS Îlot Chaleur |
| **SOS Droit** | Droit environnemental, recours | SOS Pesticides, SOS Sites Pollués |
| **SOS Mairies** | Communes : transition écologique | Tous modules "élus" |

### 3.5 Arborescence fichiers

```
site/planet/
  index.html              — Homepage SOS Planet (dashboard, navigation)
  profil.html             — Mon Score Planet, badges, historique

  climat/
    SOS_Carbone.html      — Calculateur empreinte carbone
    SOS_Electricite.html   — Mix électrique temps réel
    SOS_Chaleur.html       — Alertes canicule + îlots fraîcheur

  pollution/
    SOS_Air.html           — Qualité de l'air
    SOS_Eau_Potable.html   — Qualité eau du robinet
    SOS_PFAS.html          — Carte contamination PFAS
    SOS_Microplastiques.html

  dechets/
    SOS_Tri.html           — Guide tri par produit
    SOS_Compost.html       — Guide compostage
    SOS_Anti_Gaspi.html    — Lutte gaspillage alimentaire

  alimentation/
    SOS_Assiette.html      — Impact repas
    SOS_Saisons.html       — Calendrier de saison

  transport/
    SOS_Mobilite.html      — Comparateur CO2 trajets

  eau/
    SOS_Eau.html           — Consommation domestique
    SOS_Secheresse.html    — Restrictions en cours

  biodiversite/
    SOS_Biodiversite.html  — Inventaire local
    SOS_Foret.html         — Suivi déforestation

  numerique/
    SOS_Numerique.html     — Empreinte digitale

  assets/
    css/planet.css         — Design system partagé
    js/score-planet.js     — Moteur de gamification
    js/data-fetcher.js     — Abstraction API calls
    icons/                 — Icônes SVG par module

  sw.js                    — Service Worker PWA
  manifest.json            — PWA manifest
```

---

## ÉTAPE 4 — Les 5 premiers modules à construire {#etape-4}

---

### MODULE 1 : SOS Carbone

**Score** : 500/625 | **Priorité** : Pilier central de la plateforme

#### Description

Calculateur d'empreinte carbone personnelle annuelle avec plan de réduction concret. L'utilisateur répond à 20-30 questions simples sur son mode de vie (logement, transport, alimentation, consommation, numérique) et obtient :

- Son empreinte en tonnes CO2eq/an
- La comparaison avec la moyenne française (8.9 t) et l'objectif 2050 (2 t)
- Un plan de réduction personnalisé avec les 5 actions les plus impactantes
- Un suivi dans le temps (refaire le calcul chaque mois)

#### Ce qui le rend unique

- **Gratuit** (Nos Gestes Climat de l'ADEME est bien mais peu connu)
- **Intégré** à SOS Planet : chaque action de réduction renvoie vers un module spécifique
- **Plan d'action personnalisé** : pas juste un chiffre, mais un parcours
- **Suivi temporel** : localStorage pour voir son évolution mois par mois
- **Partage** : générer une image partageable sur les réseaux

#### Sources de données

- ADEME Base Carbone (facteurs d'émission, gratuit, API disponible)
- Nos Gestes Climat (modèle open source, publicodes)
- Our World in Data (comparaisons internationales)
- INSEE (moyennes françaises par catégorie)

#### Wireframe textuel

```
PAGE 1 : Introduction
  "Calculez votre empreinte carbone en 5 minutes"
  [Commencer] / [Voir mon dernier résultat]
  Infographie : "Un Français émet 8.9 t CO2/an. Objectif 2050 : 2 t."

PAGE 2-6 : Questionnaire (5 sections, 4-6 questions chacune)

  Section 1 — Logement
    Type (appart/maison), surface, nb personnes
    Chauffage (gaz/élec/fioul/bois/PAC), conso kWh si connue
    DPE si connu (A-G)
    Électroménager

  Section 2 — Transport
    Voiture (km/an, motorisation, seul/covoiturage)
    Transports en commun (fréquence)
    Avion (nb vols court/moyen/long courrier)
    Vélo/marche

  Section 3 — Alimentation
    Régime (omnivore/flexitarien/végétarien/vegan)
    Fréquence viande rouge, volaille, poisson
    Local/saison ou import/hors-saison
    Gaspillage estimé

  Section 4 — Consommation
    Achats vêtements/an
    Électronique (smartphone, ordi, TV, achats/an)
    Mobilier
    Loisirs (streaming, sport, culture)

  Section 5 — Services publics
    Part incompressible (hôpitaux, routes, armée...)
    Affichée automatiquement (~1.5 t)

PAGE 7 : Résultats
  VOTRE EMPREINTE : 7.2 t CO2eq/an

  [Barre segmentée colorée]
  Logement: 2.1t | Transport: 2.3t | Alimentation: 1.8t | Conso: 0.5t | Services: 1.5t

  Comparaison visuelle :
  Vous --------- 7.2 t
  Moy. France --- 8.9 t
  Objectif 2050 - 2.0 t

  Tendance vs dernier calcul : -0.4 t (bravo !)

PAGE 8 : Plan d'action
  VOS 5 ACTIONS LES PLUS IMPACTANTES :

  1. Remplacer 2 vols moyen-courrier par le train → -1.2 t [→ SOS Mobilité]
  2. Réduire viande rouge à 1x/semaine → -0.6 t [→ SOS Assiette]
  3. Isoler les combles → -0.4 t [→ SOS Rénovation]
  4. Couper le chauffage 1°C → -0.3 t [→ SOS Énergie]
  5. Acheter reconditionné → -0.2 t [→ SOS Électronique]

  TOTAL POTENTIEL : -2.7 t → vous passeriez à 4.5 t !

  [Sauvegarder] [Partager] [Refaire dans 1 mois]
```

#### Pages HTML : 2 (questionnaire + résultats, SPA-like avec sections)

---

### MODULE 2 : SOS Air

**Score** : 500/625 | **Priorité** : Santé immédiate des utilisateurs

#### Description

Qualité de l'air en temps réel autour de l'utilisateur. Géolocalisation ou saisie d'adresse, puis affichage de l'indice ATMO, des polluants (PM2.5, PM10, NO2, O3), des alertes en cours, et des conseils santé personnalisés (asthmatiques, sportifs, enfants, personnes âgées).

#### Ce qui le rend unique

- **Alertes push** : notification PWA quand la qualité se dégrade
- **Conseils personnalisés** selon profil santé (asthme, BPCO, grossesse)
- **Historique** : voir l'évolution sur 7/30/365 jours
- **Carte interactive** avec les stations de mesure
- **Lien causal** : sources de pollution identifiées (trafic, industrie, chauffage)

#### Sources de données

- **OpenAQ** (API gratuite, données mondiales temps réel)
- **Atmo France** / PREV'AIR (prévisions J+1, J+2)
- **Copernicus CAMS** (modèles européens)
- **data.gouv.fr** (historiques stations)

#### Wireframe textuel

```
PAGE 1 : Dashboard Air
  [Géolocaliser] ou [Saisir adresse : ________]

  === QUALITÉ DE L'AIR ===
  Station : Paris 13e — Arts et Métiers
  Indice ATMO : 6/10 — DÉGRADÉ
  Mise à jour : il y a 23 min

  [Jauge circulaire colorée : vert → rouge]

  Polluants détaillés :
  PM2.5 : 28 µg/m³ [████████░░] Élevé
  PM10  : 35 µg/m³ [███████░░░] Moyen
  NO2   : 42 µg/m³ [████████░░] Élevé
  O3    : 18 µg/m³ [███░░░░░░░] Bon

  CONSEIL AUJOURD'HUI :
  "Limitez les activités sportives en extérieur.
   Fenêtres fermées entre 14h et 18h (pic d'ozone).
   Si vous êtes asthmatique, gardez votre ventoline."

  [Mon profil santé] [Historique] [Alertes]

PAGE 2 : Carte
  Carte OpenStreetMap avec stations de mesure
  Code couleur ATMO
  Clic station → détail

PAGE 3 : Historique
  Graphique 7j / 30j / 1an
  "En mars 2026, Paris a eu 8 jours de mauvaise qualité"

PAGE 4 : Profil santé
  Checkbox : asthme, BPCO, allergie pollens, grossesse, +65 ans, enfant -6 ans
  → Ajuste les seuils d'alerte et les conseils
```

#### Pages HTML : 1 (SPA avec onglets) + carte

---

### MODULE 3 : SOS Eau Potable

**Score** : 500/625 | **Priorité** : Santé quotidienne, données très riches

#### Description

Qualité de l'eau du robinet de l'utilisateur. Saisie du code postal ou de la commune, puis affichage des dernières analyses ARS : conformité globale, nitrates, pesticides, plomb, calcaire, chlore, bactéries. Comparaison avec les normes. Recommandations : boire du robinet ou précautions.

#### Ce qui le rend unique

- **Données ARS réelles** (pas de généralisation)
- **Historique des analyses** sur 3 ans
- **Alertes non-conformité** automatiques
- **Guide "faut-il filtrer ?"** selon les résultats réels
- **Comparaison eau robinet vs eau en bouteille** (coût + environnement)

#### Sources de données

- **data.eaufrance.fr** (résultats contrôles sanitaires ARS, API)
- **SISE-Eaux** (base nationale qualité eau potable)
- **data.gouv.fr** (UDI — Unités de Distribution)

#### Wireframe textuel

```
PAGE 1 : Recherche
  "Quelle est la qualité de votre eau du robinet ?"
  [Code postal : _____] [Commune : ___________]
  [Rechercher]

PAGE 2 : Résultats
  === EAU DU ROBINET — PARIS 13E ===
  Réseau : Eau de Paris — Usine d'Orly
  Dernier contrôle : 15/03/2026

  CONFORMITÉ GLOBALE : CONFORME ✓

  Paramètre         | Valeur   | Norme    | Statut
  Nitrates           | 22 mg/L  | < 50     | OK
  Pesticides totaux  | 0.08 µg/L| < 0.5   | OK
  Plomb              | < 5 µg/L | < 10     | OK
  Dureté (calcaire)  | 28°f     | —        | Eau dure
  Chlore résiduel    | 0.15 mg/L| < 0.3   | OK
  Fluor              | 0.2 mg/L | < 1.5   | OK
  Bactério (E.coli)  | 0 /100mL | 0        | OK

  VERDICT :
  "Votre eau est de bonne qualité. Pas besoin de filtre.
   L'eau est calcaire : un adoucisseur protège vos appareils
   mais n'améliore pas la santé."

  COMPARAISON :
  Eau du robinet : 0.004 €/L, 0 déchet plastique
  Eau en bouteille : 0.30 €/L, 8 kg plastique/an
  → Économie : 230 €/an et 8 kg plastique évités

PAGE 3 : Historique
  Graphique nitrates / pesticides sur 3 ans
  "Les nitrates sont stables depuis 2023."

PAGE 4 : Guide filtration
  Carafe filtrante : quand utile, quand inutile
  Osmose inverse : pour qui
  UV : usage
  "Dans votre cas : non nécessaire"
```

#### Pages HTML : 1 (SPA)

---

### MODULE 4 : SOS Tri

**Score** : 500/625 | **Priorité** : Geste quotidien, impact immédiat

#### Description

L'utilisateur saisit un produit (ou scanne un code-barres) et obtient instantanément : dans quelle poubelle le mettre selon les **consignes de sa commune** (qui varient en France), et ce que devient ce déchet après collecte.

#### Ce qui le rend unique

- **Consignes locales** : le tri varie selon les communes (extension des consignes de tri), l'app s'adapte au code postal
- **Recherche textuelle + code-barres** (via caméra)
- **Parcours du déchet** : pédagogique ("votre bouteille PET devient un pull polaire")
- **Gamification** : compteur de déchets bien triés

#### Sources de données

- **Citeo** (consignes de tri par commune, base publique)
- **Open Food Facts** (données emballage, code-barres)
- **ADEME** (guide du tri, base déchets)
- **data.gouv.fr** (périmètre collecte par EPCI)

#### Wireframe textuel

```
PAGE 1 : Recherche
  "Où jeter ce déchet ?"
  [_________ ex: pot de yaourt, pile, ampoule]
  [Scanner code-barres] [Mon code postal : _____]

PAGE 2 : Résultat
  === POT DE YAOURT ===

  À [Paris 13e] :
  → POUBELLE JAUNE (bac de tri)
  Depuis 2023, TOUS les emballages vont dans le bac jaune.

  Consigne : vide, pas besoin de rincer

  Ce qui se passe ensuite :
  Collecte → Centre de tri Ivry → Recyclage plastique PP
  → Devient : pot de fleur, pare-choc voiture, mobilier urbain

  Taux de recyclage du PP en France : 28%
  Si tout le monde triait : on passerait à 65%

  [Autre déchet] [Partager]

PAGE 3 : Déchets spéciaux
  Piles → points de collecte (carte)
  Médicaments → pharmacie
  Textiles → bornes Le Relais (carte)
  Électronique → déchetterie ou magasin
  Peinture → déchetterie (DDS)

PAGE 4 : Ma déchetterie
  [Géolocaliser]
  Déchetterie de Ivry-sur-Seine
  Horaires : Lun-Sam 8h30-17h30
  Accepte : encombrants, DEEE, DDS, gravats, végétaux
  [Itinéraire]
```

#### Pages HTML : 2 (recherche + déchets spéciaux/déchetterie)

---

### MODULE 5 : SOS Sécheresse

**Score** : 400/625 | **Priorité** : Urgence climatique immédiate en France

#### Description

État des restrictions d'eau en temps réel pour la commune de l'utilisateur. Niveau d'alerte (vigilance, alerte, alerte renforcée, crise), gestes obligatoires et recommandés, prévisions, et calculateur d'économies d'eau au quotidien.

#### Ce qui le rend unique

- **Temps réel** via l'API Propluvia (arrêtés préfectoraux en vigueur)
- **Géolocalisation** : restrictions exactes de MA commune
- **Ce que j'ai le droit de faire** : arrosage, piscine, lavage voiture (varie selon niveau)
- **Calculateur eau** : combien j'économise avec chaque geste
- **Prévisions** : projection sécheresse basée sur Météo-France

#### Sources de données

- **Propluvia** (data.gouv.fr — arrêtés sécheresse en vigueur, API)
- **Météo-France** (prévisions pluviométrie)
- **BRGM** (niveaux nappes phréatiques, piézomètres)
- **data.eaufrance.fr** (débits rivières)

#### Wireframe textuel

```
PAGE 1 : Dashboard Sécheresse
  [Géolocaliser] ou [Commune : ___________]

  === RESTRICTIONS D'EAU — MONTPELLIER ===
  Arrêté : n°2026-XXX du 15/03/2026
  Niveau : ALERTE RENFORCÉE (orange)
  Zone : Bassin du Lez

  [Barre : Vigilance → Alerte → Alerte renforcée → CRISE]
                                    ▲ Vous êtes ici

  CE QUE VOUS DEVEZ FAIRE :
  ✗ Arrosage jardin : INTERDIT (sauf potager 20h-8h)
  ✗ Lavage voiture : INTERDIT (sauf stations pro)
  ✗ Remplissage piscine : INTERDIT
  ✓ Arrosage potager : autorisé 20h-8h
  ✓ Douche : autorisé (économisez !)

  NAPPES PHRÉATIQUES :
  Niveau : -1.2m sous la normale saisonnière
  Tendance : ↓ en baisse depuis 45 jours

PAGE 2 : Économies d'eau
  CALCULATEUR — Ma consommation quotidienne

  Douche 5 min au lieu de 10 : -65 L/jour [→ SOS Eau]
  Chasse d'eau double touche : -30 L/jour
  Mousseur robinets : -20 L/jour
  Récupérateur eau de pluie : -50 L/jour [→ SOS Pluie]

  TOTAL ÉCONOMISABLE : 165 L/jour = 60 m³/an = 240 €/an

PAGE 3 : Carte nationale
  France colorée par niveau de restriction
  Clic département → détail zones

PAGE 4 : Historique & Prévisions
  "En 2025, votre commune a été en restriction 87 jours.
   Projection 2026 : 100+ jours probables."
```

#### Pages HTML : 2 (dashboard + carte nationale)

---

### Récapitulatif Module MVP

| Module | Pages HTML | APIs | Complexité | Jours dev estimés |
|--------|-----------|------|------------|-------------------|
| SOS Carbone | 2 | ADEME Base Carbone | Moyenne | 5 |
| SOS Air | 1 (+carte) | OpenAQ, PREV'AIR | Moyenne | 4 |
| SOS Eau Potable | 1 | data.eaufrance.fr | Facile | 3 |
| SOS Tri | 2 | Citeo, Open Food Facts | Moyenne | 4 |
| SOS Sécheresse | 2 | Propluvia, BRGM | Facile | 3 |
| **TOTAL** | **8** | **7 APIs** | — | **19 jours** |

---

## ÉTAPE 5 — Vision monétisation {#etape-5}

### 5.1 Principe fondateur : le B2C reste 100% gratuit

> **Règle absolue** : tout ce qui est accessible au citoyen reste gratuit, sans publicité, sans tracking, sans mur de paiement. C'est la mission. C'est non-négociable.

### 5.2 Ce qui est gratuit (B2C)

| Élément | Détail |
|---------|--------|
| Tous les 100 modules | Accès illimité, pas de compte requis |
| Score Planet | Gamification complète, gratuite |
| Données personnelles | Stockées en localStorage, jamais sur nos serveurs |
| Alertes push | Qualité air, sécheresse, canicule |
| Export PDF | Rapports d'impact personnels |
| PWA offline | Installation gratuite |

### 5.3 Ce qui peut être vendu (B2B / Collectivités)

| Offre | Cible | Prix indicatif | Description |
|-------|-------|---------------|-------------|
| **SOS Planet Collectivité** | Mairies, EPCI, Régions | 2 000-10 000 EUR/an | Dashboard agrégé : empreinte du territoire, modules intégrés au site communal, rapports PCAET |
| **SOS Planet Entreprise** | PME, ETI, Grands groupes | 5 000-50 000 EUR/an | Bilan carbone simplifié Scope 1+2, engagement RSE collaborateurs, reporting CSRD simplifié |
| **SOS Planet Éducation** | Écoles, collèges, lycées | 500-2 000 EUR/an | Version pédagogique, quiz, parcours classe, dashboard enseignant |
| **SOS Planet Immobilier** | Agences, promoteurs | 1 000-5 000 EUR/an | Score environnemental logement pour annonces (air + eau + bruit + énergie + nature) |
| **API SOS Planet** | Développeurs, startups | 0-500 EUR/mois | API RESTful : données agrégées (qualité air, eau, restrictions, score carbone) |
| **White label** | Banques, assurances, mutuelles | 20 000-100 000 EUR/an | SOS Planet intégré dans l'app bancaire/assurance avec branding client |
| **Rapports d'impact** | Fondations, ONG | 5 000-20 000 EUR | Rapport sur mesure : impact d'un programme, d'une campagne |
| **Formation** | Entreprises, collectivités | 1 500-3 000 EUR/j | Atelier "Transition écologique avec SOS Planet" |

### 5.4 Modèle de revenus projeté

| Année | B2C | B2B Collectivités | B2B Entreprises | B2B Éducation | Total |
|-------|-----|-------------------|-----------------|---------------|-------|
| Y1 | 0 EUR | 20 000 EUR | 30 000 EUR | 5 000 EUR | 55 000 EUR |
| Y2 | 0 EUR | 80 000 EUR | 150 000 EUR | 25 000 EUR | 255 000 EUR |
| Y3 | 0 EUR | 200 000 EUR | 500 000 EUR | 80 000 EUR | 780 000 EUR |

### 5.5 Partenariats potentiels

#### Associations & ONG

| Partenaire | Type de partenariat | Intérêt mutuel |
|------------|-------------------|----------------|
| **WWF France** | Co-branding modules biodiversité | Audience + crédibilité scientifique |
| **Greenpeace France** | Données campagnes + diffusion | Outils concrets pour leurs militants |
| **FNH (Nicolas Hulot)** | Référencement, label | Visibilité + réseau collectivités |
| **LPO** | Données oiseaux pour SOS Oiseaux | Outil citoyen science participative |
| **Surfrider** | Données océan/plage | Module SOS Océan co-construit |
| **Zero Waste France** | Contenu SOS Tri, SOS Plastique | Outil militant + pédagogique |
| **France Nature Environnement** | Réseau 6000 assos locales | Distribution massive |

#### Institutions publiques

| Institution | Partenariat | Intérêt |
|-------------|------------|---------|
| **ADEME** | Données + co-financement + label | Ils cherchent des outils citoyens |
| **Ministère Transition Écologique** | Référencement, label, financement | Objectifs Plan Climat |
| **Météo-France** | Données climat + prévisions | Innovation usage données publiques |
| **OFB** (Biodiversité) | Données + label | Outils science participative |
| **BRGM** | Données sol, eau, géothermie | Valorisation données publiques |
| **ARS** | Données eau, air, santé | Prévention santé environnementale |
| **Cerema** | Urbanisme, mobilité | Outils collectivités |
| **INSEE** | Données socio-économiques | Croisement données environnement + social |

#### International

| Organisation | Partenariat | Intérêt |
|-------------|------------|---------|
| **PNUE / UNEP** | Label, référencement mondial | Outil duplicable dans d'autres pays |
| **GIEC / IPCC** | Données, caution scientifique | Vulgarisation données GIEC |
| **FAO** | Données alimentation mondiale | Modules alimentation durable |
| **WHO** | Données santé environnementale | Modules pollution, zoonoses |
| **European Environment Agency** | Données européennes, label | Extension EU |

### 5.6 Subventions et financements

| Programme | Montant | Éligibilité | Deadline |
|-----------|---------|-------------|----------|
| **France 2030 — Numérique responsable** | 50K-500K EUR | Startups/assos tech green | En continu |
| **BPI France — Bourse French Tech** | 30K EUR | Premier financement, pas de remboursement | En continu |
| **BPI France — Aide Innovation** | 200K-2M EUR | Projet innovant R&D | En continu |
| **ADEME — Agir pour la Transition** | 10K-200K EUR | Projets transition écologique | AAP réguliers |
| **Fondation de France** | 10K-50K EUR | Projets environnement | Annuel |
| **Europe — LIFE Programme** | 500K-5M EUR | Projets environnement, climat | AAP annuel |
| **Europe — Horizon Europe** | 100K-2M EUR | Recherche & innovation | AAP annuel |
| **Région Île-de-France — PM'Up** | 30K-250K EUR | PME innovantes | Trimestriel |
| **Fondation Veolia** | 10K-100K EUR | Accès eau, déchets, énergie | En continu |
| **Google.org Impact Challenge** | 50K-500K EUR | Tech for good | Annuel |
| **Patagonia Environmental Grants** | 5K-20K EUR | Associations environnement | Biannuel |

### 5.7 Structure juridique recommandée

**Option recommandée : Association loi 1901 + filiale SAS pour le B2B**

- L'association porte la mission (B2C gratuit, partenariats ONG, subventions)
- La SAS porte l'activité commerciale (B2B, API, white label)
- L'association est actionnaire majoritaire de la SAS (modèle ESS)
- Avantages : éligibilité subventions + crédibilité mission + capacité commerciale

---

## ÉTAPE 6 — Impact mesurable {#etape-6}

### 6.1 KPIs environnementaux

> Chaque module doit produire un **impact mesurable** qui s'agrège au niveau plateforme.

| KPI | Module(s) source | Méthode de calcul | Objectif Y1 |
|-----|-----------------|-------------------|-------------|
| **Tonnes CO2 évitées** | SOS Carbone, Mobilité, Assiette, Énergie | Différence avant/après action × nb utilisateurs | 500 t CO2 |
| **Litres d'eau économisés** | SOS Eau, Sécheresse | Réduction conso estimée × nb utilisateurs | 50M litres |
| **Kg déchets évités** | SOS Tri, Anti-Gaspi, Plastique, Compost | Déchets détournés × nb utilisateurs | 100 000 kg |
| **Alertes pollution** | SOS Air, Eau Potable, PFAS | Nb alertes déclenchées (santé protégée) | 10 000 alertes |
| **Arbres protégés/plantés** | SOS Forêt, Arbres, Haies | Signalements → actions concrètes | 1 000 arbres |
| **Espèces documentées** | SOS Biodiversité, Oiseaux | Observations contributives | 50 000 obs |
| **kWh économisés** | SOS Énergie, Électricité Verte | Réduction conso post-diagnostic | 2M kWh |
| **Km voiture évités** | SOS Mobilité, Vélo, Covoiturage | Reports modaux calculés | 500 000 km |

### 6.2 KPIs utilisateurs

| Métrique | Définition | Objectif Y1 | Objectif Y3 |
|----------|-----------|-------------|-------------|
| **Utilisateurs uniques** | Visiteurs distincts/mois | 50 000/mois | 500 000/mois |
| **PWA installées** | Installations de l'app | 5 000 | 100 000 |
| **Modules utilisés/user** | Moyenne modules consultés | 2.5 | 4.0 |
| **Score Planet moyen** | Score moyen des utilisateurs actifs | 35/100 | 55/100 |
| **Streak moyen** | Jours consécutifs d'engagement | 3 jours | 12 jours |
| **Taux de retour J+7** | % users revenant après 7 jours | 15% | 30% |
| **Taux de retour J+30** | % users revenant après 30 jours | 5% | 15% |
| **Actions réalisées** | Gestes éco cochés dans l'app | 100 000 | 2 000 000 |
| **Partages sociaux** | Résultats partagés (image) | 10 000 | 200 000 |
| **NPS** | Net Promoter Score | 40+ | 60+ |

### 6.3 Rapports d'impact automatiques

**Rapport individuel** (généré en PDF, côté client) :

```
RAPPORT D'IMPACT PERSONNEL — Mars 2026
Utilisateur : Jean D. (anonymisé)
Score Planet : 67/100 (+5 ce mois)
Streak : 14 jours

Ce mois, grâce à vos actions :
  - 120 kg CO2 évités (train au lieu d'avion Paris-Lyon)
  - 3 000 L d'eau économisés (douches courtes + mousseurs)
  - 8 kg déchets plastique évités (gourde + vrac)
  - 15 kg alimentaire non gaspillés (planification repas)

Depuis votre inscription :
  - Total : 0.8 t CO2 évitées
  - Équivalent : 4 000 km en voiture
  - Rang commune : top 12% des utilisateurs

Prochains objectifs :
  1. Atteindre Score 70 → Niveau "Gardien de la Forêt"
  2. Essayer SOS Compost (non encore utilisé)
  3. Défi mars : 1 semaine végétarienne
```

**Rapport collectivité** (pour les clients B2B) :

```
RAPPORT D'IMPACT — Commune de Montpellier — T1 2026
Utilisateurs actifs : 3 200
Score Planet moyen : 52/100

Impact agrégé :
  - 45 t CO2 évitées par les habitants
  - 800 000 L d'eau économisés
  - 12 000 kg déchets détournés de l'enfouissement
  - 89% conformité tri (vs 67% moyenne nationale)

Benchmarks :
  - Montpellier : 52/100
  - Moyenne villes 250k+ : 45/100
  - Meilleure ville France : 68/100 (Grenoble)

Recommandations PCAET :
  1. Transport = premier poste (2.8 t/hab) → développer pistes cyclables
  2. 34% des habitants ne trient pas le verre → campagne ciblée
  3. 12% en précarité énergétique → renforcer aide rénovation
```

### 6.4 Tableau de bord d'impact global

Visible sur la homepage de SOS Planet (données agrégées anonymisées) :

```
=== IMPACT SOS PLANET — EN DIRECT ===

Depuis le lancement :
  🌍 1 247 tonnes CO2 évitées
  💧 180 millions litres d'eau économisés
  ♻️  890 000 kg de déchets bien triés
  🌳 2 340 arbres signalés et protégés
  🚲 1.2 million km voiture évités
  👥 127 000 citoyens engagés

Aujourd'hui :
  📊 4 200 calculs d'empreinte carbone
  🌬️ 12 000 consultations qualité de l'air
  💧 8 500 vérifications eau potable
```

### 6.5 Méthodologie de mesure

| Principe | Application |
|----------|-------------|
| **Conservatisme** | Toujours prendre l'hypothèse basse (facteur 0.5 sur les impacts déclarés) |
| **Additionnalité** | Ne compter que les actions nouvelles (pas ce que l'user faisait déjà) |
| **Facteurs ADEME** | Utiliser les facteurs d'émission officiels Base Carbone |
| **Transparence** | Méthodologie publiée, code open source, données vérifiables |
| **Pas de double comptage** | Un geste = un impact, même s'il touche plusieurs modules |
| **Validation externe** | Audit annuel par un tiers (cabinet spécialisé bilan carbone) |

---

## Annexes — Sources de données {#annexes}

### APIs et datasets gratuits identifiés

| Source | Type | URL / Accès | Modules concernés |
|--------|------|------------|-------------------|
| **ADEME Base Carbone** | Facteurs émission | data.ademe.fr | Carbone, Mobilité, Assiette, Énergie |
| **ADEME Agribalyse** | Impact environnemental aliments | agribalyse.ademe.fr | Assiette, Anti-Gaspi, Viande |
| **OpenAQ** | Qualité air temps réel | api.openaq.org (gratuit) | Air |
| **Atmo France / PREV'AIR** | Prévisions qualité air | prevair.ineris.fr | Air |
| **data.eaufrance.fr** | Qualité eau, débits, nappes | hubeau.eaufrance.fr (API REST) | Eau Potable, Sécheresse, Rivière |
| **Propluvia** | Restrictions sécheresse | propluvia.developpement-durable.gouv.fr | Sécheresse |
| **data.gouv.fr** | Open data France | data.gouv.fr (API) | Multiples |
| **Electricity Maps** | Mix électrique temps réel | electricitymaps.com (API free tier) | Électricité Verte |
| **RTE éCO2mix** | Production élec France | rte-france.com/eco2mix | Électricité Verte, Énergie |
| **Copernicus C3S** | Données climatiques | climate.copernicus.eu | Climat Local, Chaleur |
| **Copernicus CAMS** | Qualité air Europe | atmosphere.copernicus.eu | Air |
| **Copernicus Marine** | Données océaniques | marine.copernicus.eu | Océan |
| **Global Forest Watch** | Déforestation | globalforestwatch.org (API) | Forêt |
| **FIRMS (NASA)** | Feux de forêt temps réel | firms.modaps.eosdis.nasa.gov | Forêt |
| **GBIF** | Biodiversité mondiale | gbif.org (API gratuite) | Biodiversité, Invasives |
| **INPN** | Biodiversité France | inpn.mnhn.fr | Biodiversité, Zones Humides |
| **Open Food Facts** | Données produits alimentaires | world.openfoodfacts.org (API) | Tri, Anti-Gaspi, Labels, Huile Palme |
| **OpenStreetMap** | Cartographie | openstreetmap.org | Déchetterie, Vrac, Vélo, Circuits Courts |
| **Géorisques** | Risques naturels | georisques.gouv.fr (API) | Inondation, Sites Pollués, Radon |
| **BRGM InfoTerre** | Géologie, sols, nappes | infoterre.brgm.fr | Géothermie, Sols, Sécheresse |
| **Météo-France** | Prévisions, données climat | donneespubliques.meteofrance.fr | Chaleur, Sécheresse, Climat |
| **INSEE** | Données socio-économiques | insee.fr (API) | Justice Climatique, Précarité |
| **PVGIS (EU)** | Potentiel solaire | re.jrc.ec.europa.eu/pvg_tools | Solaire |
| **Our World in Data** | Données mondiales compilées | ourworldindata.org | Tous (contexte, comparaisons) |
| **NASA Earthdata** | Données satellite | earthdata.nasa.gov | Forêt, Glaciers, Désertification |
| **IPCC / GIEC** | Rapports climatiques | ipcc.ch | Climat (textes, données) |
| **FAO** | Agriculture, pêche, forêt mondiale | fao.org/faostat | Alimentation, Pêche, Forêt |
| **WHO** | Santé environnementale | who.int | Zoonoses, AMR, Pollution |
| **Forever Pollution Project** | Carte PFAS Europe | foreverpollution.eu | PFAS |
| **Citeo** | Consignes de tri | triercestdonner.fr | Tri |
| **ANFR Cartoradio** | Antennes télécom | cartoradio.fr | Ondes |
| **ANPCEN** | Pollution lumineuse | anpcen.fr | Lumière |

### Contacts clés à établir

| Contact | Organisme | Objet | Priorité |
|---------|-----------|-------|----------|
| Direction numérique | ADEME | Accès API + partenariat | Haute |
| Service open data | Météo-France | Conditions utilisation | Haute |
| Etalab | data.gouv.fr | Référencement plateforme | Moyenne |
| Bureau transition | Ministère Écologie | Label, financement | Moyenne |
| Programme startups | BPI France | Bourse French Tech | Haute |
| Direction innovation | BRGM | Données sols + nappes | Moyenne |
| Programme partenaires | Open Food Facts | Intégration API | Haute |

---

## Calendrier prévisionnel

| Phase | Période | Livrables |
|-------|---------|-----------|
| **Phase 0 — Fondation** | Avril 2026 | Ce document, wireframes, identité visuelle, repo GitHub |
| **Phase 1 — MVP 5 modules** | Mai 2026 | SOS Carbone + Air + Eau Potable + Tri + Sécheresse |
| **Phase 2 — Gamification** | Juin 2026 | Score Planet, badges, streaks, profil utilisateur |
| **Phase 3 — 10 modules** | Juil-Août 2026 | +5 modules (Assiette, Mobilité, Anti-Gaspi, Compost, Numérique) |
| **Phase 4 — 20 modules** | Sept-Oct 2026 | +10 modules (Énergie, Biodiversité, PFAS, etc.) |
| **Phase 5 — B2B** | Nov-Déc 2026 | Dashboard collectivités, API, premiers clients |
| **Phase 6 — Scale** | 2027 | 50+ modules, partenariats ONG, financement, i18n |

---

## Conclusion

SOS Planet n'est pas un projet de plus. C'est l'aboutissement logique de l'écosystème SOS : après avoir aidé les animaux (SOS Animal), les citoyens (SOS Droit), les mélomanes (SOS Solfège), les propriétaires (Renov'Intelligence), les communes (SOS Agglo) — on aide la planète.

La force du projet tient en trois mots :

1. **Données ouvertes** : tout est basé sur des sources publiques, vérifiables, gratuites
2. **Action immédiate** : chaque module transforme une information en geste concret
3. **Impact mesurable** : chaque geste est quantifié, agrégé, visible

Avec 100 modules identifiés, 20 prioritaires, 5 prêts à construire, et un modèle économique viable sans jamais trahir la gratuité citoyenne — SOS Planet a tout pour devenir la référence francophone de l'action environnementale individuelle et collective.

---

*Document fondateur — Version 1.0 — 22 mars 2026*
*Emmanuel Klein — Architecte SOS Planet*
