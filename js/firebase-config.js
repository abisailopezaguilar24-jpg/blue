// ============================================================
// firebase-config.js
// Configuración central de Firebase. Este archivo se importa
// (como <script type="module">) en TODAS las páginas del sitio.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Tu configuración real de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAF91WFtFeN2ETGAEJoj3Y6BGSxFNLPdmo",
  authDomain: "cartas-3ddfa.firebaseapp.com",
  projectId: "cartas-3ddfa",
  storageBucket: "cartas-3ddfa.firebasestorage.app",
  messagingSenderId: "825126036347",
  appId: "1:825126036347:web:8e4235a321a121154853de",
  measurementId: "G-CKPJD6C39D"
};

// Inicializamos Firebase una sola vez para todo el sitio
const app = initializeApp(firebaseConfig);

// Analytics solo funciona en navegador y a veces falla en local/file://,
// por eso lo protegemos con isSupported()
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

// Firestore: esta es la base de datos que usaremos en todas las páginas
const db = getFirestore(app);

// Exportamos todo lo que las demás páginas van a necesitar
export {
  db,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp
};
