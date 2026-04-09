const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePremiumPDF() {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        
        // Define viewport para alta resolução
        await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

        console.log("🚀 Iniciando Motor de PDF de Elite (V2)...");
        console.log("Conectando ao Visualizador Master: http://localhost:3000/ebook/viewer");
        
        // Navega para a rota do visualizador
        await page.goto('http://localhost:3000/ebook/viewer', {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Aguarda um pequeno delay extra para garantir renderização dos efeitos de glow (shadow-flow)
        await page.evaluate(async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
        });

        const outDir = path.resolve(__dirname, '..', 'loja-digital', 'public', 'downloads');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        
        const fileName = 'O_Cofre_das_Botanicas_Secretas_Elite.pdf';
        const outPath = path.resolve(outDir, fileName);

        console.log(`📸 Capturando 1:1 com fidelidade absoluta...`);

        await page.pdf({
            path: outPath,
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: true, // Crucial para respeitar os frames A4 do Next.js
            margin: { top: '0', right: '0', bottom: '0', left: '0' },
            displayHeaderFooter: false
        });

        const stats = fs.statSync(outPath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);

        console.log(`✅ PDF Premium Gerado com Sucesso!`);
        console.log(`📍 Local: ${outPath}`);
        console.log(`⚖️ Peso Final: ${sizeMB} MB`);

    } catch (error) {
        console.error("❌ Erro na geração do PDF de Elite:", error);
    } finally {
        await browser.close();
    }
}

generatePremiumPDF();
