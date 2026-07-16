// ============================================================
// modal-casa.js
// El icono de "casa" aparece en casi todas las páginas.
// Al picarle pregunta "Inicio? no quieres terminar la carta?".
// Esta función se llama UNA VEZ en cada página (excepto index
// y home, donde no hace falta) para inyectar el ícono + su modal.
// ============================================================

import { borrarBorradorCarta } from "./session.js";

/**
 * Inserta el botón de casa (fijo, esquina sup. derecha) y el modal
 * de confirmación asociado. Si el usuario confirma, borra cualquier
 * borrador de carta en progreso y lo manda a home.html
 */
export function inicializarBotonCasa() {
  // Evita duplicados si la función se llama más de una vez
  if (document.querySelector(".icono-casa")) return;

  crearBotonConModal();
}

/**
 * Versión SIN modal de confirmación: se usa en páginas donde NO se
 * está escribiendo una carta (Bandeja, Tus Cartas, Ver Carta).
 * Al picarle, manda directo a home.html.
 */
export function inicializarBotonCasaDirecto() {
  if (document.querySelector(".icono-casa")) return;

  const boton = document.createElement("button");
  boton.className = "icono-casa";
  boton.setAttribute("aria-label", "Ir al inicio");
  boton.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3z"/></svg>
  `;
  boton.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  document.body.appendChild(boton);
}

/** Crea el botón + su modal de confirmación (uso interno) */
function crearBotonConModal() {

  const boton = document.createElement("button");
  boton.className = "icono-casa";
  boton.setAttribute("aria-label", "Ir al inicio");
  boton.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3z"/></svg>
  `;

  const modal = document.createElement("div");
  modal.className = "modal-fondo";
  modal.id = "modal-casa";
  modal.innerHTML = `
    <div class="modal-caja">
      <h2>¿Inicio?<br>¿No quieres terminar la carta?</h2>
      <div class="modal-botones">
        <button class="modal-boton oki" id="btn-casa-oki">Oki</button>
        <button class="modal-boton no" id="btn-casa-no">No</button>
      </div>
    </div>
  `;

  document.body.appendChild(boton);
  document.body.appendChild(modal);

  boton.addEventListener("click", () => modal.classList.add("activo"));

  // "Oki" = se queda en la carta, solo cierra el modal
  modal.querySelector("#btn-casa-oki").addEventListener("click", () => {
    modal.classList.remove("activo");
  });

  // "No" = de verdad se quiere ir, lo mandamos a inicio
  modal.querySelector("#btn-casa-no").addEventListener("click", () => {
    borrarBorradorCarta();
    window.location.href = "home.html";
  });
}