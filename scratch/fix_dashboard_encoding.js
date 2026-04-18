const fs = require('fs');

function fixHtml(path) {
    let html = fs.readFileSync(path, 'utf8');
    
    const replacements = {
        'Ã‚Â·': '·',
        'ÃƒÂ£': 'ã',
        'ÃƒÂ§': 'ç',
        'ÃƒÂµ': 'õ',
        'ÃƒÂª': 'ê',
        'ÃƒÂ³': 'ó',
        'ÃƒÂ¡': 'á',
        'ÃƒÂ©': 'é',
        'ÃƒÂ­': 'í',
        'ÃƒÂº': 'ú',
        'ÃƒÂ¢': 'â',
        'ÃƒÂ´': 'ô',
        'ÃƒÂ': 'À', 
        'ÃƒÂ§ÃƒÂ£o': 'ção',
        'Ã¢â‚¬â€': '—',
        '╝Â': '═',
        'Ã¢â‚¬â€ ': '—',
        'Ã¢â€¢Â ': '═══',
        'Ã¢â€¢Â Ã¢â€¢Â Ã¢â€¢Â ': '══════',
        'Ã¢â€¢Â Ã¢â€¢Â Ã¢â€¢Â Ã¢â€¢Â Ã¢â€¢Â Ã¢â€¢Â Ã¢â€¢Â ': '═══════',
        'Ã¢Ë†â€™': '−',
        'Ã¢â€¢â€ ': '╔',
        'ÃO': 'ÃO', 
        'ÃƒÂ£o': 'ão',
        'Ã cone': 'Ícone',
        'Ã rea': 'Área'
    };

    // First try automatic window-1252 to utf8 decoding multiple times
    function deepDecode(str) {
        try {
            // A common trick to double-decode utf8 messed up as latin1
            return decodeURIComponent(escape(str));
        } catch(e) { return str; }
    }

    // Let's do string replacement for safety to not corrupt anything else, since it's a known bad state.
    for (const [bad, good] of Object.entries(replacements)) {
        html = html.split(bad).join(good);
    }

    fs.writeFileSync(path, html, 'utf8');
    console.log('Fixed encoding in', path);
}

const files = [
    '../docs/aiox_dashboard.html',
    '../docs/aiox_fluxograma.html'
];

files.forEach(path => {
    if (fs.existsSync(path)) {
        fixHtml(path);
    } else {
        console.log('File not found:', path);
    }
});

