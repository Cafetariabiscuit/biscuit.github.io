import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBl1uMOvD5zwvwnOoVBee5sQAx7J0nJyxA",
  authDomain: "admin-biscuit.firebaseapp.com",
  databaseURL: "https://admin-biscuit-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "admin-biscuit",
  storageBucket: "admin-biscuit.firebasestorage.app",
  messagingSenderId: "429461746107",
  appId: "1:429461746107:web:91512d7afd7b1b8d7b949e",
  measurementId: "G-KF4L1Y4L0D"
};

if (localStorage.getItem("adminLogged") !== "true") {
  window.location.href = "login.html";
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const lista = document.getElementById("lista-encomendas");
const adminEmail = document.getElementById("admin-email");
const logoutBtn = document.getElementById("logout-btn");

const email = localStorage.getItem("adminEmail") || "";
if (adminEmail && email) {
  adminEmail.textContent = `Sessão: ${email}`;
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("adminLogged");
    localStorage.removeItem("adminEmail");
    window.location.href = "login.html";
  });
}

function formatarData(timestamp) {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleString("pt-PT");
}

onValue(ref(db, "encomendas"), (snapshot) => {
  const dados = snapshot.val();

  if (!dados) {
    lista.innerHTML = '<div class="empty">Nenhuma encomenda encontrada.</div>';
    return;
  }

  const encomendas = Object.entries(dados).map(([id, item]) => ({ id, ...item }));

  lista.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Sabor</th>
            <th>Texto</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Entrega</th>
            <th>Observações</th>
            <th>Criado em</th>
          </tr>
        </thead>
        <tbody>
          ${encomendas.map((e) => `
            <tr>
              <td>${e.nome || ""}</td>
              <td>${e.telefone || ""}</td>
              <td>${e.email || ""}</td>
              <td>${e.produto || ""}</td>
              <td>${e.quantidade || ""}</td>
              <td>${e.sabor || ""}</td>
              <td>${e.texto || ""}</td>
              <td>${e.data || ""}</td>
              <td>${e.hora || ""}</td>
              <td>${e.entrega || ""}</td>
              <td>${e.observacoes || ""}</td>
              <td>${formatarData(e.criadoEm)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

let primeiraVez = true; 

const audioNotificacao = new Audio("notificacao.mp3");

function mostrarPopup(mensagem) {
  const popup = document.createElement("div");
  popup.textContent = mensagem;
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.background = "#ff4081";
  popup.style.color = "white";
  popup.style.padding = "14px 20px";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  popup.style.fontSize = "16px";
  popup.style.zIndex = "9999";
  popup.style.opacity = "0";
  popup.style.transition = "opacity 0.4s ease";

  document.body.appendChild(popup);

  setTimeout(() => popup.style.opacity = "1", 50);
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 400);
  }, 3500);
}

let ultimaContagem = 0;

onValue(ref(db, "encomendas"), (snap) => {
  const dados = snap.val() || {};
  const total = Object.keys(dados).length;

  if (!primeiraVez && total > ultimaContagem) {
    audioNotificacao.play();
    mostrarPopup("📦 Nova encomenda recebida!");
  }

  primeiraVez = false;
  ultimaContagem = total;
});
