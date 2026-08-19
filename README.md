# 🎓 BDE Event - Plateforme de Gestion des Événements BDE

Plateforme web full-stack moderne conçue pour gérer les événements du Bureau Des Étudiants (BDE), les inscriptions, les statistiques administrateur et les passes/tickets des étudiants.

![Stack](https://img.shields.io/badge/Stack-Laravel%20%7C%20React%20%7C%20TailwindCSS-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Fonctionnalités Principales

### 👨‍💼 **Espace Administrateur**
* **Dashboard analytique :** Suivi en temps réel du nombre d'événements, total des réservations, capacité globale et revenus estimés.
* **Gestion des événements :** Création, modification et suivi du taux de remplissage des événements.
* **Gestion des inscriptions :** Consultation des détails des étudiants inscrits par événement.

### 🎓 **Espace Étudiant**
* **Catalogue d'événements :** Consultation de tous les événements à venir.
* **Réservation en ligne :** Inscription rapide aux événements gratuits ou payants.
* **Mes Tickets :** Suivi des réservations actives et accès au pass/QR code d'accès.

---

## 🛠️ Tech Stack

### **Back-End**
* **Framework :** Laravel (PHP)
* **Authentication :** Laravel Sanctum (Bearer Tokens)
* **Base de données :** MySQL / PostgreSQL
* **ORM :** Eloquent ORM

### **Front-End**
* **Framework/Tooling :** React (Vite)
* **Styling :** Tailwind CSS
* **Icons :** Lucide React
* **State & API :** Custom React Hooks & Fetch API

---

## 📂 Structure du Projet

```text
BDE-event-full-stack/
├── Back-End/              # API REST Laravel
│   ├── app/
│   │   ├── Http/Controllers/
│   │   └── Models/
│   └── routes/
│       └── api.php
│
└── Front-End/             # Application React
    ├── src/
    │   ├── components/
    │   │   ├── Admin/     # Composants Dashboard Admin
    │   │   └── Student/   # Composants Espace Étudiant
    │   ├── services/      # Appel APIs REST & Custom Hooks
    │   └── App.jsx
    └── package.json