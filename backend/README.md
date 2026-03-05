# HabitCraft Backend

Backend API REST pour l'application HabitCraft, construit avec Node.js, Express, TypeScript, MongoDB et Redis.

## Technologies

- **Runtime** : Node.js 20 (Alpine Linux dans Docker)
- **Framework** : Express.js 5.2.1
- **Langage** : TypeScript 5.9.3
- **Base de données** : MongoDB 6 avec Mongoose ODM
- **Cache** : Redis 7 (notifications pub/sub)
- **Authentification** : JWT (access tokens 15 min, refresh tokens 7 jours) + bcrypt
- **HTTP Client** : Axios (pour appels API externes)

---

## Installation

### Méthode 1 : Docker (Recommandé)

```bash
# À la racine du projet
docker-compose up -d backend

# Le backend sera accessible sur http://localhost:4000
```

### Méthode 2 : Développement local

```bash
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env

# Démarrer en mode développement
npm run dev

# Ou build et démarrer
npm run build
npm start
```

---

## Structure du projet

```
backend/
├── src/
│   ├── config/
│   │   └── env.ts           # Configuration environnement
│   ├── database/
│   │   ├── mongo.ts         # Connexion MongoDB
│   │   ├── redis.ts         # Connexion Redis
│   │   └── seed.ts          # Seed admin automatique
│   ├── middleware/
│   │   ├── auth.middleware.ts    # Authentification JWT
│   │   └── error.middleware.ts   # Gestion erreurs
│   ├── models/
│   │   ├── User.ts              # Modèle utilisateur
│   │   ├── Habit.ts             # Modèle habitude
│   │   ├── HabitLog.ts          # Logs de complétion
│   │   ├── Notification.ts      # Notifications
│   │   ├── AIRecommendation.ts  # Recommandations IA
│   │   └── index.ts             # Export des modèles
│   ├── modules/
│   │   ├── auth/               # Authentification
│   │   ├── habits/             # Gestion habitudes
│   │   ├── users/              # Gestion utilisateurs
│   │   ├── ai/                 # Recommandations IA
│   │   ├── notifications/      # Système notifications
│   │   └── analytics/          # Statistiques
│   ├── routes/
│   │   ├── index.ts            # Route aggregation
│   │   └── health.routes.ts    # Health check
│   └── index.ts               # Point d'entrée
├── Dockerfile
├── .dockerignore
├── tsconfig.json
└── package.json
```

---

## Modèles de données

### User
```typescript
{
  email: string (unique, required)
  password: string (hashed)
  name: string (required)
  role: 'user' | 'admin' (default: 'user')
  refreshToken?: string
  createdAt: Date
  updatedAt: Date
}
```

### Habit
```typescript
{
  title: string (required)
  description: string
  frequency: 'daily' | 'weekly' | 'monthly' (default: 'daily')
  userId: ObjectId (ref: User)
  createdAt: Date
  updatedAt: Date
}
```

### HabitLog
```typescript
{
  habitId: ObjectId (ref: Habit, required)
  date: Date (required)
  completed: boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
```

### Notification
```typescript
{
  userId: ObjectId (ref: User, required)
  title: string (required)
  message: string (required)
  read: boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
```

### AIRecommendation
```typescript
{
  userId: ObjectId (ref: User, required)
  habitId: ObjectId (ref: Habit, required)
  recommendation: string (required)
  confidence: number (0-1, required)
  createdAt: Date
  updatedAt: Date
}
```

---

## API Endpoints

### Authentification
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | `/api/auth/register` | Créer un compte | Non |
| POST | `/api/auth/login` | Se connecter | Non |
| POST | `/api/auth/refresh` | Rafraîchir token | Refresh token |
| POST | `/api/auth/logout` | Déconnexion | Oui |

### Habitudes (Auth requis)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/habits` | Créer une habitude |
| GET | `/api/habits` | Lister mes habitudes (avec streaks) |
| GET | `/api/habits/:id` | Détails d'une habitude |
| PUT | `/api/habits/:id` | Modifier une habitude |
| DELETE | `/api/habits/:id` | Supprimer une habitude |
| POST | `/api/habits/:id/complete` | Marquer comme complété aujourd'hui |

### Utilisateurs (Admin uniquement)
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/users` | Lister tous les utilisateurs |
| GET | `/api/users/:id` | Détails utilisateur |
| PATCH | `/api/users/:id/role` | Modifier le rôle |
| DELETE | `/api/users/:id` | Supprimer utilisateur + données |

### Recommandations IA
| Méthode | Endpoint | Auth |
|---------|----------|------|
| GET | `/api/ai/recommendations` | User (propres recommandations) |
| GET | `/api/ai/recommendations/all` | Admin |
| POST | `/api/ai/recommendations` | Admin |
| DELETE | `/api/ai/recommendations/:id` | Admin |

### Notifications
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/notifications` | Mes notifications |
| GET | `/api/notifications/all` | Toutes (Admin) |
| POST | `/api/notifications` | Envoyer notification (Admin) |
| POST | `/api/notifications/bulk` | Envoi bulk (Admin) |
| PATCH | `/api/notifications/:id/read` | Marquer comme lue |

### Analytics
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/analytics/user` | Mes statistiques (User) |
| GET | `/api/analytics/admin` | Stats globales (Admin) |

### Health Check
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Statut MongoDB + Redis |

---

## Variables d'environnement

Créer un fichier `.env` à la racine du dossier `backend` :

```env
PORT=4000
MONGO_URI=mongodb://admin:password@localhost:27017/habitcraft?authSource=admin
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=votre_secret_jwt_super_securise
```

---

## Scripts disponibles

```bash
npm run dev      # Démarrer avec hot-reload (nodemon)
npm run build    # Compiler TypeScript	npm start        # Démarrer le build de production
```

---

## Architecture

Le backend suit une **architecture en couches** avec pattern Controller-Service :

1. **Routes** : Définition des endpoints HTTP
2. **Controllers** : Gestion des requêtes/réponses HTTP
3. **Services** : Logique métier et accès aux données
4. **Models** : Schémas Mongoose et validation
5. **Middleware** : Authentification, gestion d'erreurs

**Patterns utilisés** :
- Controller-Service Pattern
- Middleware Pattern (auth, erreurs)
- Repository Pattern (Mongoose)
- Pub/Sub Pattern (Redis notifications)

---

## Sécurité

- JWT Authentication avec refresh token rotation
- RBAC (Role-Based Access Control)
- Bcrypt pour le hachage des mots de passe (12 rounds)
- Validation des entrées
- Protection CORS configurée

---

## Dépannage

### Erreur de connexion MongoDB
Vérifier que MongoDB est démarré et accessible. En Docker, vérifier le réseau.

### Erreur de connexion Redis
Vérifier que Redis est démarré sur le port 6379.

### Erreur JWT
Vérifier que `JWT_SECRET` est bien défini dans le fichier `.env`.
