# HabitCraft Admin

Panneau d'administration React pour HabitCraft, construit avec Vite, TypeScript et Tailwind CSS.

## Technologies

- **Framework** : React 19.2
- **Build Tool** : Vite 7.3
- **Langage** : TypeScript 5.9
- **Styling** : Tailwind CSS 4.0
- **Routing** : React Router DOM 7
- **Charts** : Recharts 2.15
- **Icons** : Lucide React

---

## Installation

### Méthode 1 : Docker (Recommandé)

```bash
# À la racine du projet
docker-compose up -d admin

# Accessible sur http://localhost:3000
```

### Méthode 2 : Développement local

```bash
cd admin

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## Structure du projet

```
admin/
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── ui/            # Composants UI (button, card, etc.)
│   │   └── layout/        # Layout components
│   ├── pages/              # Pages de l'application
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   ├── Habits.tsx
│   │   ├── Notifications.tsx
│   │   ├── Analytics.tsx
│   │   └── Settings.tsx
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── types/              # Types TypeScript
│   ├── utils/              # Utilitaires
│   ├── App.tsx            # Composant racine
│   └── main.tsx           # Point d'entrée
├── public/                 # Assets statiques
├── index.html
├── vite.config.ts         # Configuration Vite
├── tsconfig.json          # Configuration TypeScript
├── tailwind.config.js     # Configuration Tailwind
└── package.json
```

---

## Scripts disponibles

```bash
npm run dev      # Démarrer le serveur de développement
npm run build    # Build de production
npm run lint     # Lancer ESLint
npm run preview  # Prévisualiser le build
```

---

## Fonctionnalités

### Dashboard
- Statistiques en temps réel
- Graphiques d'engagement
- Liste des habitudes populaires
- Cartes métriques avec icônes

### Gestion Utilisateurs
- Liste complète des utilisateurs
- Recherche et filtres
- Modification des rôles (user/admin)
- Suppression de comptes

### Notifications
- Envoi de notifications individuelles
- Envoi bulk à tous les utilisateurs
- Historique des notifications

### Analytics
- Statistiques globales
- Taux de complétion
- Utilisateurs actifs
- Tendances d'habitudes

### Design
- Interface glassmorphism moderne
- Thème sombre élégant
- Responsive design
- Animations fluides

---

## Configuration

### Variables d'environnement
Créer un fichier `.env` à la racine :

```env
VITE_API_URL=http://localhost:4000/api
```

### Connexion API
Le fichier `src/services/api.ts` configure Axios avec :
- Intercepteurs pour les tokens JWT
- Refresh token automatique
- Gestion des erreurs 401

---

## Authentification

### Identifiants par défaut
- **Email** : `admin@habitcraft.com`
- **Mot de passe** : `admin123`

### Sécurité
- JWT avec stockage dans localStorage
- Refresh token automatique
- Protection des routes par rôle
- Redirection vers login si non authentifié

---

## Personnalisation

### Couleurs (Tailwind)
Les couleurs principales sont définies dans les classes CSS :

```css
/* Thème sombre glassmorphism */
bg-gray-900        /* Fond principal */
bg-gray-800/50     /* Cartes avec transparence */
backdrop-blur-lg   /* Effet de flou */
border-white/10    /* Bordures subtiles */
```

### Icônes
Utilisation de Lucide React :

```tsx
import { Users, TrendingUp, Bell } from 'lucide-react'

<Users className="w-5 h-5" />
```

---

## Architecture

### Patterns utilisés
- **Container/Presentational** : Séparation logique/UI
- **Custom Hooks** : Encapsulation de la logique réutilisable
- **Service Layer** : Centralisation des appels API
- **Protected Routes** : Gestion des accès par rôle

### State Management
- **Local state** : useState pour l'UI locale
- **Server state** : React Query ou SWR (à implémenter)
- **Global state** : Context API pour auth/user

---

## Build Production

Le build de production crée un dossier `dist/` avec des fichiers statiques optimisés, servis par Nginx dans Docker.

### Vérifier le build
```bash
npm run build
npm run preview
```

---

## Dépannage

### Erreur "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problèmes de hot-reload
```bash
npm run dev -- --force
```

### Build échoue
Vérifier que TypeScript est valide :
```bash
npx tsc --noEmit
```
