# HabitCraft

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20-green?style=flat&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/MongoDB-6-green?style=flat&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/Redis-7-red?style=flat&logo=redis" alt="Redis">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Expo-54-000020?style=flat&logo=expo" alt="Expo">
</p>

**HabitCraft** est une application complète de suivi d'habitudes avec une interface mobile React Native, un backend API REST Node.js/Express, et un panneau d'administration React. L'application intègre un système de gamification, des recommandations IA, et des notifications en temps réel.

---

## Architecture

Le projet est organisé en trois modules principaux :

```
habitcraft/
├── backend/          # API REST Node.js/Express + MongoDB + Redis
├── mobile/           # Application mobile React Native (Expo)
├── admin/            # Panneau d'administration React + Vite
└── docker-compose.yml
```

---

## Fonctionnalités

### Utilisateur
- **Gestion d'habitudes** : Créer, modifier, supprimer des habitudes
- **Suivi quotidien** : Marquer les habitudes comme complétées
- **Système de streaks** : Calcul automatique des séries de jours consécutifs
- **Statistiques** : Taux de complétion, progression hebdomadaire
- **Notifications** : Rappels et mises à jour en temps réel
- **Recommandations IA** : Suggestions personnalisées d'habitudes

### Administrateur
- **Tableau de bord** : Statistiques en temps réel avec graphiques
- **Gestion utilisateurs** : Liste, modification des rôles, suppression
- **Notifications bulk** : Envoi de messages à tous les utilisateurs
- **Analytiques avancées** : Taux d'engagement, habitudes populaires
- **Gestion IA** : Création et gestion des recommandations

---

## Technologies

| Composant | Stack Technique |
|-----------|----------------|
| **Backend** | Node.js 20, Express 5, TypeScript, MongoDB 6, Redis 7, Mongoose, JWT |
| **Mobile** | React Native 0.81, Expo 54, TypeScript, React Navigation, Expo Router |
| **Admin** | React 19, Vite 7, TypeScript, Tailwind CSS 4, Recharts, React Router |
| **Infrastructure** | Docker, Docker Compose, Nginx |

---

## Démarrage Rapide

### Prérequis
- Docker & Docker Compose
- Node.js 20+ (pour développement local)
- Git

### Installation avec Docker (Recommandé)

```bash
# Cloner le repository
git clone https://github.com/andilMc/HabitCraft.git
cd HabitCraft

# Lancer tous les services
docker-compose up -d

# Services disponibles :
# - Backend API : http://localhost:4000
# - Admin Panel : http://localhost:3000
# - MongoDB     : localhost:27017
# - Redis       : localhost:6379
```

### Accès par défaut

| Service | URL | Identifiants |
|---------|-----|--------------|
| Admin Dashboard | http://localhost:3000 | admin@habitcraft.com / admin123 |
| API Documentation | http://localhost:4000/api | - |

---

## Structure des Modules

### Backend
Architecture en couches avec pattern Controller-Service :
- **Models** : Mongoose schemas (User, Habit, HabitLog, Notification, AIRecommendation)
- **Modules** : Auth, Habits, Users, Analytics, Notifications, AI
- **Middleware** : Authentication JWT, gestion des erreurs
- **Database** : Connexion MongoDB + Redis avec seed admin auto

Voir [backend/README.md](backend/README.md) pour plus de détails.

### Mobile
Application React Native avec Expo :
- **Navigation** : Expo Router (file-based routing)
- **State** : React hooks + AsyncStorage
- **UI** : Composants natifs avec Expo Vector Icons
- **Features** : Notifications push, SQLite offline

Voir [mobile/README.md](mobile/README.md) pour plus de détails.

### Admin
Panneau d'administration moderne :
- **UI** : Design glassmorphism avec Tailwind CSS
- **Charts** : Visualisation avec Recharts
- **Auth** : JWT avec refresh token automatique
- **Routes** : React Router avec protection par rôle

Voir [admin/README.md](admin/README.md) pour plus de détails.

---

## API Endpoints

### Authentification
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion |
| POST | `/api/auth/refresh` | Rafraîchir token |
| POST | `/api/auth/logout` | Déconnexion |

### Habitudes (Auth requis)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/habits` | Créer une habitude |
| GET | `/api/habits` | Lister mes habitudes |
| GET | `/api/habits/:id` | Détails d'une habitude |
| PUT | `/api/habits/:id` | Modifier une habitude |
| DELETE | `/api/habits/:id` | Supprimer une habitude |
| POST | `/api/habits/:id/complete` | Marquer comme complété |

### Analytics
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/analytics/user` | Mes statistiques |
| GET | `/api/analytics/admin` | Stats globales (Admin) |

Documentation API complète disponible via les fichiers README des modules.

---

## Sécurité

- **JWT Authentication** : Tokens d'accès (15 min) + refresh (7 jours)
- **RBAC** : Contrôle d'accès basé sur les rôles (user/admin)
- **Bcrypt** : Hachage des mots de passe (12 rounds)
- **CORS** : Configuré pour les origines autorisées
- **Validation** : Validation des entrées côté serveur

---

## Scripts Utiles

```bash
# Démarrer tout avec Docker
docker-compose up -d

# Voir les logs
docker-compose logs -f backend
docker-compose logs -f admin

# Arrêter tous les services
docker-compose down

# Supprimer les volumes (reset database)
docker-compose down -v
```

---

## Screenshots

### Admin Dashboard
*Interface d'administration moderne avec statistiques et gestion utilisateurs*

### Mobile App
*Application mobile React Native avec suivi d'habitudes*

---

## Contribution

1. Fork le repository
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

---

## Auteur

**andilMc** - [GitHub](https://github.com/andilMc)

---

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
