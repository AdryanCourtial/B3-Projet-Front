# Qapple - Application de Quiz Multijoueur

Qapple est une application de quiz multijoueur qui permet à plusieurs utilisateurs de jouer ensemble dans des salons personnalisés. Les joueurs peuvent répondre à des questions dans différents modes de jeu, notamment le mode normal et le mode hardcore.

## Fonctionnalités

- **Création et gestion de salons** : Créez des salons personnalisés avec des paramètres spécifiques (catégorie, difficulté, limite de questions, mode de jeu).
- **Modes de jeu** :
  - Mode normal : Jouez pour accumuler le plus de points possibles.
  - Mode hardcore : Survivez aussi longtemps que possible en répondant correctement aux questions.
- **Statistiques en direct** : Affichez les statistiques des questions et des réponses des joueurs.
- **Redirection et relance de jeu** : Relancez le jeu ou revenez au lobby pour modifier les paramètres.

---

## Installation et lancement

### Prérequis

- **Node.js** : Version 14 ou supérieure
- **npm** : Version 6 ou supérieure
- **npx**

### Étapes

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/AdryanCourtial/B3-Projet-Front.git
   cd B3-Projet-Front
   ```

2. Installez les dépendances pour chaque partie du projet :

   - **Backend** :
     ```bash
     cd Backend
     npm install
     ```
   - **Frontend** :
     ```bash
     cd ../Frontend
     npm install
     ```

3. Lancez le projet :

   - **Backend** :
     Accédez au dossier `Backend` et lancez le serveur avec la commande :
     ```bash
     npx ts-node .\server.ts
     ```
   - **Frontend** :
     Accédez au dossier `Frontend` et démarrez l'application en mode développement :
     ```bash
     npm run dev
     ```

4. Accédez à l'application :
   - Ouvrez votre navigateur et accédez à `http://localhost:5173`.

---

## Technologies utilisées

- **Frontend** :

  - React.js
  - Jotai (gestion des états)
  - TailwindCSS (design)
  - Framer Motion (animations)

- **Backend** :

  - Node.js
  - Express.js
  - Socket.IO (communication en temps réel)

- **API Externe** : [Quiz API](https://quizzapi.jomoreschi.fr/api/v1/quiz)

---
