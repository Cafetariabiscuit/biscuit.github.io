import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const ADMIN_EMAIL = "abdullahmahercacul@gmail.com";
const form = document.getElementById("form-login");
const msg = document.getElementById("msg-login");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (msg) msg.textContent = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

try {
  const cred = await signInWithEmailAndPassword(auth, email, password);

  // Verifica se o email do utilizador corresponde ao admin definido
  if (cred.user && cred.user.email === ADMIN_EMAIL) {
    localStorage.setItem("adminLogged", "true");
    localStorage.setItem("adminEmail", cred.user.email);
    window.location.href = "admin.html";
  } else {
    msg.style.color = "#b00020";
    msg.textContent = "Este utilizador não tem acesso de administrador.";
  }
} catch (error) {
  console.log("Firebase error:", error.code, error.message);

  msg.style.color = "#b00020";

  if (error.code === "auth/invalid-email") {
    msg.textContent = "Email inválido. Verifica o formato do email.";
  } else if (error.code === "auth/wrong-password") {
    msg.textContent = "Palavra-passe incorreta.";
  } else if (error.code === "auth/user-not-found") {
    msg.textContent = "Utilizador não encontrado.";
  } else if (error.code === "auth/network-request-failed") {
    msg.textContent = "Erro de rede. Verifica a ligação.";
  } else {
    msg.textContent = "Erro no login. Vê a consola do navegador para mais detalhes.";
  }
}
