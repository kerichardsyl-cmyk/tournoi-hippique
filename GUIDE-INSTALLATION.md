# 🏇 GUIDE D'INSTALLATION — Tournoi Hippique V1
## Temps estimé : 30 à 45 minutes

---

## 📦 CE QUE VOUS AVEZ REÇU

```
tournoi-hippique/
├── public/
│   ├── index.html          ← L'application complète
│   └── firebase-config.js  ← À REMPLIR avec vos clés Firebase
├── netlify/
│   └── functions/
│       └── pmu-proxy.js    ← Proxy pour l'API PMU
├── netlify.toml            ← Configuration Netlify
├── package.json            ← Dépendances
└── GUIDE-INSTALLATION.md   ← Ce fichier
```

---

## ÉTAPE 1 — Créer votre base de données Firebase (gratuit)

Firebase est le service Google qui permet aux 2 joueurs de se synchroniser en temps réel.

### 1.1 — Créer le projet Firebase

1. Allez sur **https://console.firebase.google.com**
2. Connectez-vous avec un compte Google (Gmail)
3. Cliquez sur **"Créer un projet"**
4. Donnez-lui un nom : `tournoi-hippique` (ou ce que vous voulez)
5. Désactivez Google Analytics (pas nécessaire) → **Créer le projet**
6. Attendez 30 secondes que le projet se crée → Cliquez **Continuer**

### 1.2 — Activer la base de données Realtime

1. Dans le menu gauche, cliquez **"Compilez"** → **"Realtime Database"**
2. Cliquez **"Créer une base de données"**
3. Choisissez la région **"Europe-west1 (Belgique)"** → **Suivant**
4. Choisissez **"Commencer en mode test"** → **Activer**

> ⚠️ Le mode test est public pendant 30 jours — suffisant pour tester. On verra ensuite comment sécuriser.

### 1.3 — Récupérer vos clés de configuration

1. Cliquez sur l'icône ⚙️ (engrenage) en haut à gauche → **"Paramètres du projet"**
2. Descendez jusqu'à la section **"Vos applications"**
3. Cliquez sur l'icône **`</>`** (Web)
4. Donnez un nom : `tournoi-hippique-web` → **Enregistrer l'application**
5. Vous voyez apparaître un bloc de code avec vos clés. Gardez cette page ouverte.

---

## ÉTAPE 2 — Remplir le fichier de configuration

Ouvrez le fichier `public/firebase-config.js` avec un éditeur de texte (Notepad sur Windows, TextEdit sur Mac).

Remplacez chaque valeur `"VOTRE_..."` par les valeurs que vous voyez sur la page Firebase.

**Exemple de ce que vous devrez remplir :**

```javascript
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAbc123...",           ← votre apiKey
  authDomain: "tournoi-hippique.firebaseapp.com",
  databaseURL: "https://tournoi-hippique-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tournoi-hippique",
  storageBucket: "tournoi-hippique.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

> 💡 La valeur `databaseURL` se trouve dans l'onglet "Realtime Database" de Firebase, 
> c'est l'URL affichée en haut de la page (commence par https://).

Sauvegardez le fichier.

---

## ÉTAPE 3 — Déployer sur Netlify (gratuit)

Netlify va héberger votre application et lui donner une URL accessible depuis n'importe quel appareil.

### 3.1 — Créer un compte Netlify

1. Allez sur **https://www.netlify.com**
2. Cliquez **"Sign up"** → Connectez-vous avec votre compte Google (le même que Firebase, c'est plus simple)

### 3.2 — Déployer votre application

**Option la plus simple — Glisser-déposer :**

1. Une fois connecté, vous arrivez sur le tableau de bord Netlify
2. Descendez jusqu'à la zone **"Want to deploy a new site without connecting to Git?"**
3. Vous voyez une zone en pointillés **"Drag and drop your site output folder here"**
4. **Faites glisser le dossier entier `tournoi-hippique`** dans cette zone
5. Attendez 30 secondes → votre site est en ligne !

Netlify vous donne une URL de la forme : `https://amazing-name-123456.netlify.app`

### 3.3 — Personnaliser l'URL (optionnel)

1. Cliquez sur **"Site configuration"** → **"Change site name"**
2. Choisissez un nom : `mon-tournoi-hippique` → Sauvegardez
3. Votre URL devient : `https://mon-tournoi-hippique.netlify.app`

---

## ÉTAPE 4 — Tester votre application

1. Ouvrez l'URL Netlify sur votre téléphone ou un autre appareil
2. Ouvrez-la aussi sur votre ordinateur
3. Sur l'**ordinateur** :
   - Entrez votre nom
   - Cliquez **"Créer un match"**
   - Notez le code à 4 lettres affiché
4. Sur le **téléphone** (ou un autre navigateur) :
   - Entrez l'autre joueur et le code
   - Cliquez **"Rejoindre"**
5. Les deux appareils doivent se synchroniser instantanément !

---

## 🎮 COMMENT JOUER — Déroulement d'un match

### Le créateur du match (Arbitre)
1. Crée le match → reçoit un code à 4 lettres
2. Communique ce code à l'adversaire
3. Une fois l'adversaire connecté : saisit la date au format `JJ/MM/AAAA`
4. Clique **"Charger les réunions PMU"** pour voir les réunions du jour
5. Choisit une réunion (hippodrome)
6. Clique **"Lancer le match !"**

### Pendant le match
- L'application tire au sort qui a **la main** sur la 1ère course
- Le joueur avec la main choisit **3 chevaux** (bloqué à -10 min du départ)
- L'autre joueur choisit **6 chevaux dans l'ordre** (bloqué à -5 min du départ)
- À -5 min : les choix sont automatiquement validés
- Après la course : l'app récupère les résultats PMU toutes les 30 secondes
- Quand les rapports définitifs sont disponibles : calcul automatique des scores

### Calcul des points par course
- Chaque joueur marque la **somme des rapports gagnant + placés** de ses 3 chevaux validés
- Le joueur avec le plus de points remporte **1 point de manche**

### Fin du match
- Tous les points sont calculés automatiquement
- En cas d'égalité : départages automatiques dans l'ordre :
  1. Total des points sur toutes les courses
  2. Nombre de gagnants trouvés
  3. Nombre de placés (2ème, 3ème)
  4. Plus gros rapport trouvé

---

## ❓ PROBLÈMES FRÉQUENTS

**"Firebase non configuré"** → Vérifiez que vous avez bien rempli `firebase-config.js` avec VOS clés.

**"Match introuvable"** → Le code est sensible à la casse, vérifiez que vous le tapez en majuscules.

**"Erreur chargement PMU"** → L'API PMU peut être indisponible hors des jours de courses. Vérifiez qu'il y a bien des courses ce jour-là sur pmu.fr.

**Les résultats ne s'affichent pas** → Les rapports définitifs PMU peuvent prendre 10-20 minutes après l'arrivée. L'app vérifie automatiquement toutes les 30 secondes.

---

## 📞 PROCHAINES ÉTAPES (V2)

Quand vous serez satisfait des tests, on pourra ajouter :
- Système de tournoi multi-matchs avec classement
- Historique des matchs
- Notifications push quand l'adversaire a fait ses choix
- Sécurisation Firebase (règles d'accès)
- Mode spectateur

---

*Application créée pour les tests de la V1 — Bonne chance sur les courses ! 🏇*
