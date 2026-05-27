import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const auth = getAuth(app);
const db = getDatabase(app);
const lista = document.getElementById("lista-encomendas");

onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== "SEU_EMAIL_ADMIN_AQUI@gmail.com") {
    window.location.href = "login.html";
    return;
}
  
onValue(ref(db, "encomendas"), (snapshot) => {
  lista.innerHTML = "";

  if (!snapshot.exists()) {
    lista.innerHTML = "<p>Sem encomendas ainda.</p>";
    return;
  }

  const encomendas = [];
  snapshot.forEach((child) => encomendas.push(child.val()));
  encomendas.reverse();

  encomendas.forEach((e) => {
    const div = document.createElement("div");
    div.className = "card";
    div.style.marginBottom = "16px";
    div.innerHTML = `
      <strong>${e.nome}</strong><br>
      <small>${e.telefone} | ${e.email}</small><br>
      <p><strong>Produto:</strong> ${e.produto}</p>
      <p><strong>Quantidade:</strong> ${e.quantidade}</p>
      <p><strong>Sabor/Modelo:</strong> ${e.sabor || "-"}</p>
      <p><strong>Texto:</strong> ${e.texto || "-"}</p>
      <p><strong>Data:</strong> ${e.data || "-"}</p>
      <p><strong>Hora:</strong> ${e.hora || "-"}</p>
      <p><strong>Entrega:</strong> ${e.entrega || "-"}</p>
      <p><strong>Observações:</strong> ${e.observacoes || "-"}</p>
    `;
    lista.appendChild(div);
  });
});
