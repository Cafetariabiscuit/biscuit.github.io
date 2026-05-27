import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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

  push(ref(db, "encomendas"), dados);
  form.reset();
  alert("Encomenda enviada com sucesso!");
});
