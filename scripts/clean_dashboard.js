const fs = require('fs');
let h = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

// Remove Nexus (@automation) line
h = h.replace(/^.*handle: '@automation'.*\r?\n/gm, '');

// Remove Sol (@velas-lead) line
h = h.replace(/^.*handle: '@velas-lead'.*\r?\n/gm, '');

// Expand Gauge's role to include funnel duties
h = h.replace(
  "role: 'Otimização de taxa de conversão constante.'",
  "role: 'CRO, Arquitetura de Funis e Otimização de Conversão.'"
);

h = h.replace(
  "decides: 'A/B Test Logic, CTAs'",
  "decides: 'A/B Tests, Funnel Path, Order Bumps'"
);

h = h.replace(
  "delivers: 'CRO Reports'",
  "delivers: 'CRO Reports, Funnel Map'"
);

fs.writeFileSync('docs/aiox_dashboard.html', h, 'utf8');
console.log('Dashboard cleaned: Nexus + Sol removed, Gauge expanded.');
