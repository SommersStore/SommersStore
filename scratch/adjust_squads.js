const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '..', 'docs', 'control', 'registry.json');
const AGENTS_MD_PATH = path.join(__dirname, '..', 'AGENTS.md');

// 1. Update AGENTS.md
let agentsMd = fs.readFileSync(AGENTS_MD_PATH, 'utf8');
const missingAgents = [
    "- `@persona`, `/persona`, `/persona.md` -> `.aiox-core/development/agents/persona.md`",
    "- `@cro-expert`, `/cro-expert`, `/cro-expert.md` -> `.aiox-core/development/agents/cro-expert.md`",
    "- `@liaison`, `/liaison`, `/liaison.md` -> `.aiox-core/development/agents/liaison.md`",
    "- `@brand-master`, `/brand-master`, `/brand-master.md` -> `.aiox-core/development/agents/brand-master.md`",
    "- `@art-director`, `/art-director`, `/art-director.md` -> `.aiox-core/development/agents/art-director.md`",
    "- `@security`, `/security`, `/security.md` -> `.aiox-core/development/agents/security.md`",
    "- `@support`, `/support`, `/support.md` -> `.aiox-core/development/agents/support.md`",
    "- `@oracle`, `/oracle`, `/oracle.md` -> `.aiox-core/development/agents/oracle.md`",
    "- `@scribe`, `/scribe`, `/scribe.md` -> `.aiox-core/development/agents/scribe.md`"
];

if (!agentsMd.includes('@persona')) {
    agentsMd = agentsMd.replace(
        "- `@aiox-master`, `/aiox-master`, `/aiox-master.md` -> `.aiox-core/development/agents/aiox-master.md`",
        "- `@aiox-master`, `/aiox-master`, `/aiox-master.md` -> `.aiox-core/development/agents/aiox-master.md`\n" + missingAgents.join("\n")
    );
    fs.writeFileSync(AGENTS_MD_PATH, agentsMd);
    console.log("Updated AGENTS.md with missing handles.");
}

// 2. Update registry.json
let registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));

// Fix SQD-MEM color
const memSquad = registry.squads.find(s => s.id === 'SQD-MEM');
if (memSquad) {
    memSquad.color = '#6366f1'; // distinct from CORE
}

// Deep adjustment of generic skills
const genericDescRegex = /^Executa \w+ com criterio operacional no .* garantindo as saidas `(.*)`\.$/;

for (const groupKey of Object.keys(registry.skills)) {
    const groupSkills = registry.skills[groupKey];
    for (const skill of groupSkills) {
        // Deep adjustment in Playbook Source
        if (skill.playbook_source && skill.playbook_source.includes('build_state.json + docs/control')) {
            skill.playbook_source = 'Local Playbook / Framework Rules';
        }
        
        // Deep adjustment in Generic Descriptions
        const match = skill.desc.match(genericDescRegex);
        if (match) {
            const outputs = match[1].split('`, `').join(', ');
            skill.desc = `Execução heurística voltada para conversão e entrega das saídas principais: ${outputs}.`;
        }
    }
}

// Save back
fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
console.log("Updated registry.json successfully.");
