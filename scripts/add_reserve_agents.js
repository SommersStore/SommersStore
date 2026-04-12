const fs = require('fs');
let h = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

// Add @marketing after @analyst
const marketingAgent = `    { icon: '📊', name: 'Stratego', handle: '@marketing', squad: 'MARKETING', role: 'Estrategista de Growth e Aquisição de Clientes.', decides: 'Campaign Strategy, Growth Levers', needs: 'Market Data, Budget', delivers: 'Growth Playbook', skills: ['Inteligência de Tráfego', 'Psicologia de Vendas'] },`;

h = h.replace(
  /handle: '@analyst'.*?\n/,
  (match) => match + marketingAgent + '\n'
);

// Add @squad-creator after @sm
const squadAgent = `    { icon: '🧩', name: 'Forge', handle: '@squad-creator', squad: 'CORE OPERATIONS', role: 'Criação e reconfiguração dinâmica de Squads de IA.', decides: 'Squad Composition, Agent Allocation', needs: 'Project Scope', delivers: 'Operational Squads', skills: ['Governance & Roadmap'] },`;

h = h.replace(
  /handle: '@sm'.*?\n/,
  (match) => match + squadAgent + '\n'
);

fs.writeFileSync('docs/aiox_dashboard.html', h, 'utf8');
console.log('Added @marketing and @squad-creator to dashboard. Total should be 20.');
