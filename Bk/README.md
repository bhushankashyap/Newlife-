# 🎵 SoundWave

A full-stack music streaming app with custom auth, real-time chat, and admin dashboard.

**Tech Stack:** React + TypeScript + Vite (frontend) · Node.js + Express + MongoDB (backend) · Socket.io · JWT Auth · Cloudinary

---

## 🚀 How to Run

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (for audio/image uploads)

---

### 1. Clone / Extract the project

```
soundwave/
├── backend/
├── frontend/
└── README.md
```

---

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.sample .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/soundwave
JWT_SECRET=your_super_secret_key_change_this
ADMIN_EMAIL=admin@example.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

> **Admin:** Register with the email set in `ADMIN_EMAIL` — that user auto-gets admin role via the backend check.

Start backend:
```bash
npm run dev
# Runs on http://localhost:5000
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

---

### 4. Seed Sample Data (optional)

```bash
cd backend
npm run seed:songs
npm run seed:albums
```

---

## 🔐 Auth Flow

| Action | How |
|--------|-----|
| Register | POST `/api/auth/register` — creates account, returns JWT |
| Login | POST `/api/auth/login` — validates credentials, returns JWT |
| Token stored | `localStorage` as `sw_token` |
| Auth header | `Authorization: Bearer <token>` on all API calls |
| Admin access | User whose email matches `ADMIN_EMAIL` in `.env` |

---

## ✨ Features

- 🔐 Email/password register & login (custom JWT, no third-party auth)
- 🎵 Music streaming with playback controls (play, pause, skip, seek, volume)
- 💬 Real-time chat between users via Socket.io
- 👥 Friends activity — see what others are listening to live
- 🗂️ Album browsing
- 🛡️ Admin dashboard — add/delete songs and albums (Cloudinary upload)
- 📱 Responsive layout with resizable panels
