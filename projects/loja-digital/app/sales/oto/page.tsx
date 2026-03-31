"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const nightshadeStyles = `
@keyframes pulseGlowGold {
  0%, 100% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.3); }
  50% { box-shadow: 0 0 60px rgba(255, 215, 0, 0.6); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes breathe {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}
@keyframes countPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.animate-pulse-gold {
  animation: pulseGlowGold 3s ease-in-out infinite;
}
.animate-fade-up {
  animation: fadeInUp 1s ease-out forwards;
}
.animate-fade-up-delay-1 {
  animation: fadeInUp 1s ease-out 0.3s forwards;
  opacity: 0;
}
.animate-fade-up-delay-2 {
  animation: fadeInUp 1s ease-out 0.6s forwards;
  opacity: 0;
}
.animate-fade-up-delay-3 {
  animation: fadeInUp 1s ease-out 0.9s forwards;
  opacity: 0;
}
.animate-shimmer {
  background: linear-gradient(90deg, transparent 0%, rgba(197,160,89,0.15) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}
.animate-breathe {
  animation: breathe 4s ease-in-out infinite;
}
.animate-count-pulse {
  animation: countPulse 2s ease-in-out infinite;
}
`;

/**
 * OTO — "O Cofre das Botânicas Secretas"
 * Design: Nightshade Zen Dark — mais escuro, mais misterioso
 * Copy: Tiago Finch (Outlier) — Exclusividade e Pertencimento
 */
export default function OTOPage() {
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
    const [isVisible, setIsVisible] = useState(false);

    // TODO: Substituir pelo link Kiwify real do produto OTO
    const otoCheckoutUrl = "https://pay.kiwify.com.br/kjKBBea"; // PLACEHOLDER — trocar pelo link do OTO

    useEffect(() => {
        setIsVisible(true);
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="min-h-screen bg-[#050508] text-[#F5F5DC] font-sans selection:bg-[#1a0a2e] selection:text-[#F5F5DC] overflow-x-hidden">
            <style dangerouslySetInnerHTML={{ __html: nightshadeStyles }} />

            {/* Fixed SsS Logo */}
            <div className="fixed bottom-6 right-6 z-50 opacity-30 pointer-events-none">
                <Image src="/sales/assets/sss-logo.png" alt="SsS" width={40} height={40} className="drop-shadow-lg" />
            </div>

            {/* ═══════ URGENCY BAR ═══════ */}
            <div className="bg-gradient-to-r from-[#0a0a12] via-[#1a0a1e] to-[#0a0a12] border-b border-[#C5A059]/20 py-3 text-center">
                <div className="flex items-center justify-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-breathe" />
                    <span className="text-[#C5A059] font-black tracking-[0.3em] text-[10px] uppercase">
                        Oferta Exclusiva Pós-Compra
                    </span>
                    <span className="text-[#C5A059]/40">•</span>
                    <div className="flex items-center gap-2 animate-count-pulse">
                        <span className="text-white font-black text-sm tabular-nums">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </span>
                        <span className="text-[#C5A059]/60 text-[9px] font-black uppercase tracking-widest">restantes</span>
                    </div>
                </div>
            </div>

            {/* ═══════ CONFIRMATION BADGE ═══════ */}
            <div className="py-8 text-center animate-fade-up">
                <div className="inline-flex items-center gap-3 py-3 px-8 rounded-full bg-emerald-950/40 border border-emerald-500/30">
                    <span className="text-emerald-400 text-lg">✓</span>
                    <span className="text-emerald-300/90 font-black tracking-[0.2em] text-[11px] uppercase">
                        Seu pedido dos Sais de Banho está confirmado
                    </span>
                </div>
            </div>

            {/* ═══════ HOOK: PARALISAÇÃO IMEDIATA ═══════ */}
            <section className="py-8 md:py-16">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <div className="animate-fade-up-delay-1">
                        <h1 className="text-4xl md:text-[72px] font-serif font-black text-white italic leading-[0.95] tracking-tighter mb-8 md:mb-12">
                            Pare.{' '}
                            <span className="text-[#C5A059] underline decoration-[#1a0a2e] underline-offset-8">
                                Não feche esta página.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-[#F5F5DC]/70 font-serif italic leading-relaxed max-w-3xl mx-auto">
                            O acesso ao seu <strong className="text-white not-italic">Método Essência Ativa BR</strong> chegará
                            no seu e-mail em exatos 3 minutos. Mas antes... eu preciso te revelar algo que a
                            grande maioria <em className="text-[#C5A059]">nunca vai saber que existe.</em>
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════ DIVIDER ═══════ */}
            <div className="flex justify-center py-4">
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
            </div>

            {/* ═══════ THE VAULT (MISTÉRIO) ═══════ */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="animate-fade-up-delay-2">
                        <div className="text-center mb-12">
                            <span className="inline-block py-2 px-8 rounded-full bg-[#C5A059]/5 border border-[#C5A059]/15 text-[#C5A059]/80 font-black tracking-[0.4em] text-[9px] uppercase">
                                Acesso Restrito
                            </span>
                        </div>

                        <div className="bg-[#0a0a14]/60 rounded-[3rem] md:rounded-[5rem] p-8 md:p-16 border border-[#C5A059]/15 relative overflow-hidden">
                            {/* Shimmer overlay */}
                            <div className="absolute inset-0 animate-shimmer rounded-[3rem] md:rounded-[5rem] pointer-events-none" />

                            <div className="relative z-10 space-y-8 text-center md:text-left">
                                <h2 className="text-3xl md:text-5xl font-serif font-black text-white italic leading-tight tracking-tighter">
                                    Nos bastidores dos Spas clínicos da Suíça e nas banheiras da
                                    <span className="text-[#C5A059]"> realeza de Dubai</span>...
                                </h2>

                                <p className="text-lg md:text-xl text-[#F5F5DC]/70 font-serif italic leading-relaxed">
                                    ...eles não usam as misturas que eu ensinei no livro principal.
                                    Eles usam compostos que as próprias clínicas fazem questão de manter
                                    <strong className="text-white not-italic"> escondidos a 7 chaves.</strong>
                                </p>

                                <div className="grid md:grid-cols-3 gap-4 pt-4">
                                    {[
                                        "Mirra do Deserto de alta pureza",
                                        "Sal Negro Vulcânico do Pacífico",
                                        "Óleos que alteram a frequência cerebral"
                                    ].map((item, i) => (
                                        <div key={i} className="bg-[#0d0d18] rounded-2xl p-5 border border-[#C5A059]/10 text-center">
                                            <span className="text-[#C5A059] font-serif italic text-sm md:text-base">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-lg md:text-xl text-[#F5F5DC]/70 font-serif italic leading-relaxed pt-4">
                                    Eu passei os últimos <strong className="text-[#C5A059] not-italic">4 anos</strong> mapeando
                                    e traduzindo essas fórmulas de nicho. E compilei as{' '}
                                    <strong className="text-white not-italic">12 receitas mais poderosas</strong> em um dossiê fechado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ PERTENCIMENTO ═══════ */}
            <section className="py-12 md:py-20 bg-gradient-to-b from-[#050508] via-[#080810] to-[#050508]">
                <div className="container mx-auto px-6 max-w-3xl text-center animate-fade-up-delay-3">
                    <h3 className="text-3xl md:text-5xl font-serif font-black text-white italic mb-8 leading-tight tracking-tighter">
                        Isso <span className="text-[#C5A059] underline decoration-[#1a0a2e] underline-offset-8">não é para todo mundo.</span>
                    </h3>
                    <p className="text-lg md:text-xl text-[#F5F5DC]/70 font-serif italic leading-relaxed mb-8">
                        É exatamente por isso que eu não ofereci isso abertamente na página anterior.
                        Se eu colocasse o <strong className="text-white not-italic">Cofre das Botânicas Secretas</strong> pro
                        público geral, a matéria-prima sumiria e a essência do luxo se perderia.
                    </p>
                    <div className="py-6 px-10 rounded-full bg-[#0a0a14] border border-[#C5A059]/20 inline-block">
                        <span className="text-[#C5A059] font-serif italic text-lg md:text-xl">
                            Mas você já cruzou a linha. <strong className="text-white">Você já mostrou que valoriza a verdadeira sofisticação natural.</strong>
                        </span>
                    </div>
                </div>
            </section>

            {/* ═══════ DOSSIÊ MODULES (Bullets de Fascinância) ═══════ */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <span className="text-[#C5A059] font-black tracking-[0.5em] text-[9px] uppercase">O que está dentro do cofre</span>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                icon: "🔥",
                                title: "O Elixir do Fogo Nubiano",
                                desc: "A mistura exata de raízes e sal negro que supostamente devolve 10 anos de vigor após 20 minutos de imersão."
                            },
                            {
                                icon: "🌙",
                                title: "O Protocolo do Sono Real",
                                desc: "Utilizando a lavanda azul que os czares russos requisitavam para o insônia clínica."
                            },
                            {
                                icon: "🪬",
                                title: "O Purificador de Ambientes Escuros",
                                desc: "Como fumaçar seu sal com resinas específicas para banir energia estagnada e miasmas financeiros de qualquer cômodo."
                            }
                        ].map((module, i) => (
                            <div key={i} className="bg-[#0a0a14]/80 rounded-[2rem] p-8 md:p-10 border border-[#C5A059]/10 hover:border-[#C5A059]/30 transition-all duration-700 group">
                                <div className="flex gap-6 items-start">
                                    <span className="text-3xl md:text-4xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">{module.icon}</span>
                                    <div>
                                        <h4 className="text-xl md:text-2xl font-serif text-[#C5A059] font-black italic mb-3">{module.title}</h4>
                                        <p className="text-[#F5F5DC]/70 font-serif italic leading-relaxed">{module.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <span className="text-[#C5A059]/40 font-serif italic text-sm">+ 9 receitas adicionais dentro do dossiê completo</span>
                    </div>
                </div>
            </section>

            {/* ═══════ OFERTA OTO ═══════ */}
            <section className="py-12 md:py-24">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    {/* Âncora de preço */}
                    <div className="mb-8 space-y-3">
                        <p className="text-[#F5F5DC]/50 font-serif italic text-lg">
                            Uma única sessão nesses Spas custa, em média:
                        </p>
                        <span className="text-[#F5F5DC]/30 font-black text-3xl line-through">R$ 10.000,00</span>
                        <p className="text-[#F5F5DC]/50 font-serif italic text-lg mt-4">
                            Se vendêssemos separadamente:
                        </p>
                        <span className="text-[#F5F5DC]/30 font-black text-2xl line-through">R$ 497,00</span>
                    </div>

                    {/* Preço real */}
                    <div className="bg-[#0a0a14]/80 rounded-[4rem] p-10 md:p-16 border-2 border-[#C5A059]/30 relative overflow-hidden animate-pulse-gold">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />

                        <p className="text-[#C5A059] font-black tracking-[0.3em] text-[10px] uppercase mb-6">
                            Somente nesta página • Oferta de boas-vindas
                        </p>

                        <div className="flex items-baseline justify-center gap-2 mb-4">
                            <span className="text-3xl md:text-4xl font-black text-[#C5A059]">R$</span>
                            <span className="text-[80px] md:text-[140px] font-serif font-black text-white tracking-tighter leading-none">97</span>
                        </div>

                        <p className="text-[#F5F5DC]/60 font-serif italic text-sm mb-10">
                            Pagamento único • Acesso vitalício ao dossiê completo
                        </p>

                        {/* CTA Principal */}
                        <a
                            href={otoCheckoutUrl}
                            className="block w-full max-w-lg mx-auto py-8 md:py-10 rounded-full bg-[#C5A059] text-center text-white font-black text-xl md:text-2xl border-4 border-[#FFD700] hover:bg-[#D4AF37] hover:scale-[1.03] transition-all duration-500 shadow-[0_0_50px_rgba(255,215,0,0.3)] hover:shadow-[0_0_80px_rgba(255,215,0,0.5)] uppercase tracking-[0.15em] leading-none mb-6"
                        >
                            SIM, ADICIONAR O DOSSIÊ
                        </a>

                        {/* Trust badges */}
                        <div className="flex justify-center gap-8 opacity-40 mb-8">
                            <div className="flex items-center gap-2 text-[#F5F5DC]">
                                <span className="text-lg">🔒</span>
                                <span className="text-[8px] font-black uppercase tracking-widest">Compra Segura</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#F5F5DC]">
                                <span className="text-lg">🛡️</span>
                                <span className="text-[8px] font-black uppercase tracking-widest">Proteção Total</span>
                            </div>
                        </div>

                        {/* Timer reminder */}
                        <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-full bg-[#1a0a1e]/60 border border-[#C5A059]/10 inline-flex">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[#F5F5DC]/60 text-[11px] font-black uppercase tracking-widest">
                                Esta oferta expira em {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                            </span>
                        </div>
                    </div>

                    {/* Decline link */}
                    <div className="mt-10">
                        <a
                            href="/"
                            className="text-[#F5F5DC]/20 text-[11px] font-serif italic hover:text-[#F5F5DC]/40 transition-colors underline underline-offset-4"
                        >
                            Não, obrigada. Prefiro apenas o básico e recusar o acesso ao Cofre das Botânicas Secretas.
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══════ FOOTER ═══════ */}
            <footer className="py-16 bg-[#050508] text-center border-t border-[#C5A059]/5">
                <div className="container mx-auto px-6">
                    <div className="inline-block py-2 px-8 rounded-full bg-[#C5A059]/5 border border-[#C5A059]/10 text-[#F5F5DC]/30 font-black tracking-[0.3em] text-[8px] uppercase">
                        Sommer&apos;s Store Ltda — Todos os Direitos Reservados
                    </div>
                </div>
            </footer>
        </div>
    );
}
