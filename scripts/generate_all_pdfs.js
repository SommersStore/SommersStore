const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const books = [
    { id: 'cofre', fileName: 'O_Cofre_das_Botanicas_Secretas.pdf' },
    { id: 'sinergias', fileName: '30_Sinergias_Sommers_Store.pdf' },
    { id: 'fornecedores', fileName: 'Guia_Fornecedores_Master.pdf' },
    { id: 'ritual-noite', fileName: 'Ritual_da_Meia_Noite.pdf' }
];

async function generatePDFs() {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    const downloadDir = path.join(__dirname, '../projects/loja-digital/out_deploy/downloads');
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }

    for (const book of books) {
        console.log(`Generating PDF for ${book.id}...`);
        await page.goto(`http://localhost:3000/ebook/viewer/${book.id}?print=1`, { waitUntil: 'networkidle0', timeout: 60000 });
        await new Promise(resolve => setTimeout(resolve, 4000));
        await page.evaluate(() => {
            document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]').forEach(el => el.style.display = 'none');
        });
        const outputPath = path.join(downloadDir, book.fileName);
        await page.pdf({ path: outputPath, format: 'A4', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
        const size = fs.statSync(outputPath).size;
        console.log(`Saved: ${outputPath} (${(size/1024/1024).toFixed(1)} MB)`);
    }

    await browser.close();
    console.log('All PDFs generated successfully.');
}

generatePDFs().catch(err => {
    console.error('Error generating PDFs:', err);
    process.exit(1);
});
