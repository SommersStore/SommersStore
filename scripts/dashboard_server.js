const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 4000;
const CONTROL_DIR = path.join(__dirname, '../docs/control');

// ══════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════
function readJSON(filename) {
    const p = path.join(CONTROL_DIR, filename);
    if (!fs.existsSync(p)) return null;
    return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function writeJSON(filename, data) {
    fs.writeFileSync(path.join(CONTROL_DIR, filename), JSON.stringify(data, null, 2), 'utf8');
}
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => { try { resolve(JSON.parse(body)); } catch(e) { reject(e); } });
    });
}
function sendJSON(res, data, code = 200) {
    res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    res.end(JSON.stringify(data));
}
function genId(prefix) {
    const d = new Date();
    const ds = d.toISOString().slice(0,10).replace(/-/g,'');
    const seq = String(Math.floor(Math.random()*9999)).padStart(4,'0');
    return `${prefix}-${ds}-${seq}`;
}

// ══════════════════════════════════════════
// SERVER
// ══════════════════════════════════════════
const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;

    try {
        // ── Dashboard HTML ──
        if (pathname === '/' || pathname === '/dashboard') {
            const html = fs.readFileSync(path.join(__dirname, '../docs/aiox_dashboard.html'));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(html);
        }

        // ══════════════════════════════════════════
        // REGISTRY (canonical source of truth)
        // ══════════════════════════════════════════
        if (pathname === '/api/registry') {
            return sendJSON(res, readJSON('registry.json') || {});
        }
        if (pathname === '/api/registry/personas' && req.method === 'POST') {
            const body = await parseBody(req);
            const registry = readJSON('registry.json');
            if (!registry.personas) registry.personas = [];
            
            const newId = `prs-${body.name.toLowerCase().replace(/\\s+/g, '-')}`;
            const newPersona = {
                id: newId,
                icon: body.icon || '🎭',
                name: body.name,
                role: body.role || 'Nova Persona',
                traits: body.traits || [],
                bio: body.bio || '',
                agents: body.agents || []
            };
            registry.personas.push(newPersona);
            writeJSON('registry.json', registry);
            
            // Create the blank .md file for it
            const mdPath = path.join(__dirname, '../.codex/personas', `${newId}.md`);
            if (!fs.existsSync(mdPath)) {
                fs.writeFileSync(mdPath, `# Restrições da Persona: ${body.name}\\n\\nInstruções psicológicas e guias de tom de voz exclusivos para este avatar/clone.\\n\\n## Background\\n- História:\\n- Linguagem:\\n- Palavras Proibidas:\\n`, 'utf8');
            }
            
            return sendJSON(res, { success: true, persona: newPersona });
        }

        // ══════════════════════════════════════════
        // BUILD STATE
        // ══════════════════════════════════════════
        if (pathname === '/api/build' && req.method === 'GET') {
            return sendJSON(res, readJSON('build_state.json') || { phases: [] });
        }
        if (pathname.startsWith('/api/build/') && req.method === 'POST') {
            const phaseId = pathname.split('/')[3];
            const body = await parseBody(req);
            const data = readJSON('build_state.json');
            const phase = data.phases.find(p => p.id === phaseId);
            if (!phase) return sendJSON(res, { error: 'Phase not found' }, 404);
            
            // Update state
            if (body.state) phase.state = body.state;
            if (body.last_run) phase.last_run = body.last_run;
            phase.last_run_at = new Date().toISOString();
            writeJSON('build_state.json', data);

            // Log the state change
            const log = readJSON('execution_log.json');
            log.entries.push({
                id: genId('LOG'),
                type: 'state_change',
                target: phaseId,
                from_state: body.previous_state || null,
                to_state: phase.state,
                initiated_by: body.initiated_by || 'human',
                timestamp: new Date().toISOString(),
                reason: body.reason || null
            });
            writeJSON('execution_log.json', log);

            return sendJSON(res, { success: true, phase });
        }

        // ══════════════════════════════════════════
        // OPS STATE
        // ══════════════════════════════════════════
        if (pathname === '/api/ops' && req.method === 'GET') {
            return sendJSON(res, readJSON('ops_state.json') || { stages: [] });
        }
        if (pathname.startsWith('/api/ops/') && req.method === 'POST') {
            const stageId = pathname.split('/')[3];
            const body = await parseBody(req);
            const data = readJSON('ops_state.json');
            const stage = data.stages.find(s => s.id === stageId);
            if (!stage) return sendJSON(res, { error: 'Stage not found' }, 404);
            if (body.state) stage.state = body.state;
            if (body.last_error !== undefined) stage.last_error = body.last_error;
            writeJSON('ops_state.json', data);
            return sendJSON(res, { success: true, stage });
        }

        // ══════════════════════════════════════════
        // CONTROL STATE
        // ══════════════════════════════════════════
        if (pathname === '/api/control' && req.method === 'GET') {
            return sendJSON(res, readJSON('control_state.json') || { modules: [] });
        }

        // ══════════════════════════════════════════
        // APPROVALS
        // ══════════════════════════════════════════
        if (pathname === '/api/approvals' && req.method === 'GET') {
            return sendJSON(res, readJSON('approvals.json') || { items: [] });
        }
        if (pathname === '/api/approvals' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = readJSON('approvals.json');

            if (body.action === 'create') {
                const item = {
                    id: genId('APR'),
                    decision_id: body.decision_id,
                    phase_id: body.phase_id,
                    context: body.context || '',
                    status: 'pending',
                    created_at: new Date().toISOString(),
                    resolved_at: null,
                    resolved_by: null,
                    verdict: null,
                    notes: null
                };
                data.items.push(item);
                writeJSON('approvals.json', data);
                return sendJSON(res, { success: true, item });
            }
            if (body.action === 'resolve') {
                const item = data.items.find(i => i.id === body.approval_id);
                if (!item) return sendJSON(res, { error: 'Approval not found' }, 404);
                item.status = body.verdict; // 'approved', 'rejected', 'rework'
                item.resolved_at = new Date().toISOString();
                item.resolved_by = body.resolved_by || 'human';
                item.notes = body.notes || null;
                writeJSON('approvals.json', data);

                // Log
                const log = readJSON('execution_log.json');
                log.entries.push({
                    id: genId('LOG'), type: 'approval', target: item.decision_id,
                    verdict: body.verdict, by: body.resolved_by || 'human',
                    timestamp: new Date().toISOString(), notes: body.notes
                });
                writeJSON('execution_log.json', log);
                return sendJSON(res, { success: true, item });
            }
            return sendJSON(res, { error: 'Invalid action' }, 400);
        }

        // ══════════════════════════════════════════
        // ALERTS
        // ══════════════════════════════════════════
        if (pathname === '/api/alerts' && req.method === 'GET') {
            return sendJSON(res, readJSON('alerts.json') || { items: [] });
        }
        if (pathname === '/api/alerts' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = readJSON('alerts.json');
            if (body.action === 'create') {
                const item = {
                    id: genId('ALT'), alert_type: body.alert_type || null,
                    severity: body.severity || 'medium', owner: body.owner || null,
                    message: body.message, source: body.source || null,
                    status: 'open', created_at: new Date().toISOString(),
                    ack_at: null, closed_at: null
                };
                data.items.push(item);
                writeJSON('alerts.json', data);
                return sendJSON(res, { success: true, item });
            }
            if (body.action === 'ack' || body.action === 'close') {
                const item = data.items.find(i => i.id === body.alert_id);
                if (!item) return sendJSON(res, { error: 'Alert not found' }, 404);
                if (body.action === 'ack') { item.status = 'acknowledged'; item.ack_at = new Date().toISOString(); }
                if (body.action === 'close') { item.status = 'closed'; item.closed_at = new Date().toISOString(); }
                writeJSON('alerts.json', data);
                return sendJSON(res, { success: true, item });
            }
            return sendJSON(res, { error: 'Invalid action' }, 400);
        }

        // ══════════════════════════════════════════
        // INCIDENTS
        // ══════════════════════════════════════════
        if (pathname === '/api/incidents' && req.method === 'GET') {
            return sendJSON(res, readJSON('incidents.json') || { items: [] });
        }
        if (pathname === '/api/incidents' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = readJSON('incidents.json');
            if (body.action === 'create') {
                const item = {
                    id: genId('INC'), severity: body.severity || 'medium',
                    owner: body.owner, source_run: body.source_run || null,
                    blast_radius: body.blast_radius || null,
                    affected_nodes: body.affected_nodes || [],
                    affected_artifacts: body.affected_artifacts || [],
                    recovery_path: body.recovery_path || null,
                    description: body.description || '',
                    status: 'open', ack_required: true,
                    created_at: new Date().toISOString(), resolved_at: null
                };
                data.items.push(item);
                writeJSON('incidents.json', data);
                return sendJSON(res, { success: true, item });
            }
            if (body.action === 'resolve') {
                const item = data.items.find(i => i.id === body.incident_id);
                if (!item) return sendJSON(res, { error: 'Incident not found' }, 404);
                item.status = 'resolved';
                item.resolved_at = new Date().toISOString();
                item.resolution = body.resolution || null;
                writeJSON('incidents.json', data);
                return sendJSON(res, { success: true, item });
            }
            return sendJSON(res, { error: 'Invalid action' }, 400);
        }

        // ══════════════════════════════════════════
        // RERUNS
        // ══════════════════════════════════════════
        if (pathname === '/api/reruns' && req.method === 'GET') {
            return sendJSON(res, readJSON('reruns.json') || { items: [] });
        }
        if (pathname === '/api/reruns' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = readJSON('reruns.json');
            const item = {
                id: genId('RERUN'),
                parent_run_id: body.parent_run_id || null,
                initiated_by: body.initiated_by || 'human',
                reason: body.reason,
                scope: body.scope || 'node',
                target_id: body.target_id,
                context_snapshot_id: genId('CTX'),
                memory_policy: body.memory_policy || 'inherit',
                approval_required: body.approval_required || false,
                status: 'queued',
                created_at: new Date().toISOString()
            };
            data.items.push(item);
            writeJSON('reruns.json', data);
            return sendJSON(res, { success: true, item });
        }

        // ══════════════════════════════════════════
        // EXECUTION LOGS
        // ══════════════════════════════════════════
        if (pathname === '/api/logs' && req.method === 'GET') {
            return sendJSON(res, readJSON('execution_log.json') || { entries: [] });
        }
        if (pathname === '/api/logs' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = readJSON('execution_log.json');
            const entry = {
                id: genId('LOG'),
                type: body.type || 'execution',
                target: body.target || null,
                agent_ids: body.agent_ids || [],
                skills_used: body.skills_used || [],
                memory_read: body.memory_read || [],
                memory_write: body.memory_write || [],
                artifacts: body.artifacts || [],
                why_this_ran: body.why_this_ran || null,
                initiated_by: body.initiated_by || 'system',
                timestamp: new Date().toISOString(),
                details: body.details || null
            };
            data.entries.push(entry);
            writeJSON('execution_log.json', data);
            return sendJSON(res, { success: true, entry });
        }

        // ══════════════════════════════════════════
        // MEMORY MUTATIONS
        // ══════════════════════════════════════════
        if (pathname === '/api/memory' && req.method === 'GET') {
            return sendJSON(res, readJSON('memory_mutations.json') || { mutations: [] });
        }
        if (pathname === '/api/memory/mutate' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = readJSON('memory_mutations.json');
            const mutation = {
                id: genId('MEM'),
                memory_scope: body.memory_scope,
                owner: body.owner || null,
                previous_version: body.previous_version || null,
                new_version: body.new_version || null,
                mutated_by: body.mutated_by || 'human',
                timestamp: new Date().toISOString(),
                diff_summary: body.diff_summary || null,
                impact: body.impact || null
            };
            data.mutations.push(mutation);
            writeJSON('memory_mutations.json', data);
            return sendJSON(res, { success: true, mutation });
        }

        // ══════════════════════════════════════════
        // MANUAL COMMANDS
        // ══════════════════════════════════════════
        if (pathname === '/api/commands' && req.method === 'GET') {
            return sendJSON(res, readJSON('manual_interventions.json') || { entries: [] });
        }
        if (pathname === '/api/commands' && req.method === 'POST') {
            const body = await parseBody(req);
            const data = readJSON('manual_interventions.json');
            const entry = {
                id: genId('CMD'),
                issued_by: body.issued_by || '[HUMAN_OWNER_PENDING]',
                target_scope: body.target_scope || 'node',
                target_id: body.target_id,
                action: body.action,
                payload: body.payload || {},
                approval_required: body.approval_required || false,
                timestamp: new Date().toISOString()
            };
            data.entries.push(entry);
            writeJSON('manual_interventions.json', data);
            
            // Also log
            const log = readJSON('execution_log.json');
            log.entries.push({
                id: genId('LOG'), type: 'manual_intervention',
                target: body.target_id, action: body.action,
                initiated_by: 'human', timestamp: new Date().toISOString()
            });
            writeJSON('execution_log.json', log);
            return sendJSON(res, { success: true, entry });
        }

        // ══════════════════════════════════════════
        // CONTEXT SNAPSHOTS
        // ══════════════════════════════════════════
        if (pathname === '/api/snapshots' && req.method === 'GET') {
            return sendJSON(res, readJSON('context_snapshots.json') || { snapshots: [] });
        }

        // ══════════════════════════════════════════
        // LEGACY APIs (preserved)
        // ══════════════════════════════════════════
        if (pathname === '/api/data') {
            const data = {
                squads: [], agents: [], design_systems: {}, clones: null, skills: null,
                environment: {
                    firebase: fs.existsSync(path.join(__dirname, '../.firebaserc')),
                    node_version: process.version, platform: process.platform
                },
                pdf_health: { last_run: null, status: 'IDLE' }
            };
            try {
                const pipelinePath = path.join(__dirname, '../docs/pipeline_state.json');
                if (fs.existsSync(pipelinePath)) data.pipeline = JSON.parse(fs.readFileSync(pipelinePath, 'utf8'));
                const squadsPath = path.join(__dirname, '../squads');
                if (fs.existsSync(squadsPath)) fs.readdirSync(squadsPath).forEach(file => { if (file.endsWith('.yaml')) data.squads[file] = fs.readFileSync(path.join(squadsPath, file), 'utf8'); });
                const dsPath = path.join(__dirname, '../knowledge/branding/design_systems');
                if (fs.existsSync(dsPath)) fs.readdirSync(dsPath).forEach(file => { if (file.endsWith('.json')) data.design_systems[file] = JSON.parse(fs.readFileSync(path.join(dsPath, file), 'utf8')); });
                const clonePath = path.join(__dirname, '../knowledge/clones/clone_routing.yaml');
                if (fs.existsSync(clonePath)) data.clones = fs.readFileSync(clonePath, 'utf8');
                const skillsPath = path.join(__dirname, '../knowledge/skills_dictionary.md');
                if (fs.existsSync(skillsPath)) data.skills = fs.readFileSync(skillsPath, 'utf8');
                const pdfLogPath = path.join(__dirname, '../projects/ebook-generator/pdf_generation.log');
                if (fs.existsSync(pdfLogPath)) {
                    const logs = fs.readFileSync(pdfLogPath, 'utf8').trim().split('\n');
                    data.pdf_health.last_run = logs.slice(-5).join('\n');
                    data.pdf_health.status = logs.slice(-10).some(l => l.includes('Sucesso')) ? 'SUCCESS' : 'ERROR';
                }
                return sendJSON(res, data);
            } catch(e) { return sendJSON(res, { error: e.message }, 500); }
        }

        if (pathname === '/api/recipes') {
            try {
                const dataPath = path.join(__dirname, '../projects/ebook-generator/data.js');
                delete require.cache[require.resolve(dataPath)];
                const { recipes } = require(dataPath);
                const normalized = recipes.map(r => ({ name: r.title, desc: r.signature, category: r.category, tags: [r.category] }));
                return sendJSON(res, { success: true, recipes: normalized });
            } catch(e) { return sendJSON(res, { error: 'Erro ao carregar receitas: ' + e.message }, 500); }
        }

        if (pathname.startsWith('/api/file') && req.method === 'GET') {
            const queryFile = decodeURIComponent(url.searchParams.get('path') || '');
            const absolutePath = path.resolve(__dirname, '..', queryFile);
            try {
                const content = fs.readFileSync(absolutePath, 'utf8');
                res.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
                return res.end(content);
            } catch(e) {
                res.writeHead(404);
                return res.end('Erro ao ler arquivo: ' + queryFile);
            }
        }

        if (pathname === '/api/save' && req.method === 'POST') {
            const body = await parseBody(req);
            const absolutePath = path.resolve(__dirname, '..', body.path);
            fs.writeFileSync(absolutePath, body.content, 'utf8');
            return sendJSON(res, { success: true });
        }

        // ── Static files from docs ──
        const filePath = path.join(__dirname, '../docs', pathname);
        const extname = path.extname(filePath);
        const mimeTypes = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.html': 'text/html' };
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath);
            res.writeHead(200, { 'Content-Type': mimeTypes[extname] || 'application/octet-stream' });
            return res.end(content);
        }

        res.writeHead(404);
        res.end('Not found: ' + pathname);

    } catch(e) {
        console.error('Server error:', e);
        sendJSON(res, { error: e.message }, 500);
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Anti-Gravity Intelligence Tower online: http://localhost:${PORT}`);
    console.log(`📊 Registry: ${fs.existsSync(path.join(CONTROL_DIR, 'registry.json')) ? '✅' : '❌'}`);
    console.log(`🏗️ Build State: ${fs.existsSync(path.join(CONTROL_DIR, 'build_state.json')) ? '✅' : '❌'}`);
    console.log(`🔄 Ops State: ${fs.existsSync(path.join(CONTROL_DIR, 'ops_state.json')) ? '✅' : '❌'}`);
    console.log(`🎛️ Control: ${fs.existsSync(path.join(CONTROL_DIR, 'control_state.json')) ? '✅' : '❌'}`);
    console.log(`\nDê um CTRL+Click no link acima para abrir.`);
});
