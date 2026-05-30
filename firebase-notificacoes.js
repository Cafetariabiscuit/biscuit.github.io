import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBl1uMOvD5zwvwnOoVBee5sQAx7J0nJyxA",
  authDomain: "admin-biscuit.firebaseapp.com",
  databaseURL: "https://admin-biscuit-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "admin-biscuit",
  messagingSenderId: "429461746107",
  appId: "1:429461746107:web:91512d7afd7b1b8d7b949e"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const db = getDatabase(app);

const VAPID_KEY = "BOrC6wUpJZGmifxQI7KUE0jItcNSK_8IIS4Iv8NxbmFzN5xdeM-IvI0bfDXxulgozQvncVx8mNSN5IDBIbF4";

Notification.requestPermission().then(async (perm) => {
  if (perm === "granted") {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });

    await set(ref(db, "adminTokens/" + token), true);

    console.log("Token registado:", token);
  }
});

onMessage(messaging, (payload) => {
  new Notification(payload.notification.title, {
    body: payload.notification.body
  });
});
