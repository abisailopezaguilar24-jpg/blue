// ============================================================
// home.js — lógica exclusiva de home.html
// ============================================================

import { db, collection, query, where, getDocs } from "./firebase-config.js";
import { requerirSesion } from "./session.js";

const sesion = requerirSesion(); // si no hay sesión, ya redirigió a index.html

// ------------------------------------------------------------
// 1) Bienvenida + frase de amor aleatoria (hasta 10 posibles)
// ------------------------------------------------------------
const FRASES_AMOR = [
  "Cada día contigo se siente como el primero.",
  "Eres mi lugar favorito en cualquier ciudad.",
  "Contigo hasta lo simple se vuelve especial.",
  "Mi corazón sigue eligiéndote, siempre.",
  "Eres la razón por la que sonrío sin motivo.",
  "Contigo el tiempo pasa distinto, mejor.",
  "Eres mi calma en medio de todo.",
  "Cada carta es un poquito más de mí, para ti.",
  "Gracias por hacer de lo cotidiano algo bonito.",
  "Eres mi persona favorita, hoy y siempre.",
];

document.getElementById("home-bienvenida").textContent = `Welcome ${sesion.nombre}`;
document.getElementById("home-frase").textContent =
  FRASES_AMOR[Math.floor(Math.random() * FRASES_AMOR.length)];

// ------------------------------------------------------------
// 2) Corazones subiendo, en orden aleatorio, sin parar
// ------------------------------------------------------------
const contenedorCorazones = document.getElementById("contenedor-corazones");

function crearCorazon() {
  const corazon = document.createElement("span");
  corazon.className = "corazon-flotante";
  corazon.textContent = "❤";

  const izquierda = Math.random() * 100; // % dentro del contenedor
  const duracion = 2.8 + Math.random() * 2.2; // 2.8s a 5s
  const tamano = 1.1 + Math.random() * 1.1; // rem

  corazon.style.left = `${izquierda}%`;
  corazon.style.animationDuration = `${duracion}s`;
  corazon.style.fontSize = `${tamano}rem`;

  contenedorCorazones.appendChild(corazon);

  // Lo quitamos del DOM cuando termina, para no acumular elementos
  setTimeout(() => corazon.remove(), duracion * 1000 + 100);
}

// Lanza un corazón nuevo cada tanto, en momentos aleatorios
function cicloDeCorazones() {
  crearCorazon();
  const siguiente = 350 + Math.random() * 500; // entre 0.35s y 0.85s
  setTimeout(cicloDeCorazones, siguiente);
}
cicloDeCorazones();

// ------------------------------------------------------------
// 3) Contador de cartas no leídas (badge rojo en la campana)
// ------------------------------------------------------------
async function cargarNoLeidas() {
  try {
    const q = query(
      collection(db, "cartas"),
      where("para", "==", sesion.username),
      where("leida", "==", false)
    );
    const snap = await getDocs(q);
    const badge = document.getElementById("badge-no-leidas");
    if (snap.size > 0) {
      badge.textContent = snap.size;
      badge.hidden = false;
    }
  } catch (err) {
    console.error("No se pudo cargar el contador de no leídas:", err);
  }
}
cargarNoLeidas();

// ------------------------------------------------------------
// 4) Navegación
// ------------------------------------------------------------
document.getElementById("btn-enviadas").addEventListener("click", () => {
  window.location.href = "tus-cartas.html";
});

document.getElementById("btn-bandeja").addEventListener("click", () => {
  window.location.href = "bandeja.html";
});

document.getElementById("btn-nueva-carta").addEventListener("click", () => {
  window.location.href = "elegir-hoja.html";
});