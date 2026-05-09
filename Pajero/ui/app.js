const FALLBACK_VEHICLE = {
  veiculo: {
    modelo: "PAJERO HPE 3.8 GASOLINA 5P 4X4 AT-S",
    codigo_modelo: "V77W",
    chassi_vin: "JMYLYV77W5JA00169",
    motor: "6G75RN6738",
    motor_base: "6G75 V6 gasolina",
    cambio: "V5A51 automatico",
    quilometragem_km: 200000,
    historico_manutencao: "inexistente/desconhecido",
    catalisador: "ausente"
  },
  sintomas_atuais: [
    "marcha lenta instavel",
    "consumo elevado, aproximadamente 4 km/l",
    "tranco nas trocas de marcha",
    "direcao hidraulica um pouco dura"
  ]
};

const FALLBACK_MODULES = [
  {
    id: "diagnostico-inicial",
    nome: "Diagnostico Inicial",
    sistema: "Veiculo completo",
    prioridade: "Critico",
    status: "Pendente",
    risco: "critico",
    sintomas: ["sem historico", "200.000 km", "sintomas multiplos"],
    itens_criticos: ["scanner ECU", "scanner TCU", "scanner ABS", "DTCs", "dados ao vivo", "fotos base"],
    checklist_path: "01_DIAGNOSTICO_INICIAL/checklist-diagnostico-inicial.md",
    imagens_relacionadas: ["motor-6g75-cofre-001", "escapamento-sondas-001", "fluxograma-diagnostico-mermaid-001"],
    dependencias: [],
    observacoes: "Primeiro bloco obrigatorio. Nenhuma compra de peca deve ser definida antes deste registro."
  },
  {
    id: "motor-6g75",
    nome: "Revisao do Motor 6G75",
    sistema: "Motor",
    prioridade: "Critico",
    status: "Pendente",
    risco: "critico",
    sintomas: ["marcha lenta instavel", "consumo elevado"],
    itens_criticos: ["velas", "bobinas", "corpo de borboleta", "sensores", "correia dentada", "compressao"],
    checklist_path: "02_MOTOR_6G75/checklist-motor-6g75.md",
    imagens_relacionadas: ["motor-6g75-cofre-001"],
    dependencias: ["diagnostico-inicial"],
    observacoes: "Nao trocar pecas antes de scanner e leitura de dados ao vivo."
  },
  {
    id: "arrefecimento",
    nome: "Arrefecimento",
    sistema: "Motor/arrefecimento",
    prioridade: "Critico",
    status: "Pendente",
    risco: "alto",
    sintomas: ["quilometragem alta", "historico desconhecido"],
    itens_criticos: ["radiador", "mangueiras", "bomba d'agua", "termostatica", "ventoinhas"],
    checklist_path: "03_ARREFECIMENTO/checklist-arrefecimento.md",
    imagens_relacionadas: ["arrefecimento-radiador-001"],
    dependencias: ["diagnostico-inicial"],
    observacoes: "Validar temperatura real por scanner e integridade do sistema antes de rodagem longa."
  },
  {
    id: "admissao-ignicao-injecao",
    nome: "Admissao, Ignicao e Injecao",
    sistema: "Motor/gerenciamento",
    prioridade: "Critico",
    status: "Pendente",
    risco: "critico",
    sintomas: ["marcha lenta instavel", "consumo elevado", "catalisador ausente"],
    itens_criticos: ["TBI", "MAF/MAP", "TPS", "entrada falsa de ar", "sondas lambda", "STFT", "LTFT"],
    checklist_path: "04_ADMISSAO_IGNICAO_INJECAO/checklist-admissao-ignicao-injecao.md",
    imagens_relacionadas: ["escapamento-sondas-001", "admissao-tbi-001"],
    dependencias: ["diagnostico-inicial", "motor-6g75"],
    observacoes: "Escapamento sem catalisador exige leitura cuidadosa das sondas e vazamentos antes delas."
  },
  {
    id: "cambio-v5a51",
    nome: "Cambio Automatico V5A51",
    sistema: "Transmissao",
    prioridade: "Critico",
    status: "Pendente",
    risco: "critico",
    sintomas: ["tranco nas trocas"],
    itens_criticos: ["ATF", "carter", "filtro/tela", "solenoides", "corpo de valvulas", "coxins"],
    checklist_path: "05_CAMBIO_V5A51/checklist-cambio-v5a51.md",
    imagens_relacionadas: ["cambio-v5a51-carter-001"],
    dependencias: ["diagnostico-inicial", "motor-6g75"],
    observacoes: "Avaliar motor antes de condenar transmissao. Proibido flush pressurizado sem inspecao previa."
  },
  {
    id: "transferencia-super-select",
    nome: "Caixa de Transferencia Super Select",
    sistema: "Transmissao 4x4",
    prioridade: "Preventivo obrigatorio",
    status: "Pendente",
    risco: "alto",
    sintomas: ["historico desconhecido"],
    itens_criticos: ["oleo", "2H", "4H", "4HLC", "4LLC", "sensores", "vazamentos"],
    checklist_path: "06_CAIXA_TRANSFERENCIA_SUPER_SELECT/checklist-transfer.md",
    imagens_relacionadas: ["transferencia-super-select-001"],
    dependencias: ["diagnostico-inicial", "cambio-v5a51"],
    observacoes: "Validar modos de tracao de forma controlada e registrar ruidos, luzes e resposta."
  },
  {
    id: "diferenciais",
    nome: "Diferenciais Dianteiro e Traseiro",
    sistema: "Diferenciais",
    prioridade: "Preventivo obrigatorio",
    status: "Pendente",
    risco: "alto",
    sintomas: ["historico desconhecido", "quilometragem alta"],
    itens_criticos: ["oleo GL-5 pendente de fonte", "bujoes", "respiros", "limalha", "ruidos", "folgas"],
    checklist_path: "07_DIFERENCIAIS/checklist-diferenciais.md",
    imagens_relacionadas: ["diferencial-dianteiro-001", "diferencial-traseiro-001"],
    dependencias: ["diagnostico-inicial", "transferencia-super-select"],
    observacoes: "Nao assumir existencia de filtro. Separar dianteiro e traseiro em registros distintos."
  },
  {
    id: "cardans-homocineticas-semieixos",
    nome: "Cardas, Homocineticas e Semi-eixos",
    sistema: "Transmissao e eixos",
    prioridade: "Preventivo obrigatorio",
    status: "Pendente",
    risco: "alto",
    sintomas: ["trancos", "possiveis folgas"],
    itens_criticos: ["cruzetas", "luvas", "coifas", "folgas", "vibracoes"],
    checklist_path: "08_CARDANS_HOMOCINETICAS_SEMIEIXOS/checklist-cardans-homocineticas-semieixos.md",
    imagens_relacionadas: ["cardan-cruzetas-001"],
    dependencias: ["diagnostico-inicial", "diferenciais"],
    observacoes: "Folgas aqui podem simular tranco de cambio e devem ser isoladas."
  },
  {
    id: "suspensao-direcao",
    nome: "Suspensao e Direcao",
    sistema: "Chassi/direcao",
    prioridade: "Critico",
    status: "Pendente",
    risco: "alto",
    sintomas: ["direcao hidraulica um pouco dura", "possiveis folgas"],
    itens_criticos: ["bandejas", "pivos", "terminais", "caixa de direcao", "bomba", "buchas", "pneus"],
    checklist_path: "09_SUSPENSAO_DIRECAO/checklist-suspensao-direcao.md",
    imagens_relacionadas: ["suspensao-traseira-buchas-001", "direcao-hidraulica-bomba-001"],
    dependencias: ["diagnostico-inicial"],
    observacoes: "Registrar fotos dos dois lados e separar folga estrutural de alinhamento/cambagem/caster."
  },
  {
    id: "freios-rodas-rolamentos",
    nome: "Freios, Rodas e Rolamentos",
    sistema: "Freios/rodagem",
    prioridade: "Critico",
    status: "Pendente",
    risco: "critico",
    sintomas: ["seguranca pendente", "historico desconhecido"],
    itens_criticos: ["pastilhas", "discos", "fluido", "ABS", "rolamentos", "pneus"],
    checklist_path: "10_FREIOS_RODAS_ROLAMENTOS/checklist-freios-rodas-rolamentos.md",
    imagens_relacionadas: ["freios-dianteiros-001", "freios-traseiros-001"],
    dependencias: ["diagnostico-inicial", "suspensao-direcao"],
    observacoes: "Modulo de seguranca. Validar antes de teste de rodagem agressivo."
  },
  {
    id: "eletrica-sensores-conforto",
    nome: "Eletrica, Sensores e Conforto",
    sistema: "Eletrica e conforto",
    prioridade: "Preventivo programavel",
    status: "Pendente",
    risco: "medio",
    sintomas: ["sensores pendentes", "conforto pendente"],
    itens_criticos: ["bateria", "alternador", "aterramentos", "chicotes", "sensores", "ar-condicionado"],
    checklist_path: "11_ELETRICA_SENSORES_CONFORTO/checklist-eletrica-sensores-conforto.md",
    imagens_relacionadas: ["eletrica-cofre-aterramentos-001"],
    dependencias: ["diagnostico-inicial"],
    observacoes: "Falhas eletricas podem afetar ECU/TCU/ABS e leituras de sensores."
  },
  {
    id: "funilaria-pintura-vedacao",
    nome: "Funilaria, Pintura A19 e Vedacao",
    sistema: "Carroceria",
    prioridade: "Estetico/conforto",
    status: "Pendente",
    risco: "baixo",
    sintomas: ["inspecao estetica pendente"],
    itens_criticos: ["pintura A19", "vedacoes", "infiltracao", "pontos de ferrugem", "acabamentos"],
    checklist_path: "12_FUNILARIA_PINTURA_VEDACAO/checklist-funilaria-pintura-vedacao.md",
    imagens_relacionadas: ["pintura-a19-geral-001"],
    dependencias: ["diagnostico-inicial"],
    observacoes: "Programavel apos seguranca, motor, transmissao e arrefecimento."
  },
  {
    id: "teste-final-pos-revisao",
    nome: "Teste Final e Pos-Revisao",
    sistema: "Validacao geral",
    prioridade: "Preventivo obrigatorio",
    status: "Pendente",
    risco: "medio",
    sintomas: ["validacao pendente"],
    itens_criticos: ["teste de rodagem", "releitura de DTCs", "vazamentos", "temperatura", "reinspecao pos-500 km"],
    checklist_path: "13_TESTE_FINAL_POS_REVISAO/checklist-teste-final-pos-revisao.md",
    imagens_relacionadas: ["teste-final-painel-001"],
    dependencias: ["diagnostico-inicial", "motor-6g75", "cambio-v5a51", "freios-rodas-rolamentos"],
    observacoes: "Encerrar apenas com evidencia de validacao e plano de retorno."
  }
];

