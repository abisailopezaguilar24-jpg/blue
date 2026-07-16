// ============================================================
// elegir-hoja.js — lógica exclusiva de elegir-hoja.html
// Genera los círculos a partir de HOJAS (hojas-config.js), así
// que agregar una hoja nueva ahí la agrega aquí automáticamente,
// sin tocar este archivo.
// ============================================================

import { requerirSesion, guardarHojaElegida } from "./session.js";
import { inicializarBotonCasa } from "./modal-casa.js";
import { HOJAS } from "./hojas-config.js";

requerirSesion();
inicializarBotonCasa(); // aquí SÍ preguntamos, estamos armando una carta

const contenedorCirculos = document.getElementById("elegir-circulos");
const previewEl = document.getElementById("elegir-preview");
const btnContinuar = document.getElementById("btn-continuar");

let hojaSeleccionada = HOJAS[0].id;

// ------------------------------------------------------------
// Genera un círculo por cada hoja del catálogo
// ------------------------------------------------------------
HOJAS.forEach((hoja, indice) => {
  const boton = document.createElement("button");
  boton.className = "circulo-hoja";
  boton.dataset.hoja = hoja.id;
  boton.setAttribute("aria-label", hoja.nombre);
  if (indice === 0) boton.classList.add("activo");

  boton.innerHTML = `<div class="mini-hoja hoja-base ${hoja.clase}"></div>`;

  boton.addEventListener("click", () => seleccionarHoja(hoja.id));

  contenedorCirculos.appendChild(boton);
});

function seleccionarHoja(id) {
  if (id === hojaSeleccionada) return; // ya estaba elegida, no repetir animación

  hojaSeleccionada = id;

  // Actualiza cuál círculo se ve "activo" (más grande)
  document.querySelectorAll(".circulo-hoja").forEach((btn) => {
    btn.classList.toggle("activo", btn.dataset.hoja === id);
  });

  // Actualiza la vista previa grande
  const hoja = HOJAS.find((h) => h.id === id);
  // Quita cualquier clase de hoja anterior (todas empiezan con "hoja-")
  previewEl.className = "hoja-base elegir-preview";
  previewEl.classList.add(hoja.clase);

  previewEl.classList.remove("cambiando");
  void previewEl.offsetWidth; // reinicia animación
  previewEl.classList.add("cambiando");
}

// Aplica la hoja inicial (la primera) a la vista previa desde el arranque
previewEl.classList.add(HOJAS[0].clase);

// ------------------------------------------------------------
// Continuar: guarda la elección y pasa al editor de texto
// ------------------------------------------------------------
btnContinuar.addEventListener("click", () => {
  guardarHojaElegida(hojaSeleccionada);
  window.location.href = "escribir-carta.html";
});