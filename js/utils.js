// ============================================================
// utils.js — funciones chiquitas que se repiten en varias páginas
// ============================================================

/**
 * Convierte un Timestamp de Firestore (o Date) al formato
 * "7/16/2026 | 1:47AM" que se usa en toda la app.
 */
export function formatearFecha(timestamp) {
  if (!timestamp) return "";
  const fecha = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

  const dia = fecha.getMonth() + 1 + "/" + fecha.getDate() + "/" + fecha.getFullYear();

  let horas = fecha.getHours();
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const ampm = horas >= 12 ? "PM" : "AM";
  horas = horas % 12;
  if (horas === 0) horas = 12;

  return `${dia} | ${horas}:${minutos}${ampm}`;
}

/** Recorta un texto a N caracteres y agrega "..." si hace falta */
export function recortarTexto(texto, limite = 28) {
  if (!texto) return "";
  const limpio = texto.trim().replace(/\s+/g, " ");
  return limpio.length > limite ? limpio.slice(0, limite) + "..." : limpio;
}
