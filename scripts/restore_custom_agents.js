const fs = require('fs');
const path = require('path');

const MISSING_AGENTS = ['automation', 'velas-lead', 'liaison', 'brand-master', 'security', 'persona'];
const codexAgentsDir = path.join(__dirname, '../.codex/agents');

MISSING_AGENTS.forEach(handle => {
    const filePath = path.join(codexAgentsDir, `${handle}.md`);
    if (!fs.existsSync(filePath)) {
        const content = `# Agente Inédito: @${handle}

**Status:** 🟡 Rascunho / Vaga Aberta
Este é um agente exclusivo projetado para as operações da SommersStore. Diferente dos 20 agentes base do AIOX, este núcleo neurológico precisa ser treinado e preenchido por nós.

## Objetivo Estratégico
*(A definir)*

## Responsabilidades a Preencher
1. 
2. 
3. 

> NOTA: Esta ficha está intencionalmente crua. Quando você julgar necessário, nós faremos uma sessão de configuração para baixar as regras e a persona definitivas de @${handle} aqui.
`;
        fs.writeFileSync(filePath, content, 'utf8');
    }
});
console.log('Restaurados 6 agentes inéditos ausentes no core!');
