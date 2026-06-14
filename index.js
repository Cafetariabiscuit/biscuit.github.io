const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configurar email (Gmail com palavra-passe de app)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "TEU_EMAIL@gmail.com",
    pass: "PALAVRA_PASSE_APP"
  }
});

// Função HTTPS chamada pelo admin
exports.enviarConfirmacao = functions.https.onCall(async (data, context) => {
  if (!context.auth || context.auth.token.email !== "abdullahmahercacul@gmail.com") {
    throw new functions.https.HttpsError("permission-denied", "Acesso negado.");
  }

  const { email, nome } = data;

  const mailOptions = {
    from: "Biscuit <TEU_EMAIL@gmail.com>",
    to: email,
    subject: "Confirmação da sua encomenda",
    text: `Olá ${nome}, a sua encomenda foi confirmada! Obrigado pela preferência.`
  };

  await transporter.sendMail(mailOptions);

  return { ok: true };
});
