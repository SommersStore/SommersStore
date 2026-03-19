"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SalesPageVSL() {
    const [showOffer, setShowOffer] = useState(false);
    const [showVideoOverlay, setShowVideoOverlay] = useState(true);

    // Ajuste aqui o tempo em milissegundos que o botão deve demorar para aparecer
    // Ex: 135000 = 2 minutos e 15 segundos (coincidindo com a parte de oferta no roteiro)
    const OBERTURA_DELAY_MS = 135000; 
    
    // Para efeito de teste, vamos deixar um tempo menor ou permitir pular no dev environment
    const TEST_MODE = true; 

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowOffer(true);
        }, OBERTURA_DELAY_MS);

        return () => clearTimeout(timer);
    }, []);

    const pains = [
        "Mente sobrecarregada que não desliga nem ao deitar.",
        "Tensão física que rouba sua energia e disposição.",
        "A sensação de que você cuida de todos, menos de si mesma."
    ];

    const benefits = [
        "Paz interior e redução imediata da ansiedade.",
        "Sua própria linha de produtos terapêuticos super lucrativos.",
        "Mais tempo livre e a chance de faturar em casa."
    ];

    const [currentPart, setCurrentPart] = useState(1);
    const videoPart1 = "/sales/assets/essencia_ativa_parte_1.mp4";
    const videoPart2 = "/sales/assets/essencia_ativa_parte_2.mp4";

    const handleVideoEnd = () => {
        if (currentPart === 1) {
            setCurrentPart(2);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcf9f6] text-[#3e342b] font-sans selection:bg-emerald-100 selection:text-emerald-900">

            {/* HEADER - LOGO OU TEXTO */}
            <header className="py-6 text-center border-b border-[#f0ede9] bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-xl font-serif text-[#2d241e] tracking-widest uppercase font-black">Sommers<span className="text-emerald-800 font-light italic">Store</span></h2>
                </div>
            </header>

            {/* 1. HERO - VSL */}
            <section className="relative pt-16 pb-24 flex flex-col items-center justify-center overflow-hidden">
                <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
                    <div className="inline-block px-6 py-2 rounded-full bg-emerald-50 text-emerald-900 text-[10px] font-black mb-8 tracking-[0.4em] uppercase border border-emerald-100 shadow-sm">
                        Vídeo Revelador: A Ciência do Bem-Estar
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-black text-[#2d241e] mb-12 leading-[1.1] tracking-tighter drop-shadow-sm">
                        O <span className="text-emerald-800 italic underline decoration-emerald-200">Segredo Milenar</span> que remove o peso do dia e abre portas para uma Vida Próspera.
                    </h1>
                    
                    {/* VIDEO CONTAINER */}
                    <div className="w-full max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(16,185,129,0.15)] mb-10 border-[10px] border-white relative aspect-video bg-black flex items-center justify-center group">
                        
                        {!showVideoOverlay ? (
                            <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white/20 font-serif italic">
                                [ Vídeo em reprodução: Alquimia dos Sentidos ]
                            </div>
                        ) : (
                            <>
                                <div className="absolute inset-0 z-0">
                                    <Image src="/sales/assets/sais_banho_hero_premium_light_v3.png" alt="Alquimia dos Sentidos" fill className="object-cover opacity-60" priority />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100" />
                                </div>
                                
                                <button 
                                    onClick={() => setShowVideoOverlay(false)} 
                                    className="relative z-20 w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)] hover:scale-110 hover:bg-emerald-500 transition-all cursor-pointer group-hover:animate-pulse"
                                >
                                    <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2"></div>
                                </button>

                                <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-black tracking-widest uppercase border border-white/10 flex items-center gap-2 z-20">
                                    <span>🔊</span> Clique para ouvir a revelação
                                </div>
                            </>
                        )}
                    </div>

                    <p className="text-[#8a725e] text-sm md:text-base font-serif italic mb-6">
                        Assista aos 2 minutos mais importantes da sua nova jornada. Não feche esta página.
                    </p>

                    {/* Botão de Bypass para Testes (Apenas no ambiente dev) */}
                    {TEST_MODE && !showOffer && (
                         <button onClick={() => setShowOffer(true)} className="text-xs text-slate-300 hover:text-emerald-600 underline mt-4">
                            [Modo Teste] Mostrar Oferta Agora
                         </button>
                    )}
                </div>
            </section>

            {/* CONTEÚDO OCULTO - REVELADO APÓS TEMPO DO VIDEO */}
            <div className={`transition-all duration-[2000ms] ${showOffer ? 'opacity-100 translate-y-0 max-h-[5000px]' : 'opacity-0 translate-y-10 max-h-0 overflow-hidden'}`}>
                
                {/* 2. OFFER / CTA MAIN */}
                <section id="offer" className="py-20 bg-[#fcf9f6] relative">
                    <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
                        <div className="mb-12 text-[#2d241e] font-serif italic text-2xl">
                            Você está a um passo de dominar a técnica que transforma <br className="hidden md:block" /> 
                            simples ingredientes em rituais de puro luxo e cura.
                        </div>
                        <button className="w-full max-w-2xl py-8 rounded-[3rem] bg-emerald-700 text-white font-black text-2xl hover:bg-emerald-600 hover:scale-[1.03] transition-all shadow-[0_30px_70px_rgba(16,185,129,0.3)] uppercase tracking-[0.2em] leading-none mb-10 animate-pulse">
                            SIM! QUERO COMEÇAR A MINHA TRANSFORMAÇÃO
                        </button>
                        <div className="flex items-center justify-center gap-4 text-[#8a725e] text-[10px] font-black uppercase tracking-[0.3em]">
                            <span>✓ Acesso Vitalício</span>
                            <span>•</span>
                            <span>✓ Certificado Incluso</span>
                            <span>•</span>
                            <span>✓ 7 Dias de Garantia Total</span>
                        </div>
                    </div>
                </section>

                {/* 3. MENTOR SHORT BIO */}
                <section className="py-24 bg-white border-y border-[#f0ede9]">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border-4 border-emerald-50">
                                <Image src="/sales/assets/sais_banho_hero_premium_light_v3.png" alt="Mentora Elisa Clark" fill className="object-cover" />
                            </div>
                            <div className="space-y-8 text-left">
                                <h2 className="text-4xl font-serif text-[#2d241e] leading-tight tracking-tight">Uma mentoria desenhada para <span className="text-emerald-800 italic underline decoration-emerald-100 text-3xl">mulheres que buscam o extraordinário.</span></h2>
                                <p className="text-xl text-[#6b5847] leading-relaxed font-serif italic">
                                    "Acredito que cada mulher carrega um poder alquímico. Minha missão é te dar o método para despertar essa força, criando produtos que curam o corpo e prosperam a alma."
                                </p>
                                <div className="p-8 rounded-[2rem] bg-[#fcf9f6] border-l-[8px] border-emerald-700 text-[#2d241e] font-serif italic text-xl shadow-sm">
                                    Prepare-se para deixar de ser apenas uma espectadora e se tornar a protagonista da sua própria cura e liberdade financeira.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="py-12 bg-[#2d241e] text-center text-white/50 text-[10px] tracking-widest uppercase">
                    <div className="container mx-auto px-6">
                        <p className="mb-4">Este site não faz parte do website do Facebook ou do Facebook Inc. Além disso, este site NÃO é endossado pelo Facebook.</p>
                        <p>Sommers Store • Alquimia dos Sentidos • © 2026</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
