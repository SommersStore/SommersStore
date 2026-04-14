const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    if (req.url === '/' || req.url === '/dashboard') {
        fs.readFile(path.join(__dirname, '../docs/aiox_dashboard.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading dashboard HTML');
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (req.url === '/api/data') {
        const data = { 
            squads: [], 
            agents: [],
            design_systems: {}, 
            clones: null, 
            skills: null,
            environment: {
                firebase: fs.existsSync(path.join(__dirname, '../.firebaserc')),
                node_version: process.version,
                platform: process.platform
            },
            pdf_health: {
                last_run: null,
                status: 'IDLE'
            }
        };

        try {
            // Read Pipeline State (Source of Truth)
            const pipelinePath = path.join(__dirname, '../docs/pipeline_state.json');
            if(fs.existsSync(pipelinePath)) {
                data.pipeline = JSON.parse(fs.readFileSync(pipelinePath, 'utf8'));
            }

            // Read Squads
            const squadsPath = path.join(__dirname, '../squads');
            if(fs.existsSync(squadsPath)) {
                fs.readdirSync(squadsPath).forEach(file => {
                    if(file.endsWith('.yaml')) {
                        data.squads[file] = fs.readFileSync(path.join(squadsPath, file), 'utf8');
                    }
                });
            }
            // Read Design Systems
            const dsPath = path.join(__dirname, '../knowledge/branding/design_systems');
            if(fs.existsSync(dsPath)){
                fs.readdirSync(dsPath).forEach(file => {
                    if(file.endsWith('.json')) {
                        data.design_systems[file] = JSON.parse(fs.readFileSync(path.join(dsPath, file), 'utf8'));
                    }
                });
            }
            // Read Clones
            const clonePath = path.join(__dirname, '../knowledge/clones/clone_routing.yaml');
            if(fs.existsSync(clonePath)) {
                data.clones = fs.readFileSync(clonePath, 'utf8');
            }
            // Read Skills
            const skillsPath = path.join(__dirname, '../knowledge/skills_dictionary.md');
            if(fs.existsSync(skillsPath)) {
                data.skills = fs.readFileSync(skillsPath, 'utf8');
            }

            // --- NOVO: Monitoramento de Saúde do PDF ---
            const pdfLogPath = path.join(__dirname, '../projects/ebook-generator/pdf_generation.log');
            if(fs.existsSync(pdfLogPath)) {
                const logs = fs.readFileSync(pdfLogPath, 'utf8').trim().split('\n');
                data.pdf_health.last_run = logs.slice(-5).join('\n');
                data.pdf_health.status = logs.slice(-10).some(l => l.includes('Sucesso')) ? 'SUCCESS' : 'ERROR';
            }

            // Find recent History (Artifacts from brain)
            data.history = [];
            const brainDir = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\brain';
            if(fs.existsSync(brainDir)) {
                 const sessions = fs.readdirSync(brainDir).map(file => {
                     const fpath = path.join(brainDir, file);
                     return { name: file, path: fpath, stat: fs.statSync(fpath) };
                 }).filter(f => f.stat.isDirectory()).sort((a,b) => b.stat.mtime - a.stat.mtime);
                 
                 if(sessions.length > 0) {
                     const lastSession = sessions[0].path;
                     fs.readdirSync(lastSession).forEach(f => {
                         if(f.endsWith('.md')) {
                             const content = fs.readFileSync(path.join(lastSession, f), 'utf8');
                             data.history.push({ name: f, content: content, date: fs.statSync(path.join(lastSession, f)).mtime });
                         }
                     });
                 }
            }
            data.history.sort((a,b) => b.date - a.date);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
        } catch(e) {
            res.writeHead(500);
            res.end(JSON.stringify({error: e.message}));
        }
    } else if (req.url === '/api/recipes') {
        try {
            const dataPath = path.join(__dirname, '../projects/ebook-generator/data.js');
            // Como é um arquivo JS com module.exports, podemos dar um require se for seguro
            // Mas para o dashboard, vamos ler como string e tentar extrair o array recipes
            // Ou melhor, usar uma regex simples para pegar o array se for constante ou apenas require se o node permitir
            delete require.cache[require.resolve(dataPath)];
            const { recipes } = require(dataPath);
            
            // Normalizar para o Dashboard
            const normalized = recipes.map(r => ({
                name: r.title,
                desc: r.signature,
                category: r.category,
                tags: [r.category]
            }));

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ success: true, recipes: normalized }));
        } catch(e) {
            res.writeHead(500);
            res.end(JSON.stringify({error: 'Erro ao carregar receitas: ' + e.message}));
        }
    } else if (req.url.startsWith('/api/file?path=')) {
        const queryFile = decodeURIComponent(req.url.split('?path=')[1]);
        const absolutePath = path.resolve(__dirname, '..', queryFile);
        
        fs.readFile(absolutePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('Erro ao ler arquivo: ' + queryFile);
            }
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
        });
    } else if (req.url === '/api/save' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                const absolutePath = path.resolve(__dirname, '..', parsed.path);
                fs.writeFileSync(absolutePath, parsed.content, 'utf8');
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({success: true}));
            } catch(e) {
                res.writeHead(500);
                res.end(JSON.stringify({error: e.message}));
            }
        });
    } else {
        // --- NOVO: Servir arquivos estáticos da pasta DOCS ---
        const filePath = path.join(__dirname, '../docs', req.url === '/' ? 'aiox_dashboard.html' : req.url);
        const extname = path.extname(filePath);
        let contentType = 'text/html';

        switch (extname) {
            case '.js': contentType = 'text/javascript'; break;
            case '.css': contentType = 'text/css'; break;
            case '.json': contentType = 'application/json'; break;
            case '.png': contentType = 'image/png'; break;
            case '.jpg': contentType = 'image/jpg'; break;
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('Arquivo não encontrado: ' + req.url);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`🚀 AIOX Observability Dashboard online no endereço: http://localhost:${PORT}`);
    console.log(`Dê um CTRL+Click no link acima para abrir.`);
});
