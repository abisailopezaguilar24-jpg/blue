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

  // ---------------- Hojas nuevas (tanda 2) ----------------
  {
    id: "amarillo-sol",
    nombre: "Amarillo Sol",
    clase: "hoja-amarillo-sol",
    colorTexto: "#5c4400",
  },
  {
    id: "formal-clasico",
    nombre: "Formal Clásico",
    clase: "hoja-formal-clasico",
    colorTexto: "#2b2b2b",
  },
  {
    id: "bosque",
    nombre: "Bosque",
    clase: "hoja-bosque",
    colorTexto: "#1f3d20",
  },
  {
    id: "oceano",
    nombre: "Océano",
    clase: "hoja-oceano",
    colorTexto: "#0d3049",
  },
  {
    id: "vintage",
    nombre: "Vintage",
    clase: "hoja-vintage",
    colorTexto: "#4a3620",
  },
  {
    id: "geometrico",
    nombre: "Geométrico Pastel",
    clase: "hoja-geometrico",
    colorTexto: "#3a3355",
  },
  {
    id: "galaxia",
    nombre: "Galaxia",
    clase: "hoja-galaxia",
    colorTexto: "#e8e8ff",
  },
  {
    id: "acuarela",
    nombre: "Acuarela",
    clase: "hoja-acuarela",
    colorTexto: "#3a3a3a",
  },
  {
    id: "corporativo",
    nombre: "Corporativo",
    clase: "hoja-corporativo",
    colorTexto: "#1a2b4a",
  },
  {
    id: "fiesta",
    nombre: "Fiesta",
    clase: "hoja-fiesta",
    colorTexto: "#3a1a4a",
  },

  // ---------------- Hojas nuevas (tanda 3) ----------------
  {
    id: "sakura",
    nombre: "Sakura",
    clase: "hoja-sakura",
    colorTexto: "#5c2140",
  },
  {
    id: "cafe",
    nombre: "Café",
    clase: "hoja-cafe",
    colorTexto: "#3d2817",
  },
  {
    id: "musica",
    nombre: "Música",
    clase: "hoja-musica",
    colorTexto: "#1a1a1a",
  },
  {
    id: "desierto",
    nombre: "Desierto",
    clase: "hoja-desierto",
    colorTexto: "#5c3a1e",
  },
  {
    id: "invierno",
    nombre: "Invierno",
    clase: "hoja-invierno",
    colorTexto: "#1a3a5c",
  },
  {
    id: "mapa-tesoro",
    nombre: "Mapa del Tesoro",
    clase: "hoja-mapa-tesoro",
    colorTexto: "#3a2a15",
  },
  {
    id: "neon",
    nombre: "Neón",
    clase: "hoja-neon",
    colorTexto: "#f2e8ff",
  },
  {
    id: "boho",
    nombre: "Bohemio",
    clase: "hoja-boho",
    colorTexto: "#5c3620",
  },
  {
    id: "dulce",
    nombre: "Dulce",
    clase: "hoja-dulce",
    colorTexto: "#5c2060",
  },
  {
    id: "kraft",
    nombre: "Kraft Reciclado",
    clase: "hoja-kraft",
    colorTexto: "#3a2a1a",
  },
];

/** Regresa la configuración de una hoja según su id (o "papel" si no existe) */
export function obtenerHoja(id) {
  return HOJAS.find((h) => h.id === id) || HOJAS[0];
}