const FALLBACK_IMAGES = [
  {
    id: "motor-6g75-cofre-001",
    modulo: "Motor 6G75",
    sistema: "Motor",
    peca: "Cofre do motor",
    localizacao: "Parte dianteira do veiculo",
    lado_veiculo: "central",
    tipo: "foto_real_pendente",
    arquivo: "",
    origem: "a produzir",
    status: "pendente",
    observacoes: "Adicionar foto geral do cofre do motor para marcacao visual."
  },
  {
    id: "cambio-v5a51-carter-001",
    modulo: "Cambio V5A51",
    sistema: "Transmissao",
    peca: "Carter do cambio automatico",
    localizacao: "Parte inferior central do veiculo",
    lado_veiculo: "central",
    tipo: "foto_real_pendente",
    arquivo: "",
    origem: "a produzir",
    status: "pendente",
    observacoes: "Adicionar foto inferior mostrando carter, bujao, vazamentos e regiao do cambio."
  },
  {
    id: "suspensao-traseira-buchas-001",
    modulo: "Suspensao e Direcao",
    sistema: "Suspensao traseira",
    peca: "Buchas, bandejas, tirantes e manga de eixo",
    localizacao: "Atras das rodas traseiras, lado esquerdo e direito",
    lado_veiculo: "esquerdo e direito",
    tipo: "foto_real_pendente",
    arquivo: "",
    origem: "a produzir",
    status: "pendente",
    observacoes: "Adicionar fotos dos dois lados da suspensao traseira para mapear buchas e pontos de fixacao."
  },
  {
    id: "escapamento-sondas-001",
    modulo: "Admissao, Ignicao e Injecao",
    sistema: "Escapamento",
    peca: "Sondas lambda e trecho sem catalisador",
    localizacao: "Linha de escapamento antes e depois do ponto do catalisador",
    lado_veiculo: "inferior",
    tipo: "foto_real_pendente",
    arquivo: "",
    origem: "a produzir",
    status: "pendente",
    observacoes: "Registrar posicao das sondas, chicotes, emendas, vazamentos e possivel emulador."
  },
  {
    id: "fluxograma-diagnostico-mermaid-001",
    modulo: "Diagnostico Inicial",
    sistema: "Fluxo de diagnostico",
    peca: "Fluxograma macro",
    localizacao: "Documento tecnico",
    lado_veiculo: "nao aplicavel",
    tipo: "diagrama",
    arquivo: "assets/diagramas/fluxograma-diagnostico-mermaid.png",
    origem: "Imagem fornecida pelo usuario",
    status: "validacao_visual_pendente",
    observacoes: "Diagrama base anexado ao prompt para orientar o fluxo macro de diagnostico."
  }
];

