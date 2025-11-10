// Inicializar Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBcanFKEo5vYy_qptBTrp8gSqgM2gttd48",
  authDomain: "biscuit-avaliacoes.firebaseapp.com",
  databaseURL: "https://biscuit-avaliacoes-default-rtdb.firebaseio.com",
  projectId: "biscuit-avaliacoes",
  storageBucket: "biscuit-avaliacoes.firebasestorage.app",
  messagingSenderId: "551726007541",
  appId: "1:551726007541:web:9b7e47358ab57ccbd9f1bc"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Enviar avaliação para Firebase
document.getElementById("form-avaliacao").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const comentario = document.getElementById("comentario").value.trim();
  const avaliacao = document.getElementById("avaliacao").value;

  if (!nome || !comentario || !avaliacao) return;

  db.ref("avaliacoes").push({ nome, comentario, avaliacao });

  document.getElementById("form-avaliacao").reset();
});

// Mostrar avaliações do Firebase
function mostrarAvaliacoes() {
  const container = document.getElementById("lista-avaliacoes");
  container.innerHTML = "";

  db.ref("avaliacoes").on("value", snapshot => {
    container.innerHTML = "";
    snapshot.forEach(child => {
      const av = child.val();
      const bloco = document.createElement("div");
      bloco.innerHTML = `
        <strong>${av.nome}</strong><br>
        ${"⭐".repeat(av.avaliacao)}<br>
        <p>${av.comentario}</p>
        <hr>
      `;
      container.appendChild(bloco);
    });
  });
}

mostrarAvaliacoes();
