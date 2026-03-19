"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function SalesPageUltimateDark() {
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

            {/* 1. HERO - ULTIMATE DARK VISION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute inset-0 z-0 opacity-30">
                    <Image src="/sales/assets/sais_banho_hero_premium_light_v3.png" alt="Ultimate Hero Dark" fill className="object-cover grayscale brightness-[0.4]" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                </div>
                <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
                    <div className="inline-block px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-black mb-12 tracking-[0.4em] uppercase">
                        Sombras de Luxo • Alquimia Brasileira
                    </div>
                    <h1 className="text-6xl md:text-9xl font-serif font-black text-white mb-10 leading-[0.9] tracking-tighter">
                        Rituais de <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-indigo-400 to-emerald-500">Luxo & Cura</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed italic">
                        Desperte sua essência através do poder mineral e botânico. Onde o autocuidado se torna sua maior fonte de prosperidade.
                    </p>
                    <div className="relative max-w-4xl mx-auto mb-20 group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-[4rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative aspect-video rounded-[3.5rem] overflow-hidden border border-white/10">
                            <Image src="/sales/assets/sais_banho_hero_premium_light_v3.png" alt="Ultimate Product Display" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                        </div>
                    </div>
                    <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-14 py-8 rounded-2xl bg-white text-slate-950 font-black text-2xl hover:bg-emerald-500 hover:text-white hover:scale-110 transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)] uppercase tracking-widest">
                        QUERO MEU ACESSO EXCLUSIVO
                    </button>
                </div>
            </section>

             {/* 2. PAIN/DOR - Conteúdo Restaurado V2 */}
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

            {/* 3 & 4. SOLUTION/MODULO - Conteúdo Restaurado V2 */}
            <section className="py-24 border-y border-white/5">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Tudo o que você precisa é do <br /><span className="text-emerald-400">método certo.</span></h2>
                    <p className="text-xl text-slate-300 leading-relaxed mb-16 font-serif opacity-80">
                        O Método Essência Ativa BR não é sobre "receitas de internet". É sobre entender a densidade dos sais, a volatilidade dos óleos e a psicologia de um banho que realmente cura.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors">
                            <h4 className="text-xl font-bold text-white mb-4 italic">Por que funciona?</h4>
                            <p className="text-slate-400">Usamos a osmose mineral para relaxar a fibra muscular enquanto os compostos aromáticos atingem o sistema límbico, alterando o estado de espírito em minutos.</p>
                        </div>
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <Image src="/sales/assets/vidtsAlwZwTMAwM2Goi8L.png" alt="Método" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5 & 7. REALITY / BENEFITS - Conteúdo Restaurado V2 */}
            <section className="py-24 bg-gradient-to-b from-[#020617] to-indigo-950/20">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-4xl mb-6 animate-bounce">↓</div>
                        <h2 className="text-4xl font-serif text-white">Sua nova realidade após <br /><span className="text-emerald-400 underline decoration-emerald-500/20">aderir ao método...</span></h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto text-left">
                        <div>
                            <Image src="/sales/assets/ChatGPT Image 5 de fev. de 2026, 21_08_44.png" alt="Reality" width={600} height={400} className="rounded-3xl shadow-2xl border border-white/5" />
                        </div>
                        <ul className="space-y-8">
                            {benefits.map((benefit, i) => (
                                <li key={i} className="flex gap-4 items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                                    <span className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all font-bold">✓</span>
                                    <span className="text-lg text-slate-300">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* 6. LEARNING - Conteúdo Restaurado V2 */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-serif text-white mb-16 italic">O que você irá aprender...</h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {lessons.map((lesson, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-[#020617] border border-white/5 text-left group hover:border-indigo-500/50 transition-all">
                                <div className="text-2xl opacity-40 group-hover:opacity-100 transition-opacity">✨</div>
                                <div className="text-lg font-medium text-slate-300 font-serif italic">{lesson}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. BONUSES - Conteúdo Restaurado V2 */}
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-16 transition-colors hover:text-emerald-400 cursor-default">3 BÔNUS EXCLUSIVOS <br /><span className="text-emerald-400 italic">no pacote completo</span></h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Bônus 1", name: "30 Fórmulas de Sucesso", price: "R$ 67,00" },
                            { title: "Bônus 2", name: "Guia de Fornecedores", price: "R$ 47,00" },
                            { title: "Bônus 3", name: "Masterclass Vendas", price: "R$ 97,00" }
                        ].map((b, i) => (
                            <div key={i} className="overflow-hidden rounded-[2.5rem] bg-white text-slate-950 p-8 flex flex-col items-center hover:scale-105 transition-transform shadow-2xl">
                                <div className="text-xs font-black tracking-widest text-emerald-600 mb-2 uppercase">{b.title}</div>
                                <div className="text-xl font-black mb-6 italic text-slate-950">{b.name}</div>
                                <div className="text-sm text-slate-400 line-through">De {b.price}</div>
                                <div className="text-emerald-600 font-black text-lg">GRÁTIS HOJE</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* 9. PRICING/OFFER - Conteúdo Restaurado V2 */}
             <section id="offer" className="py-24 bg-[#020617] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px]" />
                <div className="container mx-auto px-6 relative z-10 max-w-4xl text-center">
                    <div className="bg-white rounded-[4rem] p-12 md:p-20 text-slate-950 text-center shadow-[0_0_100px_rgba(16,185,129,0.3)]">
                        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-4 block">Oferta Método Essência Ativa BR</span>
                        <h2 className="text-5xl md:text-8xl font-serif font-black mb-10 tracking-tighter text-slate-950">PREÇO REVELADO!</h2>
                        
                        <div className="flex flex-col items-center gap-2 mb-12 justify-center">
                            <span className="text-slate-400 line-through text-2xl font-serif">De R$ 197,00 por apenas</span>
                            <div className="flex items-baseline justify-center gap-2">
                                <span className="text-2xl font-bold">R$</span>
                                <span className="text-8xl md:text-[160px] font-serif font-black text-emerald-600 tracking-tighter leading-none">47</span>
                                <div className="text-left font-bold">
                                    <div className="text-3xl text-emerald-700">,90</div>
                                </div>
                            </div>
                            <p className="text-indigo-600 font-bold tracking-widest uppercase text-[10px] mt-4">Pague uma vez. Acesso vitalício.</p>
                        </div>

                        <div className="space-y-4 text-left max-w-md mx-auto mb-14 border-y border-slate-100 py-10">
                            <div className="flex gap-4 font-bold text-slate-700">✓ 144 Páginas de Conteúdo Mestre</div>
                            <div className="flex gap-4 font-bold text-slate-700">✓ 30 Blends Terapêuticos (Bônus)</div>
                            <div className="flex gap-4 font-bold text-emerald-600 italic underline decoration-emerald-200">✓ Suporte Premium & Comunidade</div>
                        </div>

                        <button className="w-full max-w-lg py-8 rounded-[2rem] bg-emerald-600 text-white font-black text-2xl hover:bg-emerald-500 hover:scale-[1.05] transition-all shadow-xl uppercase">
                            QUERO GARANTIR MINHA VAGA
                        </button>
                    </div>
                </div>
            </section>

            {/* 10. MENTOR - Conteúdo Restaurado V2 */}
            <section className="py-24">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
                    <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
                        <Image src="/sales/assets/Elisa Clark.jpg" alt="Mentor" fill className="object-cover" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Prazer! <br /><span className="text-emerald-400 italic font-bold">Elisa Clark Brasil</span></h2>
                        <div className="space-y-6 text-lg text-slate-400 leading-relaxed font-serif">
                            <p>Depois de passar anos pesquisando a flora brasileira e as propriedades minerais dos nossos sais, decidi compartilhar o método que mudou minha saúde e minha conta bancária.</p>
                            <p>Eu não apenas ensino a fazer sais de banho; eu te dou as ferramentas para você ser dona do seu tempo e arquiteta da sua própria felicidade.</p>
                            <p className="text-white font-serif italic text-2xl border-l-4 border-emerald-500 pl-8">"Minha missão é democratizar o autocuidado de luxo."</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* 11. GUARANTEE - Conteúdo Restaurado V2 */}
             <section className="py-24 bg-indigo-500/5 text-center">
                <div className="container mx-auto px-6 max-w-4xl rounded-[3rem] bg-slate-900 border border-white/5 p-12 md:p-20 text-center">
                    <h2 className="text-3xl font-serif text-white mb-6 italic">Garantia Incondicional de 7 Dias</h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">Entre para o método, teste as fórmulas, sinta os resultados. Se você decidir que não é para você, devolvemos cada centavo via Kiwify sem perguntas.</p>
                </div>
            </section>

             {/* 12. FAQ - Conteúdo Restaurado V2 */}
             <section className="py-24 bg-[#020617] text-center">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-4xl font-serif text-white text-center mb-16 italic">Dúvidas Frequentes</h2>
                    <div className="space-y-4">
                        {faqData.map((faq, i) => (
                            <div key={i} className="border-b border-white/5 pb-4 text-left">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center py-4 text-left group">
                                    <span className={`text-lg font-bold transition-colors ${openFaq === i ? 'text-emerald-400' : 'text-slate-300'}`}>{faq.q}</span>
                                    <span className="text-emerald-500 text-3xl transition-transform">{openFaq === i ? '−' : '+'}</span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-slate-500 leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             <footer className="py-20 text-center opacity-30">
                <p className="text-[10px] font-black tracking-widest uppercase">Sommers Store • Ultimate V3 • © 2026</p>
             </footer>
        </div>
    );
}
