// ============================================================
// ver-carta.js — lógica exclusiva de ver-carta.html
// Sirve tanto para "abriste una carta de tu bandeja" como para
// "abriste una carta que tú enviaste" (parámetro ?origen=).
// ============================================================

import { db, doc, getDoc, updateDoc } from "./firebase-config.js";
import { requerirSesion } from "./session.js";
import { inicializarBotonCasaDirecto } from "./modal-casa.js";
import { obtenerHoja } from "./hojas-config.js";
import { formatearFecha } from "./utils.js";

requerirSesion();
inicializarBotonCasaDirecto();

const parametros = new URLSearchParams(window.location.search);
const idCarta = parametros.get("id");
const origen = parametros.get("origen"); // "bandeja" | "enviadas"

const hojaEl = document.getElementById("hoja-visor");
const textoEl = document.getElementById("carta-texto");
const fechaEl = document.getElementById("carta-fecha");
const horaEl = document.getElementById("carta-hora");
const contadorEl = document.getElementById("contador-hoja");
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");
const cargandoEl = document.getElementById("ver-carta-cargando");
const layoutEl = document.querySelector(".ver-carta-layout");

let paginas = [];
let paginaActual = 0;
let fechaTexto = ""; // ya formateada, se reparte igual en todas las hojas

async function cargarCarta() {
  if (!idCarta) {
    volverAOrigen();
    return;
  }

  try {
    const snap = await getDoc(doc(db, "cartas", idCarta));

    if (!snap.exists()) {
      volverAOrigen();
      return;
    }

    const carta = snap.data();
    paginas = carta.paginas && carta.paginas.length ? carta.paginas : ["(esta carta no tiene texto)"];

    const hoja = obtenerHoja(carta.hojaTipo);
    hojaEl.classList.add(hoja.clase);
    hojaEl.style.color = hoja.colorTexto;

    const fechaCompleta = formatearFecha(carta.fechaEnvio); // "7/16/2026 | 1:47AM"
    const [parteFecha, parteHora] = fechaCompleta.split(" | ");
    fechaEl.textContent = parteFecha || "";
    horaEl.textContent = parteHora || "";

    // Si la abrimos desde la bandeja de entrada y no estaba leída, la marcamos
    if (origen === "bandeja" && carta.leida === false) {
      updateDoc(doc(db, "cartas", idCarta), { leida: true }).catch((e) =>
        console.error("No se pudo marcar como leída:", e)
      );
    }

    mostrarPagina(0);
    cargandoEl.hidden = true;
    layoutEl.style.removeProperty("display");
  } catch (err) {
    console.error("Error cargando la carta:", err);
    cargandoEl.textContent = "No se pudo cargar la carta. Revisa tu internet.";
  }
}

function mostrarPagina(indice) {
  paginaActual = indice;
  textoEl.textContent = paginas[indice];
  contadorEl.textContent = `Hoja ${indice + 1}/${paginas.length}`;

  btnAnterior.disabled = indice === 0;
  btnSiguiente.disabled = indice === paginas.length - 1;

  hojaEl.classList.remove("cambiando");
  void hojaEl.offsetWidth; // reinicia la animación cada vez
  hojaEl.classList.add("cambiando");
}

btnAnterior.addEventListener("click", () => {
  if (paginaActual > 0) mostrarPagina(paginaActual - 1);
});
btnSiguiente.addEventListener("click", () => {
  if (paginaActual < paginas.length - 1) mostrarPagina(paginaActual + 1);
});

function volverAOrigen() {
  window.location.href = origen === "enviadas" ? "tus-cartas.html" : "bandeja.html";
}

layoutEl.style.display = "none"; // se muestra hasta que ya haya datos, evita parpadeo
cargarCarta();