// ============================================================
// confirmar-envio.js — lógica exclusiva de confirmar-envio.html
// Aquí es donde la carta realmente se guarda en Firestore.
// ============================================================

import {
  db,
  collection,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "./firebase-config.js";
import {
  requerirSesion,
  obtenerHojaElegida,
  obtenerPaginasFinal,
  obtenerTextoCarta,
  borrarBorradorCarta,
} from "./session.js";
import { inicializarBotonCasa } from "./modal-casa.js";
import { recortarTexto } from "./utils.js";

const sesion = requerirSesion();
inicializarBotonCasa(); // seguimos armando/enviando la carta, aquí sí preguntamos

// Si por alguna razón llegamos aquí sin haber pasado por la vista previa
// (por ejemplo, el usuario tecleó la URL directo), lo regresamos.
let paginas = obtenerPaginasFinal();
if (!paginas || paginas.length === 0) {
  const texto = obtenerTextoCarta();
  if (!texto || !texto.trim()) {
    window.location.href = "escribir-carta.html";
  }
  paginas = [texto];
}

const hojaId = obtenerHojaElegida();

const btnSi = document.getElementById("btn-si");
const btnNo = document.getElementById("btn-no");
const modalConfirmarNo = document.getElementById("modal-confirmar-no");
const modalExito = document.getElementById("modal-exito");
const cargandoEl = document.getElementById("ce-cargando");

// ------------------------------------------------------------
// "SI" -> se guarda de verdad en Firestore
// ------------------------------------------------------------
btnSi.addEventListener("click", async () => {
  cargandoEl.style.display = "flex";
  btnSi.disabled = true;
  btnNo.disabled = true;

  try {
    // Buscamos quién es "la pareja" del usuario actual, para saber a
    // quién le llega la carta (campo "pareja" en /usuarios/{tuUsuario})
    const snapUsuario = await getDoc(doc(db, "usuarios", sesion.username));
    const datosUsuario = snapUsuario.exists() ? snapUsuario.data() : {};
    const destinatario = datosUsuario.pareja;

    if (!destinatario) {
      throw new Error(
        'Falta el campo "pareja" en tu documento de /usuarios en Firestore.'
      );
    }

    await addDoc(collection(db, "cartas"), {
      de: sesion.username,
      para: destinatario,
      hojaTipo: hojaId,
      paginas: paginas,
      preview: recortarTexto(paginas[0], 40),
      fechaEnvio: serverTimestamp(),
      leida: false,
    });

    cargandoEl.style.display = "none";
    modalExito.classList.add("activo");

    setTimeout(() => {
      borrarBorradorCarta();
      window.location.href = "home.html";
    }, 3000);
  } catch (err) {
    console.error("Error enviando la carta:", err);
    cargandoEl.style.display = "none";
    btnSi.disabled = false;
    btnNo.disabled = false;
    alert("No se pudo enviar la carta. Revisa tu internet e intenta de nuevo.");
  }
});

// ------------------------------------------------------------
// "NO" -> pregunta si de verdad no la quiere enviar
// ------------------------------------------------------------
btnNo.addEventListener("click", () => {
  modalConfirmarNo.classList.add("activo");
});

// Dentro de ese modal: "Si, descartar" -> se pierde el borrador, va a inicio
document.getElementById("btn-no-si").addEventListener("click", () => {
  borrarBorradorCarta();
  window.location.href = "home.html";
});

// Dentro de ese modal: "No, seguir aquí" -> se cierra el modal, nada más
document.getElementById("btn-no-no").addEventListener("click", () => {
  modalConfirmarNo.classList.remove("activo");
});