const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('docs/aiox_dashboard.html', 'utf8');

const dom = new JSDOM(html, { runScripts: 'dangerously' });
const window = dom.window;

setTimeout(() => {
    try {
        const testRegistry = {
            squads: [{id: 'core', name: 'Core'}],
            agents: [{id: 'agent1', squad: 'core'}, {id: 'agent2', squad: null}]
        };
        const res = window.buildSquadsBoardHtml(testRegistry);
        console.log("HTML length:", res.length);
        console.log("SUCCESS");
    } catch (e) {
        console.error("RUNTIME ERROR:", e);
    }
}, 500);
