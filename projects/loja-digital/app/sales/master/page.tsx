"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * MASTER_ORCHESTRATOR - Atomic Premium V3 (SommersStore)
 * 
 * Este arquivo é o protótipo mestre de orquestração atômica.
 * Segue rigorosamente o style_guide_premium.md (Cream & Emerald).
 */
export default function MasterLandingPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Contexto Ingerido pelo Maestro
    const product = {
        name: "Essência Ativa BR",
        niche: "Alquimia Artesanal de Elite",
        promise: "O Código Secreto da Alquimia Terapêutica em Suas Mãos",
        mechanism: "Sinergia Mineral-Botânica de Alta Densidade",
        price: "47,90"
    };

    const pains = [
        "Noites em claro tentando silenciar a mente acelerada.",
        "A sensação de que o cansaço já faz parte de quem você é.",
        "Falta de tempo para rituais que realmente restauram sua alma.",
        "Produtos químicos industriais que prometem alívio, mas causam toxidade."
    ];

    const steps = [
        { title: "O Despertar Mineral", desc: "Ciência e Intencionalidade aplicada à terra." },
        { title: "Sinergias Botânicas", desc: "Blends que hipnotizam os sentidos." },
        { title: "Embalagens de Luxo", desc: "Elevando o seu valor percebido em 4x." },
        { title: "O Negócio de Elite", desc: "Como faturar com produtos artesanais premium." }
    ];

    return (
        <div className="min-h-screen bg-[#fcf9f6] text-[#3e342b] font-sans selection:bg-emerald-100 selection:text-emerald-900">

            {/* ATOMIC_HERO (Vision) */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcf9f6]/80 to-[#fcf9f6]" />
                    <div className="absolute inset-0 bg-[#fcf9f6] opacity-40 mix-blend-overlay" />
                </div>
                
                <div className="relative z-10 container mx-auto px-6 text-center max-w-6xl">
                    <div className="inline-block px-10 py-4 rounded-full bg-white text-emerald-900 text-[10px] font-black mb-12 tracking-[0.6em] uppercase border border-emerald-100 shadow-2xl">
                        Acesso Restrito: Alunas de Elite
                    </div>
                    
                    <h1 className="text-6xl md:text-[120px] font-serif font-black text-[#2d241e] mb-12 leading-[0.9] tracking-tighter drop-shadow-sm">
                        {product.promise.split(' ').map((word, i) => (
                            word === "Alquimia" ? <span key={i} className="text-emerald-800 italic block md:inline underline decoration-emerald-200 underline-offset-[20px]"> {word} </span> : i === product.promise.split(' ').length - 1 ? " " + word : " " + word
                        ))}
                    </h1>

                    <p className="text-xl md:text-3xl text-[#6b5847] mb-20 max-w-4xl mx-auto leading-relaxed font-serif italic">
                        Transforme o banho artesanal em rituais de bem-estar com alto valor percebido e domine o mercado de luxo.
                    </p>

                    <div className="flex flex-col items-center gap-10">
                        <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-20 py-10 rounded-[4rem] bg-[#2d241e] text-[#fcf9f6] font-black text-2xl hover:bg-emerald-900 hover:scale-[1.05] transition-all duration-700 shadow-[0_40px_80px_rgba(45,36,30,0.3)] uppercase tracking-[0.3em]">
                            Quero meu acesso à Alquimia
                        </button>
                        <div className="flex items-center gap-4 text-emerald-800/60 font-black text-[10px] tracking-widest uppercase">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Inscrições Abertas (Lote 01)
                        </div>
                    </div>
                </div>
            </section>

            {/* ATOMIC_PAIN (The Whisper) */}
            <section className="py-40 bg-white border-y border-[#f0ede9]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-32 items-center">
                        <div className="space-y-16">
                            <h2 className="text-5xl md:text-7xl font-serif text-[#2d241e] italic leading-tight">
                                Você sente o peso do mundo <br /> <span className="text-emerald-800 underline decoration-emerald-100 italic">nos seus ombros?</span>
                            </h2>
                            <div className="space-y-12">
                                {pains.map((pain, i) => (
                                    <div key={i} className="flex gap-10 items-start border-l-8 border-emerald-50 pl-12 py-4 hover:border-emerald-200 transition-all duration-500 bg-[#fcf9f6]/40 rounded-r-4xl group">
                                        <span className="text-emerald-300 font-serif text-4xl group-hover:text-emerald-700 transition-colors">“</span>
                                        <span className="text-[#3e342b] text-xl font-medium leading-relaxed font-serif italic">{pain}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-[3/4] rounded-[5rem] overflow-hidden shadow-3xl border-[20px] border-[#fcf9f6] grayscale hover:grayscale-0 transition-all duration-[2000ms]">
                             <Image src="/sales/assets/ChatGPT Image 9 de fev. de 2026, 00_11_56.png" alt="Sussurro da Dor" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ATOMIC_METHOD (Alchemy) */}
            <section className="py-40 bg-[#fcf9f6] relative overflow-hidden">
                <div className="container mx-auto px-6 text-center max-w-5xl relative z-10">
                    <span className="text-emerald-700 font-black tracking-[0.5em] text-[10px] uppercase mb-8 block">A Transmutação Mineral</span>
                    <h3 className="text-5xl md:text-8xl font-serif text-[#2d241e] mb-16 italic tracking-tighter leading-none">A Alquimia dos Banhos.</h3>
                    <p className="text-2xl md:text-3xl text-[#3e342b] leading-[1.8] mb-32 font-serif italic max-w-4xl mx-auto opacity-80">
                        {product.mechanism}: Onde a física dos minerais encontra a sutileza das plantas para criar uma experiência sensorial inesquecível.
                    </p>
                    
                    <div className="grid lg:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="p-16 rounded-[4rem] bg-white border border-[#f0ede9] shadow-2xl hover:-translate-y-4 transition-all duration-700 text-left group">
                                <div className="text-5xl mb-10 opacity-20 group-hover:opacity-100 transition-opacity">🧪</div>
                                <h4 className="text-2xl font-serif text-emerald-800 mb-6 italic font-black">{step.title}</h4>
                                <p className="text-[#6b5847] leading-relaxed font-serif italic text-lg">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ATOMIC_OFFER (The Decision) */}
            <section id="offer" className="py-40 bg-[#2d241e] text-[#fcf9f6]">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <div className="mb-24 space-y-6">
                         <span className="text-emerald-400 font-black tracking-[0.6em] text-[10px] uppercase">O Convite Final</span>
                         <h2 className="text-6xl md:text-[100px] font-serif font-black tracking-tighter italic leading-none">Faça as Pazes <br/> <span className="text-white decoration-emerald-500 underline underline-offset-[20px]">com o Tempo.</span></h2>
                    </div>
                    
                    <div className="bg-white/5 backdrop-blur-3xl rounded-[6rem] p-16 md:p-32 border border-white/10 shadow-4xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10 text-8xl">💎</div>
                        
                        <div className="space-y-12 mb-24">
                            <span className="text-[#a89686] line-through text-4xl italic font-serif opacity-40">De R$ 197,00 por apenas</span>
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-baseline gap-4 group cursor-default">
                                    <span className="text-5xl font-black text-emerald-400">R$</span>
                                    <span className="text-[120px] md:text-[260px] font-serif font-black text-white tracking-tighter leading-none transition-all group-hover:text-emerald-300">{product.price.split(',')[0]}</span>
                                    <div className="text-left font-black">
                                        <div className="text-[60px] md:text-[100px] text-emerald-400 leading-none">,{product.price.split(',')[1]}</div>
                                    </div>
                                </div>
                                <p className="py-6 px-12 rounded-full border border-emerald-500/30 bg-emerald-950 text-emerald-400 font-black tracking-widest text-xs uppercase shadow-xl mt-[-20px]">Pagamento Único • Vitalício</p>
                            </div>
                        </div>

                        <button className="w-full py-12 rounded-full bg-emerald-600 text-white font-black text-3xl hover:bg-emerald-500 hover:scale-[1.05] transition-all shadow-[0_30px_90px_rgba(5,150,105,0.4)] uppercase tracking-[0.3em] leading-none mb-12">
                            Quero Começar Agora
                        </button>
                        
                        <p className="text-sm font-black text-white/40 tracking-[0.4em] uppercase">Garantia Blindada de 7 Dias • Compra 100% Segura</p>
                    </div>
                </div>
            </section>

            {/* ATOMIC_FOOTER */}
            <footer className="py-40 bg-[#fcf9f6] text-center border-t border-[#f0ede9]">
                 <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center gap-12">
                        <div className="text-emerald-900 font-black tracking-[0.8em] text-[10px] uppercase">Sommers Store • Digital Arts</div>
                        <div className="h-px w-20 bg-emerald-200" />
                        <div className="text-[#a89686] text-[9px] font-black uppercase tracking-[1em]">© 2026 Engenharia Atômica SommersStore</div>
                    </div>
                 </div>
            </footer>
        </div>
    );
}

