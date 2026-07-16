// ============================================================
// escribir-carta.js — lógica exclusiva de escribir-carta.html
// ============================================================

import { requerirSesion, guardarTextoCarta, obtenerTextoCarta } from "./session.js";
import { inicializarBotonCasa } from "./modal-casa.js";

requerirSesion();
inicializarBotonCasa(); // aquí sí preguntamos: se está armando la carta

const textarea = document.getElementById("texto-carta");
const btnContinuar = document.getElementById("btn-continuar");
const modalAcabaste = document.getElementById("modal-acabaste");

// Si el usuario ya había escrito algo y se regresó, lo recuperamos
textarea.value = obtenerTextoCarta();
textarea.focus();

// Vamos guardando el texto mientras escribe, por si cierra sin querer
textarea.addEventListener("input", () => {
  guardarTextoCarta(textarea.value);
});

btnContinuar.addEventListener("click", () => {
  if (!textarea.value.trim()) {
    textarea.focus();
    return; // no tiene sentido preguntar si no ha escrito nada
  }
  guardarTextoCarta(textarea.value);
  modalAcabaste.classList.add("activo");
});

// "Si" -> pasa a la vista previa
document.getElementById("btn-acabaste-si").addEventListener("click", () => {
  window.location.href = "vista-previa.html";
});

// "No" -> se cierra el modal y sigue escribiendo
document.getElementById("btn-acabaste-no").addEventListener("click", () => {
  modalAcabaste.classList.remove("activo");
  textarea.focus();
});