import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

function markdownToHtml(md, title) {
  const lines = md.split(/\r?\n/);
  let htmlBody = '';
  let inCode = false;
  let codeBuf = [];
  let inTable = false;
  let tableBuf = [];
  let inList = false;
  let inQuote = false;
  let quoteBuf = [];

  function formatInline(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/&lt;br\s*\/?&gt;/gi, '<br>');
  }

  function flushList() {
    if (inList) {
      htmlBody += '</ul>\n';
      inList = false;
    }
  }

  function flushQuote() {
    if (inQuote) {
      htmlBody += '<blockquote>' + quoteBuf.map(formatInline).join('<br>\n') + '</blockquote>\n';
      inQuote = false;
      quoteBuf = [];
    }
  }

  function flushTable() {
    if (inTable) {
      if (tableBuf.length > 0) {
        let tHtml = '<div class="table-wrapper"><table>\n';
        const headerRow = tableBuf[0];
        const headers = headerRow.split('|').map(s => s.trim()).filter((s, i, a) => i > 0 && i < a.length - 1);
        tHtml += '<thead><tr>' + headers.map(h => '<th>' + formatInline(h) + '</th>').join('') + '</tr></thead>\n<tbody>\n';
        for (let i = 2; i < tableBuf.length; i++) {
          const cells = tableBuf[i].split('|').map(s => s.trim()).filter((s, idx, a) => idx > 0 && idx < a.length - 1);
          if (cells.length > 0) {
            tHtml += '<tr>' + cells.map(c => '<td>' + formatInline(c) + '</td>').join('') + '</tr>\n';
          }
        }
        tHtml += '</tbody></table></div>\n';
        htmlBody += tHtml;
      }
      inTable = false;
      tableBuf = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.trim().startsWith('```')) {
      if (inCode) {
        htmlBody += '<pre><code>' + codeBuf.join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code></pre>\n';
        inCode = false;
        codeBuf = [];
      } else {
        flushList();
        flushQuote();
        flushTable();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(line);
      continue;
    }

    // Tables
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      flushList();
      flushQuote();
      inTable = true;
      tableBuf.push(line.trim());
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Quotes
    if (line.trim().startsWith('>')) {
      flushList();
      flushTable();
      inQuote = true;
      quoteBuf.push(line.trim().replace(/^>\s*/, ''));
      continue;
    } else if (inQuote) {
      flushQuote();
    }

    // Horizontal Rule
    if (/^(\*\*\*|---|___)$/.test(line.trim())) {
      flushList();
      flushTable();
      flushQuote();
      htmlBody += '<hr>\n';
      continue;
    }

    // Headings
    const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (hMatch) {
      flushList();
      flushTable();
      flushQuote();
      const level = hMatch[1].length;
      htmlBody += '<h' + level + '>' + formatInline(hMatch[2]) + '</h' + level + '>\n';
      continue;
    }

    // Unordered list
    const listMatch = line.match(/^(\s*)[-*+]\s+(.*)$/);
    if (listMatch) {
      flushTable();
      flushQuote();
      if (!inList) {
        htmlBody += '<ul>\n';
        inList = true;
      }
      htmlBody += '<li>' + formatInline(listMatch[2]) + '</li>\n';
      continue;
    } else if (inList && line.trim() === '') {
      flushList();
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      flushList();
      flushTable();
      flushQuote();
      continue;
    }

    // Regular paragraph
    flushList();
    flushTable();
    flushQuote();
    htmlBody += '<p>' + formatInline(line) + '</p>\n';
  }

  flushList();
  flushTable();
  flushQuote();

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  @page {
    size: A4;
    margin: 18mm 15mm 20mm 15mm;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    line-height: 1.55;
    font-size: 10.5pt;
    margin: 0;
    padding: 0;
  }
  h1 {
    color: #0f172a;
    font-size: 20pt;
    border-bottom: 2.5px solid #2563eb;
    padding-bottom: 6px;
    margin-top: 0;
    margin-bottom: 14px;
    break-after: avoid;
    page-break-after: avoid;
  }
  h2 {
    color: #1e3a8a;
    font-size: 14.5pt;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 4px;
    margin-top: 22px;
    margin-bottom: 10px;
    break-after: avoid;
    page-break-after: avoid;
  }
  h3 {
    color: #1e40af;
    font-size: 12pt;
    margin-top: 16px;
    margin-bottom: 6px;
    break-after: avoid;
    page-break-after: avoid;
  }
  h4 {
    color: #334155;
    font-size: 11pt;
    margin-top: 12px;
    margin-bottom: 4px;
    break-after: avoid;
    page-break-after: avoid;
  }
  p {
    margin-top: 0;
    margin-bottom: 8px;
  }
  hr {
    border: 0;
    height: 1px;
    background: #e2e8f0;
    margin: 16px 0;
  }
  ul, ol {
    margin-top: 0;
    margin-bottom: 10px;
    padding-left: 22px;
  }
  li {
    margin-bottom: 4px;
  }
  code {
    background-color: #f1f5f9;
    color: #0958d9;
    padding: 1.5px 4.5px;
    border-radius: 3px;
    font-family: Consolas, "Courier New", monospace;
    font-size: 9.5pt;
    border: 1px solid #e2e8f0;
  }
  pre {
    background-color: #0f172a;
    color: #f8fafc;
    padding: 10px 14px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: Consolas, "Courier New", monospace;
    font-size: 9pt;
    line-height: 1.45;
    margin: 10px 0;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  pre code {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
  }
  blockquote {
    border-left: 4px solid #2563eb;
    background-color: #f8fafc;
    margin: 10px 0;
    padding: 8px 14px;
    color: #334155;
    font-style: italic;
    border-radius: 0 4px 4px 0;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .table-wrapper {
    width: 100%;
    margin: 12px 0;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
  }
  th {
    background-color: #1e3a8a;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 6px 9px;
    border: 1px solid #1e3a8a;
  }
  td {
    padding: 5px 8px;
    border: 1px solid #cbd5e1;
    vertical-align: top;
  }
  tr:nth-child(even) td {
    background-color: #f8fafc;
  }
  strong {
    color: #0f172a;
  }
  a {
    color: #2563eb;
    text-decoration: none;
  }
  .badge {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 8.5pt;
    font-weight: 600;
  }
</style>
</head>
<body>
${htmlBody}
</body>
</html>`;
}

async function generatePdfs() {
  console.log('Starting Puppeteer for PDF generation...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const desktopDir = 'C:/Users/AMD/Desktop';
  const docsDir = 'c:/AIOX/Workspace/SommersStore/docs';

  const files = [
    {
      source: path.join(docsDir, 'manual-forex-trade-panel-mt5.md'),
      title: 'Manual Completo — Forex Trade Panel MT5 (FTP) v2.0',
      pdfName: 'Manual_Forex_Trade_Panel_FTP_v2.0.pdf',
      footerTitle: 'Forex Trade Panel MT5 v2.0 — Manual Operacional'
    },
    {
      source: path.join(docsDir, 'manual-aiox-local-trade-copier.md'),
      title: 'Manual de Configuração e Operação — AIOX Local Trade Copier v1.10',
      pdfName: 'Manual_AIOX_Local_Trade_Copier_v1.10.pdf',
      footerTitle: 'AIOX Local Trade Copier v1.10 — Manual Operacional'
    }
  ];

  for (const item of files) {
    console.log(`Processing: ${item.pdfName}...`);
    const mdContent = fs.readFileSync(item.source, 'utf8');
    const htmlContent = markdownToHtml(mdContent, item.title);

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const headerTemplate = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8pt; color: #64748b; width: 100%; padding: 0 15mm; display: flex; justify-content: space-between; border-bottom: 0.5px solid #cbd5e1; padding-bottom: 3px;">
        <span>${item.footerTitle}</span>
        <span>AIOX / SommersStore</span>
      </div>`;

    const footerTemplate = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8pt; color: #64748b; width: 100%; padding: 0 15mm; display: flex; justify-content: space-between; border-top: 0.5px solid #cbd5e1; padding-top: 3px;">
        <span>Documento Técnico de Referência</span>
        <span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
      </div>`;

    const desktopPdfPath = path.join(desktopDir, item.pdfName);
    const docsPdfPath = path.join(docsDir, item.pdfName);

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '15mm',
        right: '15mm'
      }
    });

    fs.writeFileSync(desktopPdfPath, pdfBuffer);
    fs.writeFileSync(docsPdfPath, pdfBuffer);
    console.log(`Generated: ${desktopPdfPath} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);
    console.log(`Copied to: ${docsPdfPath}`);
    await page.close();
  }

  await browser.close();
  console.log('All PDFs generated successfully!');
}

generatePdfs().catch(err => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
