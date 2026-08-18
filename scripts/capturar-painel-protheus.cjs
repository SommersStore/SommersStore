const path = require('path');
const puppeteer = require('puppeteer');

async function main() {
    const url = process.argv[2] || 'http://127.0.0.1:4000';
    const destination = path.resolve(process.argv[3] || 'artifacts/protheus-market-desk.png');
    const preferredContext = process.argv[4] || 'GOLD:PERIOD_M5';
    const browser = await puppeteer.launch({ headless: true });
    try {
        const page = await browser.newPage();
        const browserErrors = [];
        page.on('pageerror', error => browserErrors.push(error.message));
        await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        const forexTab = '[data-tab="forex"][data-primary-nav="forex"]';
        await page.waitForSelector(forexTab, { visible: true, timeout: 10000 });
        await page.click(forexTab);
        await page.waitForSelector('#ibkr-view-protheus.active', { visible: true, timeout: 10000 });
        await page.waitForFunction(() => {
            const element = document.getElementById('protheus-context-kpis');
            return element && /STALE|CURRENT|MISSING/.test(element.textContent || '');
        }, { timeout: 10000 });
        const preferredExists = await page.$eval(
            '#protheus-context-symbol',
            (select, wanted) => Array.from(select.options).some(option => option.value === wanted),
            preferredContext
        );
        if (preferredExists) {
            await page.select('#protheus-context-symbol', preferredContext);
            await page.waitForFunction(
                wanted => document.getElementById('protheus-context-symbol')?.value === wanted,
                { timeout: 5000 },
                preferredContext
            );
        }
        await page.screenshot({ path: destination, fullPage: false });
        const result = await page.evaluate(() => ({
            title: document.querySelector('#pane-forex h2')?.textContent?.trim() || '',
            active_view: document.querySelector('#ibkr-manual-desk .ibkr-view.active')?.id || '',
            selector: document.getElementById('protheus-context-symbol')?.value || '',
            kpis: document.getElementById('protheus-context-kpis')?.innerText || '',
            meta: document.getElementById('protheus-context-meta')?.innerText || '',
            message: document.getElementById('protheus-context-message')?.innerText || ''
        }));
        process.stdout.write(JSON.stringify({ ok: true, destination, browser_errors: browserErrors, ...result }, null, 2));
    } finally {
        await browser.close();
    }
}

main().catch(error => {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.exitCode = 1;
});
