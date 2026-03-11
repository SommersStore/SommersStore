"use client";

import React from "react";
import Image from "next/image";

export default function SalesPageEnhanced() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            {/* Premium Header/Hero */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[150px]" />

                <div className="absolute inset-0 z-0">
                    <Image
                        src="/sales/assets/ChatGPT Image 5 de fev. de 2026, 22_43_39.png"
                        alt="Essência Ativa"
                        fill
                        className="object-cover opacity-30 mix-blend-overlay scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-[#0f172a]" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 tracking-widest uppercase">
                        Transformação com Propósito
                    </span>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tight leading-[1.1]">
                        Transforme <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">Autocuidado</span> em <br className="hidden md:block" /> Liberdade Financeira
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Domine a arte dos sais terapêuticos premium e construa um negócio que fatura de <strong>R$ 800 a R$ 2.800 por mês</strong> sem precisar sair de casa.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="px-10 py-5 rounded-2xl bg-emerald-500 text-[#0f172a] font-bold text-lg hover:bg-emerald-400 hover:-translate-y-1 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                            QUERO MEU ACESSO AGORA
                        </button>
                        <p className="flex items-center justify-center text-slate-500 text-sm gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            Oferta limitada por tempo especial
                        </p>
                    </div>
                </div>
            </section>

            {/* Pain Point Section (Glassmorphism) */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                        <Image
                            src="/sales/assets/ChatGPT Image 9 de fev. de 2026, 00_11_56.png"
                            alt="Stress relief"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-emerald-500/20 mix-blend-color" />
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-serif text-white">Você não precisa de um SPA de luxo. <span className="text-slate-500">Você precisa de um ritual.</span></h2>
                        <p className="text-xl text-slate-400 leading-relaxed">
                            O estresse acumulado rouba sua energia, seu sono e sua criatividade.
                            Muitas pessoas gastam fortunas em tratamentos paliativos, quando a solução está na <strong>alquimia básica da natureza</strong>.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <span className="text-emerald-400 text-2xl font-bold">20 min</span>
                                <p className="text-xs text-slate-500 uppercase tracking-tighter mt-1">Tempo de Transformação</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                <span className="text-indigo-400 text-2xl font-bold">100%</span>
                                <p className="text-xs text-slate-500 uppercase tracking-tighter mt-1">Natural e Terapêutico</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Offer Section */}
            <section className="py-24 bg-slate-900/50">
                <div className="container mx-auto px-6 text-center mb-16">
                    <h2 className="text-4xl font-serif text-white mb-4">O que você vai dominar no Método</h2>
                    <p className="text-slate-400">O guia completo para sair da curiosidade e chegar no lucro.</p>
                </div>
                <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Ingredientes que Curam", emoji: "🌿", desc: "A ciência por trás dos sais e as propriedades medicinais de cada mineral." },
                        { title: "Aroma e Alma", emoji: "🧘‍♀️", desc: "Sinestesia e aromaterapia para influenciar emoções e estados físicos." },
                        { title: "Produção de Luxo", emoji: "✨", desc: "Do preparo artesanal à embalagem de alto valor percebido." },
                        { title: "Escala e Venda", emoji: "💰", desc: "Como precificar, fotografar e vender seus primeiros kits." },
                    ].map((item, i) => (
                        <div key={i} className="group p-8 rounded-3xl bg-[#1e293b]/50 border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-[#1e293b]">
                            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                                {item.emoji}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials / Social Proof */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Maria", story: "Vendi todo o estoque em apenas 2 dias.", img: "/sales/assets/ChatGPT Image 7 de fev. de 2026, 13_31_53.png" },
                            { name: "Juliana", story: "R$ 2.800,00 de renda extra em um único mês.", img: "/sales/assets/ChatGPT Image 6 de fev. de 2026, 01_21_50.png" },
                            { name: "Carolina", story: "Meus sais são minha principal fonte de renda hoje.", img: "/sales/assets/ChatGPT Image 9 de fev. de 2026, 01_30_25.png" }
                        ].map((t, i) => (
                            <div key={i} className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900 to-slate-950 relative">
                                <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-emerald-500/20">
                                    <Image src={t.img} alt={t.name} width={80} height={80} className="object-cover" />
                                </div>
                                <p className="text-slate-300 italic mb-4">"{t.story}"</p>
                                <div className="text-emerald-400 font-bold">{t.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing / Final CTA */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-emerald-500/5 -skew-y-3" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-2xl mx-auto rounded-[3rem] bg-white text-[#0f172a] p-12 shadow-2xl relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 p-8 opacity-10 blur-[2px]">
                            <Image src="/sales/assets/Design sem nome (24).png" alt="Stamp" width={100} height={100} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Acesso Vitalício ao Método</h3>
                        <p className="text-slate-500 mb-8">Inclui todos os bônus e atualizações.</p>

                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="text-slate-400 line-through text-2xl">R$ 197</span>
                            <span className="text-6xl font-serif font-black text-emerald-600">R$ 47</span>
                        </div>

                        <button className="w-full py-6 rounded-2xl bg-[#0f172a] text-white font-bold text-xl hover:bg-slate-800 hover:scale-[1.02] transition-all shadow-xl">
                            ADQUIRIR AGORA COM DESCONTO
                        </button>
                        <p className="mt-6 text-sm text-slate-400 flex items-center justify-center gap-2">
                            🛡️ Garantia incondicional de 7 dias
                        </p>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-sm">
                <p>© 2026 Sommers Store • Método Essência Ativa BR</p>
                <p className="mt-2 tracking-widest opacity-50 uppercase text-[10px]">Desenvolvido com Antigravity AIOX</p>
            </footer>
        </div>
    );
}
