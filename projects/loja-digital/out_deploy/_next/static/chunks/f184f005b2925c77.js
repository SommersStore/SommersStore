(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18566,(r,e,a)=>{e.exports=r.r(76562)},15554,r=>{"use strict";var e=r.i(43476),a=r.i(71645),o=r.i(18566);r.i(51718);var t=r.i(18357),i=r.i(76009);function n({children:r}){let[n,s]=(0,a.useState)(i.isConfigValid),[l,d]=(0,a.useState)(null),c=(0,o.usePathname)(),b=(0,o.useRouter)();return((0,a.useEffect)(()=>{if(!i.isConfigValid)return;let r=(0,t.onAuthStateChanged)(i.auth,r=>{if(d(r),s(!1),!r){let r=encodeURIComponent(c||"/hub");b.replace(`/login?next=${r}`)}});return()=>r()},[c,b]),n)?(0,e.jsx)("div",{style:{minHeight:"100vh",background:"#111827",color:"#f8fafc",display:"grid",placeItems:"center",padding:"24px",fontFamily:"var(--font-geist-sans)"},children:(0,e.jsx)("div",{style:{border:"1px solid rgba(56,189,248,0.26)",borderRadius:"8px",padding:"18px 20px",background:"rgba(15,23,42,0.82)",color:"#7dd3fc",fontSize:"12px",fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase"},children:"Verificando acesso seguro"})}):i.isConfigValid?l?(0,e.jsx)(e.Fragment,{children:r}):null:(0,e.jsx)("main",{style:{minHeight:"100vh",background:"#111827",color:"#f8fafc",display:"grid",placeItems:"center",padding:"24px",fontFamily:"var(--font-geist-sans)"},children:(0,e.jsxs)("section",{style:{width:"min(480px, 100%)",border:"1px solid rgba(248,250,252,0.12)",borderRadius:"8px",padding:"24px",background:"rgba(15,23,42,0.86)"},children:[(0,e.jsx)("p",{style:{margin:"0 0 8px",color:"#38bdf8",fontSize:"12px",textTransform:"uppercase",letterSpacing:"0.12em"},children:"Firebase pendente"}),(0,e.jsx)("h1",{style:{margin:"0 0 12px",fontSize:"24px"},children:"Configure o acesso seguro"}),(0,e.jsx)("p",{style:{margin:0,color:"#cbd5e1",lineHeight:1.6},children:"Preencha as variaveis NEXT_PUBLIC_FIREBASE_* no arquivo .env.local antes de usar o painel privado."})]})})}let s={gold:{bg:"rgba(197,160,89,0.15)",color:"#C5A059",border:"rgba(197,160,89,0.4)"},green:{bg:"rgba(111,175,111,0.13)",color:"#7ABF7A",border:"rgba(111,175,111,0.38)"},purple:{bg:"rgba(160,123,197,0.13)",color:"#B08BD4",border:"rgba(160,123,197,0.38)"},blue:{bg:"rgba(100,149,237,0.13)",color:"#7AABF0",border:"rgba(100,149,237,0.38)"},muted:{bg:"rgba(255,255,255,0.04)",color:"rgba(229,229,229,0.25)",border:"rgba(255,255,255,0.08)"}},l={bonus:{border:"rgba(111,175,111,0.2)",bg:"rgba(111,175,111,0.04)",label:"rgba(111,175,111,0.55)"},ob:{border:"rgba(100,149,237,0.2)",bg:"rgba(100,149,237,0.04)",label:"rgba(100,149,237,0.55)"},included:{border:"rgba(160,123,197,0.2)",bg:"rgba(160,123,197,0.04)",label:"rgba(160,123,197,0.55)"}};function d({catalog:r}){let s=(0,o.useRouter)(),[d,b]=(0,a.useState)(null),p=async()=>{await (0,t.signOut)(i.auth),s.push("/login")},g=r=>{"viewer"===r.type&&s.push(r.path),"both"===r.type&&s.push(r.viewerPath),"pdf"===r.type&&window.open(`/downloads/${r.file}`,"_blank")};return(0,e.jsxs)(n,{children:[(0,e.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #C5A059;
          --gold-dim: rgba(197,160,89,0.18);
          --gold-line: rgba(197,160,89,0.12);
          --surface: #0d0d11;
          --surface-2: #111118;
          --surface-3: #16161f;
          --text: #e8e8d8;
          --text-dim: rgba(232,232,216,0.4);
          --text-muted: rgba(232,232,216,0.18);
        }

        .hub { display: flex; min-height: 100vh; background: #090910; color: var(--text); font-family: 'Montserrat', sans-serif; }

        /* ══ SIDEBAR ══ */
        .hub-side {
          width: 216px; flex-shrink: 0;
          background: var(--surface);
          border-right: 1px solid var(--gold-line);
          display: flex; flex-direction: column;
          padding: 36px 0;
          position: sticky; top: 0; height: 100vh; overflow-y: auto;
        }
        .hub-logo { padding: 0 26px 28px; border-bottom: 1px solid var(--gold-line); margin-bottom: 22px; }
        .hub-logo-mark { width: 28px; height: 2px; background: linear-gradient(90deg, var(--gold), transparent); margin-bottom: 10px; }
        .hub-logo-text { font-size: 8px; font-weight: 900; letter-spacing: 5px; color: var(--gold); text-transform: uppercase; display: block; }
        .hub-logo-sub  { font-size: 6.5px; letter-spacing: 2.5px; color: var(--text-muted); text-transform: uppercase; margin-top: 5px; display: block; }
        .hub-nav-group-label { padding: 0 26px; margin-bottom: 6px; margin-top: 16px; font-size: 6px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--text-muted); }
        .hub-nav-item {
          display: flex; align-items: center; gap: 11px;
          padding: 10px 26px; font-size: 8px; font-weight: 600; letter-spacing: 1.5px;
          text-transform: uppercase; color: var(--text-dim); cursor: pointer;
          border-left: 2px solid transparent; transition: all 0.2s;
          background: none; border-top: none; border-right: none; border-bottom: none;
          width: 100%; text-align: left; font-family: 'Montserrat', sans-serif;
        }
        .hub-nav-item:hover  { color: rgba(232,232,216,0.75); background: rgba(255,255,255,0.02); }
        .hub-nav-item.active { color: var(--gold); border-left-color: var(--gold); background: var(--gold-dim); }
        .hub-nav-dot { width: 4px; height: 4px; border-radius: 50%; background: currentColor; flex-shrink: 0; opacity: 0.7; }
        .hub-side-footer { margin-top: auto; padding: 20px 26px 0; border-top: 1px solid var(--gold-line); }
        .hub-user-badge { display: flex; align-items: center; gap: 11px; margin-bottom: 16px; }
        .hub-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, rgba(197,160,89,0.2), rgba(197,160,89,0.05)); border: 1px solid rgba(197,160,89,0.3); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
        .hub-user-name  { font-size: 8px; font-weight: 700; color: var(--gold); letter-spacing: 1.5px; text-transform: uppercase; }
        .hub-user-email { font-size: 6.5px; color: var(--text-muted); margin-top: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 138px; }
        .hub-logout-btn { width: 100%; padding: 9px; background: none; border: 1px solid rgba(255,255,255,0.06); color: var(--text-muted); font-family: 'Montserrat', sans-serif; font-size: 7px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.25s; }
        .hub-logout-btn:hover { border-color: rgba(197,160,89,0.28); color: var(--gold); }

        /* ══ MAIN ══ */
        .hub-main { flex: 1; overflow-y: auto; min-width: 0; }
        .hub-welcome { padding: 28px 44px 22px; border-bottom: 1px solid var(--gold-line); background: linear-gradient(180deg, rgba(197,160,89,0.04) 0%, transparent 100%); }
        .hub-welcome-eyebrow { font-size: 7px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
        .hub-welcome-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: var(--text); letter-spacing: 1px; line-height: 1.2; }
        .hub-welcome-title em { font-style: italic; color: var(--gold); }
        .hub-content { padding: 36px 44px 72px; }

        /* ══ PRODUCT ROW ══ */
        .hub-row-wrap { margin-bottom: 44px; }
        .hub-row-eyebrow { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
        .hub-row-num { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, rgba(197,160,89,0.2), rgba(197,160,89,0.06)); border: 1px solid rgba(197,160,89,0.3); display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 900; color: var(--gold); flex-shrink: 0; }
        .hub-row-title { font-size: 8px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--text-dim); }
        .hub-row-rule  { flex: 1; height: 1px; background: var(--gold-line); }
        .hub-product-row { display: flex; align-items: stretch; gap: 0; background: var(--surface-2); border: 1px solid rgba(255,255,255,0.06); border-top: 2px solid var(--gold-line); border-radius: 4px; overflow: hidden; }
        .hub-product-row.upsell { border-top-color: rgba(160,123,197,0.35); }
        .hub-anchor { flex-shrink: 0; padding: 22px 20px; background: linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 100%); border-right: 1px solid rgba(255,255,255,0.07); display: flex; flex-direction: column; align-items: center; }
        .hub-anchor-eyebrow { font-size: 6px; font-weight: 700; letter-spacing: 3.5px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 14px; text-align: center; }
        .hub-scroll-rail { flex: 1; min-width: 0; overflow-x: auto; display: flex; align-items: stretch; scrollbar-width: thin; scrollbar-color: rgba(197,160,89,0.2) transparent; }
        .hub-scroll-rail::-webkit-scrollbar { height: 4px; }
        .hub-scroll-rail::-webkit-scrollbar-track { background: transparent; }
        .hub-scroll-rail::-webkit-scrollbar-thumb { background: rgba(197,160,89,0.2); border-radius: 2px; }
        .hub-group { flex-shrink: 0; display: flex; flex-direction: column; padding: 20px 22px 22px; }
        .hub-group + .hub-group { border-left: 1px solid rgba(255,255,255,0.05); }
        .hub-group-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; white-space: nowrap; }
        .hub-group-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .hub-group-label { font-size: 7px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; }
        .hub-group-count { font-size: 6.5px; font-weight: 600; letter-spacing: 1px; padding: 2px 7px; border-radius: 10px; border: 1px solid; }
        .hub-group-cards { display: flex; gap: 12px; flex-wrap: nowrap; }

        /* ══ CARDS ══ */
        .hub-card { background: var(--surface-3); border: 1px solid rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; cursor: pointer; transition: transform 0.3s cubic-bezier(.2,.8,.2,1), border-color 0.3s, box-shadow 0.3s; position: relative; flex-shrink: 0; }
        .hub-card-anchor    { width: 198px; }
        .hub-card-companion { width: 178px; }
        .hub-card:hover { transform: translateY(-4px); border-color: rgba(197,160,89,0.28); box-shadow: 0 14px 36px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,160,89,0.08); }
        .hub-card.locked { opacity: 0.38; cursor: default; }
        .hub-card.locked:hover { transform: none; border-color: rgba(255,255,255,0.06); box-shadow: none; }
        .hub-card-img { width: 100%; aspect-ratio: 3/4; overflow: hidden; position: relative; background: #1a1a22; }
        .hub-card-img-inner { width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.55s cubic-bezier(.2,.8,.2,1); }
        .hub-card:hover .hub-card-img-inner { transform: scale(1.05); }
        .hub-card-img-fade { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 45%, rgba(8,8,14,0.85) 100%); }
        .hub-card-tag { position: absolute; top: 9px; left: 9px; font-size: 5.5px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; padding: 3px 8px; border-radius: 2px; border: 1px solid; backdrop-filter: blur(4px); }
        .hub-card-lock { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(8,8,14,0.65); font-size: 22px; }
        .hub-card-progress { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: rgba(255,255,255,0.06); }
        .hub-card-progress-fill { height: 100%; background: linear-gradient(90deg, rgba(197,160,89,0.6), var(--gold)); }
        .hub-badge-done { position: absolute; top: 9px; right: 9px; font-size: 5.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 3px 7px; background: rgba(111,175,111,0.18); color: #7ABF7A; border: 1px solid rgba(111,175,111,0.35); border-radius: 2px; backdrop-filter: blur(4px); }
        .hub-card-body { padding: 11px 13px 13px; }
        .hub-card-sub { font-size: 5.5px; letter-spacing: 1.5px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 5px; }
        .hub-card-title { font-family: 'Cormorant Garamond', serif; font-size: 13.5px; font-weight: 400; color: var(--text); line-height: 1.3; margin-bottom: 10px; }
        .hub-card-anchor .hub-card-title { font-size: 15px; }
        .hub-card-actions { display: flex; gap: 6px; }
        .hub-btn { flex: 1; padding: 7px 5px; font-family: 'Montserrat', sans-serif; font-size: 5.5px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; border-radius: 2px; border: 1px solid; white-space: nowrap; }
        .hub-btn-primary { background: linear-gradient(135deg, rgba(197,160,89,0.14), rgba(197,160,89,0.06)); color: var(--gold); border-color: rgba(197,160,89,0.28); }
        .hub-btn-primary:hover { background: rgba(197,160,89,0.22); border-color: rgba(197,160,89,0.55); }
        .hub-btn-secondary { background: rgba(255,255,255,0.03); color: var(--text-dim); border-color: rgba(255,255,255,0.08); }
        .hub-btn-secondary:hover { background: rgba(255,255,255,0.07); color: rgba(232,232,216,0.65); }
        .hub-btn-soon { flex: 1; padding: 7px 5px; font-size: 5.5px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; background: none; color: var(--text-muted); border: 1px solid rgba(255,255,255,0.05); cursor: default; }

        /* ══ FUNNEL CONNECTOR ══ */
        .hub-connector { display: flex; align-items: center; gap: 0; margin: 0 0 20px 22px; height: 36px; }
        .hub-connector-vline { width: 1px; height: 100%; background: linear-gradient(180deg, var(--gold-line), rgba(197,160,89,0.04)); }
        .hub-connector-label { margin-left: 12px; font-size: 6px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--text-muted); }

        @media (max-width: 960px) {
          .hub-side { display: none; }
          .hub-welcome, .hub-content { padding-left: 20px; padding-right: 20px; }
          .hub-product-row { flex-direction: column; }
          .hub-anchor { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 12px; }
          .hub-group + .hub-group { border-left: none; border-top: 1px solid rgba(255,255,255,0.05); }
          .hub-card-anchor    { width: 155px; }
          .hub-card-companion { width: 145px; }
        }
      `}),(0,e.jsxs)("div",{className:"hub",children:[(0,e.jsxs)("aside",{className:"hub-side",children:[(0,e.jsxs)("div",{className:"hub-logo",children:[(0,e.jsx)("div",{className:"hub-logo-mark"}),(0,e.jsx)("span",{className:"hub-logo-text",children:"Sommers Store"}),(0,e.jsx)("span",{className:"hub-logo-sub",children:"Área de Membros"})]}),(0,e.jsx)("span",{className:"hub-nav-group-label",children:"Menu"}),[{label:"Meu Acervo",active:!0},{label:"Comunidade",active:!1},{label:"Suporte",active:!1}].map(r=>(0,e.jsxs)("button",{className:`hub-nav-item${r.active?" active":""}`,children:[(0,e.jsx)("span",{className:"hub-nav-dot"}),r.label]},r.label)),(0,e.jsxs)("div",{className:"hub-side-footer",children:[(0,e.jsxs)("div",{className:"hub-user-badge",children:[(0,e.jsx)("div",{className:"hub-avatar",children:"💎"}),(0,e.jsxs)("div",{children:[(0,e.jsx)("div",{className:"hub-user-name",children:"Aristocrata"}),(0,e.jsx)("div",{className:"hub-user-email",children:i.auth.currentUser?.email})]})]}),(0,e.jsx)("button",{className:"hub-logout-btn",onClick:p,children:"Encerrar sessão"})]})]}),(0,e.jsxs)("main",{className:"hub-main",children:[(0,e.jsxs)("div",{className:"hub-welcome",children:[(0,e.jsx)("p",{className:"hub-welcome-eyebrow",children:"Bem-vinda de volta"}),(0,e.jsxs)("h1",{className:"hub-welcome-title",children:["Seu ",(0,e.jsx)("em",{children:"acervo"})," completo"]})]}),(0,e.jsx)("div",{className:"hub-content",children:r.rows.map((o,t)=>{let i="upsell"===o.rowVariant;return(0,e.jsxs)(a.default.Fragment,{children:[(0,e.jsxs)("div",{className:"hub-row-wrap",children:[(0,e.jsxs)("div",{className:"hub-row-eyebrow",children:[(0,e.jsx)("div",{className:"hub-row-num",style:i?{borderColor:"rgba(160,123,197,0.4)",background:"rgba(160,123,197,0.12)",color:"#B08BD4"}:void 0,children:o.rowNum}),(0,e.jsx)("span",{className:"hub-row-title",children:o.label}),(0,e.jsx)("div",{className:"hub-row-rule",style:i?{background:"rgba(160,123,197,0.15)"}:void 0})]}),(0,e.jsxs)("div",{className:`hub-product-row${i?" upsell":""}`,children:[(0,e.jsxs)("div",{className:"hub-anchor",style:{background:i?"linear-gradient(180deg, rgba(160,123,197,0.08) 0%, rgba(0,0,0,0.2) 100%)":"linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 100%)"},children:[(0,e.jsx)("span",{className:"hub-anchor-eyebrow",children:o.anchorLabel}),(0,e.jsx)(c,{p:o.anchor,size:"anchor",hovered:d,setHovered:b,navigate:g})]}),(0,e.jsx)("div",{className:"hub-scroll-rail",children:o.groups.map(r=>{let a=l[r.accentKey]??l.bonus;return(0,e.jsxs)("div",{className:"hub-group",style:{background:a.bg},children:[(0,e.jsxs)("div",{className:"hub-group-header",children:[(0,e.jsx)("div",{className:"hub-group-dot",style:{background:a.label}}),(0,e.jsx)("span",{className:"hub-group-label",style:{color:a.label},children:r.label}),(0,e.jsx)("span",{className:"hub-group-count",style:{color:a.label,borderColor:a.border},children:r.items.length})]}),(0,e.jsx)("div",{className:"hub-group-cards",children:r.items.map(r=>(0,e.jsx)(c,{p:r,size:"companion",hovered:d,setHovered:b,navigate:g},r.id))})]},r.id)})})]})]}),o.connectorAfter&&t<r.rows.length-1&&(0,e.jsxs)("div",{className:"hub-connector",children:[(0,e.jsx)("div",{className:"hub-connector-vline"}),(0,e.jsx)("span",{className:"hub-connector-label",children:o.connectorAfter})]})]},o.id)})})]})]})]})}function c({p:r,size:a="companion",hovered:o,setHovered:t,navigate:i}){let n=s[r.tagVariant];return(0,e.jsxs)("div",{className:`hub-card hub-card-${a}${r.locked?" locked":""}`,onMouseEnter:()=>!r.locked&&t(r.id),onMouseLeave:()=>t(null),onClick:()=>!r.locked&&i(r.action),children:[(0,e.jsxs)("div",{className:"hub-card-img",children:[(0,e.jsx)("div",{className:"hub-card-img-inner",style:{backgroundImage:`url('${r.cover}')`}}),(0,e.jsx)("div",{className:"hub-card-img-fade"}),(0,e.jsx)("span",{className:"hub-card-tag",style:{background:n.bg,color:n.color,borderColor:n.border},children:r.tag}),r.locked&&(0,e.jsx)("div",{className:"hub-card-lock",children:"🔒"}),100===r.progress&&(0,e.jsx)("span",{className:"hub-badge-done",children:"✓ Concluído"}),"number"==typeof r.progress&&r.progress>0&&r.progress<100&&(0,e.jsx)("div",{className:"hub-card-progress",children:(0,e.jsx)("div",{className:"hub-card-progress-fill",style:{width:`${r.progress}%`}})})]}),(0,e.jsxs)("div",{className:"hub-card-body",children:[(0,e.jsx)("p",{className:"hub-card-sub",children:r.subtitle}),(0,e.jsx)("p",{className:"hub-card-title",children:r.title}),(0,e.jsx)("div",{className:"hub-card-actions",onClick:r=>r.stopPropagation(),children:(0,e.jsx)(b,{action:r.action,navigate:i})})]})]})}function b({action:r,navigate:a}){return"soon"===r.type?(0,e.jsx)("span",{className:"hub-btn-soon",children:"Em breve"}):"viewer"===r.type?(0,e.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a(r),children:"▶ Acessar"}):"pdf"===r.type?(0,e.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a(r),children:"↓ Baixar PDF"}):"both"===r.type?(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a({type:"viewer",path:r.viewerPath}),children:"▶ Viewer"}),(0,e.jsx)("button",{className:"hub-btn hub-btn-secondary",onClick:()=>window.open(`/downloads/${r.pdfFile}`,"_blank"),children:"↓ PDF"})]}):null}r.s(["default",()=>d],15554)}]);