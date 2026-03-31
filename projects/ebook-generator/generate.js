const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const { recipes } = require('./data.js');

async function generateExecutiveEbook() {
    try {
        console.log('Iniciando Gerador Editorial AIOX (Layout 2-Páginas)...');
        const browser = await puppeteer.launch({ headless: 'new' });
        
        let htmlBase = fs.readFileSync(path.resolve(__dirname, 'src', 'template_dark.html'), 'utf8');

        let recipesHtml = '';
        let pageCount = 4; // Capa (1), Intro (2), Sumário (3, 4)
        
        // --- 1. GERAÇÃO DO SUMÁRIO (Páginas 3 e 4) ---
        let tocPart1 = '', tocPart2 = '';
        let currentCategory = "";
        let predictedPageNumber = 5; // As receitas começam na pág 5
        
        recipes.forEach((r, idx) => {
            let isPart2 = idx >= 6; 
            let line = '';

            if (r.category !== currentCategory) {
                currentCategory = r.category;
                line += `<h3 style="margin-top: 8mm; margin-bottom: 2mm; font-size: 10pt; letter-spacing: 2px; color: var(--accent-color); opacity: 0.7;">/// ${currentCategory}</h3>`;
            }
            
            line += `
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 2mm;">
                <tr>
                    <td style="font-family: 'Playfair Display', serif; font-size: 13pt; color: var(--text-color); padding-bottom: 1.5mm; width: 85%; border-bottom: 1px dotted rgba(255,255,255,0.1);">
                        ${r.num}. ${r.title}
                    </td>
                    <td style="font-size: 10pt; opacity: 0.6; text-align: right; vertical-align: bottom; width: 15%; padding-bottom: 1.5mm; border-bottom: 1px dotted rgba(255,255,255,0.1);">
                        PÁG ${String(predictedPageNumber).padStart(2, '0')}
                    </td>
                </tr>
            </table>
            `;
            
            if (isPart2) tocPart2 += line;
            else tocPart1 += line;

            predictedPageNumber += 2; // Sempre 2 páginas por receita agora
        });

        // Injeção do Sumário no HTML Global
        recipesHtml += `
            <div class="page" style="justify-content: start;">
                <h2 style="font-size: 14pt; letter-spacing: 3px; text-transform: uppercase; opacity: 0.5;">O Conteúdo</h2>
                <h1 style="font-size: 32pt; margin-bottom: 10mm; color: var(--accent-color);">O Sumário do Cofre</h1>
                <div style="font-size: 12pt; line-height: 1.6; width: 100%;">${tocPart1}</div>
                <div class="footer"><span>O COFRE DAS BOTÂNICAS SECRETAS</span><span>03</span></div>
            </div>
            <div class="page" style="justify-content: start;">
                <div style="height: 25mm;"></div>
                <div style="font-size: 12pt; line-height: 1.6; width: 100%;">${tocPart2}</div>
                <div class="footer"><span>O COFRE DAS BOTÂNICAS SECRETAS</span><span>04</span></div>
            </div>`;

        // --- 2. GERAÇÃO DAS RECEITAS (Layout 2-Páginas Fixo) ---
        recipes.forEach((r) => {
            
            // PÁGINA 1: ABERTURA SENSORIAL (EMOCIONAL)
            recipesHtml += `
            <div class="page">
                <div style="text-align: left; width: 100%; margin-bottom: 10mm;">
                    <span style="font-size: 10pt; letter-spacing: 4px; color: var(--accent-color); text-transform: uppercase;">Coleção Botânica // ${r.category}</span>
                </div>
                
                <h1 style="font-size: 38pt; line-height: 1.1; margin-bottom: 2mm; color: var(--accent-color);">${r.title}</h1>
                <h2 style="font-size: 16pt; font-family: 'Inter', sans-serif; letter-spacing: 2px; color: var(--text-color); opacity: 0.7; margin-bottom: 10mm;">${r.subname}</h2>
                
                <div class="hero-img" style="width: 100%; height: 110mm; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; margin-bottom: 15mm; overflow: hidden;">
                    <div style="color: var(--accent-color); opacity: 0.3; letter-spacing: 2px; font-size: 9pt;">[ IMAGEM DE ATMOSFERA E RITUAL ]</div>
                </div>

                <div class="signature-box" style="border-left: 3px solid var(--accent-color); padding-left: 10mm; margin-top: auto;">
                    <div style="font-size: 10pt; letter-spacing: 3px; color: var(--accent-color); margin-bottom: 8pt; text-transform: uppercase;">Assinatura da Fórmula</div>
                    <div style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 15pt; line-height: 1.6; color: var(--text-color); max-width: 90%; text-align: justify;">
                        "${r.signature}"
                    </div>
                </div>
                
                <div class="footer"><span>O COFRE DAS BOTÂNICAS SECRETAS</span><span>${String(++pageCount).padStart(2,'0')}</span></div>
            </div>`;

            // PÁGINA 2: FÓRMULA E APLICAÇÃO (TÉCNICA)
            let ingredientsList = r.ingredients.map(i => `<li style="font-size: 12pt; margin-bottom: 6pt; line-height: 1.4;">${i}</li>`).join('');
            
            recipesHtml += `
            <div class="page" style="justify-content: start;">
                <div class="tech-label" style="font-size: 9pt; text-transform: uppercase; letter-spacing: 4px; opacity: 0.5; margin-bottom: 15mm;">Dossiê Técnico // Fórmula ${r.num}</div>
                
                <div style="display: flex; gap: 15mm; flex: 1; align-items: start;">
                    <!-- Coluna Esquerda: Ingredientes e Imagem -->
                    <div style="flex: 1.2;">
                         <h3 style="color: var(--accent-color); font-size: 14pt; border-bottom: 1px solid var(--border-color); padding-bottom: 3mm; margin-bottom: 8mm; text-transform: uppercase; letter-spacing: 2px;">Composição</h3>
                         <ul style="padding-left: 12pt; margin-bottom: 15mm;">${ingredientsList}</ul>
                         
                         <div class="comp-img" style="width: 100%; height: 60mm; border: 1px dashed rgba(197,160,89, 0.2); display: flex; align-items: center; justify-content: center; font-size: 8pt; opacity: 0.5;">
                            [ IMAGEM DA COMPOSIÇÃO DOS SAIS E BOTÂNICOS ]
                         </div>
                    </div>

                    <!-- Coluna Direita: Preparo e Aplicação -->
                    <div style="flex: 1.8;">
                        <h3 style="color: var(--accent-color); font-size: 14pt; border-bottom: 1px solid var(--border-color); padding-bottom: 3mm; margin-bottom: 8mm; text-transform: uppercase; letter-spacing: 2px;">O Preparo</h3>
                        <p style="font-size: 12.5pt; line-height: 1.7; text-align: justify; margin-bottom: 12mm; color: var(--text-color);">${r.protocol}</p>

                        <h3 style="color: var(--accent-color); font-size: 14pt; border-bottom: 1px solid var(--border-color); padding-bottom: 3mm; margin-bottom: 8mm; text-transform: uppercase; letter-spacing: 2px;">A Aplicação</h3>
                        <p style="font-size: 12.5pt; line-height: 1.7; text-align: justify; color: var(--text-color);">${r.application}</p>
                    </div>
                </div>

                <!-- Box de Destaque Final -->
                <div class="highlight-box" style="background: rgba(197,160,89, 0.05); padding: 10mm; border: 1px solid rgba(197,160,89, 0.1); margin-top: 10mm;">
                    <div style="display: flex; gap: 10mm;">
                        <div style="flex: 1;">
                            <h4 style="color: var(--accent-color); font-size: 10pt; text-transform: uppercase; margin-bottom: 3mm; letter-spacing: 2px;">Apresentação Premium</h4>
                            <p style="font-size: 11pt; line-height: 1.5; color: var(--text-color); opacity: 0.8; margin: 0;">${r.presentation}</p>
                        </div>
                        <div style="flex: 1; border-left: 1px solid rgba(197,160,89, 0.1); padding-left: 10mm;">
                            <h4 style="color: var(--accent-color); font-size: 10pt; text-transform: uppercase; margin-bottom: 3mm; letter-spacing: 2px;">Dica do Alquimista</h4>
                            <p style="font-size: 11pt; line-height: 1.5; color: var(--text-color); opacity: 0.8; margin: 0;">${r.box || r.care}</p>
                        </div>
                    </div>
                </div>

                <div class="footer"><span>O COFRE DAS BOTÂNICAS SECRETAS</span><span>${String(++pageCount).padStart(2,'0')}</span></div>
            </div>`;
        });

        // Inserção das receitas processadas no template
        htmlBase = htmlBase.replace('{{RECIPES_HTML}}', recipesHtml);

        const outDir = path.resolve(__dirname, '..', 'loja-digital', 'sales', 'content');
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
        const outPath = path.resolve(outDir, 'O_Cofre_das_Botanicas_Secretas_Escuro_Completo.pdf');

        console.log(`Gerando PDF Editorial OTO com ${pageCount} páginas em alta resolução...`);
        const page = await browser.newPage();
        await page.setContent(htmlBase, { waitUntil: 'networkidle0' });

        await page.pdf({
            path: outPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' }
        });

        console.log(`✅ PDF Editorial Gerado com Sucesso: ${outPath}`);
        await page.close();
        await browser.close();

    } catch (e) {
        console.error('Falha na geração do PDF:', e);
    }
}

generateExecutiveEbook();
