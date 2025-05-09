# Frontend Repo

This project serves the purpose of completing a technical test for EBUDDY PTE. LTD built with **Next.js 14+**, **React MUI**, and **Redux Toolkit**, connected to a backend powered by the **Firebase Emulator**.

---

## Backend Application
You can find the backend application related to this repository [here](https://github.com/gumthea/backend-repo).

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gumthea/frontend-repo.git
cd frontend-repo
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🧪 Local Development with Firebase Emulator

### Start Backend Emulator

Go to your **backend repo** and run:

```bash
npm run build && firebase emulators:start --only functions
```

### Start Frontend

Back in the frontend project, run:

```bash
npm run dev
```

---

## 📌 Usage

Once both the frontend and backend are running, open your browser and visit:

```bash
http://localhost:3000
```

---

## 🔧 Tech Stack

`TYPESCRIPT`&ensp;
`NODEJS`&ensp;
`NEXTJS`&ensp;
`REDUX`&ensp;
`FIREBASE`&ensp;

---

## 🔐 Features

- View and update user data
- Integrated with local Firebase Emulator for testing
- Centralized state handling with Redux
- UI feedback via MUI Typography and Snackbar
