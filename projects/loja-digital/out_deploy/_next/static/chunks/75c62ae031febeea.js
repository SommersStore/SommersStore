(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,18566,(e,r,a)=>{r.exports=e.r(76562)},7306,e=>{"use strict";var r=e.i(43476),a=e.i(71645),o=e.i(18566);e.i(51718);var t=e.i(18357),s=e.i(76009);function i({children:e}){let[i,n]=(0,a.useState)(s.isConfigValid),[l,d]=(0,a.useState)(null),c=(0,o.usePathname)(),p=(0,o.useRouter)();return((0,a.useEffect)(()=>{if(!s.isConfigValid)return;let e=(0,t.onAuthStateChanged)(s.auth,e=>{if(d(e),n(!1),!e){let e=encodeURIComponent(c||"/hub");p.replace(`/login?next=${e}`)}});return()=>e()},[c,p]),i)?(0,r.jsx)("div",{style:{minHeight:"100vh",background:"#111827",color:"#f8fafc",display:"grid",placeItems:"center",padding:"24px",fontFamily:"var(--font-geist-sans)"},children:(0,r.jsx)("div",{style:{border:"1px solid rgba(56,189,248,0.26)",borderRadius:"8px",padding:"18px 20px",background:"rgba(15,23,42,0.82)",color:"#7dd3fc",fontSize:"12px",fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase"},children:"Verificando acesso seguro"})}):s.isConfigValid?l?(0,r.jsx)(r.Fragment,{children:e}):null:(0,r.jsx)("main",{style:{minHeight:"100vh",background:"#111827",color:"#f8fafc",display:"grid",placeItems:"center",padding:"24px",fontFamily:"var(--font-geist-sans)"},children:(0,r.jsxs)("section",{style:{width:"min(480px, 100%)",border:"1px solid rgba(248,250,252,0.12)",borderRadius:"8px",padding:"24px",background:"rgba(15,23,42,0.86)"},children:[(0,r.jsx)("p",{style:{margin:"0 0 8px",color:"#38bdf8",fontSize:"12px",textTransform:"uppercase",letterSpacing:"0.12em"},children:"Firebase pendente"}),(0,r.jsx)("h1",{style:{margin:"0 0 12px",fontSize:"24px"},children:"Configure o acesso seguro"}),(0,r.jsx)("p",{style:{margin:0,color:"#cbd5e1",lineHeight:1.6},children:"Preencha as variaveis NEXT_PUBLIC_FIREBASE_* no arquivo .env.local antes de usar o painel privado."})]})})}let n={id:"metodo",title:"Método Essência Ativa BR",subtitle:"Ebook Principal · 144 pág.",cover:"/ebook/master_cover_v2.png",tag:"PRINCIPAL",tagVariant:"gold",progress:0,action:{type:"pdf",file:"O_Cofre_das_Botanicas_Secretas.pdf"}},l=[{id:"bonus-blends",title:"10 Receitas de Blends",subtitle:"Bônus · Prontas para Vender",cover:"/sais/assets/bonus-1-v2.png",tag:"BÔNUS",tagVariant:"green",action:{type:"pdf",file:"30_Blends_OB1.pdf"}},{id:"bonus-fornecedores",title:"Lista de Fornecedores BR",subtitle:"Bônus · Preços e Contatos",cover:"/sais/assets/bonus-2.png",tag:"BÔNUS",tagVariant:"green",action:{type:"pdf",file:"Guia_Fornecedores_Master.pdf"}},{id:"bonus-posts",title:"Kit de Posts + Scripts",subtitle:"Bônus · Instagram & WhatsApp",cover:"/sais/assets/bonus-3.png",tag:"BÔNUS",tagVariant:"green",action:{type:"soon"}}],d=[{id:"ob1",title:"30 Blends Premium",subtitle:"Order Bump 01",cover:"/sais/assets/10-blends.png",tag:"OB 01",tagVariant:"blue",action:{type:"pdf",file:"30_Blends_OB1.pdf"}},{id:"ob2",title:"Mindset Alquimista",subtitle:"Order Bump 02",cover:"/ebook/capa_mistica_rosto.png",tag:"OB 02",tagVariant:"blue",action:{type:"pdf",file:"Mindset_OB2.pdf"}},{id:"ob3",title:"Em breve",subtitle:"Order Bump 03",cover:"/ebook/capa_mistica_banheira.png",tag:"OB 03",tagVariant:"muted",locked:!0,action:{type:"soon"}}],c={id:"cofre",title:"O Cofre das Botânicas Secretas",subtitle:"Upsell Principal · Viewer + PDFs",cover:"/ebook/master_cover_v2.png",tag:"UPSELL",tagVariant:"purple",progress:65,action:{type:"both",viewerPath:"/ebook/viewer/cofre",pdfFile:"O_Cofre_das_Botanicas_Secretas.pdf"}},p=[{id:"cofre-elite",title:"Edição Elite",subtitle:"Versão Premium Expandida",cover:"/ebook/capa_mistica_dourada.png",tag:"ELITE",tagVariant:"gold",action:{type:"pdf",file:"O_Cofre_das_Botanicas_Secretas_Elite.pdf"}},{id:"sinergias",title:"30 Sinergias de Sucesso",subtitle:"30 Fórmulas Exclusivas",cover:"/ebook/capa_mistica_esmeralda.png",tag:"BÔNUS",tagVariant:"green",progress:40,action:{type:"viewer",path:"/ebook/viewer/sinergias"}},{id:"fornecedores",title:"Cofre de Fornecedores",subtitle:"15 Contatos Verificados",cover:"/ebook/capa_mistica_dourada.png",tag:"BÔNUS",tagVariant:"green",progress:100,action:{type:"viewer",path:"/ebook/viewer/fornecedores"}},{id:"ritual-noite",title:"Ritual da Meia-Noite",subtitle:"10 Rituais Premium",cover:"/ebook/capa_mistica_rubi.png",tag:"BÔNUS",tagVariant:"green",progress:15,action:{type:"viewer",path:"/ebook/viewer/ritual-noite"}}],b={gold:{bg:"rgba(197,160,89,0.12)",color:"#C5A059",border:"rgba(197,160,89,0.35)"},green:{bg:"rgba(111,175,111,0.12)",color:"#6FAF6F",border:"rgba(111,175,111,0.35)"},purple:{bg:"rgba(160,123,197,0.12)",color:"#A07BC5",border:"rgba(160,123,197,0.35)"},blue:{bg:"rgba(100,149,237,0.12)",color:"#6495ED",border:"rgba(100,149,237,0.35)"},muted:{bg:"rgba(255,255,255,0.04)",color:"rgba(229,229,229,0.3)",border:"rgba(255,255,255,0.1)"}};function u(){let e=(0,o.useRouter)(),[b,u]=(0,a.useState)(null),h=async()=>{await (0,t.signOut)(s.auth),e.push("/login")},x=r=>{"viewer"===r.type&&e.push(r.path),"both"===r.type&&e.push(r.viewerPath),"pdf"===r.type&&window.open(`/downloads/${r.file}`,"_blank")},m=(e,a="companion")=>(0,r.jsx)(g,{p:e,size:a,hovered:b,setHovered:u,navigate:x},e.id);return(0,r.jsxs)(i,{children:[(0,r.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hub { display: flex; min-height: 100vh; background: #0a0a0d; color: #e0e0d0; font-family: 'Montserrat', sans-serif; }

        /* ── SIDEBAR ── */
        .hub-side {
          width: 210px; flex-shrink: 0;
          background: #0d0d11;
          border-right: 1px solid rgba(197,160,89,0.08);
          display: flex; flex-direction: column;
          padding: 32px 0;
          position: sticky; top: 0; height: 100vh; overflow-y: auto;
        }
        .hub-logo { padding: 0 24px 28px; border-bottom: 1px solid rgba(197,160,89,0.06); margin-bottom: 20px; }
        .hub-logo-text { font-size: 9px; font-weight: 900; letter-spacing: 6px; color: #C5A059; text-transform: uppercase; display: block; }
        .hub-logo-sub  { font-size: 7px; letter-spacing: 2px; color: rgba(229,229,229,0.2); text-transform: uppercase; margin-top: 4px; display: block; }
        .hub-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 24px; font-size: 8px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; color: rgba(229,229,229,0.3); cursor: pointer;
          border-left: 2px solid transparent; transition: all 0.2s;
          background: none; border-top: none; border-right: none; border-bottom: none;
          width: 100%; text-align: left; font-family: 'Montserrat', sans-serif;
        }
        .hub-nav-item:hover  { color: rgba(229,229,229,0.7); background: rgba(255,255,255,0.02); }
        .hub-nav-item.active { color: #C5A059; border-left-color: #C5A059; background: rgba(197,160,89,0.05); }
        .hub-nav-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
        .hub-side-footer { margin-top: auto; padding: 20px 24px 0; border-top: 1px solid rgba(197,160,89,0.06); }
        .hub-user-badge { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .hub-avatar { width: 32px; height: 32px; border-radius: 50%; background: rgba(197,160,89,0.1); border: 1px solid rgba(197,160,89,0.25); display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
        .hub-user-name  { font-size: 9px; font-weight: 700; color: #C5A059; letter-spacing: 1px; text-transform: uppercase; }
        .hub-user-email { font-size: 7px; color: rgba(229,229,229,0.25); letter-spacing: 0.3px; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px; }
        .hub-logout-btn {
          width: 100%; padding: 9px; background: none;
          border: 1px solid rgba(255,255,255,0.07); color: rgba(229,229,229,0.25);
          font-family: 'Montserrat', sans-serif; font-size: 7px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
        }
        .hub-logout-btn:hover { border-color: rgba(197,160,89,0.3); color: #C5A059; }

        /* ── MAIN ── */
        .hub-main { flex: 1; padding: 40px 40px 64px; overflow-y: auto; min-width: 0; }

        /* ── PRODUCT ROW ── */
        .hub-product-row {
          display: flex;
          align-items: flex-start;
          gap: 0;
          margin-bottom: 48px;
          background: rgba(255,255,255,0.015);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 6px;
          overflow: hidden;
        }

        /* Anchor — produto principal da linha */
        .hub-anchor {
          flex-shrink: 0;
          padding: 20px;
          background: rgba(0,0,0,0.25);
          border-right: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .hub-anchor-label {
          font-size: 7px; font-weight: 900; letter-spacing: 4px;
          text-transform: uppercase; color: rgba(197,160,89,0.4);
          margin-bottom: 14px; text-align: center;
        }

        /* Companions — complementos \xe0 direita */
        .hub-companions {
          flex: 1; min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .hub-group {
          display: flex;
          flex-direction: column;
          padding: 16px 20px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .hub-group:last-child { border-bottom: none; }
        .hub-group-label {
          font-size: 7px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: rgba(229,229,229,0.2);
          margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .hub-group-label::after {
          content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.04);
        }
        .hub-group-cards { display: flex; flex-wrap: wrap; gap: 12px; }

        /* ── CARDS ── */
        .hub-card {
          background: #111118; border: 1px solid rgba(255,255,255,0.06);
          border-radius: 3px; overflow: hidden; cursor: pointer;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          position: relative; flex-shrink: 0;
        }
        .hub-card-anchor   { width: 200px; }
        .hub-card-companion { width: 152px; }
        .hub-card:hover { transform: translateY(-3px); border-color: rgba(197,160,89,0.22); box-shadow: 0 10px 28px rgba(0,0,0,0.5); }
        .hub-card.locked { opacity: 0.4; cursor: default; }
        .hub-card.locked:hover { transform: none; border-color: rgba(255,255,255,0.06); box-shadow: none; }

        .hub-card-img { width: 100%; aspect-ratio: 3/4; overflow: hidden; position: relative; background: #1a1a22; }
        .hub-card-img-inner { width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.5s; }
        .hub-card:hover .hub-card-img-inner { transform: scale(1.04); }
        .hub-card-img-fade { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(10,10,13,0.8) 100%); }
        .hub-card-tag {
          position: absolute; top: 8px; left: 8px;
          font-size: 6px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; padding: 2px 7px;
          border-radius: 2px; border: 1px solid;
        }
        .hub-card-lock { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(10,10,13,0.6); font-size: 20px; }
        .hub-card-progress { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: rgba(255,255,255,0.06); }
        .hub-card-progress-fill { height: 100%; background: #C5A059; }
        .hub-badge-done { position: absolute; top: 8px; right: 8px; font-size: 6px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 2px 6px; background: rgba(111,175,111,0.2); color: #6faf6f; border: 1px solid rgba(111,175,111,0.4); border-radius: 2px; }

        .hub-card-body { padding: 10px 12px 12px; }
        .hub-card-sub   { font-size: 6px; letter-spacing: 1.5px; color: rgba(229,229,229,0.2); text-transform: uppercase; margin-bottom: 4px; }
        .hub-card-title { font-family: 'Libre Baskerville', serif; font-size: 12px; font-weight: 400; color: #e5e5e5; line-height: 1.35; margin-bottom: 9px; }
        .hub-card-anchor .hub-card-title { font-size: 14px; }

        .hub-card-actions { display: flex; gap: 5px; }
        .hub-btn {
          flex: 1; padding: 6px 4px; font-family: 'Montserrat', sans-serif;
          font-size: 6px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s; border-radius: 2px; border: 1px solid; white-space: nowrap;
        }
        .hub-btn-primary   { background: rgba(197,160,89,0.1); color: #C5A059; border-color: rgba(197,160,89,0.25); }
        .hub-btn-primary:hover { background: rgba(197,160,89,0.2); border-color: rgba(197,160,89,0.5); }
        .hub-btn-secondary { background: rgba(255,255,255,0.03); color: rgba(229,229,229,0.35); border-color: rgba(255,255,255,0.08); }
        .hub-btn-secondary:hover { background: rgba(255,255,255,0.06); color: rgba(229,229,229,0.6); }
        .hub-btn-soon { background: none; color: rgba(229,229,229,0.2); border-color: rgba(255,255,255,0.06); cursor: default; flex: 1; padding: 6px 4px; font-size: 6px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }

        /* ── FUNNEL ARROW ── */
        .hub-funnel-arrow {
          display: flex; align-items: center; justify-content: flex-start;
          height: 28px; gap: 8px; margin-bottom: 12px; padding-left: 20px;
        }
        .hub-funnel-arrow-line { width: 32px; height: 1px; background: rgba(197,160,89,0.12); }
        .hub-funnel-arrow-icon { font-size: 9px; color: rgba(197,160,89,0.3); }

        /* ── ROW HEADER ── */
        .hub-row-header {
          display: flex; align-items: center; gap: 12px;
          padding: 0 0 10px 0; margin-bottom: 0;
        }
        .hub-row-num {
          width: 20px; height: 20px; border-radius: 50%;
          background: rgba(197,160,89,0.1); border: 1px solid rgba(197,160,89,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 8px; font-weight: 900; color: #C5A059; flex-shrink: 0;
        }
        .hub-row-title { font-size: 8px; font-weight: 700; letter-spacing: 3.5px; text-transform: uppercase; color: rgba(229,229,229,0.28); }

        @media (max-width: 900px) {
          .hub-side { display: none; }
          .hub-main { padding: 24px 16px 48px; }
          .hub-product-row { flex-direction: column; }
          .hub-anchor { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); width: 100%; flex-direction: row; flex-wrap: wrap; justify-content: center; }
          .hub-card-anchor { width: 160px; }
          .hub-card-companion { width: 130px; }
        }
      `}),(0,r.jsxs)("div",{className:"hub",children:[(0,r.jsxs)("aside",{className:"hub-side",children:[(0,r.jsxs)("div",{className:"hub-logo",children:[(0,r.jsx)("span",{className:"hub-logo-text",children:"Sommers Store"}),(0,r.jsx)("span",{className:"hub-logo-sub",children:"Área de Membros"})]}),[{label:"Meu Acervo",dot:!0},{label:"Comunidade",dot:!1},{label:"Suporte",dot:!1}].map(e=>(0,r.jsxs)("button",{className:`hub-nav-item${e.dot?" active":""}`,children:[(0,r.jsx)("span",{className:"hub-nav-dot"}),e.label]},e.label)),(0,r.jsxs)("div",{className:"hub-side-footer",children:[(0,r.jsxs)("div",{className:"hub-user-badge",children:[(0,r.jsx)("div",{className:"hub-avatar",children:"💎"}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"hub-user-name",children:"Aristocrata"}),(0,r.jsx)("div",{className:"hub-user-email",children:s.auth.currentUser?.email})]})]}),(0,r.jsx)("button",{className:"hub-logout-btn",onClick:h,children:"Encerrar sessão"})]})]}),(0,r.jsxs)("main",{className:"hub-main",children:[(0,r.jsxs)("div",{className:"hub-row-header",style:{marginBottom:10},children:[(0,r.jsx)("div",{className:"hub-row-num",children:"1"}),(0,r.jsx)("span",{className:"hub-row-title",children:"Método Essência Ativa BR"})]}),(0,r.jsxs)("div",{className:"hub-product-row",children:[(0,r.jsxs)("div",{className:"hub-anchor",children:[(0,r.jsx)("span",{className:"hub-anchor-label",children:"Principal"}),m(n,"anchor")]}),(0,r.jsxs)("div",{className:"hub-companions",children:[(0,r.jsxs)("div",{className:"hub-group",children:[(0,r.jsx)("div",{className:"hub-group-label",children:"Bônus Inclusos"}),(0,r.jsx)("div",{className:"hub-group-cards",children:l.map(e=>m(e))})]}),(0,r.jsxs)("div",{className:"hub-group",children:[(0,r.jsx)("div",{className:"hub-group-label",children:"Ofertas Especiais (Order Bumps)"}),(0,r.jsx)("div",{className:"hub-group-cards",children:d.map(e=>m(e))})]})]})]}),(0,r.jsxs)("div",{className:"hub-funnel-arrow",children:[(0,r.jsx)("div",{className:"hub-funnel-arrow-line"}),(0,r.jsx)("span",{className:"hub-funnel-arrow-icon",children:"▼"}),(0,r.jsx)("div",{className:"hub-funnel-arrow-line"})]}),(0,r.jsxs)("div",{className:"hub-row-header",style:{marginBottom:10},children:[(0,r.jsx)("div",{className:"hub-row-num",children:"2"}),(0,r.jsx)("span",{className:"hub-row-title",children:"O Cofre das Botânicas Secretas — Upsell"})]}),(0,r.jsxs)("div",{className:"hub-product-row",children:[(0,r.jsxs)("div",{className:"hub-anchor",children:[(0,r.jsx)("span",{className:"hub-anchor-label",children:"Upsell"}),m(c,"anchor")]}),(0,r.jsx)("div",{className:"hub-companions",children:(0,r.jsxs)("div",{className:"hub-group",children:[(0,r.jsx)("div",{className:"hub-group-label",children:"Conteúdos Inclusos"}),(0,r.jsx)("div",{className:"hub-group-cards",children:p.map(e=>m(e))})]})})]})]})]})]})}function g({p:e,size:a="companion",hovered:o,setHovered:t,navigate:s}){let i=b[e.tagVariant];return(0,r.jsxs)("div",{className:`hub-card hub-card-${a}${e.locked?" locked":""}`,onMouseEnter:()=>!e.locked&&t(e.id),onMouseLeave:()=>t(null),onClick:()=>!e.locked&&s(e.action),children:[(0,r.jsxs)("div",{className:"hub-card-img",children:[(0,r.jsx)("div",{className:"hub-card-img-inner",style:{backgroundImage:`url('${e.cover}')`}}),(0,r.jsx)("div",{className:"hub-card-img-fade"}),(0,r.jsx)("span",{className:"hub-card-tag",style:{background:i.bg,color:i.color,borderColor:i.border},children:e.tag}),e.locked&&(0,r.jsx)("div",{className:"hub-card-lock",children:"🔒"}),100===e.progress&&(0,r.jsx)("span",{className:"hub-badge-done",children:"✓ Concluído"}),"number"==typeof e.progress&&e.progress>0&&e.progress<100&&(0,r.jsx)("div",{className:"hub-card-progress",children:(0,r.jsx)("div",{className:"hub-card-progress-fill",style:{width:`${e.progress}%`}})})]}),(0,r.jsxs)("div",{className:"hub-card-body",children:[(0,r.jsx)("p",{className:"hub-card-sub",children:e.subtitle}),(0,r.jsx)("p",{className:"hub-card-title",children:e.title}),(0,r.jsx)("div",{className:"hub-card-actions",onClick:e=>e.stopPropagation(),children:(0,r.jsx)(h,{action:e.action,navigate:s})})]})]})}function h({action:e,navigate:a}){return"soon"===e.type?(0,r.jsx)("span",{className:"hub-btn-soon",children:"Em breve"}):"viewer"===e.type?(0,r.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a(e),children:"▶ Acessar"}):"pdf"===e.type?(0,r.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a(e),children:"↓ Baixar PDF"}):"both"===e.type?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{className:"hub-btn hub-btn-primary",onClick:()=>a({type:"viewer",path:e.viewerPath}),children:"▶ Viewer"}),(0,r.jsx)("button",{className:"hub-btn hub-btn-secondary",onClick:()=>window.open(`/downloads/${e.pdfFile}`,"_blank"),children:"↓ PDF"})]}):null}e.s(["default",()=>u],7306)}]);