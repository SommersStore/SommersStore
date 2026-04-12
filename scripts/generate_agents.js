const fs = require('fs');
const path = require('path');

const AGENTS = [
    'architect', 'visual', 'automation', 'velas-lead', 'copywriter',
    'art', 'liaison', 'brand-master', 'master', 'pm', 'po', 'sm',
    'market', 'funnel', 'cro', 'traffic', 'dev', 'data-engineer',
    'devops', 'qa', 'ux-opt', 'security', 'persona'
];

const codexAgentsDir = path.join(__dirname, '../.codex/agents');
if (!fs.existsSync(codexAgentsDir)) {
    fs.mkdirSync(codexAgentsDir, { recursive: true });
}

AGENTS.forEach(handle => {
    const filePath = path.join(codexAgentsDir, `${handle}.md`);
    if (!fs.existsSync(filePath)) {
        const content = `# Agent: @${handle}

**Papel:** Definir a especialidade primária deste agente.
**Tom de Voz:** SommersStore Elite (Impositivo, Luxuoso, Analítico).

## Responsabilidades
1. Atender às demandas designadas para a squad.
2. Seguir estritamente o Brandbook e o Master Design System.

## Gatilhos e Comportamento
*(Escreva aqui as ordens de persona e limites de autonomia do agente).*
`;
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
console.log('Agentes base gerados!');
