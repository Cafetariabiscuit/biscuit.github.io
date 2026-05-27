import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

const form = document.getElementById("form-login");
const msg = document.getElementById("msg-login");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    if (cred.user.email === "abdullahmahercacul@gmail.com") {
      localStorage.setItem("adminLogged", "true");
      window.location.href = "admin.html";
    } else {
      msg.textContent = "Este utilizador não tem acesso de administrador.";
    }
  } catch (error) {
    msg.textContent = "Erro no login: email ou palavra-passe incorretos.";
  }
});