const FALLBACK_SQUAD = {
  squad: {
    nome: "PAJERO V77W RESTORATION & DIAGNOSTIC SQUAD",
    missao: "Diagnosticar, documentar e planejar a revisao completa da Pajero V77W 6G75 V5A51.",
    regra_mae: ["Diagnostico antes de peca", "Fonte antes de procedimento", "Torque antes de montagem"]
  },
  camadas: [
    { id: "comando", nome: "Comando e Verdade Tecnica", agentes: ["pajero-chief-diagnostician", "oem-technical-librarian", "evidence-anti-hallucination-auditor"] },
    { id: "diagnostico-critico", nome: "Diagnostico Critico", agentes: ["combustion-fuel-trim-engineer", "transmission-v5a51-specialist"] },
    { id: "execucao-visual", nome: "Revisao, Visual e Execucao", agentes: ["visual-teardown-mapper", "work-order-parts-planner"] }
  ],
  agentes: [
    { id: "pajero-chief-diagnostician", nome: "Pajero Chief Diagnostician", funcao: "Orquestra prioridades, sintomas, riscos e sequencia de diagnostico.", arquivo: "squad/agents/pajero-chief-diagnostician.md" },
    { id: "oem-technical-librarian", nome: "OEM Technical Librarian", funcao: "Organiza fontes, manuais, diagramas, torques, fluidos e compatibilidade V77W.", arquivo: "squad/agents/oem-technical-librarian.md" },
    { id: "evidence-anti-hallucination-auditor", nome: "Evidence & Anti-Hallucination Auditor", funcao: "Bloqueia conclusao sem fonte, torque, evidencia ou aplicabilidade correta.", arquivo: "squad/agents/evidence-anti-hallucination-auditor.md" },
    { id: "combustion-fuel-trim-engineer", nome: "Combustion & Fuel Trim Engineer", funcao: "Analisa consumo, marcha lenta, STFT/LTFT, sondas, mistura e catalisador ausente.", arquivo: "squad/agents/combustion-fuel-trim-engineer.md" },
    { id: "driveability-electronics-diagnostician", nome: "Driveability Electronics Diagnostician", funcao: "Interpreta scanner, DTCs, freeze frame, sinais eletricos, sensores e chicotes.", arquivo: "squad/agents/driveability-electronics-diagnostician.md" },
    { id: "engine-6g75-practical-mechanic", nome: "6G75 Practical Engine Mechanic", funcao: "Cuida de correia, velas, bobinas, compressao, vazamentos, coxins e arrefecimento.", arquivo: "squad/agents/engine-6g75-practical-mechanic.md" },
    { id: "transmission-v5a51-specialist", nome: "V5A51 Transmission Specialist", funcao: "Diagnostica trancos, ATF, TCU, carter, solenoides e corpo de valvulas.", arquivo: "squad/agents/transmission-v5a51-specialist.md" },
    { id: "super-select-drivetrain-specialist", nome: "Super Select & Drivetrain Specialist", funcao: "Cuida de transfer, 4x4, cardas, cruzetas, diferenciais, folgas e respiros.", arquivo: "squad/agents/super-select-drivetrain-specialist.md" },
    { id: "suspension-hydraulic-steering-engineer", nome: "Suspension & Hydraulic Steering Engineer", funcao: "Analisa suspensao, buchas, geometria, pneus e direcao hidraulica dura.", arquivo: "squad/agents/suspension-hydraulic-steering-engineer.md" },
    { id: "brake-road-safety-inspector", nome: "Brake & Road Safety Inspector", funcao: "Libera, restringe ou bloqueia teste de rodagem por freio, pneu, rolamento e ABS.", arquivo: "squad/agents/brake-road-safety-inspector.md" },
    { id: "visual-teardown-mapper", nome: "Visual Teardown Mapper", funcao: "Cria atlas visual com fotos reais, diagramas, vistas explodidas e legendas.", arquivo: "squad/agents/visual-teardown-mapper.md" },
    { id: "work-order-parts-planner", nome: "Work Order & Parts Planner", funcao: "Gera OS, BOM, lista de insumos, riscos e validacao pos-servico.", arquivo: "squad/agents/work-order-parts-planner.md" }
  ]
};

