const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const dotenv = require('dotenv');
const path = require('path');

// Carregar variáveis do .env.local da loja
dotenv.config({ path: path.join(__dirname, '../projects/loja-digital/.env.local') });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

async function createEliteUser() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const email = "elite@sommersstore.com";
  const pass = "Elite2026!";

  console.log(`🚀 Tentando criar usuário: ${email}...`);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    console.log("✅ Usuário de Elite criado com sucesso!");
    console.log(`📍 Email: ${email}`);
    console.log(`📍 Pass: ${pass}`);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("ℹ️ O usuário já existe e está pronto para uso.");
    } else {
      console.error("❌ Erro ao criar usuário:", error.message);
    }
  }
}

createEliteUser();
