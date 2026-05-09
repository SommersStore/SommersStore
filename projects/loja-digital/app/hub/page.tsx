"use client";

import React, { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import "../design-system.css";

/* ─── tipos ─────────────────────────────── */
type CardAction =
  | { type: "viewer"; path: string }
  | { type: "pdf"; file: string }
  | { type: "both"; viewerPath: string; pdfFile: string }
  | { type: "soon" };

interface ProductCard {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  tag: string;
  tagVariant: "gold" | "green" | "purple" | "blue" | "muted";
  progress?: number;
  action: CardAction;
  locked?: boolean;
}

/* ─── catálogo ───────────────────────────── */
const PRINCIPAL: ProductCard[] = [
  {
    id: "metodo",
    title: "Método Essência Ativa BR",
    subtitle: "Ebook Principal · 144 pág.",
    cover: "/ebook/master_cover_v2.png",
    tag: "PRINCIPAL",
    tagVariant: "gold",
    progress: 0,
    action: { type: "pdf", file: "O_Cofre_das_Botanicas_Secretas.pdf" },
  },
];

const BONUS_PRINCIPAL: ProductCard[] = [
  {
    id: "bonus-blends",
    title: "10 Receitas de Blends",
    subtitle: "Bônus · Prontas para Vender",
    cover: "/sais/assets/bonus-1-v2.png",
    tag: "BÔNUS",
    tagVariant: "green",
    action: { type: "pdf", file: "30_Blends_OB1.pdf" },
  },
  {
    id: "bonus-fornecedores",
    title: "Lista de Fornecedores BR",
    subtitle: "Bônus · Preços e Contatos",
    cover: "/sais/assets/bonus-2.png",
    tag: "BÔNUS",
    tagVariant: "green",
    action: { type: "pdf", file: "Guia_Fornecedores_Master.pdf" },
  },
  {
    id: "bonus-posts",
    title: "Kit de Posts + Scripts",
    subtitle: "Bônus · Instagram & WhatsApp",
    cover: "/sais/assets/bonus-3.png",
    tag: "BÔNUS",
    tagVariant: "green",
    action: { type: "soon" },
  },
];

const ORDER_BUMPS: ProductCard[] = [
  {
    id: "ob1",
    title: "30 Blends Premium",
    subtitle: "Order Bump 01",
    cover: "/sais/assets/10-blends.png",
    tag: "OB 01",
    tagVariant: "blue",
    action: { type: "pdf", file: "30_Blends_OB1.pdf" },
  },
  {
    id: "ob2",
    title: "Mindset Alquimista",
    subtitle: "Order Bump 02",
    cover: "/ebook/capa_mistica_rosto.png",
    tag: "OB 02",
    tagVariant: "blue",
    action: { type: "pdf", file: "Mindset_OB2.pdf" },
  },
  {
    id: "ob3",
    title: "Em breve",
    subtitle: "Order Bump 03",
    cover: "/ebook/capa_mistica_banheira.png",
    tag: "OB 03",
    tagVariant: "muted",
    locked: true,
    action: { type: "soon" },
  },
];

const UPSELL: ProductCard[] = [
  {
    id: "cofre",
    title: "O Cofre das Botânicas Secretas",
    subtitle: "Upsell Principal · Viewer + PDFs",
    cover: "/ebook/master_cover_v2.png",
    tag: "UPSELL",
    tagVariant: "purple",
    progress: 65,
    action: {
      type: "both",
      viewerPath: "/ebook/viewer/cofre",
      pdfFile: "O_Cofre_das_Botanicas_Secretas.pdf",
    },
  },
  {
    id: "cofre-elite",
    title: "Edição Elite",
    subtitle: "Versão Premium Expandida",
    cover: "/ebook/capa_mistica_dourada.png",
    tag: "ELITE",
    tagVariant: "gold",
    action: { type: "pdf", file: "O_Cofre_das_Botanicas_Secretas_Elite.pdf" },
  },
];

const UPSELL_LINKED: ProductCard[] = [
  {
    id: "sinergias",
    title: "30 Sinergias de Sucesso",
    subtitle: "Ligado ao Upsell · 30 Fórmulas",
    cover: "/ebook/capa_mistica_esmeralda.png",
    tag: "BÔNUS",
    tagVariant: "green",
    progress: 40,
    action: { type: "viewer", path: "/ebook/viewer/sinergias" },
  },
  {
    id: "fornecedores",
    title: "Cofre de Fornecedores",
    subtitle: "Ligado ao Upsell · 15 Contatos",
    cover: "/ebook/capa_mistica_dourada.png",
    tag: "BÔNUS",
    tagVariant: "green",
    progress: 100,
    action: { type: "viewer", path: "/ebook/viewer/fornecedores" },
  },
  {
    id: "ritual-noite",
    title: "Ritual da Meia-Noite",
    subtitle: "Ligado ao Upsell · 10 Rituais",
    cover: "/ebook/capa_mistica_rubi.png",
    tag: "BÔNUS",
    tagVariant: "green",
    progress: 15,
    action: { type: "viewer", path: "/ebook/viewer/ritual-noite" },
  },
];

/* ─── helpers ────────────────────────────── */
const TAG_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  gold:   { bg: "rgba(197,160,89,0.12)",  color: "#C5A059", border: "rgba(197,160,89,0.35)" },
  green:  { bg: "rgba(111,175,111,0.12)", color: "#6FAF6F", border: "rgba(111,175,111,0.35)" },
  purple: { bg: "rgba(160,123,197,0.12)", color: "#A07BC5", border: "rgba(160,123,197,0.35)" },
  blue:   { bg: "rgba(100,149,237,0.12)", color: "#6495ED", border: "rgba(100,149,237,0.35)" },
  muted:  { bg: "rgba(255,255,255,0.04)", color: "rgba(229,229,229,0.3)", border: "rgba(255,255,255,0.1)" },
};

