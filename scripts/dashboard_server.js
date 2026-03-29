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
        const data = { squads: {}, design_systems: {}, clones: null, skills: null };
        try {
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
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`🚀 AIOX Observability Dashboard online no endereço: http://localhost:${PORT}`);
    console.log(`Dê um CTRL+Click no link acima para abrir.`);
});
