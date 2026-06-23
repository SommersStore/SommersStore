'use strict';

const LOOPBACK_HOSTS = new Set(['127.0.0.1', 'localhost', '::1', '[::1]']);
const SYMBOL_PATTERN = /^[A-Z][A-Z0-9.\-]{0,15}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const DEFAULT_CONFIG = Object.freeze({
    version: 1,
    mode: 'paper_only',
    bridge: {
        enabled: false,
        base_url: 'http://127.0.0.1:8765',
        health_path: '/health',
        intelligence_path: '/v1/intelligence',
        timeout_ms: 2500
    },
    safeguards: {
        allow_live_orders: false,
        requires_explicit_paper_acknowledgement: true,
        credentials_storage: 'never',
        account_scope: 'paper_only'
    },
    ranking_policy: {
        right: 'P',
        min_dte: 30,
        max_dte: 120,
        max_spread_pct: 15,
        max_premium_pct: 8,
        prefer_open_interest: true
    },
    watchlist: ['SPY', 'AAPL']
});

function text(value, maxLength = 160) {
    return String(value == null ? '' : value).trim().slice(0, maxLength);
}

function numberOrNull(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
    const number = Number(value);
    return Number.isFinite(number) && number >= min && number <= max ? number : null;
}

function normalizeSymbol(value) {
    const symbol = text(value, 16).toUpperCase();
    if (!SYMBOL_PATTERN.test(symbol)) throw new Error('Símbolo inválido. Use até 16 caracteres: letras, números, ponto ou hífen.');
    return symbol;
}

function normalizePath(value, fallback) {
    const candidate = text(value || fallback, 120);
    if (!candidate.startsWith('/') || candidate.includes('..') || candidate.includes('\\')) return fallback;
    return candidate;
}

function normalizeLoopbackUrl(value) {
    let parsed;
    try {
        parsed = new URL(text(value, 240));
    } catch (_) {
        throw new Error('A URL da ponte local é inválida.');
    }
    if (parsed.protocol !== 'http:') throw new Error('A ponte local deve usar HTTP em loopback.');
    if (parsed.username || parsed.password || !LOOPBACK_HOSTS.has(parsed.hostname.toLowerCase())) {
        throw new Error('A ponte só pode apontar para localhost, 127.0.0.1 ou ::1, sem credenciais na URL.');
    }
    if (parsed.pathname !== '/' || parsed.search || parsed.hash) throw new Error('A URL base da ponte não pode conter caminho, consulta ou fragmento.');
    return parsed.origin;
}

function normalizeConfig(raw = {}) {
    const bridgeRaw = raw && typeof raw.bridge === 'object' ? raw.bridge : {};
    const policyRaw = raw && typeof raw.ranking_policy === 'object' ? raw.ranking_policy : {};
    const timeout = numberOrNull(bridgeRaw.timeout_ms, 250, 10000) || DEFAULT_CONFIG.bridge.timeout_ms;
    let baseUrl = DEFAULT_CONFIG.bridge.base_url;
    let configurationError = '';
    try {
        baseUrl = normalizeLoopbackUrl(bridgeRaw.base_url || baseUrl);
    } catch (error) {
        configurationError = error.message;
    }
    const watchlist = Array.isArray(raw.watchlist)
        ? raw.watchlist.map(value => {
            try { return normalizeSymbol(value); } catch (_) { return null; }
        }).filter(Boolean).slice(0, 25)
        : DEFAULT_CONFIG.watchlist.slice();
    const minDte = numberOrNull(policyRaw.min_dte, 1, 3650) || DEFAULT_CONFIG.ranking_policy.min_dte;
    const requestedMaxDte = numberOrNull(policyRaw.max_dte, 1, 3650) || DEFAULT_CONFIG.ranking_policy.max_dte;
    return {
        version: 1,
        mode: 'paper_only',
        bridge: {
            enabled: Boolean(bridgeRaw.enabled) && !configurationError,
            base_url: baseUrl,
            health_path: normalizePath(bridgeRaw.health_path, DEFAULT_CONFIG.bridge.health_path),
            intelligence_path: normalizePath(bridgeRaw.intelligence_path, DEFAULT_CONFIG.bridge.intelligence_path),
            timeout_ms: timeout
        },
        safeguards: { ...DEFAULT_CONFIG.safeguards },
        ranking_policy: {
            right: 'P',
            min_dte: minDte,
            max_dte: Math.max(minDte, requestedMaxDte),
            max_spread_pct: numberOrNull(policyRaw.max_spread_pct, 0.01, 100) || DEFAULT_CONFIG.ranking_policy.max_spread_pct,
            max_premium_pct: numberOrNull(policyRaw.max_premium_pct, 0.01, 100) || DEFAULT_CONFIG.ranking_policy.max_premium_pct,
            prefer_open_interest: policyRaw.prefer_open_interest !== false
        },
        watchlist: watchlist.length ? watchlist : DEFAULT_CONFIG.watchlist.slice(),
        configuration_error: configurationError || null
    };
}

