"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/hub");
    } catch (err: any) {

      setError("Acesso negado. Verifique seu e-mail e chave de acesso.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050508",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Montserrat', sans-serif"
    }}>
      {/* Background Aura */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(197, 160, 89, 0.05) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div style={{
        width: "100%",
        maxWidth: "420px",
        zIndex: 1,
        animation: "fadeIn 1s ease-out"
      }}>

        <div style={{
          background: "rgba(10, 10, 20, 0.4)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(197, 160, 89, 0.15)",
          borderRadius: "4px",
          padding: "50px 40px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.8)"
        }}>
          {/* Logo / Title Area */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h1 style={{ 
                color: "#C5A059", 
                fontSize: "10px", 
                fontWeight: "700", 
                letterSpacing: "8px", 
                textTransform: "uppercase",
                marginBottom: "10px"
              }}>
                Sommers Store
              </h1>
              <h2 style={{ 
                color: "#F5F5DC", 
                fontSize: "18px", 
                fontFamily: "'Libre Baskerville', serif",
                fontStyle: "italic",
                opacity: 0.9
              }}>
                Acesso de Elite
              </h2>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "9px", color: "rgba(197,160,89,0.7)", letterSpacing: "2px", textTransform: "uppercase" }}>E-mail de Compra</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(197, 160, 89, 0.1)",
                  padding: "12px 16px",
                  color: "#F5F5DC",
                  fontSize: "14px",
                  borderRadius: "2px",
                  outline: "none",
                  transition: "border-color 0.3s"
                }}
                disabled={loading}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "9px", color: "rgba(197,160,89,0.7)", letterSpacing: "2px", textTransform: "uppercase" }}>Chave de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(197, 160, 89, 0.1)",
                  padding: "12px 16px",
                  color: "#F5F5DC",
                  fontSize: "14px",
                  borderRadius: "2px",
                  outline: "none"
                }}
                disabled={loading}
              />
            </div>

            {error && (
              <p style={{ color: "#ef4444", fontSize: "11px", textAlign: "center", margin: "10px 0" }}>{error}</p>
            )}

            <button 
              type="submit"
              disabled={loading}
              style={{
                marginTop: "10px",
                background: "linear-gradient(135deg, #C5A059 0%, #A67C37 100%)",
                border: "none",
                padding: "15px",
                color: "#050508",
                fontWeight: "700",
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: "2px",
                boxShadow: "0 10px 20px rgba(197, 160, 89, 0.1)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
            >
              {loading ? "Verificando..." : "Entrar no Protocolo"}
            </button>
          </form>

          <p style={{ marginTop: "30px", fontSize: "10px", color: "rgba(245, 245, 220, 0.4)", textAlign: "center", lineHeight: "1.6" }}>
            Seu acesso foi enviado para o e-mail cadastrado <br /> no momento da aquisição.
          </p>
        </div>
      </div>
      
    </div>
  );
}
