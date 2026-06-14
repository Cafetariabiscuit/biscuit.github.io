import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (!user || user.email !== "abdullahmahercacul@gmail.com") {
    window.location.href = "login.html";
  } else {
    document.getElementById("admin-email").textContent = `Sessão: ${user.email}`;
  }

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
            <th>Confirmar</th>
            <th>Apagar</th>
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

              <td>
                ${e.confirmado
                  ? "<span style='color:green;font-weight:bold;'>✔ Confirmado</span>"
                  : `<button class="btn-confirmar" data-id="${e.id}" data-email="${e.email}" data-nome="${e.nome}">Confirmar</button>`
                }
              </td>

              <td>
                <button class="btn-apagar" data-id="${e.id}">Apagar</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  // ===============================
  // 8. LISTENER: CONFIRMAR ENCOMENDA
  // ===============================
  document.querySelectorAll(".btn-confirmar").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const email = btn.dataset.email;
      const nome = btn.dataset.nome;

      // 1) Marcar como confirmada
      await update(ref(db, "encomendas/" + id), {
        confirmado: true
      });

      // 2) Chamar Cloud Function
      const enviarConfirmacao = httpsCallable(functions, "enviarConfirmacao");
      await enviarConfirmacao({ email, nome });

      alert("Encomenda confirmada e email enviado!");
    });
  });

  // ===============================
  // 9. LISTENER: APAGAR ENCOMENDA
  // ===============================
  document.querySelectorAll(".btn-apagar").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      if (!confirm("Tens a certeza que queres apagar esta encomenda?")) return;

      await remove(ref(db, "encomendas/" + id));

      alert("Encomenda apagada!");
    });
  });

});