const state = {
  vehicle: FALLBACK_VEHICLE,
  modules: FALLBACK_MODULES,
  images: FALLBACK_IMAGES,
  squad: FALLBACK_SQUAD,
  selectedId: "diagnostico-inicial",
  filter: "todos"
};

const els = {
  header: document.getElementById("vehicle-header"),
  nav: document.getElementById("module-nav"),
  grid: document.getElementById("module-grid"),
  detail: document.getElementById("detail-panel"),
  squad: document.getElementById("squad-panel"),
  images: document.getElementById("image-list"),
  statusLine: document.getElementById("status-line"),
  filter: document.getElementById("priority-filter"),
  critical: document.getElementById("critical-strip")
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function loadJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch {
    return fallback;
  }
}

function compactNumber(value) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function riskClass(risk) {
  return `risk-${String(risk || "medio").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
}

function priorityClass(priority) {
  const value = String(priority || "").toLowerCase();
  if (value.includes("critico")) return "priority-critico";
  if (value.includes("obrigatorio")) return "priority-obrigatorio";
  if (value.includes("programavel")) return "priority-programavel";
  return "priority-estetico";
}

function statusClass(status) {
  const value = String(status || "").toLowerCase();
  if (value.includes("validado")) return "status-validado";
  return "status-pendente";
}

function selectedModule() {
  return state.modules.find((module) => module.id === state.selectedId) || state.modules[0];
}

function relatedImages(module) {
  const ids = new Set(module.imagens_relacionadas || []);
  const byId = state.images.filter((image) => ids.has(image.id));
  if (byId.length) return byId;

  const moduleWords = String(module.nome).toLowerCase().split(/[,\s]+/).filter(Boolean);
  return state.images.filter((image) => {
    const text = `${image.modulo} ${image.sistema} ${image.peca}`.toLowerCase();
    return moduleWords.some((word) => word.length > 4 && text.includes(word));
  });
}

function renderHeader() {
  const vehicle = state.vehicle.veiculo || {};
  els.header.innerHTML = `
    <div class="vehicle-title">
      <strong>${escapeHtml(vehicle.modelo)}</strong>
      <span>VIN ${escapeHtml(vehicle.chassi_vin)} | Motor ${escapeHtml(vehicle.motor)} | ${escapeHtml(vehicle.cambio)}</span>
    </div>
    ${fact("Codigo", vehicle.codigo_modelo)}
    ${fact("Motor base", vehicle.motor_base)}
    ${fact("Km", `${compactNumber(vehicle.quilometragem_km || 0)} km`)}
    ${fact("Historico", vehicle.historico_manutencao)}
    ${fact("Catalisador", vehicle.catalisador)}
  `;
}

function fact(label, value) {
  return `
    <div class="vehicle-fact">
      <span>${escapeHtml(label)}</span>
      <b>${escapeHtml(value || "pendente")}</b>
    </div>
  `;
}

function renderNav() {
  els.nav.innerHTML = state.modules
    .map((module, index) => `
      <button type="button" class="${module.id === state.selectedId ? "is-active" : ""}" data-select="${escapeHtml(module.id)}">
        ${index + 1}. ${escapeHtml(module.nome)}
        <span>${escapeHtml(module.prioridade)} | ${escapeHtml(module.status)}</span>
      </button>
    `)
    .join("");
}

function renderGrid() {
  const modules = state.modules.filter((module) => state.filter === "todos" || module.prioridade === state.filter);

  if (!modules.length) {
    els.grid.innerHTML = `<div class="empty-state">Nenhum modulo encontrado para o filtro atual.</div>`;
    return;
  }

  els.grid.innerHTML = modules.map((module) => `
    <article class="module-card ${riskClass(module.risco)} ${module.id === state.selectedId ? "is-active" : ""}">
      <div class="card-top">
        <div>
          <h3>${escapeHtml(module.nome)}</h3>
          <p class="card-meta">${escapeHtml(module.sistema)}</p>
        </div>
        <div class="badges">
          <span class="badge ${priorityClass(module.prioridade)}">${escapeHtml(module.prioridade)}</span>
          <span class="badge ${statusClass(module.status)}">${escapeHtml(module.status)}</span>
          <span class="badge ${riskClass(module.risco)}">${escapeHtml(module.risco || "medio")}</span>
        </div>
      </div>
      <div class="chip-row">
        ${(module.sintomas || []).slice(0, 4).map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join("")}
      </div>
      <ul class="critical-list">
        ${(module.itens_criticos || []).slice(0, 5).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <button class="card-action" type="button" data-select="${escapeHtml(module.id)}">Detalhes</button>
    </article>
  `).join("");
}

function renderDetail() {
  const module = selectedModule();
  const deps = module.dependencias && module.dependencias.length
    ? module.dependencias.map((id) => state.modules.find((item) => item.id === id)?.nome || id)
    : ["sem dependencias"];

  els.detail.innerHTML = `
    <div class="detail-layout">
      <div>
        <p class="eyebrow">Bloco selecionado</p>
        <h2>${escapeHtml(module.nome)}</h2>
        <p>${escapeHtml(module.observacoes || "")}</p>
        <span class="path-link">${escapeHtml(module.checklist_path)}</span>
      </div>
      <div>
        <p class="eyebrow">Relacao com outros modulos</p>
        <ul class="detail-list">
          ${deps.map((dep) => `<li>${escapeHtml(dep)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

function toUiPath(filePath) {
  if (!filePath) return "";
  return `../${filePath.replaceAll("\\", "/")}`;
}

function renderImages() {
  const module = selectedModule();
  const images = relatedImages(module);

  if (!images.length) {
    els.images.innerHTML = `<div class="empty-state">Adicionar foto real da peca ou regiao do veiculo.</div>`;
    return;
  }

  els.images.innerHTML = images.map((image) => {
    const src = toUiPath(image.arquivo);
    const frame = src
      ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(image.peca)}" loading="lazy">`
      : `<span class="placeholder-text">Adicionar foto real da peca ou regiao do veiculo.</span>`;

    return `
      <article class="image-card">
        <div class="image-frame">${frame}</div>
        <div class="image-body">
          <h3>${escapeHtml(image.peca)}</h3>
          <dl class="image-meta">
            ${meta("Modulo", image.modulo)}
            ${meta("Sistema", image.sistema)}
            ${meta("Local", image.localizacao)}
            ${meta("Lado", image.lado_veiculo)}
            ${meta("Tipo", image.tipo)}
            ${meta("Origem", image.origem)}
            ${meta("Status", image.status)}
            ${meta("Obs.", image.observacoes)}
          </dl>
        </div>
      </article>
    `;
  }).join("");
}

function renderSquad() {
  const squad = state.squad?.squad || FALLBACK_SQUAD.squad;
  const layers = state.squad?.camadas || [];
  const agents = state.squad?.agentes || [];
  const agentById = new Map(agents.map((agent) => [agent.id, agent]));

  els.squad.innerHTML = `
    <div class="squad-head">
      <div>
        <p class="eyebrow">Squad tecnico</p>
        <h2>${escapeHtml(squad.nome)}</h2>
        <p>${escapeHtml(squad.missao)}</p>
      </div>
      <div class="badges">
        ${(squad.regra_mae || []).slice(0, 3).map((rule) => `<span class="badge priority-obrigatorio">${escapeHtml(rule)}</span>`).join("")}
      </div>
    </div>
    <div class="squad-layers">
      ${layers.map((layer) => `
        <div class="squad-layer">
          <strong>${escapeHtml(layer.nome)}</strong>
          <div class="chip-row">
            ${(layer.agentes || []).map((id) => `<span class="chip">${escapeHtml(agentById.get(id)?.nome || id)}</span>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>
    <div class="agent-grid">
      ${agents.map((agent) => `
        <article class="agent-card">
          <h3>${escapeHtml(agent.nome)}</h3>
          <p>${escapeHtml(agent.funcao)}</p>
          <code>${escapeHtml(agent.arquivo)}</code>
        </article>
      `).join("")}
    </div>
  `;
}

function meta(label, value) {
  return `
    <div>
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value || "pendente")}</dd>
    </div>
  `;
}

function renderCriticalStrip() {
  const criticalModules = state.modules.filter((module) => module.prioridade === "Critico");
  const symptoms = state.vehicle.sintomas_atuais || [];
  els.critical.innerHTML = `
    <strong>${criticalModules.length} blocos criticos</strong>
    <span>${escapeHtml(symptoms.join(" | "))}</span>
  `;
}

function renderStatusLine() {
  const pending = state.modules.filter((module) => module.status === "Pendente").length;
  const critical = state.modules.filter((module) => module.prioridade === "Critico").length;
  els.statusLine.textContent = `${state.modules.length} modulos | ${critical} criticos | ${pending} pendentes | diagnostico antes de compra de pecas`;
}

function render() {
  renderHeader();
  renderStatusLine();
  renderNav();
  renderGrid();
  renderDetail();
  renderSquad();
  renderImages();
  renderCriticalStrip();
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-select]");
    if (!target) return;
    state.selectedId = target.dataset.select;
    render();
  });

  els.filter.addEventListener("change", (event) => {
    state.filter = event.target.value;
    renderGrid();
  });
}

async function init() {
  const [vehicle, modules, images] = await Promise.all([
    loadJson("../data/vehicle-profile.json", FALLBACK_VEHICLE),
    loadJson("../data/revision-modules.json", FALLBACK_MODULES),
    loadJson("../data/image-manifest.json", FALLBACK_IMAGES)
  ]);

  const squad = await loadJson("../data/squad-roster.json", FALLBACK_SQUAD);

  state.vehicle = vehicle;
  state.modules = Array.isArray(modules) ? modules : FALLBACK_MODULES;
  state.images = Array.isArray(images) ? images : FALLBACK_IMAGES;
  state.squad = squad;
  if (!state.modules.some((module) => module.id === state.selectedId)) {
    state.selectedId = state.modules[0]?.id || "";
  }

  bindEvents();
  render();
}

init();
