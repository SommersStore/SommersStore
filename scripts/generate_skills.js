const fs = require('fs');
const path = require('path');

const SKILLS = {
    'ESTRATÉGIA & OPS': [
        'Governance & Roadmap', 'Arquitetura de Sistemas', 'Redação de Stories', 'Gestão de Backlog', 'Análise de Viabilidade'
    ],
    'CONTEÚDO & NARRATIVA': [
        'Copywriting Aristocrático', 'Mapeamento JSON Atômico', 'Identidade de Marca', 'Storytelling de Luxo', 'Curadoria de Conteúdo'
    ],
    'VISUAL & EDITORIAL': [
        'Design Editorial HD', 'Componentes UI Luxury', 'Curadoria de Imagens', 'Direção de Arte', 'Tipografia de Elite'
    ],
    'ENGENHARIA & DADOS': [
        'Desenvolvimento Fullstack', 'Schemas de Dados Imutáveis', 'CI/CD & Cloud Ops', 'Integração de Webhooks', 'Segurança de Dados'
    ],
    'MARKETING & FUNNEL': [
        'Arquitetura de Funis', 'Inteligência de Tráfego', 'CRO & Testes A/B', 'Psicologia de Vendas', 'Otimização de Checkout'
    ],
    'QUALIDADE & SEGURANÇA': [
        'Testes QA Estritos', 'Cibersegurança Vault', 'Otimização Performance UX', 'Audit de Acessibilidade', 'Monitoramento de Erros'
    ]
};

const codexDir = path.join(__dirname, '../.codex/skills');
if (!fs.existsSync(codexDir)) {
    fs.mkdirSync(codexDir, { recursive: true });
}

let count = 0;
for (const cat in SKILLS) {
    SKILLS[cat].forEach(skill => {
        const slug = skill.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const filePath = path.join(codexDir, `${slug}.md`);
        
        if (!fs.existsSync(filePath)) {
            const content = `# Skill: ${skill}
            
Esta é a skill mestre de ${skill.toUpperCase()} do ecossistema SommersStore Elite.

## 📜 Regras Fundamentais
1. **O que é:** [Descreva o objetivo claro desta skill]
2. **Entradas:** O que você precisa receber para executar (Ex: brand_core.json, imagens de referência).
3. **Saídas:** O que você entrega ao final (Ex: código limpo, componente renderizado).

## 🗂️ Referenciais Visuais e Contexto
Ao executar esta skill, caso seja necessário verificar contexto visual, você deve usar suas ferramentas de sistema para "ver" os seguintes arquivos:
- \`docs/brand.html\` (Brandbook Base)
- (Adicione aqui outras regras de design system ou caminhos de imagens)

## ⚡ Prompt de Execução
> **DIRETRIZ DA SKILL:** [Escreva aqui as ordens estritas para a IA quando estiver agindo sob esta skill. Lembre-se, você deve ser incisivo e imutável].

*(Este é um arquivo template. Preencha-o via Painel de Controle Antigravity para moldar o comportamento do seu agente).*
`;
            fs.writeFileSync(filePath, content, 'utf8');
            count++;
        }
    });
}
console.log(`Geradas ${count} skills base no diretório .codex/skills.`);
