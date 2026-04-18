# ⚙️ Quran API (Backend)

> Lightweight, high-performance Quran API built with Hono and Bun.

---

## 🚀 Live API

🔗 https://quran.anaadevelopersltd.com/api

---

## 📂 Repository

🔗 https://github.com/Ibrahim-Sikder/quran-api

---

## 🧠 Overview

This backend powers the Quran Web Application by providing fast and structured API endpoints for:

- 📜 Surah list (all 114 chapters)
- 📖 Ayahs of a specific Surah
- 🔍 Search functionality (by translation text)

The system is designed with a focus on **performance, flexibility, and scalability**, simulating real-world backend architecture.

---

## 🛠 Tech Stack

- **Runtime:** Bun (ultra-fast JavaScript runtime)
- **Framework:** Hono (lightweight, edge-ready framework)
- **Language:** TypeScript
- **Data Source:** Public Quran dataset (JSON)

---

## ⚡ Why Hono + Bun?

- **Hono** → Minimal, fast, modern alternative to Express
- **Bun** → Faster runtime with built-in bundler and dev server

👉 Result:

- Lower latency
- Reduced overhead
- Cleaner and modular architecture

---

## 📡 API Endpoints

> All endpoints support pagination, sorting, and field selection for efficient data retrieval.

---

### 🔹 Get All Surahs

```http
GET /api/quran/surahs
```
