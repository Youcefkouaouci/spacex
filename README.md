# SpaceX Launch Viewer - Documentation Complète

## 📋 Présentation du Projet

**SpaceX Launch Viewer** est une application web moderne développée en Vue.js 3 qui permet de visualiser les lancements SpaceX en temps réel. L'application utilise l'API officielle SpaceX pour afficher le prochain lancement avec un compte à rebours en direct, ainsi qu'une liste complète des lancements passés et futurs avec des fonctionnalités de filtrage avancées. [1](#0-0)

## 🚀 Technologies Utilisées

### Frontend Framework

- **Vue.js 3** avec Composition API et TypeScript pour une architecture moderne et type-safe
- **Vite** comme outil de build pour des performances optimales en développement [2](#0-1)

### Styling & Design

- **Tailwind CSS** pour un design system cohérent et responsive
- **CSS Custom Properties** pour une thématisation avancée
- Design responsive avec grille CSS [3](#0-2) [4](#0-3)

### Gestion des Données

- **API SpaceX v5** pour les données en temps réel
- **TypeScript interfaces** pour la type safety
- **date-fns** pour la manipulation et formatage des dates [5](#0-4) [6](#0-5)

## 🏗️ Architecture du Projet

### Structure des Composants

L'application suit une architecture modulaire avec séparation des responsabilités :

**Composant Principal** [7](#0-6)

**Composants Spécialisés**

- `NextLaunch.vue` : Affichage du prochain lancement avec compte à rebours
- `LaunchFilter.vue` : Système de filtrage des lancements
- `LaunchList.vue` : Liste en grille des lancements
- `LaunchModal.vue` : Modal détaillée avec informations complètes [8](#0-7) [9](#0-8)

### Services API

Service centralisé pour les appels API avec gestion d'erreurs robuste : [10](#0-9) [11](#0-10)

## ✨ Fonctionnalités Principales

### 1. Compte à Rebours en Temps Réel

- Affichage du prochain lancement avec timer automatique
- Mise à jour toutes les secondes avec calcul précis
- Gestion automatique de l'expiration du timer [12](#0-11)

### 2. Système de Filtrage Avancé

- Filtre par statut : Tous / Réussis / Échoués
- Interface utilisateur intuitive avec sélecteur
- Mise à jour en temps réel de la liste [13](#0-12)

### 3. Modal Détaillée Interactive

- Informations complètes sur chaque lancement
- Intégration YouTube conditionnelle
- Navigation au clavier (Échap pour fermer)
- Affichage des charges utiles et détails techniques [14](#0-13)

### 4. Design Responsive

- Interface adaptive pour mobile, tablette et desktop
- Grille CSS flexible
- Animations et transitions fluides [15](#0-14)

## 🛠️ Installation et Utilisation

### Prérequis

- Node.js (version recommandée : 18+)
- npm ou yarn

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

### Build Production

```bash
npm run build
```

### Linting

````bash
npm run lint
``` [16](#0-15)

## 🎯 Choix Techniques Détaillés

### 1. Vue 3 Composition API
**Justification :** Choix de la Composition API pour une meilleure réutilisabilité du code et une logique plus claire. [17](#0-16)

### 2. TypeScript Integration
**Justification :** Type safety pour réduire les erreurs et améliorer la maintenabilité. [18](#0-17)

### 3. API SpaceX v5 avec POST
**Justification :** Utilisation de l'endpoint query avec POST pour des requêtes plus flexibles et la possibilité de populate les relations. [19](#0-18)

### 4. CSS Variables et Tailwind
**Justification :** Combinaison de CSS custom properties pour la thématisation et Tailwind pour la rapidité de développement. [20](#0-19)

## 🚧 Difficultés Rencontrées et Solutions

### 1. Gestion du Timer en Temps Réel
**Problème :** Synchronisation du compte à rebours et gestion de la mémoire.
**Solution :** Utilisation de `onMounted` et `onUnmounted` avec gestion propre des intervals. [21](#0-20)

### 2. États de Chargement Complexes
**Problème :** Gestion des différents états (loading, error, success) avec UX fluide.
**Solution :** États réactifs centralisés dans le composant principal. [22](#0-21) [23](#0-22)

### 3. Modal Accessible
**Problème :** Accessibilité et gestion des événements clavier.
**Solution :** Event listeners dynamiques et focus management. [24](#0-23)

### 4. Design Responsive Complexe
**Problème :** Adaptation sur tous les écrans avec maintien de l'UX.
**Solution :** Grilles CSS flexibles et breakpoints Tailwind. [25](#0-24)

## 📚 Ressources Utilisées

### API et Documentation
- **SpaceX API v5** : Documentation officielle pour l'intégration
- **Vue.js 3 Documentation** : Guide officiel Composition API
- **Tailwind CSS Documentation** : Système de design

### Bibliothèques Externes
- **date-fns** : Manipulation et formatage des dates
- **Vite** : Outil de build moderne
- **TypeScript** : Typage statique [26](#0-25)

### Outils de Développement
- **ESLint** : Linting et qualité du code
- **Vue DevTools** : Debugging en développement [27](#0-26)

## 📝 Notes Techniques Importantes

### Performance
- Lazy loading des vidéos YouTube pour optimiser le chargement
- Debouncing implicite sur les filtres
- Gestion mémoire appropriée des timers

### Accessibilité
- Navigation clavier complète
- ARIA labels appropriés
- Contrastes respectant les standards WCAG

### Maintenance
- Code modulaire facilement extensible
- Types TypeScript pour la documentation du code
- Architecture séparée (services, types, composants)

### Évolutions Possibles
- Ajout de tests unitaires avec Vitest
- Implémentation du SSR avec Nuxt.js
- Cache des données API avec Pinia
- PWA pour utilisation hors-ligne

---

## Notes

Ce projet démontre une architecture moderne Vue.js 3 avec une attention particulière portée à la qualité du code, l'accessibilité et l'expérience utilisateur. L'utilisation de TypeScript et de la Composition API assure une maintenabilité à long terme, tandis que l'intégration de l'API SpaceX offre des données en temps réel fiables.

La structure modulaire permet une extension facile des fonctionnalités, et les choix techniques (Vite, Tailwind, date-fns) optimisent à la fois le développement et les performances en production. Le projet illustre les bonnes pratiques du développement frontend moderne avec Vue.js.
````
