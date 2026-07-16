// ============================================================
// hojas-config.js
// Catálogo central de los diseños de hoja disponibles.
// Para agregar una hoja nueva en el futuro, solo agrega un
// objeto más a este arreglo y crea su clase CSS en hojas.css
// (busca la sección "AGREGAR HOJA NUEVA AQUÍ" en ese archivo).
// ============================================================

export const HOJAS = [
  {
    id: "papel",
    nombre: "Papel sencillo",
    clase: "hoja-papel",
    colorTexto: "#3a3226",
  },
  {
    id: "rosa",
    nombre: "Corazones rosa",
    clase: "hoja-rosa",
    colorTexto: "#5c2a3a",
  },
  {
    id: "roja",
    nombre: "Corazones rojos",
    clase: "hoja-roja",
    colorTexto: "#3a1010",
  },
  {
    id: "tulipan",
    nombre: "Tulipán",
    clase: "hoja-tulipan",
    colorTexto: "#3a3418",
  },
  {
    id: "dorada",
    nombre: "Dorada elegante",
    clase: "hoja-dorada",
    colorTexto: "#4a3d10",
  },
];

/** Regresa la configuración de una hoja según su id (o "papel" si no existe) */
export function obtenerHoja(id) {
  return HOJAS.find((h) => h.id === id) || HOJAS[0];
}