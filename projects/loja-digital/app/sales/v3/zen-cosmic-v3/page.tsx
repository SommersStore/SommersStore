"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * VARIante Atômica: ZEN - COSMIC V3 (Cosmic Purple Edition)
 * Deep Space, Cosmic Purple, Hot Pink & Solar Orange. Copy Reformulada.
 */
export default function ZenCosmicV3() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [scrolled, setScrolled] = useState<Record<string, number>>({});

    const handleScroll = (section: string) => (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const progress = (target.scrollLeft / (target.scrollWidth - target.clientWidth)) * 100;
        setScrolled(prev => ({ ...prev, [section]: progress }));
    };

    const swipeAnimationStyle = `
        @keyframes swipeHorizontal {
            0% { transform: translateX(0); opacity: 0; }
            50% { transform: translateX(10px); opacity: 1; }
            100% { transform: translateX(20px); opacity: 0; }
        }
        .animate-swipe {
            animation: swipeHorizontal 2s infinite ease-in-out;
        }
    `;

    const product = {
        name: "Essência Ativa BR",
        niche: "Sais de Banho Artesanais & Terapêuticos",
        promise: "O Código Secreto da Alquimia Terapêutica em Suas Mãos",
        mechanism: "Método Passo a Passo: Do Primeiro Blend à Primeira Venda",
        price: "47,90"
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
        <div className="min-h-screen bg-[#08081A] text-[#F1F0FF] font-sans selection:bg-[#8B5CF6] selection:text-white overflow-x-hidden">
            <style>{swipeAnimationStyle}</style>

            {/* 1. RESTRICT ACCESS LABEL */}
            <div className="bg-[#1A1040]/40 border-b border-[#2D1B69] py-4 text-center">
                 <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
                    <span className="text-[#EC4899] font-black tracking-[0.3em] md:tracking-[0.5em] text-[10px] uppercase underline decoration-purple-500/30 underline-offset-4">Método Essência Ativa BR</span>
                    <span className="text-purple-50/20 mx-4 hidden md:inline">—</span>
                    <span className="text-purple-50/40 text-[9px] uppercase tracking-widest font-black">Sais de Banho Terapêuticos</span>
                 </div>
            </div>

            {/* 2. ATOMIC_HERO (Vision Zen Dark) */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0E0E2A]/80 to-[#0E0E2A]" />
                    <div className="absolute inset-0 bg-purple-950/20 mix-blend-multiply" />
                </div>
                
                <div className="relative z-10 container mx-auto px-6 text-center max-w-6xl">
                    <h1 className="text-5xl md:text-[110px] font-serif font-black text-white mb-8 md:mb-12 leading-[0.9] tracking-tighter">
                        {product.promise.split(' ').map((word, i) => (
                            word === "Alquimia" ? <span key={i} className="text-[#EC4899] italic block md:inline underline decoration-purple-800 underline-offset-[15px]"> {word} </span> : " " + word
                        ))}
                    </h1>

                    <p className="text-xl md:text-2xl text-purple-50/80 mb-12 md:mb-20 max-w-4xl mx-auto leading-relaxed font-serif italic">
                        Descubra como criar rituais de bem-estar com sais de banho terapêuticos artesanais. Monte seu negócio em casa, com alto valor percebido e construa um império de vendas premium.
                    </p>

                    <div className="relative aspect-video max-w-4xl mx-auto rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-purple-900/50 shadow-2xl mb-12 md:mb-20 bg-[#1A1040]/30">
                         <Image src="/sales/assets/zen-dark-hero.png" alt="Hero Asset" fill className="object-cover opacity-80" />
                    </div>

                    <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 md:px-20 py-8 md:py-10 rounded-full bg-[#EC4899] text-white font-black text-xl md:text-2xl hover:bg-orange-500 hover:scale-[1.05] transition-all duration-700 shadow-[0_20px_60px_rgba(139,92,246,0.4)] uppercase tracking-[0.2em]">
                        Quero aprender o método agora
                    </button>
                </div>
            </section>

            {/* 3. PAIN (The Whisper Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#0A0A20] border-y border-purple-900/20">
                <div className="container mx-auto px-6 max-w-6xl text-center">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center text-left">
                        <div className="space-y-6 md:space-y-12">
                             <div className="flex md:hidden justify-center mb-8">
                                <span className="py-2 px-6 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] text-[10px] uppercase font-black tracking-widest flex items-center gap-2 whitespace-nowrap">
                                    A Jornada Começa Aqui
                                    <span className="w-4 h-[1px] bg-[#EC4899]/40"></span>
                                </span>
                             </div>

                             <h2 className="text-4xl md:text-[64px] font-serif font-black text-white italic mb-12 md:mb-16 leading-[1.1] tracking-tighter">
                                Você sente sua energia sendo <br className="hidden md:block"/> <span className="text-[#EC4899] underline decoration-purple-900 underline-offset-8">drenada pelo caos diário?</span>
                            </h2>
                            <div className="space-y-5 md:space-y-8">
                                {pains.map((pain, i) => (
                                    <div key={i} className="flex gap-6 items-start border-l-4 border-purple-900/40 pl-8 py-4 bg-purple-950/20 rounded-r-3xl group hover:border-pink-400 transition-all">
                                        <span className="text-[#EC4899] font-serif text-3xl mt-[-5px]">“</span>
                                        <p className="text-purple-50/80 font-serif italic text-lg leading-relaxed">{pain}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-[3/4] rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-purple-900/20 shadow-2xl grayscale saturate-50 hover:grayscale-0 transition-all duration-1000">
                             <Image src="/sales/assets/zen-pain-2.png" alt="Pain Visual" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. METHODOLOGY (Zen Atomic V3) */}
            <section id="method" className="py-20 md:py-32 bg-[#08081A] relative overflow-hidden text-center md:text-left">
                 <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="flex md:hidden justify-center mb-12">
                        <span className="py-2 px-6 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] text-[10px] uppercase font-black tracking-widest flex items-center gap-2 whitespace-nowrap">
                            Explore a Jornada
                            <span className="text-[#EC4899] animate-swipe">→</span>
                        </span>
                    </div>

                    <div onScroll={handleScroll('phases')} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 md:grid md:grid-cols-3 md:gap-12 pb-12 md:pb-0">
                         {phases.map((phase, i) => (
                             <div key={i} className="min-w-[85vw] md:min-w-0 snap-center group relative p-10 md:p-12 rounded-[2.5rem] md:rounded-[4rem] bg-purple-950/20 border border-purple-900/20 hover:border-purple-800/40 transition-all duration-700">
                                 <div className="w-16 h-16 rounded-2xl bg-[#EC4899] text-white flex items-center justify-center text-2xl font-black mb-8 group-hover:scale-110 transition-transform shadow-[0_10px_30px_rgba(236,72,153,0.3)]">0{i+1}</div>
                                 <h3 className="text-2xl md:text-3xl font-serif font-black text-white mb-6 uppercase tracking-tighter italic">{phase.title}</h3>
                                 <p className="text-purple-50/70 text-lg leading-relaxed">{phase.desc}</p>
                             </div>
                         ))}
                    </div>

                    <div className="mt-8 md:hidden">
                        <div className="w-full h-[1px] bg-purple-900/20 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#EC4899] transition-all duration-300"
                                style={{ width: `${scrolled.phases || 0}%` }}
                            />
                        </div>
                    </div>

                    {/* METHOD DETAIL BOX */}
                    <div className="mt-20 md:mt-32">
                        <div className="bg-[#1A1040]/30 rounded-[3rem] md:rounded-[6rem] px-6 py-10 md:px-24 md:py-16 border border-purple-900/40 text-center md:text-left relative overflow-hidden group shadow-inner">
                            <div className="relative z-10 max-w-2xl">
                                <h4 className="text-4xl md:text-[40px] font-serif text-[#EC4899] mb-8 italic font-black text-center md:text-left">
                                    <span className="md:hidden">Seu Spa Artesanal em Casa. Seu<br/>Negócio nas Suas Mãos.</span>
                                    <span className="hidden md:inline">Seu Spa Artesanal em Casa.<br/>Seu Negócio nas Suas Mãos.</span>
                                </h4>
                                 <p className="text-lg md:text-xl text-purple-50/80 leading-relaxed font-serif italic text-center md:text-left">
                                    Com apenas 15-20 minutos, você transforma seu banheiro em um spa terapêutico. Sal marinho relaxa músculos, óleos essenciais acalmam a mente, e ervas como camomila e lavanda completam a experiência de cura. E o melhor: cada sachê custa centavos para produzir e vender <span className="whitespace-nowrap">por até 4x mais.</span>
                                </p>
                            </div>
                            {/* Mobile Background: Single Image */}
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all md:hidden">
                                 <Image src="/sales/assets/zen-method-1.png" alt="Alchemy Mobile" fill className="object-cover" />
                            </div>
                            
                            {/* Desktop Background: 2-Image Split */}
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-50 transition-all hidden md:flex">
                                 <div className="relative w-1/2 h-full bg-purple-950/20"> </div>
                                 <div className="relative w-1/2 h-full border-l border-purple-900/20"> <Image src="/sales/assets/zen-method-1.png" alt="Alchemy 2" fill className="object-cover" /> </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </section>

            {/* 5. REALITY (Timeline Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#0A0A20] border-y border-purple-900/20">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <h2 className="text-5xl md:text-8xl font-serif font-black text-white italic mb-8 tracking-tighter leading-tight">Sua vida mudará em apenas 30 dias.</h2>
                    <p className="text-lg md:text-xl text-[#EC4899] font-serif italic mb-16">Imagine sua rotina apenas 30 dias após aplicar o <strong className="text-white not-italic">Método Essência Ativa BR</strong>:</p>
                    
                    <div className="md:hidden flex flex-col items-center gap-4 mb-10">
                        <span className="py-2 px-6 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] text-[10px] uppercase font-black tracking-widest flex items-center gap-2 whitespace-nowrap">
                            Explore o Futuro
                            <span className="text-[#EC4899] animate-swipe">→</span>
                        </span>
                    </div>

                    <div onScroll={handleScroll('reality')} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 md:grid md:grid-cols-2 md:gap-12 pb-12 md:pb-0">
                        {[
                            { t: "Seus primeiros 10 blends exclusivos: do relaxamento profundo ao detox mineral.", img: "/sales/assets/reality-blends.png" },
                            { t: "O banheiro transformado em um spa particular de alto padrão para seu autocuidado.", img: "/sales/assets/reality-rituals.png" },
                            { t: "Suas primeiras vendas realizadas com margens de lucro entre 200% e 400%.", img: "/sales/assets/reality-alchemy.png" },
                            { t: "Domínio das embalagens e rótulos de luxo que elevam seu valor percebido.", img: "/sales/assets/reality-collection.png" }
                        ].map((item, i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center group bg-[#08081A]/40 p-8 rounded-[2.5rem] border border-purple-900/10 hover:border-purple-800/30 transition-all duration-700 shadow-xl overflow-hidden">
                                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 grayscale saturate-50 group-hover:grayscale-0 transition-all duration-700">
                                    <Image src={item.img} alt={item.t} fill className="object-cover" />
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-8 h-8 rounded-full bg-purple-900/40 flex items-center justify-center text-[#EC4899] text-xs font-black flex-shrink-0">✓</div>
                                    <span className="text-purple-50/80 font-serif italic text-lg leading-tight text-left">{item.t}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="md:hidden mt-8">
                        <div className="w-full h-[1px] bg-purple-900/20 rounded-full overflow-hidden">
                            <div className="h-full bg-[#EC4899] transition-all duration-300" style={{ width: `${scrolled.reality || 0}%` }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. SOCIAL PROOF (Voices Zen Dark) */}
            <section className="py-20 md:py-32 bg-[#1A1040]/30">
                <div className="container mx-auto px-6 max-w-6xl text-center md:text-left">
                    <div className="flex md:hidden justify-center mb-12">
                        <span className="py-2 px-6 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] text-[10px] uppercase font-black tracking-widest flex items-center gap-2 whitespace-nowrap">
                            Conheça as Vozes
                            <span className="text-[#EC4899] animate-swipe">→</span>
                        </span>
                    </div>

                    <div onScroll={handleScroll('voices')} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 md:grid md:grid-cols-2 md:gap-12 pb-12 md:pb-0">
                        {testimonials.map((t, i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center group p-10 md:p-16 rounded-[3rem] md:rounded-[5rem] bg-[#0E0E2A]/40 border border-purple-900/10 hover:border-purple-800/30 transition-all duration-700 shadow-xl flex flex-col items-center md:items-start">
                                <div className="relative w-24 h-24 mb-10 rounded-full overflow-hidden border-2 border-[#EC4899]/30 group-hover:scale-110 transition-all duration-700 p-1 bg-[#0E0E2A]">
                                     <Image src={t.img} alt={t.name} fill className="object-cover rounded-full" />
                                </div>
                                <p className="text-2xl md:text-3xl font-serif italic text-purple-50/90 leading-relaxed mb-10 text-center md:text-left font-black">&quot;{t.text}&quot;</p>
                                <div>
                                    <h4 className="text-[#EC4899] font-black text-sm uppercase tracking-[0.2em]">{t.name}</h4>
                                    <p className="text-purple-100/30 text-[10px] uppercase tracking-widest mt-2">{t.loc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 md:hidden">
                        <div className="w-full h-[1px] bg-purple-900/20 rounded-full overflow-hidden">
                            <div className="h-full bg-[#EC4899] transition-all duration-300" style={{ width: `${scrolled.voices || 0}%` }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. LEARNING (Curriculum Zen Dark) */}
            <section className="py-20 md:py-32 bg-[#0A0A20] border-y border-purple-900/20">
                <div className="container mx-auto px-6 max-w-5xl text-center md:text-left">
                    <h2 className="text-center text-4xl md:text-6xl font-serif font-black mb-16 md:mb-24 italic text-white uppercase tracking-tighter">O Que Você Vai Aprender.</h2>
                    
                    <div className="flex md:hidden justify-center mb-12">
                        <span className="py-2 px-6 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] text-[10px] uppercase font-black tracking-widest flex items-center gap-2 whitespace-nowrap">
                            Descubra as Fases
                            <span className="text-[#EC4899] animate-swipe">→</span>
                        </span>
                    </div>

                    <div onScroll={handleScroll('learn')} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-8 md:grid md:grid-cols-2 pb-12 md:pb-0">
                        {phases.map((p, i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center group bg-[#0E0E2A]/30 rounded-[3rem] overflow-hidden border border-purple-900/40 shadow-2xl hover:shadow-purple-900/20 transition-all duration-700 flex flex-col h-full">
                                <div className="relative h-64 w-full">
                                    <Image src={p.img || `/sales/assets/${i+1}.png`} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                                </div>
                                <div className="p-10 text-left">
                                    <h4 className="text-2xl md:text-3xl font-serif text-[#EC4899] mb-6 italic font-black underline decoration-purple-800 underline-offset-8 decoration-4">{p.title}</h4>
                                    <p className="text-purple-50/80 text-xl font-serif italic leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 md:hidden">
                        <div className="w-full h-[1px] bg-purple-900/20 rounded-full overflow-hidden">
                            <div className="h-full bg-[#EC4899] transition-all duration-300" style={{ width: `${scrolled.learn || 0}%` }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. BONUSES (The High Value Zen Dark) */}
            <section className="py-20 md:py-32 bg-[#08081A] border-t border-purple-900/10 text-center md:text-left">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
                        <div>
                             <h2 className="text-4xl md:text-6xl font-serif font-black text-white italic mb-6 tracking-tighter">Prepare-se para o <span className="text-[#EC4899]">Extraordinário.</span></h2>
                             <p className="text-purple-50/60 text-lg md:text-xl font-serif italic max-w-2xl mx-auto md:mx-0">Bônus exclusivos para quem decide hoje transformar sua realidade.</p>
                        </div>
                        <div className="inline-block px-10 py-6 rounded-full bg-purple-950/20 border border-purple-900/30 text-[#EC4899] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">Oferta de Lançamento</div>
                    </div>

                    <div className="flex md:hidden justify-center mb-12">
                        <span className="py-2 px-6 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] text-[10px] uppercase font-black tracking-widest flex items-center gap-2 whitespace-nowrap">
                            Descubra os Bônus
                            <span className="text-[#EC4899] animate-swipe">→</span>
                        </span>
                    </div>

                    <div onScroll={handleScroll('bonuses')} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 md:grid md:grid-cols-3 md:gap-12 pb-12 md:pb-0">
                        {bonuses.map((b, i) => (
                            <div key={i} className="min-w-[85vw] md:min-w-0 snap-center group p-10 md:p-12 rounded-[2.5rem] md:rounded-[4rem] bg-[#0A0A20]/40 border border-purple-900/10 hover:border-purple-800/40 transition-all duration-700 h-full flex flex-col">
                                <div className="text-purple-200/20 text-5xl font-black mb-8">0{i+1}</div>
                                <h3 className="text-2xl md:text-3xl font-serif font-black text-white mb-6 uppercase italic tracking-tighter">{b.title}</h3>
                                <p className="text-purple-50/60 text-lg mb-8 leading-relaxed flex-1">{b.desc}</p>
                                <div className="text-[#EC4899] font-black text-sm uppercase tracking-widest pt-8 border-t border-purple-900/10">Valor: {b.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 md:hidden">
                        <div className="w-full h-[1px] bg-purple-900/20 rounded-full overflow-hidden">
                            <div className="h-full bg-[#EC4899] transition-all duration-300" style={{ width: `${scrolled.bonuses || 0}%` }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. ATOMIC_OFFER (The Decision Zen Dark) */}
            <section id="offer" className="py-12 md:py-28 bg-[#0A0A20]">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <div className="mb-20 space-y-8">
                         <span className="inline-block py-2 px-8 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] font-black tracking-[0.3em] text-[10px] uppercase shadow-sm">Acesso Imediato • 100% Digital</span>
                         <h2 className="text-4xl md:text-[80px] font-serif font-black text-white italic tracking-tighter leading-none">SUA JORNADA <br/> <span className="text-[#EC4899] underline decoration-purple-100 underline-offset-[10px] md:underline-offset-[20px]">COMEÇA AGORA.</span></h2>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#2D1B69] rounded-[5rem] -rotate-1 scale-105 -z-10 opacity-20" />
                        <div className="bg-[#1A1040]/40 rounded-[4rem] md:rounded-[6rem] p-10 md:p-16 border-8 border-purple-950 shadow-4xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5 text-[15rem] text-[#EC4899]">💎</div>
                            
                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                {/* TEXT AND PRICE (LEFT) */}
                                <div className="text-left space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-purple-50/80 line-through text-2xl italic font-serif opacity-60">De R$ 197,00 por apenas</p>
                                        <div className="flex items-baseline gap-2 group cursor-default">
                                            <span className="text-4xl md:text-5xl font-black text-[#EC4899]">R$</span>
                                            <span className="text-[100px] md:text-[180px] font-serif font-black text-white tracking-tighter leading-none transition-all group-hover:text-[#EC4899]">{product.price.split(',')[0]}</span>
                                            <div className="text-left font-black">
                                                <div className="text-[60px] md:text-[80px] text-[#EC4899] leading-none">,{product.price.split(',')[1]}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-4 px-8 rounded-full bg-[#1A1040] text-[#EC4899] font-bold tracking-wider text-xs uppercase inline-block text-left border border-pink-400/20">
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
                                                <span className="text-lg font-serif italic text-purple-50/80">{item.t}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* IMAGE AND BUTTON (RIGHT) */}
                                <div className="space-y-12 text-center">
                                    <div className="relative aspect-square w-full rounded-full border-8 border-[#1A1040] shadow-3xl overflow-hidden bg-purple-950">
                                        <Image src="/sales/assets/v3-product.png" alt="Product" fill className="object-cover opacity-80" />
                                    </div>
                                    <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="w-full py-10 rounded-full bg-[#EC4899] text-white font-black text-2xl md:text-3xl hover:bg-orange-500 hover:scale-[1.05] transition-all shadow-3xl uppercase tracking-[0.2em] leading-none">
                                        QUERO MEU ACESSO AGORA
                                    </button>
                                    <div className="flex justify-center gap-8 opacity-40">
                                         <div className="flex items-center gap-2 text-purple-100"> <span className="text-xl">🔒</span> <span className="text-[8px] font-black uppercase tracking-widest">Compra Segura</span> </div>
                                         <div className="flex items-center gap-2 text-purple-100"> <span className="text-xl">🛡️</span> <span className="text-[8px] font-black uppercase tracking-widest">Proteção Total</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. BIO (Mentora Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#0E0E2A]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center text-left">
                        <div className="relative aspect-[3/4] rounded-[4rem] md:rounded-[6rem] overflow-hidden border border-[#2D1B69] shadow-2xl grayscale saturate-50 hover:grayscale-0 transition-all duration-1000">
                             <Image src="/sales/assets/zen-light-bio.png" alt="Elisa Clark" fill className="object-cover" />
                        </div>
                        <div className="space-y-12">
                             <div className="mb-8">
                                <span className="inline-block py-2 px-8 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#EC4899] font-black tracking-[0.5em] text-[10px] uppercase shadow-sm">A Criadora</span>
                             </div>
                             <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">Eu te guiarei nesse portal de abundância.</h2>
                             <p className="text-lg md:text-xl text-purple-50/80 font-serif italic leading-relaxed">
                                Elisa Clark dedicou mais de 5 anos pesquisando haloterapia, aromaterapia e produção artesanal. O <strong className="text-[#EC4899] font-black">Método Essência Ativa BR</strong> é o resultado dessa jornada: um guia prático para você criar sais de banho terapêuticos com ingredientes brasileiros e transformar isso em renda real.
                             </p>
                             <div className="text-[#EC4899] font-serif italic text-3xl font-black">— Elisa Clark</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. GUARANTEE (Seal Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#0A0A20] border-y border-purple-900/20 text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="relative w-48 h-48 mx-auto mb-12 group">
                        <div className="absolute inset-0 bg-[#EC4899]/10 rounded-full blur-3xl group-hover:bg-[#EC4899]/20 transition-all duration-1000" />
                        <Image src="/sales/assets/premium-seal.png" alt="Selo de Garantia Premium" width={200} height={200} className="relative z-10 drop-shadow-[0_20px_50px_rgba(236,72,153,0.3)] group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h2 className="text-4xl font-serif text-white mb-8 italic font-black">Risco Zero. Satisfação Garantida.</h2>
                    <p className="text-lg md:text-xl text-purple-50/80 font-serif italic mb-12">
                        Se em 7 dias você não se sentir confiante para criar seu primeiro sal de banho terapêutico, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia. O risco é todo nosso.
                    </p>
                </div>
            </section>

            {/* 12. FAQ (Clarity Zen Dark) */}
            <section className="py-12 md:py-28 bg-[#0E0E2A]">
                <div className="container mx-auto px-6 max-w-4xl text-left">
                    <h2 className="text-center text-4xl font-serif font-black mb-16 md:mb-24 italic text-white">Dúvidas Frequentes</h2>
                    <div className="space-y-4">
                        {[
                            { q: "O que exatamente vou aprender?", a: "Você vai aprender a criar sais de banho terapêuticos artesanais do zero: escolher sais (marinho, Himalaia, Epsom), combinar óleos essenciais e ervas, embalar com valor percebido alto, precificar e vender com margem de 200-400%." },
                            { q: "Preciso ter experiência com artesanato?", a: "Nenhuma. O método parte do zero absoluto. Você vai fazer seu primeiro blend no Capítulo 1, usando apenas sal, óleos essenciais e uma colher de pau." },
                            { q: "Quanto preciso investir para começar a produzir?", a: "Menos de R$ 200. O ebook inclui uma lista de fornecedores brasileiros com preços acessíveis para sal marinho, sal do Himalaia, óleos essenciais e ervas secas." },
                            { q: "Dá mesmo para ganhar dinheiro com sais de banho?", a: "Sim. A margem de lucro é de 200-400%. Um sachê que custa R$ 3-5 para produzir vende por R$ 15-25. Alunas do método relatam faturamento de R$ 1.500 a R$ 2.800/mês começando com investimento mínimo." },
                            { q: "Como recebo o acesso ao Método?", a: "O acesso é imediato! Assim que o seu pagamento for aprovado, você receberá um e-mail com o link para baixar o Ebook Completo e todos os Bônus diretamente no seu celular, tablet ou computador." },
                            { q: "O conteúdo serve para quem quer apenas como hobby?", a: "Com certeza. Além de ser uma fonte de renda lucrativa, o Método foca profundamente nas propriedades terapêuticas dos sais e óleos. Você aprenderá a criar rituais de autocuidado para você e sua família." },
                        ].map((faq, i) => (
                            <div key={i} className="bg-[#1A1040]/30 border border-purple-900/10 rounded-[2.5rem] overflow-hidden shadow-sm text-center md:text-left">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-3 px-6 md:py-6 md:px-10 flex justify-between items-center text-left hover:bg-purple-950/40 transition-colors">
                                    <span className="text-lg md:text-xl font-serif italic text-white font-black">{faq.q}</span>
                                    <span className={`text-[#EC4899] transform transition-transform text-2xl ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                                </button>
                                {openFaq === i && (
                                    <div className="p-6 md:p-10 pt-0 text-purple-50/70 font-serif italic leading-relaxed border-t border-purple-900/10 mt-[-1px]">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. FOOTER (Zen Cosmic Branding) */}
            <footer className="py-20 md:py-32 bg-[#04040E] text-center border-t border-purple-900/10">
                 <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center gap-6 md:gap-12">
                        <div className="inline-block py-2 px-4 md:px-8 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/20 text-[#E8D8B0] font-black tracking-[0.05em] md:tracking-[0.5rem] text-[7.5px] md:text-[10px] uppercase font-sans whitespace-nowrap">Sommer&apos;s Store Ltda - Todos os Direitos Reservados.</div>
                        <div className="mt-8 opacity-40">
                             <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-[#EC4899] font-black">
                                 <span className="hover:text-white transition-colors cursor-default">Sais</span>
                                 <span className="hover:text-white transition-colors cursor-default">Óleos</span>
                                 <span className="hover:text-white transition-colors cursor-default">Ervas</span>
                                 <span className="hover:text-white transition-colors cursor-default">Alquimia</span>
                             </div>
                        </div>
                        <div className="mt-12 text-[9px] uppercase tracking-[0.5em] text-purple-200/10 font-black">
                            Zen Cosmic Atomic Edition v3.0
                        </div>
                    </div>
                 </div>
            </footer>
        </div>
    );
}
