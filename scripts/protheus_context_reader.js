const fs = require('fs');
const path = require('path');

const NUMERIC_FIELDS = new Set([
    'data_age_minutes', 'price', 'support2', 'support1', 'balance', 'vwap',
    'resistance1', 'resistance2', 'session_open', 'previous_day_low',
    'previous_day_high', 'profile_val', 'profile_poc', 'profile_vah',
    'previous_vwap', 'profile_days', 'profile_bars', 'value_area_pct',
    'atr', 'atr_ratio', 'tick_volume_ratio'
]);

const SUPPORTED_SCHEMAS = new Set([
    'protheus.market-context.v1',
    'protheus.market-context.v2'
]);

function parseSemicolonSnapshot(content) {
    const lines = String(content || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    if (lines.length < 2) throw new Error('Snapshot MT5 sem cabecalho e linha de dados.');
    const headers = lines[0].split(';').map(value => value.trim());
    const values = lines[1].split(';').map(value => value.trim());
    if (!headers.length || headers[0] !== 'schema') throw new Error('Snapshot MT5 com schema invalido.');
    if (values.length > headers.length) {
        values[headers.length - 1] = values.slice(headers.length - 1).join('; ');
        values.length = headers.length;
    }
    const snapshot = {};
    headers.forEach((header, index) => {
        const raw = values[index] || '';
        if (NUMERIC_FIELDS.has(header)) {
            const number = Number(raw);
            snapshot[header] = Number.isFinite(number) ? number : null;
            return;
        }
        snapshot[header] = raw;
    });
    if (!SUPPORTED_SCHEMAS.has(snapshot.schema)) throw new Error('Versao de snapshot MT5 nao suportada.');
    if (!/^[A-Z0-9._-]{1,32}$/i.test(snapshot.symbol || '')) throw new Error('Simbolo ausente ou invalido.');
    return snapshot;
}

function loadProtheusContexts(directory) {
    if (!directory || !fs.existsSync(directory)) return [];
    const snapshots = fs.readdirSync(directory, { withFileTypes: true })
        .filter(entry => entry.isFile() && /^context-[A-Z0-9._-]+\.csv$/i.test(entry.name))
        .map(entry => {
            const fullPath = path.join(directory, entry.name);
            try {
                const snapshot = parseSemicolonSnapshot(fs.readFileSync(fullPath, 'utf8'));
                const stats = fs.statSync(fullPath);
                return {
                    ...snapshot,
                    id: `${snapshot.symbol}:${snapshot.timeframe || 'UNKNOWN'}`,
                    file_updated_at: stats.mtime.toISOString()
                };
            } catch (_) {
                return null;
            }
        })
        .filter(Boolean)
        .sort((left, right) => String(right.file_updated_at).localeCompare(String(left.file_updated_at)));
    const seen = new Set();
    return snapshots.filter(snapshot => {
        if (seen.has(snapshot.id)) return false;
        seen.add(snapshot.id);
        return true;
    });
}

module.exports = { parseSemicolonSnapshot, loadProtheusContexts };
