"use client";

import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, isConfigValid } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextPath, setNextPath] = useState("/hub");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedPath = params.get("next");

    if (requestedPath?.startsWith("/")) {
      setNextPath(requestedPath);
    }
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!isConfigValid || !auth) {
      setError("Firebase ainda nao esta configurado neste ambiente.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(nextPath);
    } catch (err) {
      setError("Acesso negado. Verifique seu e-mail e chave de acesso.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #111827 0%, #172554 48%, #312e81 100%)",
      display: "grid",
      placeItems: "center",
      padding: "20px",
      fontFamily: "var(--font-geist-sans)",
      color: "#f8fafc"
    }}>
      <section style={{
        width: "min(430px, 100%)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: "8px",
        padding: "32px",
        background: "rgba(15,23,42,0.76)",
        boxShadow: "0 28px 80px rgba(15,23,42,0.38)",
        backdropFilter: "blur(18px)"
      }}>
        <div style={{ marginBottom: "28px" }}>
          <p style={{ color: "#67e8f9", fontSize: "12px", fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 10px" }}>
            Sommers Store
          </p>
          <h1 style={{ margin: "0 0 10px", fontSize: "30px", lineHeight: 1.05 }}>Painel privado</h1>
          <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6 }}>
            Entre para controlar projetos, squads, agentes, skills, clones e integracoes.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "grid", gap: "16px" }}>
          <label style={{ display: "grid", gap: "8px", color: "#bfdbfe", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={loading}
              style={{
                width: "100%",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: "8px",
                padding: "13px 14px",
                background: "rgba(255,255,255,0.08)",
                color: "#f8fafc",
                fontSize: "15px",
                outline: "none"
              }}
            />
          </label>

          <label style={{ display: "grid", gap: "8px", color: "#bfdbfe", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={loading}
              style={{
                width: "100%",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: "8px",
                padding: "13px 14px",
                background: "rgba(255,255,255,0.08)",
                color: "#f8fafc",
                fontSize: "15px",
                outline: "none"
              }}
            />
          </label>

          {error ? <p style={{ color: "#fecaca", fontSize: "13px", margin: "2px 0 0" }}>{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              border: "none",
              borderRadius: "8px",
              padding: "14px 16px",
              background: "linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)",
              color: "#0f172a",
              cursor: loading ? "wait" : "pointer",
              fontSize: "13px",
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}
