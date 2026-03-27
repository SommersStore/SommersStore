"use client";

import React, { useState } from "react";
import Image from "next/image";

// Custom animation for the swipe indicator
const swipeAnimationStyle = `
@keyframes swipeHorizontal {
  0%, 100% { transform: translateX(0); opacity: 0.5; }
  50% { transform: translateX(8px); opacity: 1; }
}
.animate-swipe {
  animation: swipeHorizontal 1.5s ease-in-out infinite;
}
`;

/**
 * VARIante Atômica: ZEN - DARK V3 (Copy Reformulada — Sais de Banho)
 * Mood: Graphite Black, Deep Emerald & Burnished Brass. Copy alinhada ao ebook real.
 */
export default function ZenDarkV3() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [scrolled, setScrolled] = useState({ reality: 0, voices: 0, learn: 0, bonus: 0 });

    const handleScroll = (section: keyof typeof scrolled) => (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
        const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        setScrolled(prev => ({ ...prev, [section]: progress }));
    };

    const product = {
        name: "Essência Ativa BR",
        niche: "Sais de Banho Artesanais & Terapêuticos",
        promise: "O Código Secreto da Alquimia Terapêutica em Suas Mãos",
        mechanism: "Método Passo a Passo: Do Primeiro Blend à Primeira Venda",
        price: "47,90",
        checkoutUrl: "https://pay.hotmart.com/example"
    };

    const pains = [
        "Exausta de uma rotina que não para — e sem tempo pra cuidar de si.",
        "A sensação de que o cansaço já faz parte de quem você é.",
        "Querendo uma renda extra, mas sem saber por onde começar.",
        "Desejando fazer algo com as próprias mãos que traga orgulho e dinheiro.",
        "Cansada de produtos industriais sem alma — e sem saber que existe alternativa."
    ];

    const phases = [
        { title: "Fase 01: Conhecendo os Sais", desc: "Sal Marinho, Himalaia, Epsom e Negro — qual usar, quando usar e por quê.", img: "/sales/assets/1.png" },
        { title: "Fase 02: Óleos Essenciais & Ervas", desc: "Lavanda, alecrim, camomila, eucalipto — como criar blends terapêuticos que encantam.", img: "/sales/assets/2.png" },
        { title: "Fase 03: Embalagem & Valor Percebido", desc: "Rótulos, sachês e apresentação que transformam seu produto artesanal em presente de luxo.", img: "/sales/assets/3.png" },
        { title: "Fase 04: Precificação & Primeiras Vendas", desc: "Como lucrar 200-400% vendendo para amigas, feiras, Instagram e WhatsApp.", img: "/sales/assets/4.png" },
        { title: "Fase 05: Escale Seu Negócio", desc: "De escalda-pés caseiro a kits premium para spas e lojas — cresça no seu ritmo.", img: "/sales/assets/5.png" },
        { title: "Fase 06: Como Fidelizar Seus Primeiros Clientes", desc: "Estratégias de pós-venda, mimos e atendimento que transformam uma compra em um hábito.", img: "/sales/assets/6.png" }
    ];

    const bonuses = [
        { title: "10 Receitas de Blends Prontos para Vender", value: "R$ 197", desc: "Relaxamento, energia, pós-treino, detox e sono — receitas testadas com proporções exatas." },
        { title: "Lista de Fornecedores Brasileiros", value: "R$ 97", desc: "Onde comprar sal marinho, sal do Himalaia, óleos essenciais e ervas com os melhores preços." },
        { title: "Kit de Posts + Script de Vendas WhatsApp", value: "R$ 147", desc: "Textos prontos para Instagram e WhatsApp que convertem curiosas em clientes fiéis." }
    ];

    const testimonials = [
        { name: "Cristiane, 31a", loc: "SÃO PAULO/SP", text: "Comecei com R$ 150 investidos e muita insegurança. Três meses depois, já tinha vendido mais de 200 unidades e conseguido minha primeira renda de R$ 2.800 em um mês. Isso não tem preço!", img: "/sales/assets/Cristiane.jpg" },
        { name: "Patrícia, 26a", loc: "BELO HORIZONTE/MG", text: "Era professora estressada sem tempo. Comecei fazendo para uso próprio. Quando amigas experimentaram e pediram para comprar, percebi que tinha algo nas mãos. Hoje minha renda extra com os sais paga as contas da casa.", img: "/sales/assets/patricia.jpg" },
        { name: "Amanda, 45a", loc: "CURITIBA/PR", text: "Nunca tinha vendido nada e nem tinha Instagram. Segui o método e comecei vendendo para vizinhas. Hoje atendo pela internet e já fiz mais de 500 vendas. O método mudou minha vida e minha relação com o trabalho.", img: "/sales/assets/amanda.jpg" },
        { name: "Carolina, 38a", loc: "RECIFE/PE", text: "Estava desempregada e desesperada. Comecei com R$ 100 emprestados. Dois meses depois, já tinha faturado R$ 1.500. Hoje meus sais são minha principal fonte de renda. Recuperei minha autoestima.", img: "/sales/assets/carolina.jpg" }
    ];

    return (
        <div className="min-h-screen bg-[#0A0D0C] text-[#F5F5DC] font-sans selection:bg-[#043927] selection:text-[#F5F5DC] overflow-x-hidden">
            <style dangerouslySetInnerHTML={{ __html: swipeAnimationStyle }} />

            {/* 1. RESTRICT ACCESS LABEL */}
            <div className="bg-[#0a2a22]/40 border-b border-[#043927] py-4 text-center">
                 <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
                    <span className="text-[#C5A059] font-black tracking-[0.3em] md:tracking-[0.5em] text-[10px] uppercase underline decoration-emerald-500/30 underline-offset-4">Método Essência Ativa BR</span>
                    <span className="text-emerald-50/20 mx-4 hidden md:inline">—</span>
                    <span className="text-emerald-50/40 text-[9px] uppercase tracking-widest font-black">Sais de Banho Terapêuticos</span>
                 </div>
            </div>

            {/* 2. ATOMIC_HERO (Vision Zen Dark) */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051510]/80 to-[#051510]" />
                    <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
                </div>
                
                <div className="relative z-10 container mx-auto px-6 text-center max-w-6xl">
                    <h1 className="text-5xl md:text-[110px] font-serif font-black text-white mb-8 md:mb-12 leading-[0.9] tracking-tighter">
                        {product.promise.split(' ').map((word, i) => (
                            word === "Alquimia" ? <span key={i} className="text-[#C5A059] italic block md:inline underline decoration-emerald-800 underline-offset-[15px]"> {word} </span> : " " + word
                        ))}
                    </h1>

                    <p className="text-xl md:text-2xl text-emerald-50/80 mb-12 md:mb-20 max-w-4xl mx-auto leading-relaxed font-serif italic">
                        Descubra como criar rituais de bem-estar com sais de banho terapêuticos artesanais. Monte seu negócio em casa, com alto valor percebido e construa um império de vendas premium.
                    </p>

                    <div className="relative aspect-video max-w-4xl mx-auto rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-emerald-900/50 shadow-2xl mb-12 md:mb-20 bg-[#0a2a22]/30">
                         <Image src="/sales/assets/zen-dark-hero.png" alt="Hero Asset" fill className="object-cover opacity-80" />
                    </div>

                    <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 md:px-20 py-8 md:py-10 rounded-full bg-[#C5A059] text-white font-black text-xl md:text-2xl hover:bg-emerald-500 hover:scale-[1.05] transition-all duration-700 shadow-[0_20px_60px_rgba(5,150,105,0.4)] uppercase tracking-[0.2em]">
                        QUERO MEU ACESSO AGORA
                    </button>
                </div>
            </section>

            {/* 3. PAIN (The Whisper Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#030d0a] border-y border-emerald-900/20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center text-left">
                        <div className="space-y-8">
                            <h2 className="text-5xl md:text-6xl font-serif font-black text-white italic mb-12 tracking-tighter text-center">
                                Você sente sua energia sendo <br/> <span className="text-[#C5A059] underline decoration-emerald-900 underline-offset-8">drenada pelo caos diário?</span>
                            </h2>
                            <div className="space-y-5">
                                {pains.map((pain, i) => (
                                    <div key={i} className="flex gap-6 items-start border-l-4 border-emerald-900/40 pl-8 py-3 bg-emerald-950/20 rounded-r-3xl group hover:border-emerald-500 transition-all">
                                        <span className="text-[#FF9933] font-serif text-3xl mt-[-5px]">“</span>
                                        <span className="text-emerald-50/80 text-lg md:text-xl font-serif italic leading-relaxed">{pain}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-[3/4] rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-[#043927] shadow-2xl grayscale saturate-50 hover:grayscale-0 transition-all duration-1000">
                             <Image src="/sales/assets/zen-pain-2.png" alt="Pain Visual" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. METHOD (The Secret Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#051510]">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <span className="text-[#C5A059] font-black tracking-[0.5em] text-[10px] uppercase mb-8 block underline decoration-emerald-500/20 underline-offset-8">O Método Essência Ativa BR</span>
                    <h3 className="text-5xl md:text-[80px] font-serif text-white mb-12 italic tracking-tighter leading-none">Sais, Óleos &amp; Ervas.</h3>
                    <p className="text-xl md:text-2xl text-emerald-50/80 leading-relaxed mb-20 md:mb-32 font-serif italic max-w-4xl mx-auto">
                        Você vai aprender a combinar sal marinho, sal do Himalaia, sal de Epsom, óleos essenciais (lavanda, alecrim, eucalipto) e ervas naturais para criar blends terapêuticos que vendem por 3x a 4x o custo de produção.
                    </p>
                    
                    <div className="bg-[#0a2a22]/30 rounded-[3rem] md:rounded-[6rem] px-6 py-10 md:px-24 md:py-16 border border-emerald-900/40 text-center md:text-left relative overflow-hidden group shadow-inner">
                        <div className="relative z-10 max-w-2xl">
                            <h4 className="text-4xl md:text-[40px] font-serif text-[#C5A059] mb-8 italic font-black text-center md:text-left">
                                <span className="md:hidden">Seu Spa Artesanal em Casa. Seu<br/>Negócio nas Suas Mãos.</span>
                                <span className="hidden md:inline">Seu Spa Artesanal em Casa.<br/>Seu Negócio nas Suas Mãos.</span>
                            </h4>
                             <p className="text-lg md:text-xl text-emerald-50/80 leading-relaxed font-serif italic text-center md:text-left">
                                Com apenas 15-20 minutos, você transforma seu banheiro em um spa terapêutico. Sal marinho relaxa músculos, óleos essenciais acalmam a mente, e ervas como camomila e lavanda completam a experiência de cura. E o melhor: cada sachê custa centavos para produzir e vender <span className="whitespace-nowrap">por até 4x mais.</span>
                            </p>
                        </div>
                        {/* Mobile Background: Single Image */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all md:hidden">
                             <Image src="/sales/assets/zen-method-1.png" alt="Alchemy Mobile" fill className="object-cover" />
                        </div>
                        
                        {/* Desktop Background: 50% Width Image */}
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-40 transition-all hidden md:flex border-l border-emerald-900/20">
                             <Image src="/sales/assets/zen-method-1.png" alt="Alchemy 2" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* INTERMEDIATE CTA 1 */}
            <div className="py-12 bg-[#051510] text-center">
                 <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 md:px-16 py-6 md:py-8 rounded-full bg-[#C5A059] text-white font-black text-lg md:text-xl hover:bg-emerald-600 hover:scale-[1.05] transition-all duration-500 shadow-2xl uppercase tracking-[0.2em]">
                     QUERO MEU ACESSO AGORA
                 </button>
            </div>

            {/* 5. REALITY (Timeline Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#030d0a] border-y border-emerald-900/20">
                <div className="container mx-auto px-6 max-w-5xl text-center">

                    <h2 className="text-5xl md:text-8xl font-serif font-black text-white italic mb-8 tracking-tighter leading-tight">Sua vida mudará em apenas 30 dias.</h2>
                    <p className="text-lg md:text-xl text-[#C5A059] font-serif italic mb-16">Imagine sua rotina apenas 30 dias após aplicar o <strong className="text-white not-italic">Método Essência Ativa BR</strong>:</p>
                    
                    <div className="md:hidden flex flex-col items-center gap-4 mb-10">
                        <div className="flex items-center gap-4 text-[#C5A059] font-serif italic text-sm group">
                            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/40"></span>
                            <div className="flex items-center gap-3">
                                <div className="relative w-6 h-6 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#C5A059]/10 rounded-full animate-ping opacity-20"></div>
                                    <svg className="w-5 h-5 animate-[bounce_1.5s_infinite_horizontal] text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                <span className="inline-block py-2 px-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-black tracking-[0.3em] text-[10px] uppercase shadow-sm whitespace-nowrap">Explore a Jornada</span>
                            </div>
                            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/40"></span>
                        </div>
                    </div>

                    <div className="relative group/carousel">
                        {/* Right Fade Indicator Mobile */}
                        <div className="md:hidden absolute right-0 top-0 bottom-12 w-20 bg-gradient-to-l from-[#030d0a] to-transparent z-20 pointer-events-none opacity-100 group-hover/carousel:opacity-40 transition-opacity"></div>
                        
                        <div onScroll={handleScroll('reality')} className="flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-12 no-scrollbar px-6 md:px-0 -mx-6 md:mx-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {[
                            { t: "Seus primeiros 10 blends exclusivos: do relaxamento profundo ao detox mineral.", img: "/sales/assets/reality-blends.png" },
                            { t: "O banheiro transformado em um spa particular de alto padrão para seu autocuidado.", img: "/sales/assets/reality-rituals.png" },
                            { t: "Suas primeiras vendas realizadas com margens de lucro entre 200% e 400%.", img: "/sales/assets/reality-alchemy.png" },
                            { t: "Domínio das embalagens e rótulos de luxo que elevam seu valor percebido.", img: "/sales/assets/reality-collection.png" },
                            { t: "Primeiro catálogo montado e parcerias iniciadas com spas e lojas de bem-estar.", img: "/sales/assets/reality-suppliers.png" }
                        ].map((item, i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center flex flex-col bg-[#051510]/80 backdrop-blur-md p-5 md:p-8 rounded-[2.5rem] border border-white/5 hover:border-[#C5A059]/40 shadow-2xl hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-all duration-500 overflow-hidden group relative">
                                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#043927] border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] font-black text-[10px] shadow-lg group-hover:border-[#C5A059]/60 transition-colors">
                                    0{i + 1}
                                </div>
                                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-8 grayscale saturate-50 group-hover:grayscale-0 transition-all duration-700 border border-white/5">
                                    <Image src={item.img} alt={item.t} fill className="object-cover" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <span className="text-emerald-50/90 font-serif italic text-base md:text-lg leading-snug">{item.t}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>

                    {/* Refined Progress Bar Reality */}
                    <div className="md:hidden w-full max-w-[140px] mx-auto h-[1px] bg-emerald-900/40 rounded-full overflow-hidden mt-6 relative">
                        <div className="h-full bg-gradient-to-r from-[#C5A059]/40 via-[#C5A059] to-[#C5A059]/40 transition-all duration-300 shadow-[0_0_8px_rgba(197,160,89,0.5)]" style={{ width: `${scrolled.reality}%` }} />
                    </div>
                </div>
            </section>

            {/* 6. SOCIAL PROOF (Voices Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#051510]">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-8">
                        <span className="inline-block py-2 px-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-black tracking-[0.3em] text-[10px] uppercase shadow-sm">Vozes da Transformação</span>
                    </div>
                    <h2 className="text-center text-5xl md:text-8xl font-serif font-black text-white italic mb-16 md:mb-24 tracking-tighter leading-tight">Mulheres que começaram <br/> <span className="underline decoration-emerald-900 underline-offset-8">do zero com sais de banho.</span></h2>
                    
                    <div className="md:hidden flex flex-col items-center gap-4 mb-10">
                        <div className="flex items-center gap-4 text-[#C5A059] font-serif italic text-sm">
                            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/40"></span>
                            <div className="flex items-center gap-3">
                                <div className="relative w-6 h-6 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#C5A059]/10 rounded-full animate-ping opacity-20"></div>
                                    <svg className="w-5 h-5 animate-swipe text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                <span className="inline-block py-2 px-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-black tracking-[0.3em] text-[10px] uppercase shadow-sm whitespace-nowrap">Conheça as Vozes</span>
                            </div>
                            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/40"></span>
                        </div>
                    </div>

                    <div className="relative group/carousel-voices">
                        {/* Right Fade Indicator Mobile */}
                        <div className="md:hidden absolute right-0 top-0 bottom-12 w-20 bg-gradient-to-l from-[#051510] to-transparent z-20 pointer-events-none opacity-100 group-hover/carousel-voices:opacity-40 transition-opacity"></div>
                        
                        <div onScroll={handleScroll('voices')} className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-12 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {testimonials.map((t, i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center bg-[#0a2a22]/20 p-8 rounded-[2.5rem] border border-[#043927] relative flex flex-col justify-between hover:bg-emerald-950/40 transition-colors group shadow-2xl">
                                <div className="text-4xl text-emerald-900/20 font-serif absolute top-8 left-8">“</div>
                                <p className="text-base md:text-lg text-emerald-50/80 italic font-serif leading-relaxed mb-8 relative z-10 text-center md:text-left">
                                    &quot;{t.text}&quot;
                                </p>
                                <div className="h-px w-full bg-emerald-900/10 mb-6" />
                                <div className="flex items-center gap-6 justify-center md:justify-start">
                                    <div className="w-24 h-24 rounded-full border-2 border-emerald-800/50 overflow-hidden relative shadow-lg flex-shrink-0">
                                        <Image src={t.img} alt={t.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-white font-black text-xl uppercase tracking-widest">{t.name}</div>
                                        <div className="text-[#FF9933]/60 font-black text-[10px] uppercase tracking-[0.3em]">{t.loc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>

                    {/* Refined Progress Bar Voices */}
                    <div className="md:hidden w-full max-w-[140px] mx-auto h-[1px] bg-emerald-900/40 rounded-full overflow-hidden mt-8 relative">
                        <div className="h-full bg-gradient-to-r from-[#C5A059]/40 via-[#C5A059] to-[#C5A059]/40 transition-all duration-300 shadow-[0_0_8px_rgba(197,160,89,0.5)]" style={{ width: `${scrolled.voices}%` }} />
                    </div>
                </div>
            </section>

            {/* INTERMEDIATE CTA 2 */}
            <div className="py-12 bg-[#051510] text-center">
                 <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 md:px-16 py-6 md:py-8 rounded-full bg-[#C5A059] text-white font-black text-lg md:text-xl hover:bg-emerald-600 hover:scale-[1.05] transition-all duration-500 shadow-2xl uppercase tracking-[0.2em]">
                     QUERO MEU ACESSO AGORA
                 </button>
            </div>

            {/* 7. LEARNING (Curriculum Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#030d0a] border-y border-emerald-900/20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-center text-4xl md:text-6xl font-serif font-black mb-16 md:mb-24 italic text-white">O Que Você Vai Aprender.</h2>
                    <div className="md:hidden flex flex-col items-center gap-4 mb-10">
                        <div className="flex items-center gap-4 text-[#C5A059] font-serif italic text-sm">
                            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/40"></span>
                            <div className="flex items-center gap-3">
                                <div className="relative w-6 h-6 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#C5A059]/10 rounded-full animate-ping opacity-20"></div>
                                    <svg className="w-5 h-5 animate-swipe text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                <span className="inline-block py-2 px-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-black tracking-[0.3em] text-[10px] uppercase shadow-sm whitespace-nowrap">Descubra as Fases</span>
                            </div>
                            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/40"></span>
                        </div>
                    </div>

                    <div className="relative group/carousel-learn">
                        {/* Right Fade Indicator Mobile */}
                        <div className="md:hidden absolute right-0 top-0 bottom-12 w-20 bg-gradient-to-l from-[#030d0a] to-transparent z-20 pointer-events-none opacity-100 group-hover/carousel-learn:opacity-40 transition-opacity"></div>
                        
                        <div onScroll={handleScroll('learn')} className="flex md:grid md:grid-cols-1 lg:grid-cols-2 gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-12 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {phases.map((p, i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center group bg-[#0a2a22]/30 rounded-[3rem] overflow-hidden border border-emerald-900/40 shadow-2xl hover:shadow-emerald-900/20 transition-all duration-700 flex flex-col h-full">
                                <div className="relative h-64 w-full">
                                    <Image src={p.img || `/sales/assets/${i+1}.png`} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                                </div>
                                <div className="p-10 text-left">
                                    <h4 className="text-2xl md:text-3xl font-serif text-[#C5A059] mb-6 italic font-black underline decoration-emerald-800 underline-offset-8 decoration-4">{p.title}</h4>
                                    <p className="text-emerald-50/80 text-xl font-serif italic leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>

                    {/* Refined Progress Bar Learn */}
                    <div className="md:hidden w-full max-w-[140px] mx-auto h-[1px] bg-emerald-900/40 rounded-full overflow-hidden mt-8 relative">
                        <div className="h-full bg-gradient-to-r from-[#C5A059]/40 via-[#C5A059] to-[#C5A059]/40 transition-all duration-300 shadow-[0_0_8px_rgba(197,160,89,0.5)]" style={{ width: `${scrolled.learn}%` }} />
                    </div>
                </div>
            </section>

            {/* 8. BONUSES (Presentes de Elite Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#051510]">
                <div className="container mx-auto px-6 max-w-6xl text-center">
                    <span className="inline-block py-2 px-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-black tracking-[0.3em] text-[10px] uppercase mb-12 shadow-sm">Bônus Inclusos</span>
                    <h2 className="text-4xl md:text-7xl font-serif font-black text-white italic mb-16 md:mb-24 italic tracking-tighter">Tudo Isso Vai Junto.</h2>
                    
                    <div className="md:hidden flex flex-col items-center gap-4 mb-10">
                        <div className="flex items-center gap-4 text-[#C5A059] font-serif italic text-sm">
                            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#C5A059]/40"></span>
                            <div className="flex items-center gap-3">
                                <div className="relative w-6 h-6 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[#C5A059]/10 rounded-full animate-ping opacity-20"></div>
                                    <svg className="w-5 h-5 animate-swipe text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                <span className="inline-block py-2 px-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-black tracking-[0.3em] text-[10px] uppercase shadow-sm whitespace-nowrap">Veja seus Presentes</span>
                            </div>
                            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#C5A059]/40"></span>
                        </div>
                    </div>

                    <div className="relative group/carousel-bonus">
                        {/* Right Fade Indicator Mobile */}
                        <div className="md:hidden absolute right-0 top-0 bottom-12 w-20 bg-gradient-to-l from-[#051510] to-transparent z-20 pointer-events-none opacity-100 group-hover/carousel-bonus:opacity-40 transition-opacity"></div>
                        
                        <div onScroll={handleScroll('bonus')} className="flex md:grid lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-12 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {bonuses.map((b, i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center bg-[#0a2a22]/20 border border-[#043927] rounded-[4rem] overflow-hidden text-left relative group shadow-inner hover:scale-[1.02] transition-all">
                                <div className="relative h-48 w-full bg-emerald-950">
                                    <Image src={`/sales/assets/ChatGPT Image 5 de fev. de 2026, 21_09_${44 + i * 11}.png`} alt={b.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-12">
                                    <h4 className="text-2xl font-serif text-white mb-6 italic leading-tight font-black">{b.title}</h4>
                                    <p className="text-emerald-50/80 font-serif italic mb-8 leading-relaxed">{b.desc}</p>
                                    <div className="pt-8 border-t border-emerald-900/10 flex justify-between items-center group/price">
                                        <span className="py-2 px-6 rounded-full bg-[#FF9933]/10 border border-[#FF9933]/20 text-[#FF9933]/60 text-[9px] font-black uppercase tracking-[0.2em] shadow-inner transition-all group-hover/price:bg-[#FF9933]/20">Valor Original</span>
                                        <span className="text-[#FF9933]/40 font-black text-xl italic line-through decoration-emerald-500/30 group-hover/price:text-[#FF9933]/60 transition-colors uppercase tracking-widest">{b.value}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>

                    {/* Refined Progress Bar Bonus */}
                    <div className="md:hidden w-full max-w-[140px] mx-auto h-[1px] bg-emerald-900/40 rounded-full overflow-hidden mt-8 relative">
                        <div className="h-full bg-gradient-to-r from-[#C5A059]/40 via-[#C5A059] to-[#C5A059]/40 transition-all duration-300 shadow-[0_0_8px_rgba(197,160,89,0.5)]" style={{ width: `${scrolled.bonus}%` }} />
                    </div>
                </div>
            </section>

            {/* 9. ATOMIC_OFFER (The Decision Zen Dark) */}
            <section id="offer" className="py-12 md:py-28 bg-[#030d0a]">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <div className="mb-20 space-y-8">
                         <span className="inline-block py-2 px-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-black tracking-[0.3em] text-[10px] uppercase shadow-sm">Acesso Imediato • 100% Digital</span>
                         <h2 className="text-4xl md:text-[80px] font-serif font-black text-white italic tracking-tighter leading-none">SUA JORNADA <br/> <span className="text-[#C5A059] underline decoration-emerald-100 underline-offset-[10px] md:underline-offset-[20px]">COMEÇA AGORA.</span></h2>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#043927] rounded-[5rem] -rotate-1 scale-105 -z-10 opacity-20" />
                        <div className="bg-[#0a2a22]/40 rounded-[4rem] md:rounded-[6rem] p-10 md:p-16 border-8 border-emerald-950 shadow-4xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5 text-[15rem] text-[#C5A059]">💎</div>
                            
                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                {/* TEXT AND PRICE (LEFT) */}
                                <div className="text-left space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-emerald-50/80 line-through text-2xl italic font-serif opacity-60">De R$ 197,00 por apenas</p>
                                        <div className="flex items-baseline gap-2 group cursor-default">
                                            <span className="text-4xl md:text-5xl font-black text-[#C5A059]">R$</span>
                                            <span className="text-[100px] md:text-[180px] font-serif font-black text-white tracking-tighter leading-none transition-all group-hover:text-[#C5A059]">{product.price.split(',')[0]}</span>
                                            <div className="text-left font-black">
                                                <div className="text-[60px] md:text-[80px] text-[#C5A059] leading-none">,{product.price.split(',')[1]}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-4 px-8 rounded-full bg-[#043927] text-[#C5A059] font-bold tracking-wider text-xs uppercase inline-block text-left border border-emerald-500/20">
                                        PAGAMENTO ÚNICO • SEM MENSALIDADES • 100% DIGITAL
                                    </div>

                                    <div className="space-y-4 pt-8">
                                        {[
                                            { i: "📖", t: "Ebook Completo: Método Essência Ativa BR (144 pág.)" },
                                            { i: "🎁", t: "3 Bônus: Receitas + Fornecedores + Kit Vendas" },
                                            { i: "🛡️", t: "Garantia Incondicional de 7 Dias" },
                                            { i: "🧪", t: "Guia de Blends: Sal Marinho, Himalaia, Epsom & Negro" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4 items-center text-left">
                                                <span className="text-2xl">{item.i}</span>
                                                <span className="text-lg font-serif italic text-emerald-50/80">{item.t}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* IMAGE AND BUTTON (RIGHT) */}
                                <div className="space-y-12 text-center">
                                    <div className="relative aspect-square w-full rounded-full border-8 border-[#0a2a22] shadow-3xl overflow-hidden bg-emerald-950">
                                        <Image src="/sales/assets/v3-product.png" alt="Product" fill className="object-cover opacity-80" />
                                    </div>
                                    <a href={product.checkoutUrl} className="block w-full py-10 rounded-full bg-[#C5A059] text-center text-white font-black text-2xl md:text-3xl hover:bg-emerald-500 hover:scale-[1.05] transition-all shadow-3xl uppercase tracking-[0.2em] leading-none">
                                        QUERO MEU ACESSO AGORA
                                    </a>
                                    <div className="flex justify-center gap-8 opacity-40">
                                         <div className="flex items-center gap-2 text-emerald-100"> <span className="text-xl">🔒</span> <span className="text-[8px] font-black uppercase tracking-widest">Compra Segura</span> </div>
                                         <div className="flex items-center gap-2 text-emerald-100"> <span className="text-xl">🛡️</span> <span className="text-[8px] font-black uppercase tracking-widest">Proteção Total</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. BIO (Mentora Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#051510]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center text-left">
                        <div className="relative aspect-[3/4] rounded-[4rem] md:rounded-[6rem] overflow-hidden border border-[#043927] shadow-2xl grayscale saturate-50 hover:grayscale-0 transition-all duration-1000">
                             <Image src="/sales/assets/zen-light-bio.png" alt="Elisa Clark" fill className="object-cover" />
                        </div>
                        <div className="space-y-12">
                             <div className="mb-8">
                                <span className="inline-block py-2 px-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-black tracking-[0.5em] text-[10px] uppercase shadow-sm">A Criadora</span>
                             </div>
                             <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">Eu te guiarei nesse portal de abundância.</h2>
                             <p className="text-lg md:text-xl text-emerald-50/80 font-serif italic leading-relaxed">
                                Elisa Clark dedicou mais de 5 anos pesquisando haloterapia, aromaterapia e produção artesanal. O <strong className="text-[#C5A059] font-black">Método Essência Ativa BR</strong> é o resultado dessa jornada: um guia prático para você criar sais de banho terapêuticos com ingredientes brasileiros e transformar isso em renda real.
                             </p>
                             <div className="text-[#C5A059] font-serif italic text-3xl font-black">— Elisa Clark</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. GUARANTEE (Seal Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#030d0a] border-y border-emerald-900/20 text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="relative w-48 h-48 mx-auto mb-12 group">
                        <div className="absolute inset-0 bg-[#C5A059]/10 rounded-full blur-3xl group-hover:bg-[#C5A059]/20 transition-all duration-1000" />
                        <Image src="/sales/assets/premium-seal.png" alt="Selo de Garantia Premium" width={200} height={200} className="relative z-10 drop-shadow-[0_20px_50px_rgba(197,160,89,0.3)] group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h2 className="text-4xl font-serif text-white mb-8 italic font-black">Risco Zero. Satisfação Garantida.</h2>
                    <p className="text-lg md:text-xl text-emerald-50/80 font-serif italic mb-12">
                        Se em 7 dias você não se sentir confiante para criar seu primeiro sal de banho terapêutico, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia. O risco é todo nosso.
                    </p>
                </div>
            </section>

            {/* 12. FAQ (Clarity Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#051510]">
                <div className="container mx-auto px-6 max-w-4xl text-left">
                    <h2 className="text-center text-4xl font-serif font-black mb-16 md:mb-24 italic text-white">Dúvidas Frequentes</h2>
                    <div className="space-y-4">
                        {[
                            { q: "O que exatamente vou aprender?", a: "Você vai aprender a criar sais de banho terapêuticos artesanais do zero: escolher sais (marinho, Himalaia, Epsom), combinar óleos essenciais e ervas, embalar com valor percebido alto, precificar e vender com margem de 200-400%." },
                            { q: "Preciso ter experiência com artesanato?", a: "Nenhuma. O método parte do zero absoluto. Você vai fazer seu primeiro blend no Capítulo 1, usando apenas sal, óleos essenciais e uma colher de pau." },
                            { q: "Quanto preciso investir para começar a produzir?", a: "Menos de R$ 200. O ebook inclui uma lista de fornecedores brasileiros com preços acessíveis para sal marinho, sal de Epsom, óleos essenciais e ervas secas." },
                            { q: "Dá mesmo para ganhar dinheiro com sais de banho?", a: "Sim. A margem de lucro é de 200-400%. Um sachê que custa R$ 3-5 para produzir vende por R$ 15-25. Alunas do método relatam faturamento de R$ 1.500 a R$ 2.800/mês começando com investimento mínimo." },
                            { q: "Como recebo o acesso ao Método?", a: "O acesso é imediato! Assim que o seu pagamento for aprovado, você receberá um e-mail com o link para baixar o Ebook Completo e todos os Bônus diretamente no seu celular, tablet ou computador." },
                            { q: "O conteúdo serve para quem quer apenas como hobby?", a: "Com certeza. Além de ser uma fonte de renda lucrativa, o Método foca profundamente nas propriedades terapêuticas dos sais e óleos. Você aprenderá a criar rituais de autocuidado para você e sua família." },
                            { q: "Quais materiais vou precisar logo de início?", a: "Nada complexo. Você precisará de bacias de vidro ou inox, colheres e os ingredientes básicos (sais e óleos essenciais). No ebook, fornecemos a lista exata de tudo o que você precisa com os melhores preços do Brasil." },
                            { q: "O pagamento é 100% seguro?", a: "Sim, utilizamos as plataformas de pagamento mais seguras e renomadas do mercado digital. Seus dados são criptografados e protegidos por protocolos de segurança bancária." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-[#0a2a22]/30 border border-emerald-900/20 rounded-[2.5rem] overflow-hidden shadow-sm">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-2 px-6 md:py-6 md:px-10 flex justify-between items-center text-left hover:bg-emerald-950/40 transition-colors">
                                    <span className="text-lg md:text-xl font-serif italic text-white font-black">{faq.q}</span>
                                    <span className={`text-[#C5A059] transform transition-transform text-2xl ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                                </button>
                                {openFaq === i && (
                                    <div className="p-6 md:p-10 pt-0 text-emerald-50/80 font-serif italic leading-relaxed border-t border-emerald-900/20 mt-[-1px]">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. FOOTER (Zen Dark Branding) */}
            <footer className="py-20 md:py-32 bg-[#030d0a] text-center border-t border-emerald-900/20">
                 <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center gap-6 md:gap-12">
                        <div className="inline-block py-2 px-4 md:px-8 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#E8D8B0] font-black tracking-[0.05em] md:tracking-[0.5rem] text-[7px] md:text-[10px] uppercase font-sans whitespace-nowrap">Sommer&apos;s Store Ltda - Todos os Direitos Reservados.</div>
                        <div className="mt-8 opacity-40">
                             <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-12 text-[9px] md:text-[12px] uppercase tracking-[0.3em] text-[#C5A059] font-black">
                                 <span className="hover:text-white transition-colors cursor-default">Sais</span>
                                 <span className="hover:text-white transition-colors cursor-default">Óleos</span>
                                 <span className="hover:text-white transition-colors cursor-default">Ervas</span>
                                 <span className="hover:text-white transition-colors cursor-default">Flores</span>
                                 <span className="hover:text-white transition-colors cursor-default">Cristais</span>
                                 <span className="hover:text-white transition-colors cursor-default">Alquimia</span>
                                 <span className="hover:text-white transition-colors cursor-default">Bem-Estar</span>
                             </div>
                        </div>
                    </div>
                 </div>
            </footer>
        </div>
    );
}
