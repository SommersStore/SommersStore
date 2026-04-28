"use client";

import React, { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import "../design-system.css";

export default function EliteHub() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("produtos");
  const [currentTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const products = [
    {
      id: "cofre-master",
      title: "O Cofre Master",
      tag: "ADQUIRIDO",
      desc: "O protocolo completo de alquimia para criação de produtos de desejo e alto valor percebido.",
      cover: "/ebook/master_cover_v2.png",
      progress: 65,
      type: "Protocolo Principal"
    },
    {
      id: "sinergias",
      title: "30 Sinergias de Sucesso",
      tag: "BÔNUS",
      desc: "Receitas prontas e testadas para acelerar sua produção e escala comercial.",
      cover: "/ebook/capa_mistica_esmeralda.png",
      progress: 40,
      type: "Extensão de Valor"
    },
    {
      id: "fornecedores",
      title: "Cofre de Fornecedores",
      tag: "EXCLUSIVE",
      desc: "O mapa definitivo dos maiores produtores de ativos e embalagens premium do mercado.",
      cover: "/ebook/capa_mistica_dourada.png",
      progress: 100,
      type: "Guia Estratégico"
    },
    {
        id: "ritual-noite",
        title: "Ritual da Meia-Noite",
        tag: "OFFER",
        desc: "Protocolos ancestrais para descanso profundo e aterramento energético.",
        cover: "/ebook/capa_mistica_rubi.png",
        progress: 15,
        type: "Edição Especial"
    }
  ];

  return (
    <AuthGuard>
      <div className="members-layout" style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--ss-color-black)",
        color: "var(--ss-color-cream)",
        overflow: "hidden"
      }}>
        
        {/* --- SIDEBAR ELITE --- */}
        <aside style={{
          width: "280px",
          borderRight: "1px solid rgba(197, 160, 89, 0.1)",
          background: "rgba(10, 10, 15, 0.6)",
          backdropFilter: "blur(40px)",
          padding: "var(--ss-space-lg)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 100
        }}>
          <div style={{ marginBottom: "var(--ss-space-xl)" }}>
            <h1 style={{ 
              fontSize: "13px", 
              fontWeight: "900", 
              letterSpacing: "8px", 
              textTransform: "uppercase",
              color: "var(--ss-color-gold)",
              margin: 0,
              fontFamily: "var(--ss-font-master)"
            }}>
              Sommers Store
            </h1>
            <p style={{ fontSize: "8px", opacity: 0.3, letterSpacing: "3px", marginTop: "8px", fontWeight: "700" }}>ELITE PORTAL v2.0</p>
          </div>

          <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
            <button key="tab-prod" onClick={() => setActiveTab("produtos")} style={navItemStyle(activeTab === "produtos")}>
              <span style={{ opacity: 0.4, fontSize: '8px', marginRight: '12px' }}>01</span> MEUS CONTEÚDOS
            </button>
            <button key="tab-com" onClick={() => setActiveTab("comunidade")} style={navItemStyle(activeTab === "comunidade")}>
              <span style={{ opacity: 0.4, fontSize: '8px', marginRight: '12px' }}>02</span> COMUNIDADE ELITE
            </button>
            <button key="tab-rec" onClick={() => setActiveTab("arquivos")} style={navItemStyle(activeTab === "arquivos")}>
              <span style={{ opacity: 0.4, fontSize: '8px', marginRight: '12px' }}>03</span> ARQUIVOS ATÔMICOS
            </button>
            <button key="tab-sup" onClick={() => setActiveTab("suporte")} style={navItemStyle(activeTab === "suporte")}>
              <span style={{ opacity: 0.4, fontSize: '8px', marginRight: '12px' }}>04</span> SUPORTE DIRETO
            </button>
          </nav>

          <div style={{ borderTop: "1px solid rgba(197, 160, 89, 0.1)", paddingTop: "30px", marginTop: "30px" }}>
            <div style={{ padding: "0 10px", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--ss-color-gold-muted)", border: "1px solid var(--ss-color-gold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>💎</div>
                <div>
                   <p style={{ fontSize: "10px", fontWeight: "700", margin: 0 }}>Aristocrata</p>
                   <p style={{ fontSize: "8px", opacity: 0.4, margin: 0 }}>Membro Nível 4</p>
                </div>
              </div>
              <p style={{ fontSize: "9px", opacity: 0.6, margin: 0, color: "var(--ss-color-gold)", textTransform: "uppercase", letterSpacing: "1px" }}>
                {auth.currentUser?.email}
              </p>
            </div>
            
            <button 
              onClick={handleLogout}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
                fontSize: "8px",
                letterSpacing: "3px",
                padding: "12px",
                cursor: "pointer",
                transition: "all 0.3s",
                fontWeight: "700"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#C5A059"; e.currentTarget.style.background = "rgba(197, 160, 89, 0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            >
              ENCERRAR SESSÃO
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main style={{ flex: 1, padding: "var(--ss-space-xl)", maxWidth: "1500px", overflowY: "auto" }}>
          
          {/* CINEMATIC WELCOME */}
          <header style={{ marginBottom: "var(--ss-space-xl)", animation: "fadeIn 1.2s ease-out" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "15px", marginBottom: "10px" }}>
                <span style={{ fontSize: "12px", color: "var(--ss-color-gold)", fontWeight: "bold", letterSpacing: "4px" }}>BEM-VINDO AO COFRE,</span>
            </div>
            <h2 style={{ fontSize: "56px", fontWeight: "400", color: "var(--ss-color-cream)", margin: 0, letterSpacing: "-1px" }}>
              Ambiente de Mestria
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "25px", marginTop: "20px" }}>
              <div style={{ height: "1px", width: "100px", background: "var(--ss-color-gold)" }}></div>
              <p style={{ fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase", color: "var(--ss-color-gold)", opacity: 0.6 }}>
                Sommers Store Elite Membership
              </p>
            </div>
          </header>

          {/* QUICK DASHBOARD STATS */}
          <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "var(--ss-space-xl)" }}>
            {[
              { label: "ATIVOS NO COFRE", val: "04", sub: "Disponíveis" },
              { label: "PROGRESSO TOTAL", val: "72%", sub: "Concluído" },
              { label: "CONQUISTAS", val: "12", sub: "Desbloqueadas" },
              { label: "SESSÃO ATIVA", val: currentTime, sub: "Horário Local" }
            ].map((s, idx) => (
              <div key={idx} className="ss-card" style={{ padding: "25px", border: "1px solid rgba(197, 160, 89, 0.1)", background: "rgba(255,255,255,0.01)" }}>
                <p style={{ fontSize: "8px", opacity: 0.4, letterSpacing: "3px", marginBottom: "10px", textTransform: "uppercase" }}>{s.label}</p>
                <p style={{ fontSize: "28px", fontWeight: "300", color: "var(--ss-color-gold)", margin: 0 }}>
                  {s.val} <span style={{ fontSize: "11px", opacity: 0.4, fontWeight: "400", letterSpacing: "1px" }}>{s.sub}</span>
                </p>
              </div>
            ))}
          </section>

          {/* MAIN GRID */}
          <section style={{ animation: "fadeInUp 1s ease-out" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                <h3 style={{ fontSize: "14px", color: "var(--ss-color-cream)", letterSpacing: "6px", textTransform: "uppercase", margin: 0 }}>
                   Seu Acervo Aristocrático
                </h3>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--ss-color-gold)" }}></div>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }}></div>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }}></div>
                </div>
            </div>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))", 
              gap: "30px" 
            }}>
              {products.map(p => (
                <div 
                  key={p.id}
                  onClick={() => router.push(`/ebook/viewer/${p.id}`)}
                  className="ss-card"
                  style={{
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    border: "1px solid rgba(197, 160, 89, 0.08)",
                    background: "rgba(15, 15, 20, 0.4)",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-12px)";
                    e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.4)";
                    e.currentTarget.style.boxShadow = "0 40px 80px rgba(0,0,0,0.8)";
                    const img = e.currentTarget.querySelector('.banner-img') as HTMLElement;
                    if(img) img.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(197, 160, 89, 0.08)";
                    e.currentTarget.style.boxShadow = "none";
                    const img = e.currentTarget.querySelector('.banner-img') as HTMLElement;
                    if(img) img.style.transform = "scale(1)";
                  }}
                >
                  {/* Banner Image */}
                  <div style={{ height: "260px", overflow: "hidden", position: "relative" }}>
                    <div className="banner-img" style={{ 
                        width: "100%",
                        height: "100%",
                        background: `url('${p.cover}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "transform 0.8s ease"
                    }} />
                    <div style={{ 
                        position: "absolute", 
                        inset: 0, 
                        background: "linear-gradient(to bottom, rgba(5,5,8,0) 40%, rgba(5,5,8,0.95))" 
                    }} />
                    <div style={{ position: "absolute", top: "25px", left: "25px" }}>
                       <span style={{ 
                           background: "rgba(0,0,0,0.6)", 
                           backdropFilter: "blur(5px)", 
                           color: "var(--ss-color-gold)", 
                           border: "1px solid var(--ss-color-gold)", 
                           padding: "6px 12px", 
                           fontSize: "8px", 
                           fontWeight: "bold",
                           letterSpacing: "2px"
                       }}>{p.tag}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: "20px", left: "30px" }}>
                        <p style={{ fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "#C5A059", fontWeight: "700" }}>{p.type}</p>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div style={{ padding: "40px" }}>
                    <h4 style={{ fontSize: "26px", color: "var(--ss-color-cream)", marginBottom: "15px", fontWeight: "400", fontFamily: "var(--ss-font-editorial)" }}>
                        {p.title}
                    </h4>
                    <p style={{ fontSize: "12px", color: "rgba(245, 245, 220, 0.4)", lineHeight: "1.8", marginBottom: "35px", height: "44px", overflow: "hidden" }}>
                      {p.desc}
                    </p>
                    
                    {/* Mastery Indicator */}
                    <div style={{ marginBottom: "30px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <span style={{ fontSize: "8px", opacity: 0.5, letterSpacing: "2px" }}>NÍVEL DE MESTRIA</span>
                        <span style={{ fontSize: "9px", color: "var(--ss-color-gold)", fontWeight: "bold" }}>{p.progress}%</span>
                      </div>
                      <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.05)", position: "relative" }}>
                        <div style={{ 
                          width: `${p.progress}%`, 
                          height: "100%", 
                          background: "var(--ss-color-gold)", 
                          boxShadow: "0 0 15px rgba(197, 160, 89, 0.6)",
                          transition: "width 1.5s cubic-bezier(0.19, 1, 0.22, 1)"
                        }}></div>
                      </div>
                    </div>

                    <button className="ss-button-gold" style={{ width: "100%", paddingTop: "16px", paddingBottom: "16px", fontSize: "10px", letterSpacing: "4px" }}>
                        ENTRAR NO PROTOCOLO
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </AuthGuard>
  );
}

function navItemStyle(isActive: boolean): React.CSSProperties {
  return {
    padding: "18px 20px",
    textAlign: "left" as const,
    background: isActive ? "rgba(197, 160, 89, 0.08)" : "transparent",
    border: "none",
    color: isActive ? "var(--ss-color-gold)" : "rgba(245, 245, 220, 0.35)",
    fontSize: "10px",
    fontWeight: isActive ? "800" : "600",
    letterSpacing: "3px",
    cursor: "pointer",
    transition: "all 0.4s",
    borderLeft: isActive ? "3px solid var(--ss-color-gold)" : "3px solid transparent",
    fontFamily: "var(--ss-font-master)",
    display: "flex",
    alignItems: "center"
  };
}

