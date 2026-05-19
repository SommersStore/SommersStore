(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18566,(e,r,a)=>{r.exports=e.r(76562)},15554,e=>{"use strict";var r=e.i(43476),a=e.i(71645),t=e.i(18566);e.i(51718);var s=e.i(18357),o=e.i(76009);function i({children:e}){let[i,n]=(0,a.useState)(o.isConfigValid),[l,d]=(0,a.useState)(null),c=(0,t.usePathname)(),b=(0,t.useRouter)();return((0,a.useEffect)(()=>{if(!o.isConfigValid)return;let e=(0,s.onAuthStateChanged)(o.auth,e=>{if(d(e),n(!1),!e){let e=encodeURIComponent(c||"/hub");b.replace(`/login?next=${e}`)}});return()=>e()},[c,b]),i)?(0,r.jsx)("div",{style:{minHeight:"100vh",background:"#111827",color:"#f8fafc",display:"grid",placeItems:"center",padding:"24px",fontFamily:"var(--font-geist-sans)"},children:(0,r.jsx)("div",{style:{border:"1px solid rgba(56,189,248,0.26)",borderRadius:"8px",padding:"18px 20px",background:"rgba(15,23,42,0.82)",color:"#7dd3fc",fontSize:"12px",fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase"},children:"Verificando acesso seguro"})}):o.isConfigValid?l?(0,r.jsx)(r.Fragment,{children:e}):null:(0,r.jsx)("main",{style:{minHeight:"100vh",background:"#111827",color:"#f8fafc",display:"grid",placeItems:"center",padding:"24px",fontFamily:"var(--font-geist-sans)"},children:(0,r.jsxs)("section",{style:{width:"min(480px, 100%)",border:"1px solid rgba(248,250,252,0.12)",borderRadius:"8px",padding:"24px",background:"rgba(15,23,42,0.86)"},children:[(0,r.jsx)("p",{style:{margin:"0 0 8px",color:"#38bdf8",fontSize:"12px",textTransform:"uppercase",letterSpacing:"0.12em"},children:"Firebase pendente"}),(0,r.jsx)("h1",{style:{margin:"0 0 12px",fontSize:"24px"},children:"Configure o acesso seguro"}),(0,r.jsx)("p",{style:{margin:0,color:"#cbd5e1",lineHeight:1.6},children:"Preencha as variaveis NEXT_PUBLIC_FIREBASE_* no arquivo .env.local antes de usar o painel privado."})]})})}let n={gold:{bg:"rgba(197,160,89,0.15)",color:"#C5A059",border:"rgba(197,160,89,0.4)"},green:{bg:"rgba(111,175,111,0.13)",color:"#7ABF7A",border:"rgba(111,175,111,0.38)"},purple:{bg:"rgba(160,123,197,0.13)",color:"#B08BD4",border:"rgba(160,123,197,0.38)"},blue:{bg:"rgba(100,149,237,0.13)",color:"#7AABF0",border:"rgba(100,149,237,0.38)"},muted:{bg:"rgba(255,255,255,0.04)",color:"rgba(229,229,229,0.25)",border:"rgba(255,255,255,0.08)"}},l={bonus:{border:"rgba(111,175,111,0.2)",bg:"rgba(111,175,111,0.04)",label:"rgba(111,175,111,0.55)"},ob:{border:"rgba(100,149,237,0.2)",bg:"rgba(100,149,237,0.04)",label:"rgba(100,149,237,0.55)"},included:{border:"rgba(160,123,197,0.2)",bg:"rgba(160,123,197,0.04)",label:"rgba(160,123,197,0.55)"}};function d({catalog:e}){var n;let d,b,p,h,u,g=(0,t.useRouter)(),[x,m]=(0,a.useState)(null),[f,v]=(0,a.useState)(null),[w,j]=(0,a.useState)("acervo");(0,a.useEffect)(()=>(0,s.onAuthStateChanged)(o.auth,v),[]);let y=async()=>{await (0,s.signOut)(o.auth),g.push("/login")},N=e=>{"viewer"===e.type&&g.push(e.path),"both"===e.type&&g.push(e.viewerPath),"pdf"===e.type&&window.open(`/downloads/${e.file}`,"_blank")},k=(d=0,b=0,p=0,h=0,e.rows.forEach(e=>{[e.anchor,...e.groups.flatMap(e=>e.items)].forEach(e=>{d++,!e.locked&&"soon"!==e.action.type&&b++,"number"==typeof e.progress&&e.progress>0&&e.progress<100&&p++,100===e.progress&&h++})}),{total:d,accessible:b,inProgress:p,done:h}),z=(n=f?.displayName)?n.trim().split(" ")[0]:"Aristocrata",C=function(e,r){if(e){let r=e.trim().split(" ").filter(Boolean);if(r.length>=2)return(r[0][0]+r[r.length-1][0]).toUpperCase();if(1===r.length)return r[0].substring(0,2).toUpperCase()}return r?r.substring(0,2).toUpperCase():"SS"}(f?.displayName,f?.email);return(0,r.jsxs)(i,{children:[(0,r.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #C5A059;
          --gold-bright: #D4B472;
          --gold-dim: rgba(197,160,89,0.18);
          --gold-line: rgba(197,160,89,0.12);
          --gold-glow: rgba(197,160,89,0.06);
          --surface: #0b0b0f;
          --surface-2: #0f0f15;
          --surface-3: #141420;
          --surface-4: #1a1a28;
          --text: #eae8d8;
          --text-dim: rgba(234,232,216,0.45);
          --text-muted: rgba(234,232,216,0.2);
          --text-faint: rgba(234,232,216,0.1);
        }

        body { background: var(--surface); }

        /* ══ LAYOUT ROOT ══ */
        .hub { display: flex; min-height: 100vh; background: var(--surface); color: var(--text); font-family: 'Montserrat', sans-serif; }

        /* ══ SIDEBAR ══ */
        .hub-side {
          width: 224px; flex-shrink: 0;
          background: linear-gradient(180deg, #0d0d14 0%, #0a0a11 100%);
          border-right: 1px solid rgba(197,160,89,0.1);
          display: flex; flex-direction: column;
          position: sticky; top: 0; height: 100vh; overflow-y: auto;
        }
        .hub-side::-webkit-scrollbar { width: 0; }

        /* Logo */
        .hub-brand {
          padding: 32px 28px 28px;
          border-bottom: 1px solid var(--gold-line);
        }
        .hub-brand-symbol {
          display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .hub-brand-line {
          width: 20px; height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }
        .hub-brand-sigil {
          font-size: 8px; letter-spacing: 3px; color: var(--gold);
          opacity: 0.6; font-weight: 700; text-transform: uppercase;
        }
        .hub-brand-name {
          font-size: 10px; font-weight: 900; letter-spacing: 4px;
          text-transform: uppercase; color: var(--text); display: block;
          margin-bottom: 4px;
        }
        .hub-brand-sub {
          font-size: 6.5px; letter-spacing: 2.5px; color: var(--text-muted);
          text-transform: uppercase; display: block;
        }

        /* Nav */
        .hub-nav { padding: 20px 0 0; flex: 1; }
        .hub-nav-section-label {
          padding: 0 28px; margin-bottom: 6px;
          font-size: 6px; font-weight: 700; letter-spacing: 3.5px;
          text-transform: uppercase; color: var(--text-faint);
        }
        .hub-nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 28px;
          font-size: 8px; font-weight: 600; letter-spacing: 1.8px;
          text-transform: uppercase; color: var(--text-dim);
          cursor: pointer; border: none;
          border-left: 2px solid transparent;
          background: none; width: 100%; text-align: left;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.2s ease;
          position: relative;
        }
        .hub-nav-item:hover { color: rgba(234,232,216,0.65); background: rgba(197,160,89,0.03); }
        .hub-nav-item.active {
          color: var(--gold); border-left-color: var(--gold);
          background: linear-gradient(90deg, rgba(197,160,89,0.07), transparent);
        }
        .hub-nav-icon {
          font-size: 9px; opacity: 0.6; flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .hub-nav-item.active .hub-nav-icon { opacity: 1; }
        .hub-nav-item:hover .hub-nav-icon  { opacity: 0.9; }

        /* Stats sidebar */
        .hub-side-stats {
          margin: 20px 16px 0;
          background: rgba(197,160,89,0.04);
          border: 1px solid rgba(197,160,89,0.1);
          border-radius: 4px; padding: 14px 16px;
        }
        .hub-side-stats-label {
          font-size: 6px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: var(--text-faint); margin-bottom: 12px;
        }
        .hub-side-stat {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 8px;
        }
        .hub-side-stat:last-child { margin-bottom: 0; }
        .hub-side-stat-label { font-size: 7px; color: var(--text-muted); letter-spacing: 0.5px; }
        .hub-side-stat-val {
          font-size: 10px; font-weight: 700; color: var(--gold); letter-spacing: 0.5px;
        }
        .hub-side-stat-val.neutral { color: var(--text-dim); }

        /* Footer / user */
        .hub-side-footer {
          padding: 20px 16px 28px;
          border-top: 1px solid var(--gold-line);
          margin-top: 20px;
        }
        .hub-user-card {
          display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
          padding: 12px; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05); border-radius: 4px;
        }
        .hub-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(197,160,89,0.25), rgba(197,160,89,0.08));
          border: 1px solid rgba(197,160,89,0.35);
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 900; letter-spacing: 0.5px;
          color: var(--gold); flex-shrink: 0;
        }
        .hub-user-meta { min-width: 0; }
        .hub-user-name  { font-size: 7.5px; font-weight: 700; color: var(--text); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 3px; }
        .hub-user-email { font-size: 6px; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 128px; }
        .hub-logout-btn {
          width: 100%; padding: 9px 12px;
          background: none; border: 1px solid rgba(255,255,255,0.07);
          color: var(--text-muted); font-family: 'Montserrat', sans-serif;
          font-size: 6.5px; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; cursor: pointer;
          transition: all 0.22s; border-radius: 3px;
        }
        .hub-logout-btn:hover { border-color: rgba(197,160,89,0.3); color: var(--gold); background: rgba(197,160,89,0.04); }

        /* ══ MAIN ══ */
        .hub-main { flex: 1; overflow-y: auto; min-width: 0; }

        /* Hero */
        .hub-hero {
          position: relative; overflow: hidden;
          padding: 52px 52px 44px;
          background: linear-gradient(135deg, rgba(197,160,89,0.06) 0%, rgba(197,160,89,0.02) 40%, transparent 70%);
          border-bottom: 1px solid var(--gold-line);
        }
        .hub-hero::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), rgba(197,160,89,0.4), transparent);
        }
        .hub-hero::after {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(197,160,89,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .hub-hero-eyebrow {
          font-size: 7px; font-weight: 700; letter-spacing: 5px;
          text-transform: uppercase; color: var(--gold); margin-bottom: 10px;
          opacity: 0.8;
        }
        .hub-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px; font-weight: 300; line-height: 1.1;
          color: var(--text); letter-spacing: 0.5px; margin-bottom: 20px;
        }
        .hub-hero-title em { font-style: italic; color: var(--gold-bright); }
        .hub-hero-divider {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
          margin-bottom: 18px;
        }
        .hub-hero-sub {
          font-size: 11px; color: var(--text-dim); line-height: 1.7;
          max-width: 540px; font-weight: 300; letter-spacing: 0.3px;
        }

        /* Stats strip */
        .hub-stats-strip {
          display: flex; gap: 0;
          border-bottom: 1px solid var(--gold-line);
          background: var(--surface-2);
        }
        .hub-stat-cell {
          flex: 1; padding: 16px 24px;
          border-right: 1px solid rgba(255,255,255,0.04);
          display: flex; flex-direction: column; gap: 4px;
        }
        .hub-stat-cell:last-child { border-right: none; }
        .hub-stat-cell-label {
          font-size: 6px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: var(--text-faint);
        }
        .hub-stat-cell-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 500; color: var(--text);
          line-height: 1;
        }
        .hub-stat-cell-val.gold { color: var(--gold); }
        .hub-stat-cell-val.green { color: #7ABF7A; }
        .hub-stat-cell-val.purple { color: #B08BD4; }

        /* Content */
        .hub-content { padding: 44px 52px 80px; }

        /* ══ PRODUCT ROW ══ */
        .hub-row-wrap { margin-bottom: 52px; }
        .hub-row-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .hub-row-num {
          width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, rgba(197,160,89,0.2), rgba(197,160,89,0.06));
          border: 1px solid rgba(197,160,89,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 8px; font-weight: 900; color: var(--gold);
        }
        .hub-row-title {
          font-size: 8px; font-weight: 700; letter-spacing: 3.5px;
          text-transform: uppercase; color: var(--text-dim);
        }
        .hub-row-rule { flex: 1; height: 1px; background: var(--gold-line); }

        .hub-product-row {
          display: flex; align-items: stretch; gap: 0;
          background: var(--surface-2);
          border: 1px solid rgba(255,255,255,0.05);
          border-top: 2px solid rgba(197,160,89,0.25);
          border-radius: 5px; overflow: hidden;
          box-shadow: 0 4px 40px rgba(0,0,0,0.4);
        }
        .hub-product-row.upsell { border-top-color: rgba(160,123,197,0.45); }

        .hub-anchor {
          flex-shrink: 0; padding: 24px 22px;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column; align-items: center;
        }
        .hub-anchor-eyebrow {
          font-size: 6px; font-weight: 700; letter-spacing: 3.5px;
          text-transform: uppercase; color: var(--text-muted);
          margin-bottom: 16px; text-align: center;
        }

        .hub-scroll-rail {
          flex: 1; min-width: 0; overflow-x: auto; display: flex;
          align-items: stretch;
          scrollbar-width: thin; scrollbar-color: rgba(197,160,89,0.2) transparent;
        }
        .hub-scroll-rail::-webkit-scrollbar { height: 3px; }
        .hub-scroll-rail::-webkit-scrollbar-track { background: transparent; }
        .hub-scroll-rail::-webkit-scrollbar-thumb { background: rgba(197,160,89,0.2); border-radius: 2px; }

        .hub-group { flex-shrink: 0; display: flex; flex-direction: column; padding: 22px 24px 24px; }
        .hub-group + .hub-group { border-left: 1px solid rgba(255,255,255,0.04); }
        .hub-group-header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; white-space: nowrap; }
        .hub-group-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .hub-group-label { font-size: 7px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; }
        .hub-group-count {
          font-size: 6.5px; font-weight: 600; letter-spacing: 1px;
          padding: 2px 8px; border-radius: 10px; border: 1px solid;
        }
        .hub-group-cards { display: flex; gap: 12px; flex-wrap: nowrap; }

        /* ══ CARDS ══ */
        .hub-card {
          background: var(--surface-3);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 4px; overflow: hidden; cursor: pointer;
          transition: transform 0.32s cubic-bezier(.2,.8,.2,1), border-color 0.3s, box-shadow 0.3s;
          position: relative; flex-shrink: 0;
        }
        .hub-card-anchor    { width: 200px; }
        .hub-card-companion { width: 180px; }
        .hub-card:hover {
          transform: translateY(-5px);
          border-color: rgba(197,160,89,0.3);
          box-shadow: 0 16px 44px rgba(0,0,0,0.65), 0 0 0 1px rgba(197,160,89,0.08);
        }
        .hub-card.locked { opacity: 0.35; cursor: default; }
        .hub-card.locked:hover { transform: none; border-color: rgba(255,255,255,0.06); box-shadow: none; }
        .hub-card-img { width: 100%; aspect-ratio: 3/4; overflow: hidden; position: relative; background: var(--surface-4); }
        .hub-card-img-inner {
          width: 100%; height: 100%; background-size: cover; background-position: center;
          transition: transform 0.55s cubic-bezier(.2,.8,.2,1);
        }
        .hub-card:hover .hub-card-img-inner { transform: scale(1.06); }
        .hub-card-img-fade { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, rgba(8,8,14,0.9) 100%); }
        .hub-card-tag {
          position: absolute; top: 10px; left: 10px;
          font-size: 5.5px; font-weight: 800; letter-spacing: 2px;
          text-transform: uppercase; padding: 3px 9px;
          border-radius: 2px; border: 1px solid; backdrop-filter: blur(6px);
        }
        .hub-card-lock { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(8,8,14,0.65); font-size: 22px; }
        .hub-card-progress { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: rgba(255,255,255,0.07); }
        .hub-card-progress-fill { height: 100%; background: linear-gradient(90deg, rgba(197,160,89,0.6), var(--gold)); }
        .hub-badge-done {
          position: absolute; top: 10px; right: 10px;
          font-size: 5.5px; font-weight: 800; letter-spacing: 1px;
          text-transform: uppercase; padding: 3px 7px;
          background: rgba(111,175,111,0.18); color: #7ABF7A;
          border: 1px solid rgba(111,175,111,0.35); border-radius: 2px;
          backdrop-filter: blur(4px);
        }
        .hub-card-body { padding: 12px 14px 14px; }
        .hub-card-sub { font-size: 5.5px; letter-spacing: 1.5px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 5px; }
        .hub-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px; font-weight: 400; color: var(--text); line-height: 1.3; margin-bottom: 11px;
        }
        .hub-card-anchor .hub-card-title { font-size: 16px; }
        .hub-card-actions { display: flex; gap: 6px; }
        .hub-btn {
          flex: 1; padding: 7px 6px; font-family: 'Montserrat', sans-serif;
          font-size: 5.5px; font-weight: 800; letter-spacing: 1.5px;
          text-transform: uppercase; cursor: pointer; transition: all 0.2s;
          border-radius: 2px; border: 1px solid; white-space: nowrap;
        }
        .hub-btn-primary { background: linear-gradient(135deg, rgba(197,160,89,0.14), rgba(197,160,89,0.06)); color: var(--gold); border-color: rgba(197,160,89,0.3); }
        .hub-btn-primary:hover { background: rgba(197,160,89,0.22); border-color: rgba(197,160,89,0.6); }
        .hub-btn-secondary { background: rgba(255,255,255,0.03); color: var(--text-dim); border-color: rgba(255,255,255,0.08); }
        .hub-btn-secondary:hover { background: rgba(255,255,255,0.07); }
        .hub-btn-soon { flex: 1; padding: 7px 6px; font-size: 5.5px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; background: none; color: var(--text-muted); border: 1px solid rgba(255,255,255,0.05); cursor: default; border-radius: 2px; }

        /* ══ CONNECTOR ══ */
        .hub-connector { display: flex; align-items: center; gap: 0; margin: 0 0 24px 24px; height: 40px; }
        .hub-connector-vline { width: 1px; height: 100%; background: linear-gradient(180deg, rgba(197,160,89,0.25), rgba(197,160,89,0.04)); }
        .hub-connector-label { margin-left: 14px; font-size: 6px; font-weight: 700; letter-spacing: 3.5px; text-transform: uppercase; color: var(--text-muted); }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 1024px) {
          .hub-hero { padding: 36px 28px 32px; }
          .hub-hero-title { font-size: 30px; }
          .hub-content { padding: 32px 28px 60px; }
          .hub-stats-strip { flex-wrap: wrap; }
          .hub-stat-cell { min-width: 120px; }
        }
        @media (max-width: 768px) {
          .hub-side { display: none; }
          .hub-hero { padding: 28px 20px 24px; }
          .hub-hero-title { font-size: 26px; }
          .hub-content { padding: 24px 20px 60px; }
          .hub-product-row { flex-direction: column; }
          .hub-anchor { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .hub-group + .hub-group { border-left: none; border-top: 1px solid rgba(255,255,255,0.05); }
          .hub-card-anchor    { width: 158px; }
          .hub-card-companion { width: 148px; }
        }
      `}),(0,r.jsxs)("div",{className:"hub",children:[(0,r.jsxs)("aside",{className:"hub-side",children:[(0,r.jsxs)("div",{className:"hub-brand",children:[(0,r.jsxs)("div",{className:"hub-brand-symbol",children:[(0,r.jsx)("div",{className:"hub-brand-line"}),(0,r.jsx)("span",{className:"hub-brand-sigil",children:"Elite"})]}),(0,r.jsx)("span",{className:"hub-brand-name",children:"Essência Ativa"}),(0,r.jsx)("span",{className:"hub-brand-sub",children:"Área de Membros"})]}),(0,r.jsxs)("nav",{className:"hub-nav",children:[(0,r.jsx)("span",{className:"hub-nav-section-label",children:"Navegação"}),[{id:"acervo",label:"Meu Acervo",icon:"▣"},{id:"comunidade",label:"Comunidade",icon:"◎"},{id:"suporte",label:"Suporte",icon:"◇"}].map(e=>(0,r.jsxs)("button",{className:`hub-nav-item${w===e.id?" active":""}`,onClick:()=>j(e.id),children:[(0,r.jsx)("span",{className:"hub-nav-icon",children:e.icon}),e.label]},e.id))]}),(0,r.jsxs)("div",{className:"hub-side-stats",children:[(0,r.jsx)("p",{className:"hub-side-stats-label",children:"Seu progresso"}),(0,r.jsxs)("div",{className:"hub-side-stat",children:[(0,r.jsx)("span",{className:"hub-side-stat-label",children:"Materiais"}),(0,r.jsx)("span",{className:"hub-side-stat-val neutral",children:k.total})]}),(0,r.jsxs)("div",{className:"hub-side-stat",children:[(0,r.jsx)("span",{className:"hub-side-stat-label",children:"Disponíveis"}),(0,r.jsx)("span",{className:"hub-side-stat-val",children:k.accessible})]}),k.inProgress>0&&(0,r.jsxs)("div",{className:"hub-side-stat",children:[(0,r.jsx)("span",{className:"hub-side-stat-label",children:"Em andamento"}),(0,r.jsx)("span",{className:"hub-side-stat-val",style:{color:"#7AABF0"},children:k.inProgress})]}),k.done>0&&(0,r.jsxs)("div",{className:"hub-side-stat",children:[(0,r.jsx)("span",{className:"hub-side-stat-label",children:"Concluídos"}),(0,r.jsx)("span",{className:"hub-side-stat-val",style:{color:"#7ABF7A"},children:k.done})]})]}),(0,r.jsxs)("div",{className:"hub-side-footer",children:[(0,r.jsxs)("div",{className:"hub-user-card",children:[(0,r.jsx)("div",{className:"hub-avatar",children:C}),(0,r.jsxs)("div",{className:"hub-user-meta",children:[(0,r.jsx)("div",{className:"hub-user-name",children:z}),(0,r.jsx)("div",{className:"hub-user-email",children:f?.email??""})]})]}),(0,r.jsx)("button",{className:"hub-logout-btn",onClick:y,children:"Encerrar sessão"})]})]}),(0,r.jsxs)("main",{className:"hub-main",children:[(0,r.jsxs)("div",{className:"hub-hero",children:[(0,r.jsxs)("p",{className:"hub-hero-eyebrow",children:[(u=new Date().getHours())<12?"Bom dia":u<18?"Boa tarde":"Boa noite",", ",z]}),(0,r.jsxs)("h1",{className:"hub-hero-title",children:["Seu ",(0,r.jsx)("em",{children:"acervo"}),(0,r.jsx)("br",{}),"completo está aqui"]}),(0,r.jsx)("div",{className:"hub-hero-divider"}),(0,r.jsx)("p",{className:"hub-hero-sub",children:"Acesse seus materiais, acompanhe seu progresso e mergulhe nas fórmulas que transformam ingredientes naturais em rituais de alto valor."})]}),(0,r.jsxs)("div",{className:"hub-stats-strip",children:[(0,r.jsxs)("div",{className:"hub-stat-cell",children:[(0,r.jsx)("span",{className:"hub-stat-cell-label",children:"Materiais"}),(0,r.jsx)("span",{className:"hub-stat-cell-val neutral",children:k.total})]}),(0,r.jsxs)("div",{className:"hub-stat-cell",children:[(0,r.jsx)("span",{className:"hub-stat-cell-label",children:"Disponíveis"}),(0,r.jsx)("span",{className:"hub-stat-cell-val gold",children:k.accessible})]}),(0,r.jsxs)("div",{className:"hub-stat-cell",children:[(0,r.jsx)("span",{className:"hub-stat-cell-label",children:"Em andamento"}),(0,r.jsx)("span",{className:"hub-stat-cell-val purple",children:k.inProgress||"—"})]}),(0,r.jsxs)("div",{className:"hub-stat-cell",children:[(0,r.jsx)("span",{className:"hub-stat-cell-label",children:"Concluídos"}),(0,r.jsx)("span",{className:"hub-stat-cell-val green",children:k.done||"—"})]})]}),(0,r.jsx)("div",{className:"hub-content",children:e.rows.map((t,s)=>{let o="upsell"===t.rowVariant;return(0,r.jsxs)(a.default.Fragment,{children:[(0,r.jsxs)("div",{className:"hub-row-wrap",children:[(0,r.jsxs)("div",{className:"hub-row-eyebrow",children:[(0,r.jsx)("div",{className:"hub-row-num",style:o?{borderColor:"rgba(160,123,197,0.4)",background:"rgba(160,123,197,0.12)",color:"#B08BD4"}:void 0,children:t.rowNum}),(0,r.jsx)("span",{className:"hub-row-title",children:t.label}),(0,r.jsx)("div",{className:"hub-row-rule",style:o?{background:"rgba(160,123,197,0.18)"}:void 0})]}),(0,r.jsxs)("div",{className:`hub-product-row${o?" upsell":""}`,children:[(0,r.jsxs)("div",{className:"hub-anchor",style:{background:o?"linear-gradient(180deg, rgba(160,123,197,0.08) 0%, rgba(0,0,0,0.25) 100%)":"linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)"},children:[(0,r.jsx)("span",{className:"hub-anchor-eyebrow",children:t.anchorLabel}),(0,r.jsx)(c,{p:t.anchor,size:"anchor",hovered:x,setHovered:m,navigate:N})]}),(0,r.jsx)("div",{className:"hub-scroll-rail",children:t.groups.map(e=>{let a=l[e.accentKey]??l.bonus;return(0,r.jsxs)("div",{className:"hub-group",style:{background:a.bg},children:[(0,r.jsxs)("div",{className:"hub-group-header",children:[(0,r.jsx)("div",{className:"hub-group-dot",style:{background:a.label}}),(0,r.jsx)("span",{className:"hub-group-label",style:{color:a.label},children:e.label}),(0,r.jsx)("span",{className:"hub-group-count",style:{color:a.label,borderColor:a.border},children:e.items.length})]}),(0,r.jsx)("div",{className:"hub-group-cards",children:e.items.map(e=>(0,r.jsx)(c,{p:e,size:"companion",hovered:x,setHovered:m,navigate:N},e.id))})]},e.id)})})]})]}),t.connectorAfter&&s<e.rows.length-1&&(0,r.jsxs)("div",{className:"hub-connector",children:[(0,r.jsx)("div",{className:"hub-connector-vline"}),(0,r.jsx)("span",{className:"hub-connector-label",children:t.connectorAfter})]})]},t.id)})})]})]})]})}function c({p:e,size:a="companion",hovered:t,setHovered:s,navigate:o}){let i=n[e.tagVariant];return(0,r.jsxs)("div",{className:`hub-card hub-card-${a}${e.locked?" locked":""}`,onMouseEnter:()=>!e.locked&&s(e.id),onMouseLeave:()=>s(null),onClick:()=>!e.locked&&o(e.action),children:[(0,r.jsxs)("div",{className:"hub-card-img",children:[(0,r.jsx)("div",{className:"hub-card-img-inner",style:{backgroundImage:`url('${e.cover}')`}}),(0,r.jsx)("div",{className:"hub-card-img-fade"}),(0,r.jsx)("span",{className:"hub-card-tag",style:{background:i.bg,color:i.color,borderColor:i.border},children:e.tag}),e.locked&&(0,r.jsx)("div",{className:"hub-card-lock",children:"🔒"}),100===e.progress&&(0,r.jsx)("span",{className:"hub-badge-done",children:"✓ Concluído"}),"number"==typeof e.progress&&e.progress>0&&e.progress<100&&(0,r.jsx)("div",{className:"hub-card-progress",children:(0,r.jsx)("div",{className:"hub-card-progress-fill",style:{width:`${e.progress}%`}})})]}),(0,r.jsxs)("div",{className:"hub-card-body",children:[(0,r.jsx)("p",{className:"hub-card-sub",children:e.subtitle}),(0,r.jsx)("p",{className:"hub-card-title",children:e.title}),(0,r.jsx)("div",{className:"hub-card-actions",onClick:e=>e.stopPropagation(),children:(0,r.jsx)(b,{action:e.action,navigate:o})})]})]})}function b({action:e,navigate:a}){return"soon"===e.type?(0,r.jsx)("span",{className:"hub-btn-soon",children:"Em breve"}):"viewer"===e.type?(0,r.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a(e),children:"▶ Acessar"}):"pdf"===e.type?(0,r.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a(e),children:"↓ Baixar PDF"}):"both"===e.type?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a({type:"viewer",path:e.viewerPath}),children:"▶ Viewer"}),(0,r.jsx)("button",{className:"hub-btn hub-btn-secondary",onClick:()=>window.open(`/downloads/${e.pdfFile}`,"_blank"),children:"↓ PDF"})]}):null}e.s(["default",()=>d],15554)}]);