# HabitCraft Mobile

Application mobile React Native pour HabitCraft, construite avec Expo et TypeScript.

## Technologies

- **Framework** : React Native 0.81 avec Expo 54
- **Langage** : TypeScript 5.9
- **Navigation** : Expo Router 6 (file-based routing)
- **State Management** : React hooks + AsyncStorage
- **UI** : Composants React Native + Expo Vector Icons
- **Notifications** : Expo Notifications
- **Storage** : Expo SQLite (offline)

---

## Installation

### Prérequis
- Node.js 20+
- Expo CLI : `npm install -g expo-cli`
- Expo Go sur mobile (iOS/Android) ou simulateur

### Configuration

```bash
cd mobile

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
# ou
expo start
```

### Lancer l'application

```bash
# Sur Android
npm run android

# Sur iOS
npm run ios

# Sur Web
npm run web
```

---

## Structure du projet

```
mobile/
├── app/                    # Expo Router - file-based routing
│   ├── (tabs)/            # Groupe de routes avec tab navigation
│   ├── _layout.tsx        # Layout racine
│   └── index.tsx          # Page d'accueil
├── assets/                 # Images, fonts, etc.
│   ├── images/
│   └── fonts/
├── components/             # Composants réutilisables
├── constants/              # Constantes (couleurs, etc.)
├── hooks/                  # Custom React hooks
├── services/               # API services
├── store/                  # State management
├── types/                  # Types TypeScript
├── .expo/                  # Configuration Expo
├── app.json               # Configuration app
├── babel.config.js        # Configuration Babel
├── tsconfig.json          # Configuration TypeScript
└── package.json
```

---

## Scripts disponibles

```bash
npm run start      # Démarrer le serveur Expo
npm run android    # Lancer sur Android
npm run ios        # Lancer sur iOS
npm run web        # Lancer sur Web
npm run lint       # Lancer ESLint
```

---

## Fonctionnalités

### En cours de développement
- [ ] Authentification (Login/Register)
- [ ] Liste des habitudes
- [ ] Création/modification d'habitudes
- [ ] Suivi quotidien (check-in)
- [ ] Statistiques personnelles
- [ ] Notifications push
- [ ] Mode hors-ligne (SQLite)

---

## Configuration

### Connexion au Backend
Modifier le fichier `services/api.ts` pour configurer l'URL de l'API :

```typescript
const API_URL = 'http://localhost:4000/api'  // Dev local
// ou
const API_URL = 'https://votre-api.com/api'  // Production
```

### Notifications Push
Pour les notifications push, configurez Expo Notifications dans `app.json` :

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png"
        }
      ]
    ]
  }
}
```

---

## Build Production

### Android
```bash
# Build APK
expo build:android

# Ou avec EAS
eas build -p android
```

### iOS
```bash
# Build avec EAS
eas build -p ios
```

---

## Architecture

L'application utilise :
- **Expo Router** : Navigation basée sur le système de fichiers
- **Context API** : Gestion d'état globale (auth, thème)
- **AsyncStorage** : Persistance locale des données utilisateur
- **Axios** : Requêtes HTTP vers l'API

---

## Dépannage

### Metro bundler ne démarre pas
```bash
rm -rf node_modules
npm install
npm start -- --clear
```

### Erreur de connexion à l'API
- Vérifier que le backend tourne
- Pour Android émulateur : utiliser `10.0.2.2` au lieu de `localhost`
- Pour iOS simulateur : utiliser `localhost`
- Pour appareil physique : utiliser l'IP locale du serveur

### Problèmes de cache
```bash
expo r -c  # Reset cache complet
```
