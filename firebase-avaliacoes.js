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
const lista = document.getElementById("lista-avaliacoes");

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
  lista.innerHTML = "";

  if (!snapshot.exists()) {
    lista.innerHTML = "<p style='text-align:center;'>Ainda não existem avaliações.</p>";
    return;
  }

  const avaliacoes = [];
  snapshot.forEach((child) => {
    avaliacoes.push(child.val());
  });

  avaliacoes.reverse();

  avaliacoes.forEach((av) => {
    const item = document.createElement("div");
    item.className = "card";
    item.style.marginBottom = "12px";
    item.innerHTML = `
      <strong>${av.nome}</strong><br>
      <span style="color:#f5a623;">${"⭐".repeat(av.avaliacao)}</span>
      <p style="margin:8px 0 0;">${av.comentario}</p>
    `;
    lista.appendChild(item);
  });
});
