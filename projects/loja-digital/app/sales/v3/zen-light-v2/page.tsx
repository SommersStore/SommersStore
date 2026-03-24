"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * VARIante Atômica: ZEN - LIGHT V2 (Terra & Erva)
 * Mood: Alabaster, Sage & Sandalwood. Harmonizado com novas imagens.
 */
export default function ZenLightV2() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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

    const phases = [
        { title: "Fase 01: O Despertar Mineral", desc: "Ciência e Intencionalidade - A base sagrada da alquimia.", img: "/sales/assets/1.png" },
        { title: "Fase 02: Sinergias Botânicas", desc: "Blends que Hipnotizam - Unindo o poder das ervas aos cristais.", img: "/sales/assets/2.png" },
        { title: "Fase 03: Embalagens de Luxo", desc: "Valor Percebido Elevado - Como o design transforma produtos em presentes.", img: "/sales/assets/3.png" },
        { title: "Fase 04: O Negócio Artesanal", desc: "Como lucrar 4x sobre o custo - A engenharia de lucro da SommersStore.", img: "/sales/assets/4.png" },
        { title: "Fase 05: Marketing de Intenção", desc: "Atraia Clientes de Elite - Posicionamento e vendas no mercado premium.", img: "/sales/assets/5.png" }
    ];

    const bonuses = [
        { title: "Templates de Rótulos de Luxo", value: "R$ 197", desc: "Design pronto para elevar seu valor percebido instantaneamente." },
        { title: "Guia Secreto de Fornecedores", value: "R$ 97", desc: "Onde encontrar a matéria-prima dos spas 5 estrelas." },
        { title: "Script de Vendas Magnético", value: "R$ 147", desc: "Como converter curiosos em clientes fiéis à base de status." }
    ];

    const testimonials = [
        { name: "Juliana, 31a", loc: "SÃO PAULO/SP", text: "Comecei com R$ 150 investidos e muita insegurança. Três meses depois, já tinha vendido mais de 200 unidades e conseguido minha primeira renda de R$ 2.800 em um mês. Isso não tem preço!", img: "/sales/assets/test-1.png" },
        { name: "Patrícia, 26a", loc: "BELO HORIZONTE/MG", text: "Era professora estressada sem tempo. Comecei fazendo para uso próprio. Quando amigas experimentaram e pediram para comprar, percebi que tinha algo nas mãos. Hoje minha renda extra com os sais paga as contas da casa.", img: "/sales/assets/test-2.png" },
        { name: "Marta, 45a", loc: "CURITIBA/PR", text: "Nunca tinha vendido nada e nem tinha Instagram. Segui o método e comecei vendendo para vizinhas. Hoje atendo pela internet e já fiz mais de 500 vendas. O método mudou minha vida e minha relação com o trabalho.", img: "/sales/assets/test-3.png" },
        { name: "Luciana, 38a", loc: "RECIFE/PE", text: "Estava desempregada e desesperada. Comecei com R$ 100 emprestados. Dois meses depois, já tinha faturado R$ 1.500. Hoje meus sais são minha principal fonte de renda. Recuperei minha autoestima.", img: "/sales/assets/test-4.png" }
    ];

    return (
        <div className="min-h-screen bg-[#FBFAF5] text-[#2D2D2D] font-sans selection:bg-[#929E85]/20 selection:text-[#2D2D2D] overflow-x-hidden">

            {/* 1. RESTRICT ACCESS LABEL */}
            <div className="bg-white border-b border-[#929E85] py-4 text-center">
                 <span className="text-[#929E85] font-black tracking-[0.5em] text-[10px] uppercase">Acesso Restrito: Alunas de Elite</span>
            </div>

            {/* 2. ATOMIC_HERO (Vision Zen Light) */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-24">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcf9f6]/60 to-[#fcf9f6]" />
                </div>
                
                <div className="relative z-10 container mx-auto px-6 text-center max-w-6xl">
                    <h1 className="text-5xl md:text-[110px] font-serif font-black text-[#2d241e] mb-8 md:mb-12 leading-[0.9] tracking-tighter">
                        {product.promise.split(' ').map((word, i) => (
                            word === "Alquimia" ? <span key={i} className="text-[#929E85] italic block md:inline underline decoration-emerald-200 underline-offset-[15px]"> {word} </span> : " " + word
                        ))}
                    </h1>

                    <p className="text-xl md:text-2xl text-[#6b5847] mb-12 md:mb-20 max-w-4xl mx-auto leading-relaxed font-serif italic">
                        Descubra como criar rituais de bem-estar com alto valor percebido e transformar o artesanal em um império de vendas premium.
                    </p>

                    <div className="relative aspect-video max-w-4xl mx-auto rounded-[3rem] md:rounded-[5rem] overflow-hidden border-[15px] border-white shadow-3xl mb-12 md:mb-20 bg-white">
                         <Image src="/sales/assets/zen-light-hero.png" alt="Hero Asset" fill className="object-cover" />
                    </div>

                    <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 md:px-20 py-8 md:py-10 rounded-full bg-[#2d241e] text-[#fcf9f6] font-black text-xl md:text-2xl hover:bg-emerald-900 hover:scale-[1.05] transition-all duration-700 shadow-3xl uppercase tracking-[0.2em]">
                        Quero meu acesso exclusivo
                    </button>
                </div>
            </section>

            {/* 3. PAIN (The Whisper Zen Light) */}
            <section className="py-12 md:py-28 bg-white border-y border-[#f0ede9]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="space-y-12">
                            <h2 className="text-4xl md:text-7xl font-serif text-[#2d241e] italic leading-tight">
                                Você sente sua energia sendo <br /> <span className="text-[#929E85] underline decoration-emerald-100 italic">drenada pelo caos diário?</span>
                            </h2>
                            <div className="space-y-8">
                                {pains.map((pain, i) => (
                                    <div key={i} className="flex gap-6 items-start border-l-4 border-[#929E85] pl-8 py-4 bg-[#fcf9f6]/40 rounded-r-3xl group hover:border-emerald-200 transition-all">
                                        <span className="text-emerald-300 font-serif text-3xl mt-[-5px]">“</span>
                                        <span className="text-[#3e342b] text-lg md:text-xl font-serif italic leading-relaxed">{pain}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-[3/4] rounded-[3rem] md:rounded-[5rem] overflow-hidden border-[10px] border-[#fcf9f6] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
                             <Image src="/sales/assets/zen-light-pain.png" alt="Pain Visual" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. METHOD (The Secret Zen Light) */}
            <section className="py-12 md:py-28 bg-[#fcf9f6]">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <span className="text-emerald-700 font-black tracking-[0.5em] text-[10px] uppercase mb-8 block">A Base da Alquimia</span>
                    <h3 className="text-5xl md:text-[80px] font-serif text-[#2d241e] mb-12 italic tracking-tighter leading-none">O Segredo da Alquimia Mineral.</h3>
                    <p className="text-xl md:text-2xl text-[#6b5847] leading-relaxed mb-20 md:mb-32 font-serif italic max-w-4xl mx-auto opacity-80">
                        O Método Essência Ativa BR não ensina "receitas". Ele revela o código da transmutação: como unir sais, ervas e intenção para criar produtos com alma e alto valor percebido.
                    </p>
                    
                    <div className="bg-white rounded-[3rem] md:rounded-[6rem] p-10 md:p-24 border border-[#929E85] text-left relative overflow-hidden group shadow-2xl">
                        <div className="relative z-10 max-w-2xl">
                            <h4 className="text-3xl md:text-4xl font-serif text-[#929E85] mb-8 italic font-black">O Poder da Terra nas suas Mãos</h4>
                            <p className="text-lg md:text-xl text-[#3e342b] leading-relaxed font-serif italic">
                                Desenvolvemos rituais que transformam o banho comum em um evento de spa de 5 estrelas. Usamos a densidade mineral para relaxar músculos e a volatilidade botânica para elevar a alma.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 group-hover:opacity-30 transition-all flex">
                             <div className="relative w-1/2 h-full"> <Image src="/sales/assets/zen-light-alchemy.png" alt="Alchemy 1" fill className="object-cover" /> </div>
                             <div className="relative w-1/2 h-full border-l border-[#929E85]/20"> <Image src="/sales/assets/ChatGPT Image 9 de fev. de 2026, 00_11_24.png" alt="Alchemy 2" fill className="object-cover" /> </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. REALITY (Timeline Zen Light) */}
            <section className="py-12 md:py-28 bg-white border-y border-[#929E85]">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <div className="flex justify-center mb-10 text-[#929E85]/30"><span className="text-4xl text-emerald-600">🌿</span></div>
                    <h2 className="text-5xl md:text-8xl font-serif font-black text-[#2d241e] italic mb-8 tracking-tighter">Uma nova vida <br/> florescendo...</h2>
                    <p className="text-lg md:text-xl text-[#6b5847] font-serif italic mb-16 opacity-60">Imagine sua rotina apenas 30 dias após este método:</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        {[
                            { t: "Domínio absoluto sobre a criação de 30 blends de elite.", img: "/sales/assets/ChatGPT Image 14 de jan. de 2026, 21_36_39.png" },
                            { t: "Transformação de banhos comuns em rituais de cura profunda.", img: "/sales/assets/ChatGPT Image 14 de jan. de 2026, 21_41_30.png" },
                            { t: "Capacidade de gerar uma nova fonte de renda em apenas 48h.", img: "/sales/assets/ChatGPT Image 14 de jan. de 2026, 22_03_46.png" },
                            { t: "Acesso à sabedoria ancestral da Alquimia Brasileira.", img: "/sales/assets/ChatGPT Image 14 de jan. de 2026, 22_38_54.png" }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-6 bg-[#fcf9f6]/60 p-8 rounded-[2.5rem] border border-[#929E85] shadow-sm hover:shadow-md transition-all overflow-hidden">
                                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-4 grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image src={item.img} alt={item.t} fill className="object-cover" />
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs font-black flex-shrink-0">✓</div>
                                    <span className="text-[#3e342b] font-serif italic text-lg leading-tight">{item.t}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. SOCIAL PROOF (Voices Zen Light) */}
            <section className="py-12 md:py-28 bg-[#fcf9f6]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <span className="text-center block text-emerald-700 font-black tracking-[0.5em] text-[10px] uppercase mb-8">Vozes da Transformação</span>
                    <h2 className="text-center text-4xl md:text-[80px] font-serif font-black text-[#2d241e] italic mb-16 md:mb-24 tracking-tighter leading-tight">Histórias de quem escolheu <br/> <span className="underline decoration-emerald-200 underline-offset-8">viver a Alquimia.</span></h2>
                    
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white p-10 md:p-16 rounded-[3.5rem] border border-[#929E85] relative flex flex-col justify-between hover:bg-emerald-50/20 transition-colors group shadow-xl">
                                <div className="text-6xl text-[#929E85]/20 font-serif absolute top-10 left-10">“</div>
                                <p className="text-lg md:text-2xl text-[#3e342b] italic font-serif leading-relaxed mb-12 relative z-10">
                                    {t.text}
                                </p>
                                <div className="h-px w-full bg-[#929E85]/10 mb-8" />
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-full border-2 border-[#929E85] overflow-hidden relative shadow-lg">
                                        <Image src={t.img} alt={t.name} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-[#2d241e] font-black text-lg uppercase tracking-widest">{t.name}</div>
                                        <div className="text-[#929E85] font-black text-[10px] uppercase tracking-[0.3em]">{t.loc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. LEARNING (Curriculum Zen Light) */}
            <section className="py-12 md:py-28 bg-white border-y border-[#f0ede9]">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-center text-4xl md:text-6xl font-serif font-black mb-16 md:mb-24 italic text-[#2d241e]">As Fases da Jornada</h2>
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                        {phases.map((p, i) => (
                            <div key={i} className="group bg-white rounded-[3rem] overflow-hidden border border-[#929E85]/20 shadow-lg hover:shadow-2xl transition-all duration-700 flex flex-col h-full">
                                <div className="relative h-64 w-full">
                                    <Image src={p.img || `/sales/assets/${i+1}.png`} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                                    <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-[#929E85] text-white flex items-center justify-center text-2xl font-black shadow-xl">0{i+1}</div>
                                </div>
                                <div className="p-10 text-left">
                                    <h4 className="text-2xl md:text-3xl font-serif text-[#929E85] mb-6 italic font-black underline decoration-emerald-100 underline-offset-8 decoration-4">{p.title}</h4>
                                    <p className="text-[#6b5847] text-xl font-serif italic leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. BONUSES (Presentes de Elite Zen Light) */}
            <section className="py-12 md:py-28 bg-[#fcf9f6]">
                <div className="container mx-auto px-6 max-w-6xl text-center">
                    <span className="text-emerald-700 font-black tracking-[0.5em] text-[10px] uppercase mb-8 block">Presentes de Elite</span>
                    <h2 className="text-4xl md:text-7xl font-serif font-black text-[#2d241e] italic mb-16 md:mb-24 italic tracking-tighter">Sua Decisão Recompensada.</h2>
                    
                    <div className="grid lg:grid-cols-3 gap-8">
                        {bonuses.map((b, i) => (
                            <div key={i} className="bg-white border border-[#929E85] rounded-[4rem] overflow-hidden text-left relative group shadow-xl hover:scale-[1.02] transition-all">
                                <div className="relative h-48 w-full bg-emerald-50">
                                    <Image src={`/sales/assets/ChatGPT Image 5 de fev. de 2026, 21_09_${44 + i * 11}.png`} alt={b.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-[#929E85] text-white text-[10px] font-black uppercase tracking-widest shadow-lg">PRESENTE 0{i+1}</div>
                                </div>
                                <div className="p-12">
                                    <h4 className="text-2xl font-serif text-[#2d241e] mb-6 italic leading-tight font-black">{b.title}</h4>
                                    <p className="text-[#6b5847] font-serif italic mb-8 leading-relaxed">{b.desc}</p>
                                    <div className="pt-6 border-t border-[#929E85] flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#929E85]/40">
                                        <span>Valor Original</span>
                                        <span>{b.value}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. ATOMIC_OFFER (The Decision Zen Light) */}
            <section id="offer" className="py-12 md:py-28 bg-white">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <div className="mb-12 space-y-4">
                         <span className="inline-block py-2 px-8 rounded-full bg-[#2d241e] text-[#FBFAF5] font-black tracking-[0.3em] text-[10px] uppercase shadow-xl">Acesso Vitalício Liberado</span>
                         <h2 className="text-4xl md:text-[80px] font-serif font-black text-[#2d241e] italic tracking-tighter leading-none">O SEU RITUAL <br/> <span className="text-[#929E85] underline decoration-emerald-100 underline-offset-[10px] md:underline-offset-[20px]">COMEÇA AGORA.</span></h2>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-50 rounded-[5rem] rotate-1 scale-105 -z-10 opacity-30" />
                        <div className="bg-white rounded-[4rem] md:rounded-[6rem] p-10 md:p-24 border-8 border-emerald-50 shadow-4xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5 text-[15rem] text-[#929E85]">💎</div>
                            
                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                <div className="text-left space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-[#a89686] line-through text-2xl italic font-serif opacity-60">De R$ 197,00 por apenas</p>
                                        <div className="flex items-baseline gap-2 group cursor-default">
                                            <span className="text-4xl md:text-5xl font-black text-[#929E85]">R$</span>
                                            <span className="text-[100px] md:text-[180px] font-serif font-black text-[#2d241e] tracking-tighter leading-none transition-all group-hover:text-[#929E85]">{product.price.split(',')[0]}</span>
                                            <div className="text-left font-black">
                                                <div className="text-[60px] md:text-[80px] text-[#929E85] leading-none">,{product.price.split(',')[1]}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-4 px-8 rounded-full bg-emerald-50 text-emerald-800 font-bold tracking-wider text-xs uppercase inline-block text-left">
                                        PAGAMENTO ÚNICO • SEM MENSALIDADES • 100% DIGITAL
                                    </div>

                                    <div className="space-y-4 pt-8">
                                        {[
                                            { i: "🪄", t: "Manual Passo a Passo Alquimia" },
                                            { i: "🎁", t: "3 Presentes Exclusivos de Elite" },
                                            { i: "🛡️", t: "Garantia Blindada de 7 Dias" },
                                            { i: "🛒", t: "Bônus Extra: Oráculo das Essências" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4 items-center text-left">
                                                <span className="text-2xl">{item.i}</span>
                                                <span className="text-lg font-serif italic text-gray-700">{item.t}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-12">
                                    <div className="relative aspect-square w-full rounded-full border-8 border-[#FBFAF5] shadow-3xl overflow-hidden bg-[#fcf9f6]">
                                        <Image src="/sales/assets/v3-product.png" alt="Product" fill className="object-cover" />
                                    </div>
                                    <button className="w-full py-10 rounded-full bg-[#2d241e] text-white font-black text-2xl md:text-3xl hover:bg-[#929E85] hover:scale-[1.05] transition-all shadow-3xl uppercase tracking-[0.2em] leading-none">
                                        SIM! QUERO MEU MÉTODO AGORA
                                    </button>
                                    <div className="flex justify-center gap-8 opacity-40">
                                         <div className="flex items-center gap-2"> <span className="text-xl">🔒</span> <span className="text-[8px] font-black uppercase tracking-widest">Compra Segura</span> </div>
                                         <div className="flex items-center gap-2"> <span className="text-xl">🛡️</span> <span className="text-[8px] font-black uppercase tracking-widest">Proteção Total</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. BIO (Mentora Zen Light) */}
            <section className="py-12 md:py-28 bg-[#fcf9f6]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center text-left">
                        <div className="relative aspect-[3/4] rounded-[4rem] md:rounded-[6rem] overflow-hidden border-[15px] border-white shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
                             <Image src="/sales/assets/zen-light-bio.png" alt="Elisa Clark" fill className="object-cover" />
                        </div>
                        <div className="space-y-12">
                             <span className="text-emerald-700 font-black tracking-[0.5em] text-[10px] uppercase">A Criadora</span>
                             <h2 className="text-5xl md:text-7xl font-serif italic text-[#2d241e] leading-tight">Eu te guiarei nesse portal de abundância.</h2>
                             <p className="text-lg md:text-xl text-[#6b5847] font-serif italic leading-relaxed">
                                Elisa Clark Brasil dedicou anos à pesquisa de como os minerais agem no campo vibracional e físico. Hoje, através da SommersStore, ela abre as portas da sua metodologia para que você também possa transmutar matéria-prima em status e bem-estar.
                             </p>
                             <div className="text-[#929E85] font-serif italic text-3xl font-black">— Elisa Clark Brasil</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. GUARANTEE (Seal Zen Light) */}
            <section className="py-12 md:py-28 bg-white border-y border-[#929E85] text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="inline-block px-12 py-12 rounded-full border border-emerald-100 bg-[#fcf9f6] mb-12 relative overflow-hidden group shadow-inner">
                         <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🛡️</div>
                    </div>
                    <h2 className="text-4xl font-serif text-[#2d241e] mb-8 italic font-black">Risco Zero. Transmutação Garantida.</h2>
                    <p className="text-lg md:text-xl text-[#6b5847] font-serif italic mb-12">
                        Você tem 7 dias para mergulhar no método. Se dentro desse período você sentir que a alquimia não é para você, devolvemos seu investimento integralmente, sem perguntas. Nosso compromisso é com a sua evolução.
                    </p>
                </div>
            </section>

            {/* 12. FAQ (Clarity Zen Light) */}
            <section className="py-12 md:py-28 bg-[#fcf9f6]">
                <div className="container mx-auto px-6 max-w-4xl text-left">
                    <h2 className="text-center text-4xl font-serif font-black mb-16 md:mb-24 italic text-[#2d241e]">Dúvidas Frequentes</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Como terei acesso ao treinamento?", a: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com seus dados de acesso exclusivos à nossa plataforma premium." },
                            { q: "Preciso ter experiência com artesanato?", a: "Nenhuma. O método foi desenhado para te levar do zero absoluto ao domínio da alquimia mineral de forma guiada e simplificada." },
                            { q: "Quais materiais vou precisar?", a: "No curso fornecemos a lista completa de fornecedores e materiais básicos. Você pode começar com baixo investimento." },
                            { q: "O pagamento é seguro?", a: "Utilizamos as bandeiras de segurança mais robustas do mercado. Seus dados estão 100% protegidos por criptografia de ponta." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white border border-[#929E85] rounded-[2.5rem] overflow-hidden shadow-sm">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-8 md:p-10 flex justify-between items-center text-left hover:bg-emerald-50/20 transition-colors">
                                    <span className="text-lg md:text-xl font-serif italic text-[#2d241e] font-black">{faq.q}</span>
                                    <span className={`text-[#929E85] transform transition-transform text-2xl ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                                </button>
                                {openFaq === i && (
                                    <div className="p-10 pt-0 text-[#6b5847] font-serif italic leading-relaxed border-t border-[#929E85] mt-[-1px]">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. FOOTER (Zen Branding) */}
            <footer className="py-20 md:py-32 bg-white text-center border-t border-[#929E85]">
                 <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center gap-12">
                        <div className="text-emerald-900/30 font-black tracking-[1.2rem] text-[10px] uppercase font-sans">Sommers Store • Digital Arts</div>
                        <div className="h-px w-20 bg-emerald-100" />
                        <div className="text-[#a89686] text-[9px] font-black uppercase tracking-[1em] font-sans">© 2026 Engenharia Atômica SommersStore</div>
                        <div className="mt-8 opacity-40">
                             <div className="flex gap-8 text-[8px] uppercase tracking-widest text-[#929E85] font-black">
                                 <span>Alquimia</span>
                                 <span>Mineral</span>
                                 <span>Elite</span>
                             </div>
                        </div>
                    </div>
                 </div>
            </footer>
        </div>
    );
}
