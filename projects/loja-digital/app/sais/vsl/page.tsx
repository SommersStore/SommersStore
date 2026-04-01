"use client";

import React, { useState, useEffect } from "react";

export default function VSLPage() {
    const [showCTA, setShowCTA] = useState(false);

    // CTA appearing after 10 seconds (for demo, usually longer in real VSL)
    useEffect(() => {
        const timer = setTimeout(() => setShowCTA(true), 10000);
        return () => clearTimeout(timer);
    }, []);

    const product = {
        name: "Essência Ativa BR",
        price: "47,90",
        checkoutUrl: "https://pay.kiwify.com.br/kjKBBea"
    };

    return (
        <div className="min-h-screen bg-[#0A0D0C] text-[#F5F5DC] font-sans selection:bg-[#043927] selection:text-[#F5F5DC] overflow-x-hidden">
            {/* Header / Logo */}
            <header className="py-8 px-6 text-center border-b border-[#C5A059]/10">
                <div className="text-[10px] uppercase font-black tracking-[1.2rem] text-[#C5A059]/60">Sommers Store</div>
            </header>

            <main className="container mx-auto px-6 py-12 md:py-24 max-w-5xl">
                {/* Headline Section */}
                <div className="text-center mb-12 md:mb-20">
                    <span className="inline-block py-2 px-6 rounded-full bg-[#C5A059]/10 text-[#C5A059] font-black tracking-[0.3em] text-[10px] uppercase border border-[#C5A059]/20 mb-6 focus-visible:outline-none">
                        Treinamento Exclusivo Liberado
                    </span>
                    <h1 className="text-4xl md:text-7xl font-serif font-black italic text-white leading-tight tracking-tighter mb-8">
                        Assista ao vídeo abaixo para descobrir <br /> 
                        <span className="text-[#C5A059] underline decoration-[#FFD700] underline-offset-8">o segredo da Alquimia Terapêutica.</span>
                    </h1>
                </div>

                {/* VSL Video Container */}
                <div className="relative aspect-video w-full rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-[#C5A059]/30 shadow-[0_0_50px_rgba(197,160,89,0.15)] bg-black/40 group">
                    {/* Placeholder Video Player (YouTube Embed with Placeholder ID) */}
                    <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0&modestbranding=1" 
                        title="VSL - Vídeo de Vendas"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                    
                    {/* Overlay Tip */}
                    <div className="absolute top-6 left-6 text-[8px] font-black uppercase tracking-widest text-[#C5A059]/40">
                        HD Streaming • Secure Connection
                    </div>
                </div>

                {/* Status / Watching Info */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 text-[10px] font-bold uppercase tracking-widest px-4">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                        <span>1,248 Pessoas assistindo agora</span>
                    </div>
                    <div className="text-center md:text-right">
                        <span>Aumente o som. O vídeo já começou.</span>
                    </div>
                </div>

                {/* Dynamic CTA Section */}
                <div className={`mt-20 md:mt-32 transition-all duration-1000 transform ${showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                    <div className="bg-[#0A2A22]/30 p-10 md:p-20 rounded-[3rem] md:rounded-[6rem] border border-[#C5A059]/20 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent"></div>
                        
                        <h2 className="text-3xl md:text-5xl font-serif font-black italic text-white mb-10 leading-tight">
                            Transforme seu Autocuidado <br /> em Bem-Estar e Renda !
                        </h2>

                        <a 
                            href={product.checkoutUrl}
                            className="inline-block px-12 md:px-20 py-8 md:py-10 rounded-full bg-[#C5A059] text-white font-black text-xl md:text-2xl border-4 border-[#FFD700] hover:bg-[#D4AF37] hover:scale-[1.05] transition-all duration-700 shadow-[0_0_50px_rgba(255,215,0,0.3)] hover:shadow-[0_0_70_rgba(255,215,0,0.5)] uppercase tracking-[0.2em] relative overflow-hidden group mb-8"
                        >
                            <span className="relative z-10">COMPRAR AGORA • R$ {product.price}</span>
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </a>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 opacity-40 text-[9px] font-black uppercase tracking-widest mt-8">
                             <div className="flex items-center gap-2"> <span>🔒</span> <span>Compra 100% Segura</span> </div>
                             <div className="flex items-center gap-2"> <span>🛡️</span> <span>Garantia de 7 Dias</span> </div>
                             <div className="flex items-center gap-2"> <span>📩</span> <span>Acesso Imediato por E-mail</span> </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-20 text-center border-t border-[#C5A059]/10 opacity-30">
                <div className="text-[9px] font-black uppercase tracking-[0.5em]">© 2026 Engenharia Atômica SommersStore</div>
            </footer>
        </div>
    );
}
