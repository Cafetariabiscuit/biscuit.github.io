import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcanFKEo5vYy_qptBTrp8gSqgM2gttd48",
  authDomain: "biscuit-avaliacoes.firebaseapp.com",
  databaseURL: "https://biscuit-avaliacoes-default-rtdb.firebaseio.com",
  projectId: "biscuit-avaliacoes",
  storageBucket: "biscuit-avaliacoes.firebasestorage.app",
  messagingSenderId: "551726007541",
  appId: "1:551726007541:web:9b7e47358ab57ccbd9f1bc"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById("form-avaliacao");
const container = document.getElementById("lista-avaliacoes");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const comentario = document.getElementById("comentario").value.trim();
  const avaliacao = document.getElementById("avaliacao").value;

  if (!nome || !comentario || !avaliacao) return;

  push(ref(db, "avaliacoes"), {
    nome,
    comentario,
    avaliacao: Number(avaliacao),
    data: Date.now()
  });

  form.reset();
});

onValue(ref(db, "avaliacoes"), (snapshot) => {
  container.innerHTML = "";

  if (!snapshot.exists()) {
    container.innerHTML = "<p>Sem avaliações ainda.</p>";
    return;
  }

  snapshot.forEach((child) => {
    const av = child.val();
    const bloco = document.createElement("div");
    bloco.className = "avaliacao-item";
    bloco.innerHTML = `
      <strong>${av.nome}</strong><br>
      ${"⭐".repeat(av.avaliacao)}<br>
      <p>${av.comentario}</p>
      <hr>
    `;
    container.appendChild(bloco);
  });
});
