import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const db = getDatabase(app);
const form = document.getElementById("form-encomenda");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    email: document.getElementById("email").value.trim(),
    produto: document.getElementById("produto").value,
    quantidade: document.getElementById("quantidade").value,
    sabor: document.getElementById("sabor").value.trim(),
    texto: document.getElementById("texto").value.trim(),
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    entrega: document.getElementById("entrega").value,
    observacoes: document.getElementById("observacoes").value.trim(),
    criadoEm: Date.now()
  };

  push(ref(db, "encomendas"), dados)
    .then(() => {
      form.reset();
      alert("Encomenda enviada com sucesso!");
    })
    .catch((error) => {
      console.log(error.code, error.message);
      alert("Erro ao enviar encomenda.");
    });
});
