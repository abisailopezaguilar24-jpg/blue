// ============================================================
// login.js — lógica exclusiva de index.html
// ============================================================

import { db, doc, getDoc } from "./firebase-config.js";
import { guardarSesion } from "./session.js";

const form = document.getElementById("form-login");
const inputUsuario = document.getElementById("input-usuario");
const inputPassword = document.getElementById("input-password");
const errorTexto = document.getElementById("login-error");
const pantallaCarga = document.getElementById("pantalla-carga");

form.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const usuario = inputUsuario.value.trim();
  const password = inputPassword.value;

  if (!usuario || !password) return;

  mostrarError(""); // limpia error previo
  pantallaCarga.style.display = "flex";

  try {
    // Buscamos el documento /usuarios/{usuario}
    const refUsuario = doc(db, "usuarios", usuario);
    const snap = await getDoc(refUsuario);

    if (!snap.exists()) {
      mostrarError("Usuario o contraseña incorrectos");
      return;
    }

    const datos = snap.data();

    if (datos.password !== password) {
      mostrarError("Usuario o contraseña incorrectos");
      return;
    }

    // Todo bien: guardamos la sesión y pasamos a "Inicio"
    guardarSesion(usuario, datos.nombre || usuario);
    window.location.href = "home.html";
  } catch (err) {
    console.error(err);
    mostrarError("No se pudo conectar. Revisa tu internet.");
  } finally {
    pantallaCarga.style.display = "none";
  }
});

function mostrarError(mensaje) {
  errorTexto.textContent = mensaje;
  if (mensaje) {
    errorTexto.classList.remove("mostrar");
    // fuerza el reflow para que la animación se repita cada vez
    void errorTexto.offsetWidth;
    errorTexto.classList.add("mostrar");
  }
}