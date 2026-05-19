(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18566,(r,e,a)=>{e.exports=r.r(76562)},15554,r=>{"use strict";var e=r.i(43476),a=r.i(71645),o=r.i(18566);r.i(51718);var t=r.i(18357),i=r.i(76009);function s({children:r}){let[s,n]=(0,a.useState)(i.isConfigValid),[l,d]=(0,a.useState)(null),b=(0,o.usePathname)(),c=(0,o.useRouter)();return((0,a.useEffect)(()=>{if(!i.isConfigValid)return;let r=(0,t.onAuthStateChanged)(i.auth,r=>{if(d(r),n(!1),!r){let r=encodeURIComponent(b||"/hub");c.replace(`/login?next=${r}`)}});return()=>r()},[b,c]),s)?(0,e.jsx)("div",{style:{minHeight:"100vh",background:"#111827",color:"#f8fafc",display:"grid",placeItems:"center",padding:"24px",fontFamily:"var(--font-geist-sans)"},children:(0,e.jsx)("div",{style:{border:"1px solid rgba(56,189,248,0.26)",borderRadius:"8px",padding:"18px 20px",background:"rgba(15,23,42,0.82)",color:"#7dd3fc",fontSize:"12px",fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase"},children:"Verificando acesso seguro"})}):i.isConfigValid?l?(0,e.jsx)(e.Fragment,{children:r}):null:(0,e.jsx)("main",{style:{minHeight:"100vh",background:"#111827",color:"#f8fafc",display:"grid",placeItems:"center",padding:"24px",fontFamily:"var(--font-geist-sans)"},children:(0,e.jsxs)("section",{style:{width:"min(480px, 100%)",border:"1px solid rgba(248,250,252,0.12)",borderRadius:"8px",padding:"24px",background:"rgba(15,23,42,0.86)"},children:[(0,e.jsx)("p",{style:{margin:"0 0 8px",color:"#38bdf8",fontSize:"12px",textTransform:"uppercase",letterSpacing:"0.12em"},children:"Firebase pendente"}),(0,e.jsx)("h1",{style:{margin:"0 0 12px",fontSize:"24px"},children:"Configure o acesso seguro"}),(0,e.jsx)("p",{style:{margin:0,color:"#cbd5e1",lineHeight:1.6},children:"Preencha as variaveis NEXT_PUBLIC_FIREBASE_* no arquivo .env.local antes de usar o painel privado."})]})})}let n={gold:{bg:"rgba(245, 183, 83, 0.18)",color:"#ffd27a",border:"rgba(245, 183, 83, 0.42)"},green:{bg:"rgba(44, 199, 136, 0.16)",color:"#7ef0ba",border:"rgba(44, 199, 136, 0.36)"},purple:{bg:"rgba(167, 139, 250, 0.17)",color:"#c8b6ff",border:"rgba(167, 139, 250, 0.36)"},blue:{bg:"rgba(56, 189, 248, 0.15)",color:"#8bdcff",border:"rgba(56, 189, 248, 0.36)"},coral:{bg:"rgba(251, 113, 133, 0.15)",color:"#ff9cac",border:"rgba(251, 113, 133, 0.34)"},rose:{bg:"rgba(244, 114, 182, 0.14)",color:"#ffabd9",border:"rgba(244, 114, 182, 0.32)"},muted:{bg:"rgba(255,255,255,0.05)",color:"rgba(242,242,232,0.42)",border:"rgba(255,255,255,0.1)"}},l={bonus:{border:"rgba(44,199,136,0.24)",bg:"rgba(12, 48, 42, 0.36)",label:"#6ee7b7",glow:"rgba(44,199,136,0.16)"},ob:{border:"rgba(56,189,248,0.24)",bg:"rgba(9, 37, 58, 0.36)",label:"#7dd3fc",glow:"rgba(56,189,248,0.16)"},included:{border:"rgba(167,139,250,0.25)",bg:"rgba(38, 27, 66, 0.34)",label:"#c4b5fd",glow:"rgba(167,139,250,0.16)"},ritual:{border:"rgba(251,113,133,0.25)",bg:"rgba(62, 18, 32, 0.32)",label:"#fda4af",glow:"rgba(251,113,133,0.14)"},vault:{border:"rgba(245,183,83,0.25)",bg:"rgba(62, 45, 18, 0.3)",label:"#facc6b",glow:"rgba(245,183,83,0.14)"}};function d(r){return+(!r.locked&&"soon"!==r.action.type)}function b({catalog:r}){let n=(0,o.useRouter)(),[b,h]=(0,a.useState)(null),p=(0,a.useMemo)(()=>Array.isArray(r?.rows)?r.rows:[],[r]),g=(0,a.useMemo)(()=>{let r=p.reduce((r,e)=>r+1+e.groups.reduce((r,e)=>r+e.items.length,0),0);return{total:r,available:p.reduce((r,e)=>{let a=e.groups.flatMap(r=>r.items);return r+d(e.anchor)+a.reduce((r,e)=>r+d(e),0)},0),completed:p.reduce((r,e)=>{let a=e.groups.flatMap(r=>r.items);return r+ +(100===e.anchor.progress)+a.filter(r=>100===r.progress).length},0)}},[p]),u=async()=>{await (0,t.signOut)(i.auth),n.push("/login")},x=r=>{"viewer"===r.type&&r.path&&n.push(r.path),"both"===r.type&&r.viewerPath&&n.push(r.viewerPath),"pdf"===r.type&&r.file&&window.open(`/downloads/${r.file}`,"_blank")};return(0,e.jsxs)(s,{children:[(0,e.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body {
          margin: 0;
          max-width: 100%;
          overflow-x: hidden;
          background: #070911;
        }
        :root {
          --hub-gold: #f5b753;
          --hub-cream: #fff7df;
          --hub-ink: #070911;
          --hub-surface: rgba(13, 17, 30, 0.76);
          --hub-line: rgba(255, 255, 255, 0.1);
          --hub-muted: rgba(255, 247, 223, 0.56);
          --hub-faint: rgba(255, 247, 223, 0.22);
        }
        .hub {
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          color: var(--hub-cream);
          font-family: 'Montserrat', sans-serif;
          background:
            radial-gradient(circle at 12% 8%, rgba(20,184,166,0.26), transparent 27%),
            radial-gradient(circle at 78% 4%, rgba(245,183,83,0.22), transparent 25%),
            radial-gradient(circle at 86% 55%, rgba(168,85,247,0.23), transparent 26%),
            linear-gradient(135deg, #07111c 0%, #0b0c17 46%, #180f22 100%);
          display: grid;
          grid-template-columns: 238px minmax(0, 1fr);
        }
        .hub-side {
          position: sticky;
          top: 0;
          min-width: 0;
          max-width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 30px 18px;
          border-right: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(180deg, rgba(6,9,17,0.94), rgba(10,13,25,0.82));
          backdrop-filter: blur(18px);
        }
        .hub-logo {
          padding: 0 8px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .hub-logo-mark {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          margin-bottom: 14px;
          background: linear-gradient(135deg, rgba(245,183,83,0.95), rgba(20,184,166,0.78));
          color: #09111d;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.12em;
          box-shadow: 0 16px 42px rgba(20,184,166,0.16);
        }
        .hub-logo-text {
          display: block;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.32em;
          color: #fff;
          text-transform: uppercase;
        }
        .hub-logo-sub {
          display: block;
          margin-top: 7px;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--hub-gold);
          text-transform: uppercase;
        }
        .hub-nav-group-label {
          margin: 24px 8px 10px;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--hub-faint);
        }
        .hub-nav-item {
          width: 100%;
          min-height: 40px;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 12px;
          border: 1px solid transparent;
          border-radius: 8px;
          background: transparent;
          color: var(--hub-muted);
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-align: left;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .hub-nav-item:hover,
        .hub-nav-item.active {
          color: #fff;
          border-color: rgba(245,183,83,0.2);
          background: rgba(255,255,255,0.06);
        }
        .hub-nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2dd4bf, #f5b753);
          flex-shrink: 0;
        }
        .hub-side-footer {
          margin-top: auto;
          padding: 18px 8px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .hub-user-badge {
          display: grid;
          grid-template-columns: 40px minmax(0, 1fr);
          gap: 10px;
          align-items: center;
          margin-bottom: 14px;
        }
        .hub-avatar {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,0.14);
          background: linear-gradient(135deg, rgba(244,114,182,0.25), rgba(56,189,248,0.18));
          font-size: 11px;
          font-weight: 900;
          color: #fff;
        }
        .hub-user-name {
          font-size: 10px;
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .hub-user-email {
          max-width: 146px;
          margin-top: 3px;
          color: var(--hub-faint);
          font-size: 9px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hub-logout-btn {
          width: 100%;
          min-height: 38px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          color: var(--hub-muted);
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .hub-logout-btn:hover {
          color: #fff;
          border-color: rgba(245,183,83,0.35);
        }
        .hub-main {
          min-width: 0;
          max-width: 100%;
          overflow-x: hidden;
          padding: 28px 34px 64px;
        }
        .hub-hero {
          position: relative;
          overflow: hidden;
          min-width: 0;
          max-width: 100%;
          min-height: 254px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          background:
            linear-gradient(90deg, rgba(7,9,17,0.96) 0%, rgba(7,9,17,0.78) 44%, rgba(7,9,17,0.28) 100%),
            url('/sais/assets/sais_banho_hero_premium_light_v3.png') center right / cover;
          display: grid;
          align-items: end;
          padding: 30px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.28);
        }
        .hub-hero::after {
          content: "";
          position: absolute;
          inset: auto 24px 0 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,183,83,0.55), rgba(45,212,191,0.55), transparent);
        }
        .hub-hero-content {
          position: relative;
          z-index: 1;
          max-width: 690px;
          width: 100%;
          min-width: 0;
        }
        .hub-eyebrow {
          margin: 0 0 10px;
          color: #7dd3fc;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }
        .hub-title {
          margin: 0;
          max-width: 660px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5vw, 70px);
          line-height: 0.96;
          font-weight: 700;
          letter-spacing: 0;
          color: #fff;
          overflow-wrap: break-word;
        }
        .hub-title em {
          color: var(--hub-gold);
          font-style: italic;
        }
        .hub-hero-copy {
          max-width: 560px;
          margin: 16px 0 0;
          color: rgba(255,247,223,0.72);
          font-size: 14px;
          line-height: 1.75;
        }
        .hub-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 22px;
          width: 100%;
          max-width: 520px;
        }
        .hub-stat {
          min-height: 72px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          padding: 12px;
          backdrop-filter: blur(12px);
        }
        .hub-stat-value {
          display: block;
          color: #fff;
          font-size: 21px;
          font-weight: 900;
        }
        .hub-stat-label {
          display: block;
          margin-top: 4px;
          color: var(--hub-faint);
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .hub-content {
          margin-top: 28px;
          display: grid;
          gap: 26px;
          min-width: 0;
          max-width: 100%;
        }
        .hub-row-wrap {
          min-width: 0;
          max-width: 100%;
          scroll-margin-top: 24px;
        }
        .hub-row-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 12px;
        }
        .hub-row-num {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(245,183,83,0.38);
          background: rgba(245,183,83,0.12);
          color: var(--hub-gold);
          font-size: 11px;
          font-weight: 900;
        }
        .hub-row-title {
          color: #fff;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .hub-row-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(245,183,83,0.34), transparent);
        }
        .hub-product-row {
          overflow: hidden;
          min-width: 0;
          max-width: 100%;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          background: rgba(8, 11, 21, 0.72);
          display: grid;
          grid-template-columns: 254px minmax(0, 1fr);
          box-shadow: 0 18px 50px rgba(0,0,0,0.24);
        }
        .hub-product-row.upsell {
          border-color: rgba(167,139,250,0.22);
        }
        .hub-anchor {
          min-width: 0;
          padding: 18px;
          border-right: 1px solid rgba(255,255,255,0.08);
          display: grid;
          align-content: start;
          gap: 12px;
        }
        .hub-anchor-eyebrow,
        .hub-group-label,
        .hub-card-sub {
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .hub-anchor-eyebrow {
          color: var(--hub-faint);
        }
        .hub-scroll-rail {
          min-width: 0;
          max-width: 100%;
          display: flex;
          align-items: stretch;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(245,183,83,0.38) transparent;
        }
        .hub-scroll-rail::-webkit-scrollbar { height: 7px; }
        .hub-scroll-rail::-webkit-scrollbar-thumb { background: rgba(245,183,83,0.38); border-radius: 99px; }
        .hub-group {
          min-width: 252px;
          width: max-content;
          flex-shrink: 0;
          padding: 18px;
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        .hub-group:first-child { border-left: none; }
        .hub-group-header {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 14px;
          white-space: nowrap;
        }
        .hub-group-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          box-shadow: 0 0 24px currentColor;
        }
        .hub-group-count {
          min-width: 24px;
          height: 22px;
          border: 1px solid;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-size: 9px;
          font-weight: 900;
        }
        .hub-group-cards {
          display: flex;
          gap: 12px;
        }
        .hub-card {
          position: relative;
          flex-shrink: 0;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 8px;
          background: rgba(255,255,255,0.055);
          cursor: pointer;
          transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
        }
        .hub-card-anchor { width: 216px; }
        .hub-card-companion { width: 184px; }
        .hub-card:hover,
        .hub-card.is-hovered {
          transform: translateY(-5px);
          border-color: rgba(245,183,83,0.4);
          box-shadow: 0 20px 52px rgba(0,0,0,0.38);
        }
        .hub-card.locked {
          opacity: 0.62;
          cursor: default;
        }
        .hub-card.locked:hover {
          transform: none;
          border-color: rgba(255,255,255,0.11);
          box-shadow: none;
        }
        .hub-card-img {
          width: 100%;
          aspect-ratio: 3 / 4;
          position: relative;
          overflow: hidden;
          background: #111827;
        }
        .hub-card-img-inner {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.55s ease;
        }
        .hub-card:hover .hub-card-img-inner { transform: scale(1.05); }
        .hub-card-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(140deg, transparent 0%, rgba(255,255,255,0.22) 48%, transparent 54%);
          transform: translateX(-120%);
          transition: transform 0.65s ease;
        }
        .hub-card:hover .hub-card-shine { transform: translateX(120%); }
        .hub-card-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          max-width: calc(100% - 20px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border: 1px solid;
          border-radius: 6px;
          padding: 5px 8px;
          backdrop-filter: blur(8px);
          font-size: 7px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .hub-card-lock {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(5,7,13,0.65);
          color: rgba(255,255,255,0.8);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .hub-badge-done {
          position: absolute;
          right: 10px;
          bottom: 10px;
          border: 1px solid rgba(110,231,183,0.35);
          border-radius: 6px;
          background: rgba(6,78,59,0.62);
          color: #a7f3d0;
          padding: 5px 8px;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .hub-card-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 4px;
          background: rgba(255,255,255,0.12);
        }
        .hub-card-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #2dd4bf, #f5b753, #f472b6);
        }
        .hub-card-body {
          padding: 13px;
          min-height: 126px;
          display: grid;
          align-content: start;
          gap: 8px;
        }
        .hub-card-sub {
          color: var(--hub-faint);
          line-height: 1.35;
          min-height: 22px;
        }
        .hub-card-title {
          margin: 0;
          min-height: 44px;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: 0;
          overflow-wrap: anywhere;
        }
        .hub-card-companion .hub-card-title {
          font-size: 17px;
        }
        .hub-card-actions {
          display: flex;
          gap: 7px;
          margin-top: 2px;
        }
        .hub-btn,
        .hub-btn-soon {
          min-width: 0;
          min-height: 34px;
          flex: 1;
          border-radius: 7px;
          border: 1px solid;
          padding: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: normal;
          line-height: 1.15;
        }
        .hub-btn {
          cursor: pointer;
        }
        .hub-btn-primary {
          color: #09111d;
          border-color: rgba(245,183,83,0.7);
          background: linear-gradient(135deg, #f5b753, #7dd3fc);
        }
        .hub-btn-secondary {
          color: var(--hub-cream);
          border-color: rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.07);
        }
        .hub-btn-soon {
          display: grid;
          place-items: center;
          color: var(--hub-faint);
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.035);
          cursor: default;
          text-align: center;
        }
        .hub-connector {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 34px;
          margin: 0 0 0 15px;
          color: var(--hub-faint);
        }
        .hub-connector-vline {
          width: 1px;
          height: 34px;
          background: linear-gradient(180deg, rgba(245,183,83,0.45), rgba(45,212,191,0.28));
        }
        .hub-connector-label {
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        @media (max-width: 1100px) {
          .hub { grid-template-columns: 1fr; }
          .hub-side {
            position: relative;
            height: auto;
            padding: 16px;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }
          .hub-logo { display: flex; align-items: center; gap: 12px; padding-bottom: 14px; }
          .hub-logo-mark { margin-bottom: 0; }
          .hub-nav-group-label { display: none; }
          .hub-nav-scroll { display: flex; gap: 8px; overflow-x: auto; padding-top: 14px; }
          .hub-nav-item { width: auto; min-width: 150px; }
          .hub-side-footer { display: none; }
          .hub-main { padding: 20px 16px 44px; }
          .hub-product-row { grid-template-columns: 1fr; }
          .hub-anchor { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .hub-card-anchor { width: 190px; }
        }
        @media (max-width: 640px) {
          .hub-hero { min-height: 430px; align-items: end; padding: 22px; background-position: center; }
          .hub-stats { grid-template-columns: 1fr; max-width: 100%; }
          .hub-group-cards { flex-wrap: nowrap; }
          .hub-card-anchor { width: min(100%, 216px); }
          .hub-card-companion { width: 168px; }
          .hub-title { font-size: 34px; }
        }
      `}),(0,e.jsxs)("div",{className:"hub",children:[(0,e.jsxs)("aside",{className:"hub-side",children:[(0,e.jsxs)("div",{className:"hub-logo",children:[(0,e.jsx)("div",{className:"hub-logo-mark",children:"SS"}),(0,e.jsxs)("div",{children:[(0,e.jsx)("span",{className:"hub-logo-text",children:"Sommers Store"}),(0,e.jsx)("span",{className:"hub-logo-sub",children:"Área de Membros"})]})]}),(0,e.jsx)("span",{className:"hub-nav-group-label",children:"Acervo"}),(0,e.jsxs)("div",{className:"hub-nav-scroll",children:[(0,e.jsxs)("button",{className:"hub-nav-item active",onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),children:[(0,e.jsx)("span",{className:"hub-nav-dot"}),"Visão geral"]}),p.map(r=>(0,e.jsxs)("button",{className:"hub-nav-item",onClick:()=>{var e;return e=r.id,void document.getElementById(`hub-row-${e}`)?.scrollIntoView({behavior:"smooth",block:"start"})},children:[(0,e.jsx)("span",{className:"hub-nav-dot"}),r.label]},r.id))]}),(0,e.jsxs)("div",{className:"hub-side-footer",children:[(0,e.jsxs)("div",{className:"hub-user-badge",children:[(0,e.jsx)("div",{className:"hub-avatar",children:"EA"}),(0,e.jsxs)("div",{children:[(0,e.jsx)("div",{className:"hub-user-name",children:"Membro Elite"}),(0,e.jsx)("div",{className:"hub-user-email",children:i.auth.currentUser?.email})]})]}),(0,e.jsx)("button",{className:"hub-logout-btn",onClick:u,children:"Encerrar sessão"})]})]}),(0,e.jsxs)("main",{className:"hub-main",children:[(0,e.jsx)("section",{className:"hub-hero",children:(0,e.jsxs)("div",{className:"hub-hero-content",children:[(0,e.jsx)("p",{className:"hub-eyebrow",children:"Bem-vinda de volta"}),(0,e.jsxs)("h1",{className:"hub-title",children:["Seu acervo ",(0,e.jsx)("em",{children:"Essência Ativa"})]}),(0,e.jsx)("p",{className:"hub-hero-copy",children:"Produtos, bônus e leitores digitais organizados em uma biblioteca privada, visual e pronta para evoluir junto com cada compra."}),(0,e.jsxs)("div",{className:"hub-stats",children:[(0,e.jsxs)("div",{className:"hub-stat",children:[(0,e.jsx)("span",{className:"hub-stat-value",children:g.total}),(0,e.jsx)("span",{className:"hub-stat-label",children:"Entregáveis"})]}),(0,e.jsxs)("div",{className:"hub-stat",children:[(0,e.jsx)("span",{className:"hub-stat-value",children:g.available}),(0,e.jsx)("span",{className:"hub-stat-label",children:"Liberados"})]}),(0,e.jsxs)("div",{className:"hub-stat",children:[(0,e.jsx)("span",{className:"hub-stat-value",children:g.completed}),(0,e.jsx)("span",{className:"hub-stat-label",children:"Concluídos"})]})]})]})}),(0,e.jsx)("div",{className:"hub-content",children:p.map((r,o)=>{let t="upsell"===r.rowVariant;return(0,e.jsxs)(a.default.Fragment,{children:[(0,e.jsxs)("section",{className:"hub-row-wrap",id:`hub-row-${r.id}`,children:[(0,e.jsxs)("div",{className:"hub-row-eyebrow",children:[(0,e.jsx)("div",{className:"hub-row-num",children:String(r.rowNum).padStart(2,"0")}),(0,e.jsx)("span",{className:"hub-row-title",children:r.label}),(0,e.jsx)("div",{className:"hub-row-rule"})]}),(0,e.jsxs)("div",{className:`hub-product-row${t?" upsell":""}`,children:[(0,e.jsxs)("div",{className:"hub-anchor",style:{background:t?"linear-gradient(180deg, rgba(167,139,250,0.14), rgba(8,11,21,0.18))":"linear-gradient(180deg, rgba(245,183,83,0.12), rgba(8,11,21,0.18))"},children:[(0,e.jsx)("span",{className:"hub-anchor-eyebrow",children:r.anchorLabel}),(0,e.jsx)(c,{p:r.anchor,size:"anchor",hovered:b,setHovered:h,navigate:x})]}),(0,e.jsx)("div",{className:"hub-scroll-rail",children:r.groups.map(r=>{let a=l[r.accentKey]??l.bonus;return(0,e.jsxs)("div",{className:"hub-group",style:{background:a.bg,boxShadow:`inset 0 1px 0 ${a.border}`},children:[(0,e.jsxs)("div",{className:"hub-group-header",children:[(0,e.jsx)("div",{className:"hub-group-dot",style:{background:a.label,color:a.glow}}),(0,e.jsx)("span",{className:"hub-group-label",style:{color:a.label},children:r.label}),(0,e.jsx)("span",{className:"hub-group-count",style:{color:a.label,borderColor:a.border},children:r.items.length})]}),(0,e.jsx)("div",{className:"hub-group-cards",children:r.items.map(r=>(0,e.jsx)(c,{p:r,size:"companion",hovered:b,setHovered:h,navigate:x},r.id))})]},r.id)})})]})]}),r.connectorAfter&&o<p.length-1&&(0,e.jsxs)("div",{className:"hub-connector",children:[(0,e.jsx)("div",{className:"hub-connector-vline"}),(0,e.jsx)("span",{className:"hub-connector-label",children:r.connectorAfter})]})]},r.id)})})]})]})]})}function c({p:r,size:a="companion",hovered:o,setHovered:t,navigate:i}){var s;let l=n[r.tagVariant]??n.muted,d=!r.locked&&"soon"!==r.action.type;return(0,e.jsxs)("article",{className:`hub-card hub-card-${a}${r.locked?" locked":""}${o===r.id?" is-hovered":""}`,onMouseEnter:()=>!r.locked&&t(r.id),onMouseLeave:()=>t(null),onClick:()=>d&&i(r.action),children:[(0,e.jsxs)("div",{className:"hub-card-img",children:[(0,e.jsx)("div",{className:"hub-card-img-inner",style:(s=r.cover)&&s.trim()?{backgroundImage:`linear-gradient(180deg, rgba(4,6,12,0.05) 0%, rgba(4,6,12,0.72) 100%), url('${s}')`}:{background:"radial-gradient(circle at 30% 20%, rgba(245,183,83,0.34), transparent 34%), linear-gradient(135deg, #18213d 0%, #0b1220 48%, #241427 100%)"}}),(0,e.jsx)("div",{className:"hub-card-shine"}),(0,e.jsx)("span",{className:"hub-card-tag",style:{background:l.bg,color:l.color,borderColor:l.border},children:r.tag}),r.locked&&(0,e.jsx)("div",{className:"hub-card-lock",children:"Bloqueado"}),100===r.progress&&(0,e.jsx)("span",{className:"hub-badge-done",children:"Concluído"}),"number"==typeof r.progress&&r.progress>0&&r.progress<100&&(0,e.jsx)("div",{className:"hub-card-progress",children:(0,e.jsx)("div",{className:"hub-card-progress-fill",style:{width:`${r.progress}%`}})})]}),(0,e.jsxs)("div",{className:"hub-card-body",children:[(0,e.jsx)("p",{className:"hub-card-sub",children:r.subtitle}),(0,e.jsx)("h2",{className:"hub-card-title",children:r.title}),(0,e.jsx)("div",{className:"hub-card-actions",onClick:r=>r.stopPropagation(),children:(0,e.jsx)(h,{action:r.action,navigate:i})})]})]})}function h({action:r,navigate:a}){return"soon"===r.type?(0,e.jsx)("span",{className:"hub-btn-soon",children:"Em preparação"}):"viewer"===r.type?(0,e.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a(r),children:"Acessar"}):"pdf"===r.type?(0,e.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a(r),children:"Baixar PDF"}):(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a({type:"viewer",path:r.viewerPath}),children:"Ler online"}),(0,e.jsx)("button",{className:"hub-btn hub-btn-secondary",onClick:()=>window.open(`/downloads/${r.pdfFile}`,"_blank"),children:"PDF"})]})}r.s(["default",()=>b],15554)}]);