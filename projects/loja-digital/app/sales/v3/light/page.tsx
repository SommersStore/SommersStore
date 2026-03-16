"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function SalesPageUltimateLight() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const pains = [
        "Mente sobrecarregada que não desliga nem ao deitar.",
        "Tensão física que rouba sua energia e disposição.",
        "A sensação de que você cuida de todos, menos de si mesma.",
        "Produtos químicos das prateleiras que agridem sua saúde.",
        "O desejo de ter algo seu, mas sem saber por onde começar.",
        "O tempo voa e você sente que não viveu um momento de paz real."
    ];

    const lessons = [
        "Fase 1: O Despertar Mineral - Ciência e Intencionalidade.",
        "Fase 2: Sinergias Botânicas - Blends que Hipnotizam.",
        "Fase 3: Embalagens de Luxo - Valor Percebido Elevado.",
        "Fase 4: O Negócio Artesanal - Como lucrar 4x sobre o custo.",
        "Fase 5: Marketing de Intenção - Atraia Clientes de Elite."
    ];

    const benefits = [
        "Paz interior profunda e redução imediata da ansiedade.",
        "Sua própria linha de produtos 100% puros e magnéticos.",
        "Uma nova fonte de lucro produzindo rituais de alto valor.",
        "Domínio total da saboaria e perfumaria terapêutica nacional.",
        "Acesso à nossa comunidade exclusiva de Alquimistas de Elite."
    ];

    const faqData = [
        { q: "O acesso ao método é imediato?", a: "Sim. Segundos após a compra, você recebe o acesso completo no seu e-mail para começar hoje mesmo." },
        { q: "Vou ter suporte se tiver dúvidas?", a: "Com certeza. Temos uma área de membros ativa e suporte direto para garantir sua evolução." },
        { q: "Serve para quem nunca fez nada artesanal?", a: "Totalmente. O método é desenhado para te levar do zero ao nível profissional de elite." },
        { q: "O pagamento é seguro em site light?", a: "Absolutamente. Usamos a tecnologia da Kiwify, referência nacional em segurança de pagamentos." }
    ];

    return (
        <div className="min-h-screen bg-[#fcf9f6] text-[#3e342b] font-sans selection:bg-emerald-100 selection:text-emerald-900">

            {/* 1. HERO - ULTIMATE VISION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src="/sales/assets/v3-hero-light.png" alt="Ultimate Hero Light" fill className="object-cover opacity-30" priority />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#fcf9f6]/20 via-[#fcf9f6]/90 to-[#fcf9f6]" />
                </div>
                <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
                    <div className="inline-block px-8 py-3 rounded-full bg-white text-emerald-900 text-[11px] font-black mb-12 tracking-[0.5em] uppercase border border-emerald-100 shadow-xl">
                        A Obra-Prima da Alquimia Brasileira
                    </div>
                    <h1 className="text-5xl md:text-9xl font-serif font-black text-[#2d241e] mb-10 leading-[0.95] tracking-tighter drop-shadow-xl">
                        A Alquimia dos <span className="text-emerald-800 italic underline decoration-emerald-100 pb-4">Sentidos</span>
                    </h1>
                    <p className="text-xl md:text-3xl text-[#6b5847] mb-16 max-w-3xl mx-auto leading-relaxed font-serif italic">
                        Onde a ciência encontra o sagrado para transformar seu banho em um portal de cura e prosperidade.
                    </p>
                    <div className="max-w-4xl mx-auto rounded-[5rem] overflow-hidden shadow-[0_80px_150px_rgba(16,185,129,0.2)] mb-16 border-[15px] border-white relative group">
                        <Image src="/sales/assets/v3-product.png" alt="Ultimate Product Showcase" width={1000} height={600} className="object-cover group-hover:scale-105 transition-transform duration-2000" />
                    </div>
                    <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-16 py-8 rounded-[3rem] bg-[#2d241e] text-[#fcf9f6] font-black text-2xl hover:bg-emerald-800 hover:scale-[1.08] transition-all shadow-3xl shadow-emerald-900/30 uppercase tracking-[0.25em]">
                        QUERO MINHA VAGA NA ULTIMATE EDITION
                    </button>
                </div>
            </section>

            {/* 2. PAIN/DOR - Conteúdo Restaurado V2 */}
            <section className="py-32 bg-white border-y border-[#f0ede9]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <h2 className="text-4xl md:text-6xl font-serif text-[#2d241e] text-center mb-24 italic leading-tight">
                        Você sente que o seu brilho está se <br /><span className="text-emerald-800 underline decoration-emerald-100 underline-offset-8">apagando no cansaço do dia?</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden group shadow-2xl border-2 border-[#f0ede9]">
                            <Image src="/sales/assets/ChatGPT Image 9 de fev. de 2026, 00_11_56.png" alt="Esgotamento" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                        </div>
                        <div className="space-y-10">
                            {pains.map((pain, i) => (
                                <div key={i} className="flex gap-6 items-start border-l-4 border-emerald-50 pl-8 py-3 hover:border-emerald-200 transition-colors bg-[#fcf9f6]/50 rounded-r-3xl">
                                    <span className="text-emerald-600 font-serif text-3xl font-black">×</span>
                                    <span className="text-[#3e342b] text-lg font-medium leading-relaxed font-serif italic">{pain}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3 & 4. SOLUTION - Conteúdo Restaurado V2 */}
            <section className="py-32 bg-[#fcf9f6]">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <h3 className="text-4xl md:text-7xl font-serif text-[#2d241e] mb-12 leading-tight tracking-tight">O Resgate que une Ciência <br /><span className="text-emerald-700 italic">e Sabedoria Botânica.</span></h3>
                    <p className="text-xl md:text-2xl text-[#3e342b] leading-[1.8] mb-20 font-serif">
                        Nossa metodologia exclusiva não ensina apenas a misturar ingredientes. Nós ensinamos a orquestrar a <strong>Alquimia Brasileira</strong>: como os sais agem no sistema linfático e os aromas reprogramam o seu estado de espírito em minutos.
                    </p>
                    <div className="grid lg:grid-cols-2 gap-12 items-stretch text-left">
                        <div className="p-16 rounded-[4rem] bg-white shadow-2xl shadow-emerald-900/5 flex flex-col justify-center border border-[#f0ede9]">
                            <h4 className="text-3xl font-serif text-emerald-800 mb-8 italic">O Poder da Terra nas suas Mãos</h4>
                            <p className="text-lg text-[#6b5847] leading-relaxed font-serif italic">
                                Desenvolvemos rituais que transformam o banho comum em um evento de spa de 5 estrelas. Usamos a densidade mineral para relaxar músculos e a volatilidade botânica para elevar a alma.
                            </p>
                        </div>
                        <div className="relative aspect-video rounded-[4rem] overflow-hidden shadow-2xl border-[10px] border-white">
                            <Image src="/sales/assets/vidtsAlwZwTMAwM2Goi8L.png" alt="Técnicas de Alquimia" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5 & 7. REALITY / BENEFITS - Conteúdo Restaurado V2 */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-3xl mx-auto text-center mb-24">
                        <div className="text-emerald-600 text-5xl mb-6">🌿</div>
                        <h2 className="text-4xl md:text-6xl font-serif text-[#2d241e] mb-8 italic tracking-tight">Uma nova vida florescendo...</h2>
                        <p className="text-xl text-[#8a725e] font-serif">Imagine sua rotina apenas 30 dias após este método:</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-24 items-center max-w-7xl mx-auto text-left">
                        <div className="order-2 md:order-1 space-y-8 text-left">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="flex gap-8 items-center p-8 rounded-[3rem] bg-[#fcf9f6] border border-[#f0ede9] hover:bg-emerald-50/50 hover:translate-x-4 transition-all duration-500 group">
                                    <span className="w-14 h-14 rounded-full bg-emerald-700 text-white flex items-center justify-center font-black flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">✓</span>
                                    <span className="text-xl text-[#3e342b] font-medium leading-tight font-serif italic">{benefit}</span>
                                </div>
                            ))}
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="relative group text-center">
                                <div className="absolute inset-0 bg-emerald-200 blur-[60px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                                <Image src="/sales/assets/ChatGPT Image 5 de fev. de 2026, 21_08_44.png" alt="Transformação Alquimista" width={800} height={600} className="rounded-[5rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative z-10" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. LEARNING - Conteúdo Restaurado V2 */}
            <section className="py-32 bg-[#fcf9f6] border-y border-[#f0ede9]">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#2d241e] mb-20 italic underline underline-offset-8 decoration-emerald-200">O Caminho da Mestra Alquimista...</h2>
                    <div className="space-y-6">
                        {lessons.map((lesson, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center gap-8 p-10 rounded-[3rem] bg-white shadow-xl border border-[#f0ede9] hover:bg-emerald-50/30 transition-all text-left font-serif">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-black text-lg shadow-inner">0{i + 1}</div>
                                <div className="text-2xl font-serif text-[#5b4a3a] italic font-medium">{lesson}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. BONUSES - Conteúdo Restaurado V2 */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-7xl font-serif font-black text-[#2d241e] mb-24 tracking-tighter uppercase opacity-10">PRESENTES DE ELITE</h2>
                    <div className="grid md:grid-cols-3 gap-12 mt-[-120px] max-w-7xl mx-auto">
                        {[
                            { title: "Presente 1", name: "30 Sinergias de Sucesso (Receitas Prontas)", icon: "💎", color: "bg-emerald-50" },
                            { title: "Presente 2", name: "Guia Oficial de Fornecedores de Insumos", icon: "🏷️", color: "bg-[#fcf9f6]" },
                            { title: "Presente 3", name: "Masterclass: O Design do Desejo para Artesãs", icon: "🕯️", color: "bg-stone-50" }
                        ].map((b, i) => (
                            <div key={i} className={`p-12 rounded-[4rem] ${b.color} border border-black/5 shadow-[0_30px_70px_rgba(0,0,0,0.05)] flex flex-col items-center hover:-translate-y-6 transition-transform duration-700`}>
                                <div className="text-6xl mb-8 drop-shadow-lg">{b.icon}</div>
                                <div className="text-[10px] font-black tracking-[0.6em] text-slate-400 mb-4 uppercase">{b.title}</div>
                                <div className="text-2xl font-serif font-black text-[#2d241e] mb-12 leading-tight min-h-[4rem] flex items-center justify-center px-4">{b.name}</div>
                                <div className="w-full h-px bg-black/5 mb-10" />
                                <div className="text-emerald-700 font-black tracking-widest text-xs py-3 px-6 rounded-full bg-emerald-100 shadow-inner">EXCLUSIVO & GRATUITO</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. PRICING/OFFER - Conteúdo Restaurado V2 */}
            <section id="offer" className="py-32 bg-[#fcf9f6] relative">
                <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                    <div className="bg-white rounded-[6rem] p-12 md:p-32 text-[#2d241e] text-center shadow-[0_60px_120px_rgba(16,185,129,0.15)] border border-[#f0ede9] relative">
                        <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 bg-[#2d241e] text-white px-10 py-4 rounded-full font-black text-[10px] tracking-[0.5em] uppercase shadow-2xl">
                            Acesso Vitalício Liberado
                        </div>
                        <h3 className="text-5xl md:text-8xl font-serif font-black mb-12 tracking-tighter leading-none">SUA TRANSFORMAÇÃO COMEÇA AGORA</h3>
                        
                        <div className="flex flex-col items-center gap-4 mb-20 bg-emerald-50/30 py-16 rounded-[4rem] border border-emerald-100/50 text-center">
                            <span className="text-[#a89686] line-through text-3xl italic font-serif opacity-50">De R$ 197,00 por apenas</span>
                            <div className="flex items-baseline justify-center gap-3 group transition-transform duration-500 hover:scale-110">
                                <span className="text-4xl font-black text-emerald-800">R$</span>
                                <span className="text-[100px] md:text-[220px] font-serif font-black text-emerald-700 tracking-tighter leading-none">47</span>
                                <div className="text-left font-black">
                                    <div className="text-6xl text-emerald-700">,90</div>
                                </div>
                            </div>
                            <p className="text-emerald-900 font-black tracking-[0.3em] text-[12px] uppercase mt-10 border-t border-emerald-200 pt-6">Pagamento Único • Sem Mensalidades • 100% Digital</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-10 text-left max-w-2xl mx-auto mb-20 border-y border-[#f0ede9] py-16">
                            <div className="flex gap-5 text-lg font-black text-[#2d241e] font-serif italic">✨ Manual de Alquimia (144p)</div>
                            <div className="flex gap-5 text-lg font-black text-[#2d241e] font-serif italic">🌿 Catálogo de 30 Sinergias</div>
                            <div className="flex gap-5 text-lg font-black text-[#2d241e] font-serif italic">📈 Mapa de Lucro Artesanal</div>
                            <div className="flex gap-5 text-lg font-black text-emerald-800 italic underline decoration-emerald-200 font-serif">🎁 Bônus Exclusivos Vitalícios</div>
                        </div>

                        <button className="w-full max-w-2xl py-10 rounded-[3rem] bg-[#2d241e] text-[#fcf9f6] font-black text-3xl hover:bg-emerald-800 hover:scale-[1.03] transition-all shadow-[0_30px_70px_rgba(0,0,0,0.2)] uppercase tracking-[0.2em] leading-none">
                            SIM! QUERO MEU MÉTODO AGORA
                        </button>
                    </div>
                </div>
            </section>

            {/* 10. MENTOR - Conteúdo Restaurado V2 */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-32 items-center max-w-7xl">
                    <div className="order-2 md:order-1 space-y-12 text-left">
                        <h2 className="text-4xl md:text-7xl font-serif text-[#2d241e] leading-tight tracking-tight">Eu te guiarei nessa <br /><span className="text-emerald-800 italic decoration-emerald-100 underline underline-offset-8">Alquimia dos Sentidos.</span></h2>
                        <div className="space-y-10 text-2xl text-[#6b5847] leading-relaxed font-serif italic">
                            <p>Especialista na cura pelas mãos e na sabedoria botânica brasileira. Dediquei minha jornada a extrair o poder da terra para transformar vidas.</p>
                            <p>Eu não apenas ensino a fazer sais de banho; eu te dou as ferramentas para você ser dona do seu tempo e arquiteta da sua própria felicidade.</p>
                            <div className="p-12 rounded-[3.5rem] bg-[#fcf9f6] border-l-[12px] border-emerald-700 text-[#2d241e] font-serif italic text-3xl leading-tight shadow-xl">
                                "Meu propósito é ver o autocuidado virar liberdade e a natureza virar prosperidade nas suas mãos."
                                <span className="block mt-6 text-xl font-black uppercase tracking-widest text-emerald-800">— ELISA CLARK BRASIL</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="relative aspect-[3/4] rounded-[6rem] overflow-hidden shadow-2xl border-b-[15px] border-emerald-700 group">
                            <Image src="/sales/assets/Elisa Clark.jpg" alt="Mentora Elisa Clark" fill className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. GUARANTEE - Conteúdo Restaurado V2 */}
            <section className="py-32 bg-[#f4f1ee]">
                <div className="container mx-auto px-6 text-center max-w-5xl bg-white p-20 md:p-32 rounded-[6rem] shadow-2xl border border-[#f0ede9] relative overflow-hidden">
                    <div className="text-8xl mb-14 drop-shadow-sm opacity-80">🛡️</div>
                    <h3 className="text-4xl md:text-5xl font-serif text-[#2d241e] mb-10 italic">Segurança e Tranquilidade: Minha Garantia Real</h3>
                    <p className="text-2xl text-[#8a725e] leading-relaxed font-serif italic max-w-3xl mx-auto">Assista às aulas e sinta a experiência. Se em 7 dias você decidir que essa jornada não é para você, eu devolvo 100% do seu investimento. Sem perguntas, sem burocracia.</p>
                </div>
            </section>

            {/* 12. FAQ - Conteúdo Restaurado V2 */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-5xl font-serif text-center mb-24 text-[#2d241e] tracking-tight italic">Dúvidas Frequentes</h2>
                    <div className="space-y-12">
                        {faqData.map((faq, i) => (
                            <div key={i} className="group border-b-2 border-[#fcf9f6] pb-12 transition-all hover:bg-[#fcf9f6]/30 px-6 rounded-3xl text-left">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center text-left py-4">
                                    <span className={`text-2xl font-bold transition-all duration-500 font-serif italic ${openFaq === i ? 'text-emerald-700 translate-x-4' : 'text-[#3e342b]'}`}>{faq.q}</span>
                                    <span className={`text-4xl transition-transform duration-500 font-black ${openFaq === i ? 'rotate-45 text-emerald-600' : 'text-slate-200'}`}>+</span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-700 ${openFaq === i ? 'max-h-96 opacity-100 mt-10' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-[#8a725e] text-xl leading-relaxed italic border-l-4 border-emerald-100 pl-10 font-serif">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. FOOTER/CTA - Conteúdo Restaurado V2 */}
            <footer className="py-32 border-t border-[#f0ede9] bg-[#fcf9f6] text-center relative">
                <div className="container mx-auto px-6">
                    <h4 className="text-3xl font-serif text-[#2d241e] mb-14 opacity-70 italic tracking-tight">O ritual dos seus sonhos está a um clique de distância.</h4>
                    <button className="px-16 py-6 rounded-full bg-emerald-600 text-white font-black hover:bg-emerald-500 hover:scale-[1.05] transition-all shadow-2xl shadow-emerald-900/10 uppercase tracking-[0.4em] text-xs mb-24 border-b-4 border-emerald-800">
                        Clique aqui e fale pelo WhatsApp
                    </button>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 text-[#a89686] text-[11px] font-black uppercase tracking-[0.5em] border-t border-[#e8dad0] pt-16">
                        <span className="hover:text-emerald-800 transition-colors cursor-pointer">Sommers Store • Ultimate V3 • © 2026</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
