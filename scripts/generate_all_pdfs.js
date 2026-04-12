const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const books = [
    { id: 'cofre-master', fileName: 'O_Cofre_das_Botanicas_Secretas.pdf' },
    { id: 'sinergias', fileName: '30_Sinergias_Sommers_Store.pdf' },
    { id: 'fornecedores', fileName: 'Guia_Fornecedores_Master.pdf' },
    { id: 'ritual-noite', fileName: 'Ritual_da_Meia_Noite.pdf' }
];

async function generatePDFs() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    const downloadDir = path.join(__dirname, '../projects/loja-digital/public/downloads');
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }

    for (const book of books) {
        console.log(`Generating PDF for ${book.id}...`);
        const url = `http://localhost:3000/ebook/viewer/${book.id}`;
        
        await page.goto(url, { waitUntil: 'networkidle0' });
        
        // Wait for images to load just in case
        await new Promise(resolve => setTimeout(resolve, 2000));

        const outputPath = path.join(downloadDir, book.fileName);
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });
        console.log(`Saved: ${outputPath}`);
    }

    await browser.close();
    console.log('All PDFs generated successfully.');
}

generatePDFs().catch(err => {
    console.error('Error generating PDFs:', err);
    process.exit(1);
});