function publicConfig(config) {
    const safe = normalizeConfig(config);
    return {
        mode: safe.mode,
        bridge: safe.bridge,
        safeguards: safe.safeguards,
        ranking_policy: safe.ranking_policy,
        watchlist: safe.watchlist,
        configuration_error: safe.configuration_error
    };
}

function daysToExpiry(expiry, now = new Date()) {
    const raw = text(expiry, 10);
    if (!DATE_PATTERN.test(raw)) return null;
    const date = new Date(`${raw}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return null;
    return Math.ceil((date.getTime() - Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())) / 86400000);
}

function safeNews(items) {
    if (!Array.isArray(items)) return [];
    return items.slice(0, 12).map(item => {
        const rawUrl = text(item && item.url, 500);
        let url = '';
        try {
            const parsed = new URL(rawUrl);
            if (parsed.protocol === 'https:' || parsed.protocol === 'http:') url = parsed.toString();
        } catch (_) { /* external URL is optional */ }
        return {
            headline: text(item && item.headline, 220),
            source: text(item && item.source, 80),
            url,
            published_at: text(item && item.published_at, 40)
        };
    }).filter(item => item.headline);
}

function normalizeQuote(raw, fallbackSymbol) {
    if (!raw || typeof raw !== 'object') return null;
    const last = numberOrNull(raw.last, 0);
    const bid = numberOrNull(raw.bid, 0);
    const ask = numberOrNull(raw.ask, 0);
    if (last === null && bid === null && ask === null) return null;
    return {
        symbol: (() => { try { return normalizeSymbol(raw.symbol || fallbackSymbol); } catch (_) { return fallbackSymbol; } })(),
        last,
        bid,
        ask,
        currency: text(raw.currency || 'USD', 12).toUpperCase(),
        delayed: Boolean(raw.delayed),
        source: text(raw.source, 80)
    };
}

function rankPutCandidates(rawOptions, policy, now = new Date()) {
    const safePolicy = normalizeConfig({ ranking_policy: policy }).ranking_policy;
    if (!Array.isArray(rawOptions)) return [];
    return rawOptions.map((item, index) => {
        const right = text(item && item.right, 2).toUpperCase();
        const strike = numberOrNull(item && item.strike, 0);
        const bid = numberOrNull(item && item.bid, 0);
        const ask = numberOrNull(item && item.ask, 0);
        const underlying = numberOrNull(item && item.underlying_price, 0);
        const dte = daysToExpiry(item && item.expiry, now);
        if (right !== 'P' || strike === null || bid === null || ask === null || ask < bid || underlying === null || dte === null) return null;
        const spreadPct = ask > 0 ? ((ask - bid) / ask) * 100 : null;
        const premiumPct = underlying > 0 ? (ask / underlying) * 100 : null;
        const reasons = [];
        let score = 100;
        if (dte < safePolicy.min_dte || dte > safePolicy.max_dte) {
            score -= 30;
            reasons.push(`prazo ${dte}d fora da faixa ${safePolicy.min_dte}–${safePolicy.max_dte}d`);
        } else reasons.push(`prazo ${dte}d dentro da faixa`);
        if (spreadPct === null || spreadPct > safePolicy.max_spread_pct) {
            score -= 30;
            reasons.push(`spread ${spreadPct === null ? 'indisponível' : `${spreadPct.toFixed(1)}%`} acima do limite`);
        } else reasons.push(`spread ${spreadPct.toFixed(1)}%`);
        if (premiumPct === null || premiumPct > safePolicy.max_premium_pct) {
            score -= 25;
            reasons.push(`prêmio ${premiumPct === null ? 'indisponível' : `${premiumPct.toFixed(1)}%`} do ativo acima do limite`);
        } else reasons.push(`prêmio ${premiumPct.toFixed(1)}% do ativo`);
        const openInterest = numberOrNull(item && item.open_interest, 0);
        if (safePolicy.prefer_open_interest && (openInterest === null || openInterest === 0)) {
            score -= 10;
            reasons.push('open interest ausente ou zero');
        }
        return {
            id: text(item && (item.conid || item.id), 64) || `candidate-${index + 1}`,
            right: 'P',
            strike,
            expiry: text(item && item.expiry, 10),
            bid,
            ask,
            last: numberOrNull(item && item.last, 0),
            underlying_price: underlying,
            dte,
            spread_pct: spreadPct === null ? null : Number(spreadPct.toFixed(3)),
            premium_pct: premiumPct === null ? null : Number(premiumPct.toFixed(3)),
            open_interest: openInterest,
            volume: numberOrNull(item && item.volume, 0),
            score: Math.max(0, Math.round(score)),
            reasons
        };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.ask - b.ask).slice(0, 12);
}

function normalizeIntelligence(raw, symbol, policy, now = new Date()) {
    const source = text(raw && raw.source, 80) || 'Ponte local IBKR';
    return {
        source,
        as_of: text(raw && raw.as_of, 40) || now.toISOString(),
        quote: normalizeQuote(raw && raw.quote, symbol),
        news: safeNews(raw && raw.news),
        option_candidates: rankPutCandidates(raw && raw.options, policy, now)
    };
}

function validatePaperTicket(payload) {
    const body = payload && typeof payload === 'object' ? payload : {};
    if (body.acknowledged_paper !== true) throw new Error('Reconheça que este é somente um rascunho paper local.');
    if (text(body.mode, 20) && text(body.mode, 20) !== 'paper_only') throw new Error('Apenas rascunhos paper são permitidos.');
    const intent = text(body.intent, 32);
    if (!['stock', 'protective_put'].includes(intent)) throw new Error('Tipo de rascunho inválido.');
    const symbol = normalizeSymbol(body.symbol);
    const quantity = numberOrNull(body.quantity, 1, 1000000);
    const limitPrice = numberOrNull(body.limit_price, 0.0001, 10000000);
    if (quantity === null || !Number.isInteger(quantity)) throw new Error('Quantidade deve ser um número inteiro positivo.');
    if (limitPrice === null) throw new Error('Preço limite deve ser positivo.');
    const ticket = {
        intent,
        symbol,
        side: 'BUY',
        quantity,
        limit_price: limitPrice,
        order_type: 'LMT',
        acknowledged_paper: true,
        note: text(body.note, 280)
    };
    if (intent === 'protective_put') {
        const strike = numberOrNull(body.strike, 0.0001, 10000000);
        const expiry = text(body.expiry, 10);
        if (strike === null || !DATE_PATTERN.test(expiry)) throw new Error('Put exige strike positivo e vencimento no formato AAAA-MM-DD.');
        ticket.right = 'P';
        ticket.strike = strike;
        ticket.expiry = expiry;
    }
    return ticket;
}

function createPaperTicket(payload, id, createdAt) {
    const ticket = validatePaperTicket(payload);
    return {
        id: text(id, 80),
        created_at: text(createdAt, 40),
        status: 'draft_local_only',
        execution: 'none',
        requires_user_confirmation: true,
        broker_transmission: false,
        ...ticket
    };
}

module.exports = {
    DEFAULT_CONFIG,
    normalizeSymbol,
    normalizeLoopbackUrl,
    normalizeConfig,
    publicConfig,
    daysToExpiry,
    rankPutCandidates,
    normalizeIntelligence,
    validatePaperTicket,
    createPaperTicket
};
