"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function SalesPagePremiumDark() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const pains = [
        "Cansaço mental que não passa após o banho.",
        "Stress acumulado que gera tensão nos ombros e pescoço.",
        "Falta de um momento real de autocuidado no dia a dia.",
        "Dificuldade em encontrar produtos naturais e confiáveis.",
        "Vontade de empreender, mas com medo de alto investimento.",
        "Sentimento de que o banho é apenas uma obrigação rápida."
    ];

    const lessons = [
        "Alquimia Terapêutica: como combinar sais e óleos.",
        "Produção Passo a Passo de 30 blends exclusivos.",
        "Escolha de embalagens que geram valor de presente.",
        "Como precificar para ter lucro real de até 400%.",
        "Estratégia de vendas direta pelo WhatsApp e Instagram."
    ];

    const benefits = [
        "Relaxamento imediato e melhora na qualidade do sono.",
        "Produtos 100% naturais livres de sintéticos nocivos.",
        "Nova fonte de renda lucrativa trabalhando em casa.",
        "Resgate do feminino através de rituais sensoriais.",
        "Suporte direto para tirar todas as suas dúvidas."
    ];

    const faqData = [
        { q: "O acesso é imediato?", a: "Sim! Após a confirmação do pagamento, você recebe os dados de acesso no seu e-mail instantaneamente." },
        { q: "Preciso de ferramentas caras?", a: "De forma alguma. Você usará utensílios básicos que já tem em casa para começar." },
        { q: "O curso serve para iniciantes?", a: "Sim, o método foi desenhado para quem nunca fez um produto artesanal antes." },
        { q: "Como funciona a garantia?", a: "Você tem 7 dias para testar tudo. Se não gostar, devolvemos seu dinheiro integralmente." }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">

            {/* 1. HERO - Estrutura JSON id: 4130ef72 */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image src="/sales/assets/capa-curso-principal-01_1280x720.png" alt="Hero Background" fill className="object-cover" />
                </div>
                <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
                    <a href="#offer" className="inline-block px-5 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[10px] font-black mb-8 tracking-[0.3em] uppercase">
                        Sais de Banho Aromáticos e Terapêuticos
                    </a>
                    <h1 className="text-4xl md:text-7xl font-serif font-black text-white mb-6 leading-tight">
                        Aprenda a criar <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">Rituais de Luxo</span> e fature com a nossa Alquimia
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Domine o método brasileiro de produção artesanal para autocuidado profundo ou para construir um negócio lucrativo do zero.
                    </p>
                    <div className="aspect-video max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-12">
                        <Image src="/sales/assets/ChatGPT Image 5 de fev. de 2026, 22_43_39.png" alt="Produto" width={800} height={450} className="object-cover" />
                    </div>
                    <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 rounded-2xl bg-emerald-500 text-slate-950 font-black text-lg hover:bg-emerald-400 hover:scale-105 transition-all shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                        QUERO ACESSAR O MÉTODO AGORA
                    </button>
                </div>
            </section>

            {/* 2. PAIN/DOR - Estrutura JSON id: 752c930b */}
            <section className="py-24 bg-slate-900/30">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-3xl md:text-5xl font-serif text-white text-center mb-16 italic">
                        A realidade que está te <br /><span className="text-indigo-400">impedindo de relaxar...</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10">
                            <Image src="/sales/assets/ChatGPT Image 9 de fev. de 2026, 00_11_56.png" alt="Dor" fill className="object-cover grayscale" />
                        </div>
                        <ul className="space-y-6">
                            {pains.map((pain, i) => (
                                <li key={i} className="flex gap-4 items-start text-slate-400">
                                    <span className="text-indigo-500 text-xl font-bold">×</span> {pain}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 3 & 4. SOLUTION/MODULO - Estrutura JSON id: 46d5efbf / 1e734e15 */}
            <section className="py-24 border-y border-white/5">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Tudo o que você precisa é do <br /><span className="text-emerald-400">método certo.</span></h2>
                    <p className="text-xl text-slate-300 leading-relaxed mb-16">
                        O Método Essência Ativa BR não é sobre "receitas de internet". É sobre entender a densidade dos sais, a volatilidade dos óleos e a psicologia de um banho que realmente cura.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="p-10 rounded-3xl bg-white/5 border border-white/10">
                            <h4 className="text-xl font-bold text-white mb-4 italic">Por que funciona?</h4>
                            <p className="text-slate-400">Usamos a osmose mineral para relaxar a fibra muscular enquanto os compostos aromáticos atingem o sistema límbico, alterando o estado de espírito em minutos.</p>
                        </div>
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
                            <Image src="/sales/assets/vidtsAlwZwTMAwM2Goi8L.png" alt="Método" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5 & 7. REALITY / BENEFITS - Estrutura JSON id: 6400929c / 2f8b8bb2 */}
            <section className="py-24 bg-gradient-to-b from-[#020617] to-indigo-950/20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-4xl mb-6 animate-bounce">↓</div>
                        <h2 className="text-4xl font-serif text-white">Sua nova realidade após <br /><span className="text-emerald-400 underline decoration-emerald-500/20">aderir ao método...</span></h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div>
                            <Image src="/sales/assets/ChatGPT Image 5 de fev. de 2026, 21_08_44.png" alt="Reality" width={600} height={400} className="rounded-3xl shadow-2xl border border-white/5" />
                        </div>
                        <ul className="space-y-8">
                            {benefits.map((benefit, i) => (
                                <li key={i} className="flex gap-4 items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                                    <span className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all font-bold">✓</span>
                                    <span className="text-lg">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. LEARNING - Estrutura JSON id: 6e1ee5e */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif text-white mb-16 italic">O que você irá aprender...</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {lessons.map((lesson, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-[#020617] border border-white/5 text-left group hover:border-indigo-500/50 transition-all">
                                <div className="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">✨</div>
                                <div className="text-lg font-medium text-slate-300">{lesson}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. BONUSES - Estrutura JSON id: 33e26981 */}
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-16">3 BÔNUS EXCLUSIVOS <br /><span className="text-emerald-400 italic">no pacote completo</span></h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Bônus 1", name: "30 Fórmulas de Sucesso", price: "R$ 67,00", img: "/sales/assets/1.png" },
                            { title: "Bônus 2", name: "Guia de Fornecedores", price: "R$ 47,00", img: "/sales/assets/2.png" },
                            { title: "Bônus 3", name: "Masterclass Vendas", price: "R$ 97,00", img: "/sales/assets/3.png" }
                        ].map((b, i) => (
                            <div key={i} className="overflow-hidden rounded-[2.5rem] bg-white text-slate-950 p-8 flex flex-col items-center">
                                <div className="text-xs font-black tracking-widest text-emerald-600 mb-2 uppercase">{b.title}</div>
                                <div className="text-xl font-black mb-6 italic">{b.name}</div>
                                <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-6">
                                    <div className="absolute inset-0 bg-slate-200" />
                                </div>
                                <div className="text-sm text-slate-400 line-through">De {b.price}</div>
                                <div className="text-emerald-600 font-black text-lg">GRÁTIS HOJE</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. PRICING/OFFER - Estrutura JSON id: 1d5f1d8f */}
            <section id="offer" className="py-24 bg-[#020617] relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                    <div className="bg-white rounded-[4rem] p-12 md:p-20 text-slate-950 text-center shadow-[0_0_100px_rgba(16,185,129,0.3)]">
                        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-4 block">Oferta Método Essência Ativa BR</span>
                        <h2 className="text-5xl md:text-8xl font-serif font-black mb-10 tracking-tighter">PREÇO REVELADO!</h2>
                        <p className="text-2xl text-slate-500 mb-10 italic">Escolha o seu futuro no autocuidado:</p>

                        <div className="flex flex-col items-center gap-2 mb-12">
                            <span className="text-slate-400 line-through text-2xl font-serif">De R$ 197,00 por apenas</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">R$</span>
                                <span className="text-8xl md:text-[160px] font-serif font-black text-emerald-600 tracking-tighter leading-none">47</span>
                                <div className="text-left font-bold">
                                    <div className="text-3xl text-emerald-700">,90</div>
                                </div>
                            </div>
                            <p className="text-indigo-600 font-bold tracking-widest uppercase text-xs mt-4">Pague uma vez. Acesso vitalício.</p>
                        </div>

                        <div className="space-y-4 text-left max-w-md mx-auto mb-14 border-y border-slate-100 py-10">
                            <div className="flex gap-4 font-bold text-slate-700">✓ 144 Páginas de Conteúdo Mestre</div>
                            <div className="flex gap-4 font-bold text-slate-700">✓ 30 Blends Terapêuticos (Bônus)</div>
                            <div className="flex gap-4 font-bold text-slate-700">✓ Certificado de Conclusão</div>
                            <div className="flex gap-4 font-bold text-emerald-600 italic underline decoration-emerald-200">✓ Suporte Premium & Comunidade</div>
                        </div>

                        <button className="w-full max-w-lg py-8 rounded-[2rem] bg-emerald-600 text-white font-black text-2xl hover:bg-emerald-500 hover:scale-[1.05] transition-all shadow-[0_20px_50px_rgba(5,150,105,0.3)] uppercase">
                            QUERO GARANTIR MINHA VAGA
                        </button>
                    </div>
                </div>
            </section>

            {/* 10. MENTOR - Estrutura JSON id: 2559f681 */}
            <section className="py-24">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                    <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000">
                        <Image src="/sales/assets/Elisa Clark.jpg" alt="Mentor" fill className="object-cover" />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Prazer! <br /><span className="text-emerald-400 italic">Elisa Clark Brasil</span></h2>
                        <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                            <p>Depois de passar anos pesquisando a flora brasileira e as propriedades minerais dos nossos sais, decidi compartilhar o método que mudou minha saúde e minha conta bancária.</p>
                            <p>Já formei centenas de alunas que hoje têm seus próprios ateliês de sais terapêuticos, faturando com produtos que realmente transformam vidas.</p>
                            <p className="text-white font-serif italic text-2xl border-l-4 border-emerald-500 pl-8">"Minha missão é democratizar o autocuidado de luxo."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. GUARANTEE - Estrutura JSON id: 708efacb */}
            <section className="py-24 bg-indigo-500/5">
                <div className="container mx-auto px-6 max-w-4xl rounded-[3rem] bg-slate-900 border border-white/5 p-12 md:p-20 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-10">
                        <Image src="/sales/assets/Design sem nome (24).png" alt="Selo" fill className="opacity-80 invert" />
                    </div>
                    <h2 className="text-3xl font-serif text-white mb-6">Garantia Incondicional de 7 Dias</h2>
                    <p className="text-lg text-slate-400">Entre para o método, teste as fórmulas, sinta os resultados. Se você decidir que não é para você, devolvemos cada centavo via Kiwify sem perguntas.</p>
                </div>
            </section>

            {/* 12. FAQ - Estrutura JSON id: 7eb77d0e */}
            <section className="py-24 bg-[#020617]">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-4xl font-serif text-white text-center mb-16 italic">Dúvidas Frequentes</h2>
                    <div className="space-y-4">
                        {faqData.map((faq, i) => (
                            <div key={i} className="border-b border-white/5 pb-4">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center py-4 text-left group">
                                    <span className={`text-lg font-bold transition-colors ${openFaq === i ? 'text-emerald-400' : 'text-slate-300'}`}>{faq.q}</span>
                                    <span className="text-emerald-500 text-3xl transition-transform">{openFaq === i ? '−' : '+'}</span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-slate-500 leading-relaxed italic">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. FOOTER/CTA - Estrutura JSON id: 17fe1bf2 */}
            <footer className="py-20 border-t border-white/5 bg-slate-950 text-center">
                <div className="container mx-auto px-6">
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto italic">O banho dos seus sonhos e o negócio do seu futuro estão a um clique de distância. Domine a alquimia artesanal hoje mesmo.</p>
                    <button className="px-8 py-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-black hover:bg-emerald-500 hover:text-slate-950 transition-all text-xs tracking-[0.3em] mb-12 uppercase">
                        Chamar no WhatsApp
                    </button>
                    <div className="text-[#334155] text-[10px] font-black uppercase tracking-[0.5em]">
                        Sommers Store • Método Essência Ativa BR • 2026
                    </div>
                </div>
            </footer>
        </div>
    );
}
