// ============================================================
// session.js
// Maneja quién es el usuario que inició sesión, usando
// sessionStorage (se borra al cerrar la pestaña, es más seguro
// que localStorage para este tipo de app personal).
// ============================================================

const SESSION_KEY = "carta_blue_sesion";

/**
 * Guarda al usuario que inició sesión.
 * @param {string} username - el id del documento en /usuarios
 * @param {string} nombre - el nombre a mostrar (campo "nombre")
 */
export function guardarSesion(username, nombre) {
  const datos = { username, nombre };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(datos));
}

/**
 * Regresa { username, nombre } o null si nadie ha iniciado sesión.
 */
export function obtenerSesion() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/** Borra la sesión (para un futuro botón de "cerrar sesión" si lo quieres). */
export function borrarSesion() {
  sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Protege una página: si nadie ha iniciado sesión, regresa al login.
 * Llama esto al principio de cada página que NO sea index.html.
 * @returns {{username:string, nombre:string}} la sesión activa
 */
export function requerirSesion() {
  const sesion = obtenerSesion();
  if (!sesion) {
    window.location.href = "index.html";
    // Lanzamos para detener el resto del script de la página actual
    throw new Error("Sin sesión activa, redirigiendo a index.html");
  }
  return sesion;
}

/**
 * Guarda qué tipo de hoja eligió el usuario para la carta que está
 * escribiendo AHORA MISMO (viaja entre la página 7, 8 y 9).
 */
export function guardarHojaElegida(hojaId) {
  sessionStorage.setItem("carta_blue_hoja_elegida", hojaId);
}
export function obtenerHojaElegida() {
  return sessionStorage.getItem("carta_blue_hoja_elegida") || "papel";
}

/**
 * Guarda el texto que el usuario está escribiendo en el editor,
 * para que sobreviva el viaje entre "escribir" -> "vista previa".
 */
export function guardarTextoCarta(texto) {
  sessionStorage.setItem("carta_blue_texto", texto);
}
export function obtenerTextoCarta() {
  return sessionStorage.getItem("carta_blue_texto") || "";
}
export function borrarBorradorCarta() {
  sessionStorage.removeItem("carta_blue_hoja_elegida");
  sessionStorage.removeItem("carta_blue_texto");
  sessionStorage.removeItem("carta_blue_paginas_final");
}

/**
 * Guarda el arreglo YA calculado de páginas (cada una cabiendo
 * exactamente en una hoja), para pasar de vista-previa.html a
 * confirmar-envio.html sin tener que recalcular todo otra vez.
 */
export function guardarPaginasFinal(paginas) {
  sessionStorage.setItem("carta_blue_paginas_final", JSON.stringify(paginas));
}
export function obtenerPaginasFinal() {
  const raw = sessionStorage.getItem("carta_blue_paginas_final");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}