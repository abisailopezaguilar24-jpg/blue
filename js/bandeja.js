// ============================================================
// bandeja.js — lógica exclusiva de bandeja.html
// Muestra las cartas donde "para" == usuario actual, con punto
// rojo si no se ha leído, ordenadas de la más reciente a la más
// vieja.
// ============================================================

import { db, collection, query, where, orderBy, getDocs } from "./firebase-config.js";
import { requerirSesion } from "./session.js";
import { inicializarBotonCasaDirecto } from "./modal-casa.js";
import { formatearFecha, recortarTexto } from "./utils.js";

const sesion = requerirSesion();
inicializarBotonCasaDirecto();

const listaEl = document.getElementById("lista-cartas");
const vacioEl = document.getElementById("lista-vacio");

async function cargarBandeja() {
  mostrarSkeletons();

  try {
    const q = query(
      collection(db, "cartas"),
      where("para", "==", sesion.username),
      orderBy("fechaEnvio", "desc")
    );
    const snap = await getDocs(q);

    listaEl.innerHTML = "";

    if (snap.empty) {
      vacioEl.hidden = false;
      return;
    }

    let indice = 0;
    snap.forEach((docSnap) => {
      const carta = docSnap.data();
      const li = crearItemCarta(docSnap.id, carta, indice);
      listaEl.appendChild(li);
      indice++;
    });
  } catch (err) {
    console.error("Error cargando bandeja:", err);
    listaEl.innerHTML = "";
    vacioEl.hidden = false;
    vacioEl.textContent = "No se pudo cargar tu bandeja. Revisa tu internet.";
  }
}

function crearItemCarta(id, carta, indice) {
  const li = document.createElement("li");
  li.className = "item-carta";
  li.style.animationDelay = `${indice * 0.06}s`;

  const preview = recortarTexto(carta.preview || carta.paginas?.[0] || "", 26);
  const fecha = formatearFecha(carta.fechaEnvio);

  li.innerHTML = `
    <span class="item-carta-texto">${preview}</span>
    <span class="item-carta-fecha">${fecha}</span>
    ${carta.leida ? "" : '<span class="item-carta-punto"></span>'}
  `;

  li.addEventListener("click", () => {
    window.location.href = `ver-carta.html?id=${id}&origen=bandeja`;
  });

  return li;
}

function mostrarSkeletons() {
  listaEl.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const li = document.createElement("li");
    li.className = "item-carta skeleton";
    li.innerHTML = `<span class="item-carta-texto">&nbsp;</span>`;
    listaEl.appendChild(li);
  }
}

cargarBandeja();