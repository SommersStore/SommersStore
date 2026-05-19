"use strict";

const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractCustomer(body) {
  // Kiwify pode enviar Customer (maiúsculo) ou customer (minúsculo)
  const c = body?.Customer ?? body?.customer
          ?? body?.data?.Customer ?? body?.data?.customer
          ?? {};
  return {
    email: (c.email ?? "").toLowerCase().trim(),
    name:  (c.name  ?? "").trim() || "Aristocrata",
  };
}

function extractEvent(body) {
  return body?.event ?? body?.webhook_event ?? "";
}

// Dispara o e-mail de redefinição de senha pela infraestrutura nativa do Firebase.
// O template é configurável em: Firebase Console → Authentication → Templates → Redefinição de senha
// O botão do e-mail redireciona para o continueUrl abaixo.
async function sendPasswordResetEmail(email) {
  const apiKey = process.env.GCP_AUTH_API_KEY;
  const continueUrl = "https://essenciaativabr.shop/hub";

  const resp = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email,
        continueUrl,
      }),
    }
  );

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(`Firebase sendOobCode falhou: ${err?.error?.message ?? resp.status}`);
  }

  return await resp.json();
}

// ---------------------------------------------------------------------------
// Cloud Function
// ---------------------------------------------------------------------------

exports.kiwifyWebhook = onRequest(
  { region: "southamerica-east1", cors: false },
  async (req, res) => {
    // 1. Método
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    // 2. Validação via segredo na URL (?s=...)
    // O Kiwify não encaminha o Token do painel como header — a segurança vem
    // do segredo embutido na própria URL que só a Kiwify conhece.
    const expectedSecret = process.env.WEBHOOK_SECRET;
    if (expectedSecret && req.query.s !== expectedSecret) {
      console.warn("kiwifyWebhook: acesso não autorizado", { ip: req.ip });
      return res.status(401).json({ error: "unauthorized" });
    }

    // 3. Evento
    const event = extractEvent(req.body);
    const ALLOWED_EVENTS = [
      "order.approved",
      "order.paid",
      "order.complete",
      "order_approved",
      "order_paid",
    ];

    if (!ALLOWED_EVENTS.includes(event)) {
      console.info("kiwifyWebhook: evento ignorado", { event });
      return res.status(200).json({ ok: true, skipped: true, event });
    }

    // 4. Dados do cliente
    const { email, name } = extractCustomer(req.body);
    if (!email) {
      console.error("kiwifyWebhook: email não encontrado no payload", req.body);
      return res.status(400).json({ error: "email missing in payload" });
    }

    // 5. Criar ou recuperar usuário no Firebase Auth
    let uid;
    let isNewUser = false;
    try {
      const existing = await admin.auth().getUserByEmail(email);
      uid = existing.uid;
      console.info("kiwifyWebhook: usuário já existe", { email, uid });
    } catch (notFound) {
      if (notFound.code !== "auth/user-not-found") throw notFound;
      const created = await admin.auth().createUser({
        email,
        displayName: name,
        emailVerified: false,
      });
      uid = created.uid;
      isNewUser = true;
      console.info("kiwifyWebhook: usuário criado", { email, uid });
    }

    // 6. Enviar e-mail de redefinição de senha via Firebase Auth (sem SMTP externo)
    await sendPasswordResetEmail(email);
    console.info("kiwifyWebhook: e-mail de acesso enviado", { email, uid, isNewUser });

    return res.status(200).json({ ok: true, uid, email, isNewUser, emailSent: true });
  }
);