export default function EliteHub() {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const navigate = (action: CardAction) => {
    if (action.type === "viewer")      router.push(action.path);
    if (action.type === "both")        router.push(action.viewerPath);
    if (action.type === "pdf")         window.open(`/downloads/${action.file}`, "_blank");
  };

  return (
    <AuthGuard>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hub { display: flex; min-height: 100vh; background: #0a0a0d; color: #e0e0d0; font-family: 'Montserrat', sans-serif; }

        /* SIDEBAR */
        .hub-side {
          width: 220px; flex-shrink: 0;
          background: #0d0d11;
          border-right: 1px solid rgba(197,160,89,0.08);
          display: flex; flex-direction: column;
          padding: 32px 0;
          position: sticky; top: 0; height: 100vh; overflow-y: auto;
        }
        .hub-logo {
          padding: 0 24px 28px;
          border-bottom: 1px solid rgba(197,160,89,0.06);
          margin-bottom: 20px;
        }
        .hub-logo-text {
          font-size: 9px; font-weight: 900; letter-spacing: 6px;
          color: #C5A059; text-transform: uppercase; display: block;
        }
        .hub-logo-sub {
          font-size: 7px; letter-spacing: 2px; color: rgba(229,229,229,0.2);
          text-transform: uppercase; margin-top: 4px; display: block;
        }
        .hub-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 24px; font-size: 8px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(229,229,229,0.3); cursor: pointer;
          border-left: 2px solid transparent; transition: all 0.2s;
          background: none; border-top: none; border-right: none; border-bottom: none;
          width: 100%; text-align: left; font-family: 'Montserrat', sans-serif;
        }
        .hub-nav-item:hover { color: rgba(229,229,229,0.7); background: rgba(255,255,255,0.02); }
        .hub-nav-item.active { color: #C5A059; border-left-color: #C5A059; background: rgba(197,160,89,0.05); }
        .hub-nav-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }

        .hub-side-footer {
          margin-top: auto; padding: 20px 24px 0;
          border-top: 1px solid rgba(197,160,89,0.06);
        }
        .hub-user-badge {
          display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
        }
        .hub-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(197,160,89,0.1); border: 1px solid rgba(197,160,89,0.25);
          display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0;
        }
        .hub-user-name { font-size: 9px; font-weight: 700; color: #C5A059; letter-spacing: 1px; text-transform: uppercase; }
        .hub-user-email { font-size: 7px; color: rgba(229,229,229,0.25); letter-spacing: 0.3px; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px; }
        .hub-logout-btn {
          width: 100%; padding: 9px; background: none;
          border: 1px solid rgba(255,255,255,0.07); color: rgba(229,229,229,0.25);
          font-family: 'Montserrat', sans-serif; font-size: 7px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
        }
        .hub-logout-btn:hover { border-color: rgba(197,160,89,0.3); color: #C5A059; }

        /* MAIN */
        .hub-main { flex: 1; padding: 40px 48px 64px; overflow-y: auto; min-width: 0; }

        /* SECTION */
        .hub-section { margin-bottom: 48px; }
        .hub-section-header {
          display: flex; align-items: center; gap: 16px; margin-bottom: 20px;
        }
        .hub-section-num {
          width: 24px; height: 24px; border-radius: 50%;
          background: rgba(197,160,89,0.12); border: 1px solid rgba(197,160,89,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 900; color: #C5A059; flex-shrink: 0;
        }
        .hub-section-title { font-size: 9px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: rgba(229,229,229,0.35); }
        .hub-section-rule { flex: 1; height: 1px; background: rgba(197,160,89,0.07); }
        .hub-section-sub {
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px; margin-top: -4px; padding-left: 40px;
        }
        .hub-section-sub-label { font-size: 7px; letter-spacing: 3px; text-transform: uppercase; color: rgba(229,229,229,0.2); }
        .hub-section-sub-rule { flex: 1; height: 1px; background: rgba(255,255,255,0.04); }

        /* GRID */
        .hub-grid { display: flex; flex-wrap: wrap; gap: 14px; }

        /* CARD */
        .hub-card {
          width: 190px; flex-shrink: 0;
          background: #111118; border: 1px solid rgba(255,255,255,0.05);
          border-radius: 3px; overflow: hidden; cursor: pointer;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          position: relative;
        }
        .hub-card:hover {
          transform: translateY(-4px);
          border-color: rgba(197,160,89,0.22);
          box-shadow: 0 12px 32px rgba(0,0,0,0.5);
        }
        .hub-card.locked { opacity: 0.45; cursor: default; }
        .hub-card.locked:hover { transform: none; border-color: rgba(255,255,255,0.05); box-shadow: none; }

        /* CARD — featured (produto principal) */
        .hub-card.featured { width: 240px; }

        /* CARD image */
        .hub-card-img {
          width: 100%; aspect-ratio: 3/4; overflow: hidden; position: relative;
          background: #1a1a22;
        }
        .hub-card-img-inner {
          width: 100%; height: 100%; background-size: cover; background-position: center;
          transition: transform 0.5s;
        }
        .hub-card:hover .hub-card-img-inner { transform: scale(1.04); }
        .hub-card-img-fade {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(10,10,13,0.8) 100%);
        }
        .hub-card-tag {
          position: absolute; top: 10px; left: 10px;
          font-size: 6px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; padding: 3px 8px;
          border-radius: 2px; border: 1px solid;
        }
        .hub-card-lock-icon {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          background: rgba(10,10,13,0.6); font-size: 22px;
        }
        .hub-card-progress {
          position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
          background: rgba(255,255,255,0.06);
        }
        .hub-card-progress-fill { height: 100%; background: #C5A059; }
        .hub-badge-done {
          position: absolute; top: 10px; right: 10px;
          font-size: 6px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; padding: 3px 7px;
          background: rgba(111,175,111,0.2); color: #6faf6f;
          border: 1px solid rgba(111,175,111,0.4); border-radius: 2px;
        }

        /* CARD body */
        .hub-card-body { padding: 12px 14px 14px; }
        .hub-card-sub { font-size: 6px; letter-spacing: 2px; color: rgba(229,229,229,0.2); text-transform: uppercase; margin-bottom: 5px; }
        .hub-card-title { font-family: 'Libre Baskerville', serif; font-size: 13px; font-weight: 400; color: #e5e5e5; line-height: 1.3; margin-bottom: 10px; }
        .hub-card.featured .hub-card-title { font-size: 15px; }

        /* CARD actions */
        .hub-card-actions { display: flex; gap: 6px; }
        .hub-btn {
          flex: 1; padding: 7px 6px; font-family: 'Montserrat', sans-serif;
          font-size: 6px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s; border-radius: 2px; border: 1px solid;
          white-space: nowrap;
        }
        .hub-btn-primary {
          background: rgba(197,160,89,0.1); color: #C5A059; border-color: rgba(197,160,89,0.25);
        }
        .hub-btn-primary:hover { background: rgba(197,160,89,0.2); border-color: rgba(197,160,89,0.5); }
        .hub-btn-secondary {
          background: rgba(255,255,255,0.03); color: rgba(229,229,229,0.35); border-color: rgba(255,255,255,0.08);
        }
        .hub-btn-secondary:hover { background: rgba(255,255,255,0.06); color: rgba(229,229,229,0.6); }
        .hub-btn-soon {
          background: none; color: rgba(229,229,229,0.2); border-color: rgba(255,255,255,0.06);
          cursor: default; flex: 1; padding: 7px 6px;
          font-size: 6px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
        }

        /* FUNNEL arrow connector */
        .hub-funnel-arrow {
          display: flex; align-items: center; justify-content: center;
          height: 32px; gap: 8px; margin-bottom: 8px; padding-left: 40px;
        }
        .hub-funnel-arrow-line { flex: 1; height: 1px; background: rgba(197,160,89,0.1); max-width: 40px; }
        .hub-funnel-arrow-icon { font-size: 10px; color: rgba(197,160,89,0.3); }

        @media (max-width: 900px) {
          .hub-side { display: none; }
          .hub-main { padding: 24px 20px 48px; }
          .hub-card { width: 160px; }
          .hub-card.featured { width: 190px; }
        }
      `}</style>

      <div className="hub">
        {/* ── SIDEBAR ── */}
        <aside className="hub-side">
          <div className="hub-logo">
            <span className="hub-logo-text">Sommers Store</span>
            <span className="hub-logo-sub">Área de Membros</span>
          </div>

          {[
            { label: "Meu Acervo", dot: true },
            { label: "Comunidade", dot: false },
            { label: "Suporte", dot: false },
          ].map((item) => (
            <button key={item.label} className={`hub-nav-item${item.dot ? " active" : ""}`}>
              <span className="hub-nav-dot" />
              {item.label}
            </button>
          ))}

          <div className="hub-side-footer">
            <div className="hub-user-badge">
              <div className="hub-avatar">💎</div>
              <div>
                <div className="hub-user-name">Aristocrata</div>
                <div className="hub-user-email">{auth.currentUser?.email}</div>
              </div>
            </div>
            <button className="hub-logout-btn" onClick={handleLogout}>Encerrar sessão</button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="hub-main">

          {/* ①  PRODUTO PRINCIPAL */}
          <FunnelSection num="1" title="Produto Principal">
            <div className="hub-grid">
              {PRINCIPAL.map((p) => (
                <Card key={p.id} p={p} featured hovered={hovered} setHovered={setHovered} navigate={navigate} />
              ))}
            </div>
          </FunnelSection>

          {/* bônus do principal */}
          <div className="hub-section-sub">
            <span className="hub-section-sub-label">Bônus inclusos</span>
            <div className="hub-section-sub-rule" />
          </div>
          <div className="hub-grid" style={{ marginBottom: 48 }}>
            {BONUS_PRINCIPAL.map((p) => (
              <Card key={p.id} p={p} hovered={hovered} setHovered={setHovered} navigate={navigate} />
            ))}
          </div>

          {/* seta de funil */}
          <div className="hub-funnel-arrow">
            <div className="hub-funnel-arrow-line" />
            <span className="hub-funnel-arrow-icon">▼</span>
            <div className="hub-funnel-arrow-line" />
          </div>

          {/* ②  ORDER BUMPS */}
          <FunnelSection num="2" title="Order Bumps">
            <div className="hub-grid">
              {ORDER_BUMPS.map((p) => (
                <Card key={p.id} p={p} hovered={hovered} setHovered={setHovered} navigate={navigate} />
              ))}
            </div>
          </FunnelSection>

          {/* seta de funil */}
          <div className="hub-funnel-arrow">
            <div className="hub-funnel-arrow-line" />
            <span className="hub-funnel-arrow-icon">▼</span>
            <div className="hub-funnel-arrow-line" />
          </div>

          {/* ③  UPSELL */}
          <FunnelSection num="3" title="Upsell — O Cofre das Botânicas Secretas">
            <div className="hub-grid">
              {UPSELL.map((p) => (
                <Card key={p.id} p={p} featured hovered={hovered} setHovered={setHovered} navigate={navigate} />
              ))}
            </div>
          </FunnelSection>

          {/* ligados ao upsell */}
          <div className="hub-section-sub">
            <span className="hub-section-sub-label">Conteúdos ligados ao upsell</span>
            <div className="hub-section-sub-rule" />
          </div>
          <div className="hub-grid">
            {UPSELL_LINKED.map((p) => (
              <Card key={p.id} p={p} hovered={hovered} setHovered={setHovered} navigate={navigate} />
            ))}
          </div>

        </main>
      </div>
    </AuthGuard>
  );
}

/* ── sub-componentes ───────────────────── */

function FunnelSection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section className="hub-section">
      <div className="hub-section-header">
        <div className="hub-section-num">{num}</div>
        <span className="hub-section-title">{title}</span>
        <div className="hub-section-rule" />
      </div>
      {children}
    </section>
  );
}

function Card({
  p, featured = false, hovered, setHovered, navigate,
}: {
  p: ProductCard;
  featured?: boolean;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  navigate: (a: CardAction) => void;
}) {
  const tag = TAG_STYLES[p.tagVariant];
  const isHovered = hovered === p.id;

  return (
    <div
      className={`hub-card${featured ? " featured" : ""}${p.locked ? " locked" : ""}`}
      onMouseEnter={() => !p.locked && setHovered(p.id)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => !p.locked && navigate(p.action)}
    >
      {/* image */}
      <div className="hub-card-img">
        <div className="hub-card-img-inner" style={{ backgroundImage: `url('${p.cover}')` }} />
        <div className="hub-card-img-fade" />
        <span className="hub-card-tag" style={{ background: tag.bg, color: tag.color, borderColor: tag.border }}>
          {p.tag}
        </span>
        {p.locked && <div className="hub-card-lock-icon">🔒</div>}
        {p.progress === 100 && <span className="hub-badge-done">✓ Concluído</span>}
        {typeof p.progress === "number" && p.progress > 0 && p.progress < 100 && (
          <div className="hub-card-progress">
            <div className="hub-card-progress-fill" style={{ width: `${p.progress}%` }} />
          </div>
        )}
      </div>

      {/* body */}
      <div className="hub-card-body">
        <p className="hub-card-sub">{p.subtitle}</p>
        <p className="hub-card-title">{p.title}</p>
        <div className="hub-card-actions" onClick={(e) => e.stopPropagation()}>
          <ActionButtons action={p.action} navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

function ActionButtons({ action, navigate }: { action: CardAction; navigate: (a: CardAction) => void }) {
  if (action.type === "soon") {
    return <span className="hub-btn-soon">Em breve</span>;
  }
  if (action.type === "viewer") {
    return (
      <button className="hub-btn hub-btn-primary" onClick={() => navigate(action)}>▶ Acessar</button>
    );
  }
  if (action.type === "pdf") {
    return (
      <button className="hub-btn hub-btn-primary" onClick={() => navigate(action)}>↓ Baixar PDF</button>
    );
  }
  if (action.type === "both") {
    return (
      <>
        <button className="hub-btn hub-btn-primary" onClick={() => navigate({ type: "viewer", path: action.viewerPath })}>▶ Viewer</button>
        <button className="hub-btn hub-btn-secondary" onClick={() => window.open(`/downloads/${action.pdfFile}`, "_blank")}>↓ PDF</button>
      </>
    );
  }
  return null;
}
