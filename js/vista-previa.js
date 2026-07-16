// ============================================================
// vista-previa.js — lógica exclusiva de vista-previa.html
//
// LA PARTE MÁS DELICADA DE TODA LA APP:
// Toma el texto completo que escribió el usuario y lo reparte
// en "páginas" (hojas), cada una con exactamente el texto que
// cabe en el espacio real disponible de esa hoja — ni más, ni
// menos — usando un elemento oculto idéntico para medir.
// ============================================================

import { requerirSesion, obtenerHojaElegida, obtenerTextoCarta, guardarPaginasFinal } from "./session.js";
import { inicializarBotonCasa } from "./modal-casa.js";
import { obtenerHoja } from "./hojas-config.js";
import { formatearFecha } from "./utils.js";

requerirSesion();
inicializarBotonCasa(); // seguimos armando la carta, aquí sí preguntamos

const texto = obtenerTextoCarta();
if (!texto || !texto.trim()) {
  // No hay nada escrito todavía, no tiene caso estar aquí
  window.location.href = "escribir-carta.html";
}

const hojaId = obtenerHojaElegida();
const hoja = obtenerHoja(hojaId);

const hojaEl = document.getElementById("vp-hoja");
const textoEl = document.getElementById("vp-texto");
const fechaEl = document.getElementById("vp-fecha");
const horaEl = document.getElementById("vp-hora");
const contadorEl = document.getElementById("vp-contador");
const btnAnterior = document.getElementById("vp-anterior");
const btnSiguiente = document.getElementById("vp-siguiente");
const btnLito = document.getElementById("btn-lito");
const calculandoEl = document.getElementById("vp-calculando");
const layoutEl = document.querySelector(".vp-layout");

hojaEl.classList.add(hoja.clase);
hojaEl.style.color = hoja.colorTexto;

const fechaCompleta = formatearFecha(new Date());
const [parteFecha, parteHora] = fechaCompleta.split(" | ");
fechaEl.textContent = parteFecha || "";
horaEl.textContent = parteHora || "";

let paginas = [];
let paginaActual = 0;

layoutEl.style.visibility = "hidden";

// Esperamos a que la fuente "Kalam" esté realmente cargada antes de medir,
// si no, mediríamos con una fuente de reemplazo y saldría mal.
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve())
  .then(() => {
    // Un pequeño respiro extra para que el layout ya esté totalmente listo
    requestAnimationFrame(() => requestAnimationFrame(iniciarPaginado));
  });

function iniciarPaginado() {
  paginas = calcularPaginas(texto);
  guardarPaginasFinal(paginas);

  layoutEl.style.visibility = "visible";
  calculandoEl.hidden = true;

  mostrarPagina(0);
}

// ------------------------------------------------------------
// Divide el texto en tokens (palabras + saltos de línea reales)
// ------------------------------------------------------------
function tokenizar(cadena) {
  const lineas = cadena.split("\n");
  const tokens = [];
  lineas.forEach((linea, indice) => {
    const palabras = linea.split(/\s+/).filter(Boolean);
    tokens.push(...palabras);
    if (indice < lineas.length - 1) tokens.push("\n");
  });
  return tokens;
}

// Reconstruye un texto legible a partir de un arreglo de tokens
function unirTokens(tokens) {
  let resultado = "";
  tokens.forEach((token) => {
    if (token === "\n") {
      resultado += "\n";
    } else if (resultado.length === 0 || resultado.endsWith("\n")) {
      resultado += token;
    } else {
      resultado += " " + token;
    }
  });
  return resultado;
}

// ------------------------------------------------------------
// El corazón del asunto: mide con un clon oculto, palabra por
// palabra, hasta dónde cabe el texto en cada hoja.
// ------------------------------------------------------------
function calcularPaginas(textoCompleto) {
  const anchoReal = hojaEl.getBoundingClientRect().width;

  // Creamos un clon EXACTO de la hoja (mismas clases, mismo ancho en px)
  const medidor = hojaEl.cloneNode(true);
  medidor.style.position = "absolute";
  medidor.style.visibility = "hidden";
  medidor.style.left = "-99999px";
  medidor.style.top = "0";
  medidor.style.width = anchoReal + "px";
  medidor.style.maxWidth = "none";
  document.body.appendChild(medidor);

  const medidorTexto = medidor.querySelector(".hoja-texto");

  const tokens = tokenizar(textoCompleto);
  const resultado = [];
  let actual = [];

  for (let i = 0; i < tokens.length; i++) {
    const tentativo = [...actual, tokens[i]];
    medidorTexto.textContent = unirTokens(tentativo);

    const sobrepasa = medidorTexto.scrollHeight > medidorTexto.clientHeight;

    if (sobrepasa && actual.length > 0) {
      // Ya no cabe: cerramos esta página con lo que sí cabía
      resultado.push(unirTokens(actual));
      // Empezamos la siguiente hoja con la palabra que no cupo
      actual = tokens[i] === "\n" ? [] : [tokens[i]];
    } else {
      actual = tentativo;
    }
  }

  if (actual.length > 0) {
    resultado.push(unirTokens(actual));
  }

  document.body.removeChild(medidor);

  return resultado.length > 0 ? resultado : [textoCompleto];
}

// ------------------------------------------------------------
// Navegación entre hojas ya paginadas
// ------------------------------------------------------------
function mostrarPagina(indice) {
  paginaActual = indice;
  textoEl.textContent = paginas[indice];
  contadorEl.textContent = `Hoja ${indice + 1}/${paginas.length}`;

  btnAnterior.disabled = indice === 0;
  btnSiguiente.disabled = indice === paginas.length - 1;

  hojaEl.classList.remove("cambiando");
  void hojaEl.offsetWidth;
  hojaEl.classList.add("cambiando");
}

btnAnterior.addEventListener("click", () => {
  if (paginaActual > 0) mostrarPagina(paginaActual - 1);
});
btnSiguiente.addEventListener("click", () => {
  if (paginaActual < paginas.length - 1) mostrarPagina(paginaActual + 1);
});

// ------------------------------------------------------------
// Botón "LITO" -> pasa a la pantalla de confirmar envío
// ------------------------------------------------------------
btnLito.addEventListener("click", () => {
  window.location.href = "confirmar-envio.html";
});