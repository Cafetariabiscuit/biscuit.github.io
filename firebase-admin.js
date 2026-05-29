import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const lista = document.getElementById("lista-encomendas");
const ADMIN_EMAIL = "abdullahmahercacul@gmail.com";

onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== ADMIN_EMAIL) {
    window.location.href = "login.html";
    return;
  }

  const encomendasRef = ref(db, "encomendas");

  onValue(encomendasRef, (snapshot) => {
    lista.innerHTML = "";

    if (!snapshot.exists()) {
      lista.innerHTML = "<p>Sem encomendas ainda.</p>";
      return;
    }

    const encomendas = [];
    snapshot.forEach((child) => {
      encomendas.push({ id: child.key, ...child.val() });
    });

    encomendas.reverse();

    encomendas.forEach((e) => {
      const div = document.createElement("div");
      div.className = "card";
      div.style.marginBottom = "16px";
      div.innerHTML = `
        <strong>${e.nome || "-"}</strong><br>
        <small>${e.telefone || "-"} | ${e.email || "-"}</small>
        <p><strong>Produto:</strong> ${e.produto || "-"}</p>
        <p><strong>Quantidade:</strong> ${e.quantidade || "-"}</p>
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
});
