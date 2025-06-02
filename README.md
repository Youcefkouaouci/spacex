# 🚀 SpaceX Launch Viewer

## 📋 Présentation du Projet

**SpaceX Launch Viewer** est une application web développée avec **Vue.js 3**, permettant de visualiser les lancements SpaceX en temps réel. L'application interagit avec l'API officielle de SpaceX pour afficher :

- Le prochain lancement avec un **compte à rebours dynamique**
- Une liste complète des lancements passés et futurs avec **filtrage avancé**

---

## 🚀 Technologies Utilisées

### 🧩 Frontend Framework

- **Vue.js 3** avec **Composition API** et **TypeScript**
- **Vite** pour un bundling rapide et moderne

### 🎨 Styling & Design

- **Tailwind CSS** pour une interface responsive et modulaire
- **CSS Custom Properties** pour la thématisation

### 📡 Gestion des Données

- **API SpaceX v5**
- **TypeScript interfaces** pour la type safety
- **date-fns** pour le traitement des dates

---

## 🏗️ Architecture du Projet

### 🧱 Structure des Composants

- `App.vue` : Composant principal
- `NextLaunch.vue` : Compte à rebours du prochain lancement
- `LaunchFilter.vue` : Filtres interactifs
- `LaunchList.vue` : Liste des lancements
- `LaunchModal.vue` : Détails complets en modal

### 🔧 Services

- Service centralisé pour les appels à l'API
- Gestion des erreurs et états de chargement

---

## ✨ Fonctionnalités Clés

1. **Compte à rebours en temps réel**
2. **Filtrage dynamique** (Tous / Réussis / Échoués)
3. **Modal interactive** avec vidéos intégrées
4. **Responsive Design** optimisé pour tous les écrans

---

## ⚙️ Installation & Utilisation

### Prérequis

- **Node.js** ≥ 18
- **npm** ou **yarn**

### Installation

```bash
npm install
```

### Démarrage en développement

```bash
npm run dev
```

### Build production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

---

## 🎯 Choix Techniques

### ✅ Vue 3 + Composition API

> Plus grande flexibilité, meilleure séparation des préoccupations, logique réutilisable

### ✅ TypeScript

> Meilleure maintenabilité, détection précoce des erreurs

### ✅ API SpaceX via POST Query

> Possibilité d'effectuer des requêtes complexes avec `populate`

### ✅ Tailwind + CSS Variables

> Rapidité de prototypage + Thématisation avancée

---

## 🚧 Remarques & Difficultés Rencontrées

### 🕒 Timer en Temps Réel

- **Problème** : Synchronisation et memory leaks
- **Solution** : `onMounted`, `onUnmounted`, `clearInterval` propre

### 🔄 États de Chargement Complexes

- **Problème** : UX fluide malgré la latence API
- **Solution** : États `isLoading`, `isError` bien définis et réactifs

### ♿ Accessibilité de la Modal

- **Problème** : Navigation clavier et fermeture intuitive
- **Solution** : Focus trap, gestion touche `Escape`

### 📱 Responsive Design

- **Problème** : Adaptation multi-écran
- **Solution** : Grille CSS + breakpoints Tailwind

### ⚠️ Problème de Configuration avec Tailwind CSS via `npx`

- **Problème** : Installation initiale avec `npx tailwindcss init` ne générait pas la configuration attendue
- **Solution** : Résolution via la documentation officielle et les forums. Adaptation manuelle du fichier `tailwind.config.js`

---

## 📚 Ressources Utilisées

### 📘 Plateformes et Formations

- **Dyma.fr** : Formation suivie en Vue.js 3 et Tailwind CSS
- **Documentation Vue.js 3** : [https://vuejs.org/](https://vuejs.org/)
- **Documentation Tailwind CSS** : [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **API SpaceX v5** : [https://github.com/r-spacex/SpaceX-API](https://github.com/r-spacex/SpaceX-API)

### 🛠️ Bibliothèques

- **date-fns**
- **Vite**
- **TypeScript**
- **ESLint**
- **Vue DevTools**

---

## 🎓 Remarques Finales

Ce projet a été réalisé dans le cadre d’un **test technique pour un stage de deux mois** en développement web. Il illustre les bonnes pratiques du développement moderne avec **Vue 3**, une architecture modulaire et évolutive, ainsi qu’un focus sur l’**expérience utilisateur**, l’**accessibilité** et la **performance**.

---
