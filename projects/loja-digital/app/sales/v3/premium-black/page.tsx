"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * PREMIUM_BLACK_MASTER - Atomic Edition (SommersStore V3)
 * 
 * Uma reconstrução fiel da página Master Live (13 seções),
 * aplicada à estética Noir (Charcoal, Emerald & White).
 */
export default function PremiumBlackMaster() {
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
        { title: "Fase 01: O Despertar", desc: "A ciência dos minerais e a base da alquimia terapêutica para iniciantes de elite." },
        { title: "Fase 02: A Alquimia", desc: "Criação de blends hipnóticos e rituais que transmutam o banho em cura." },
        { title: "Fase 03: A Maestria", desc: "Posicionamento de luxo e a engenharia de vendas para o mercado premium." }
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
        <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">

            {/* 1. RESTRICT ACCESS LABEL */}
            <div className="bg-emerald-950/30 border-b border- emerald-900/20 py-4 text-center">
                 <span className="text-emerald-500 font-black tracking-[0.5em] text-[10px] uppercase">Acesso Restrito: Alunas de Elite</span>
            </div>

            {/* 2. ATOMIC_HERO (Vision Noir) */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-24">
                <div className="absolute inset-0 z-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-black to-black" />
                </div>
                
                <div className="relative z-10 container mx-auto px-6 text-center max-w-6xl">
                    <h1 className="text-5xl md:text-[110px] font-serif font-black text-white mb-8 md:mb-12 leading-[0.9] tracking-tighter">
                        {product.promise.split(' ').map((word, i) => (
                            word === "Alquimia" ? <span key={i} className="text-emerald-500 italic block md:inline underline decoration-emerald-900/50 underline-offset-[15px]"> {word} </span> : " " + word
                        ))}
                    </h1>

                    <p className="text-xl md:text-2xl text-white/60 mb-12 md:mb-20 max-w-4xl mx-auto leading-relaxed font-serif italic">
                        Descubra como criar rituais de bem-estar com alto valor percebido e transformar o artesanal em um império de vendas premium.
                    </p>

                    <div className="relative aspect-video max-w-4xl mx-auto rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-white/5 shadow-2xl mb-12 md:mb-20 bg-emerald-950/10">
                         {/* Placeholder for Main Asset */}
                         <div className="absolute inset-0 flex items-center justify-center text-white/10 font-serif italic text-4xl">Sommers Cinematic Asset</div>
                         <Image src="/sales/assets/ChatGPT Image 9 de fev. de 2026, 00_11_56.png" alt="Hero Asset" fill className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
                    </div>

                    <button onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })} className="px-12 md:px-20 py-8 md:py-10 rounded-full bg-emerald-600 text-white font-black text-xl md:text-2xl hover:bg-emerald-500 hover:scale-[1.05] transition-all duration-700 shadow-[0_20px_60px_rgba(5,150,105,0.3)] uppercase tracking-[0.3em]">
                        Quero meu acesso exclusivo
                    </button>
                </div>
            </section>

            {/* 3. PAIN (The Whisper Noir) */}
            <section className="py-12 md:py-28 bg-[#050505] border-y border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                        <div className="space-y-12">
                            <h2 className="text-4xl md:text-7xl font-serif text-white italic leading-tight">
                                Você sente sua energia sendo <br /> <span className="text-emerald-500 underline decoration-emerald-900 italic">drenada pelo caos diário?</span>
                            </h2>
                            <div className="space-y-8">
                                {pains.map((pain, i) => (
                                    <div key={i} className="flex gap-6 items-start border-l-2 border-emerald-900/30 pl-8 py-4 bg-white/[0.02] rounded-r-3xl group hover:border-emerald-500 transition-all">
                                        <span className="text-emerald-500 font-black text-xs mt-1">✕</span>
                                        <span className="text-white/60 text-lg md:text-xl font-serif italic leading-relaxed">{pain}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square md:aspect-[3/4] rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-white/5">
                             <Image src="/sales/assets/ChatGPT Image 9 de fev. de 2026, 00_11_56.png" alt="Pain Visual" fill className="object-cover grayscale opacity-40" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. METHOD (The Secret) */}
            <section className="py-12 md:py-28 bg-black">
                <div className="container mx-auto px-6 text-center max-w-5xl">
                    <span className="text-emerald-500 font-black tracking-[0.5em] text-[10px] uppercase mb-8 block">A Base da Alquimia</span>
                    <h3 className="text-5xl md:text-[80px] font-serif text-white mb-12 italic tracking-tighter leading-none">O Segredo da Alquimia Mineral.</h3>
                    <p className="text-xl md:text-2xl text-white/50 leading-relaxed mb-20 md:mb-32 font-serif italic">
                        O Método Essência Ativa BR não ensina "receitas". Ele revela o código da transmutação: como unir sais, ervas e intenção para criar produtos com alma e alto valor percebido.
                    </p>
                    
                    <div className="bg-[#0a0a0a] rounded-[3rem] md:rounded-[6rem] p-10 md:p-24 border border-white/5 text-left relative overflow-hidden group">
                        <div className="relative z-10 max-w-2xl">
                            <h4 className="text-3xl md:text-4xl font-serif text-emerald-500 mb-8 italic">O Poder da Terra nas suas Mãos</h4>
                            <p className="text-lg md:text-xl text-white/60 leading-relaxed font-serif italic">
                                Desenvolvemos rituais que transformam o banho comum em um evento de spa de 5 estrelas. Usamos a densidade mineral para relaxar músculos e a volatilidade botânica para elevar a alma.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 grayscale group-hover:opacity-30 transition-all">
                             <Image src="/sales/assets/ChatGPT Image 9 de fev. de 2026, 00_11_56.png" alt="Alchemy Texture" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. REALITY (Timeline) */}
            <section className="py-12 md:py-28 bg-[#050505] border-y border-white/5">
                <div className="container mx-auto px-6 max-w-5xl text-center">
                    <div className="flex justify-center mb-10"><span className="text-4xl">🌿</span></div>
                    <h2 className="text-5xl md:text-8xl font-serif font-black text-white italic mb-8 tracking-tighter">Uma nova vida <br/> florescendo...</h2>
                    <p className="text-lg md:text-xl text-white/40 font-serif italic mb-16 italic">Imagine sua rotina apenas 30 dias após este método:</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        {[
                            "Domínio absoluto sobre a criação de 30 blends de elite.",
                            "Transformação de banhos comuns em rituais de cura profunda.",
                            "Capacidade de gerar uma nova fonte de renda em apenas 48h.",
                            "Acesso à sabedoria ancestral da Alquimia Brasileira."
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 items-center bg-white/5 p-8 rounded-[2.5rem] border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs">✓</div>
                                <span className="text-white/80 font-serif italic text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. SOCIAL PROOF (Voices) */}
            <section className="py-12 md:py-28 bg-black">
                <div className="container mx-auto px-6 max-w-6xl">
                    <span className="text-center block text-emerald-500 font-black tracking-[0.5em] text-[10px] uppercase mb-8">Vozes da Transformação</span>
                    <h2 className="text-center text-4xl md:text-7xl font-serif font-black text-white italic mb-16 md:mb-24 tracking-tighter leading-tight">Histórias de quem escolheu <br/> <span className="underline decoration-emerald-950">viver a Alquimia.</span></h2>
                    
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-[#0a0a0a] p-10 md:p-16 rounded-[3.5rem] border border-white/5 relative flex flex-col justify-between hover:bg-emerald-950/10 transition-colors group">
                                <div className="text-6xl text-emerald-900/40 font-serif absolute top-10 left-10 opacity-30">“</div>
                                <p className="text-lg md:text-2xl text-white/70 italic font-serif leading-relaxed mb-12 relative z-10">
                                    {t.text}
                                </p>
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-3xl bg-emerald-950 border border-white/10 overflow-hidden relative">
                                        <div className="absolute inset-0 flex items-center justify-center text-emerald-500 font-black text-xs">{t.name[0]}</div>
                                    </div>
                                    <div>
                                        <div className="text-white font-black text-sm uppercase tracking-widest">{t.name}</div>
                                        <div className="text-emerald-500/60 font-black text-[9px] uppercase tracking-[0.3em]">{t.loc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. LEARNING (Curriculum) */}
            <section className="py-12 md:py-28 bg-[#050505] border-y border-white/5">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-center text-4xl md:text-6xl font-serif font-black mb-16 md:mb-24 italic">As Fases da Jornada</h2>
                    <div className="space-y-12">
                        {phases.map((p, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start border-b border-white/5 pb-12 group">
                                <span className="text-7xl md:text-9xl font-serif font-black text-white/5 group-hover:text-emerald-500/20 transition-all duration-700">0{i+1}</span>
                                <div className="pt-4">
                                    <h4 className="text-2xl md:text-3xl font-serif text-white mb-6 italic underline decoration-emerald-900 underline-offset-8 decoration-2">{p.title}</h4>
                                    <p className="text-white/50 text-xl font-serif italic leading-relaxed">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. BONUSES (Presentes de Elite) */}
            <section className="py-12 md:py-28 bg-black">
                <div className="container mx-auto px-6 max-w-6xl text-center">
                    <span className="text-emerald-500 font-black tracking-[0.5em] text-[10px] uppercase mb-8 block">Presentes de Elite</span>
                    <h2 className="text-4xl md:text-7xl font-serif font-black text-white italic mb-16 md:mb-24 italic tracking-tighter">Sua Decisão Recompensada.</h2>
                    
                    <div className="grid lg:grid-cols-3 gap-8">
                        {bonuses.map((b, i) => (
                            <div key={i} className="bg-[#0a0a0a] border border-emerald-900/20 rounded-[4rem] p-12 text-left relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500 opacity-[0.03] rounded-full group-hover:opacity-10 transition-all" />
                                <span className="text-emerald-500 font-black text-xs uppercase tracking-widest block mb-4">Bônus {i+1}</span>
                                <h4 className="text-2xl font-serif text-white mb-6 italic leading-tight">{b.title}</h4>
                                <p className="text-white/40 font-serif italic mb-8 leading-relaxed">{b.desc}</p>
                                <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-emerald-500/50">
                                    <span>Valor Original</span>
                                    <span>{b.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. ATOMIC_OFFER (The Decision) */}
            <section id="offer" className="py-12 md:py-28 bg-[#050505]">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <div className="mb-20 space-y-6">
                         <span className="text-emerald-500 font-black tracking-[0.6em] text-[10px] uppercase">O Convite Final</span>
                         <h2 className="text-5xl md:text-[100px] font-serif font-black text-white italic tracking-tighter leading-none mb-12">Faça as Pazes <br/> <span className="underline decoration-emerald-500 underline-offset-[10px] md:underline-offset-[25px]">com o Tempo.</span></h2>
                    </div>
                    
                    <div className="bg-black rounded-[4rem] md:rounded-[6rem] p-10 md:p-32 border border-white/10 shadow-4xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl text-emerald-500">💎</div>
                        
                        <div className="space-y-12 mb-20 md:mb-24">
                            <span className="text-white/20 line-through text-4xl italic font-serif opacity-40">De R$ 197,00 por apenas</span>
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-baseline gap-4 group cursor-default">
                                    <span className="text-4xl md:text-5xl font-black text-emerald-500">R$</span>
                                    <span className="text-[100px] md:text-[260px] font-serif font-black text-white tracking-tighter leading-none transition-all group-hover:text-emerald-300">{product.price.split(',')[0]}</span>
                                    <div className="text-left font-black">
                                        <div className="text-[50px] md:text-[100px] text-emerald-500 leading-none">,{product.price.split(',')[1]}</div>
                                    </div>
                                </div>
                                <p className="py-4 md:py-6 px-8 md:px-12 rounded-full border border-emerald-500/30 bg-emerald-950 text-emerald-400 font-black tracking-widest text-[10px] uppercase shadow-xl mt-[-10px] md:mt-[-20px]">Pagamento Único • Vitalício</p>
                            </div>
                        </div>

                        <button className="w-full py-10 md:py-12 rounded-full bg-emerald-600 text-white font-black text-2xl md:text-4xl hover:bg-emerald-500 hover:scale-[1.05] transition-all shadow-[0_30px_90px_rgba(5,150,105,0.4)] uppercase tracking-[0.3em] leading-none mb-12">
                            Quero Começar Agora
                        </button>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-40 grayscale">
                             <div className="flex items-center gap-4">
                                 <span className="text-2xl">🔒</span>
                                 <span className="text-[9px] font-black uppercase tracking-widest">Compra 100% Segura</span>
                             </div>
                             <div className="flex items-center gap-4">
                                 <span className="text-2xl">🛡️</span>
                                 <span className="text-[9px] font-black uppercase tracking-widest">Garantia Incondicional</span>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. BIO (Mentora) */}
            <section className="py-12 md:py-28 bg-black">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center">
                        <div className="relative aspect-[3/4] rounded-[4rem] md:rounded-[6rem] overflow-hidden border border-white/5 grayscale saturate-50">
                             <Image src="/sales/assets/ChatGPT Image 9 de fev. de 2026, 00_11_56.png" alt="Elisa Clark" fill className="object-cover" />
                        </div>
                        <div className="space-y-12">
                             <span className="text-emerald-500 font-black tracking-[0.5em] text-[10px] uppercase">A Criadora</span>
                             <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">Eu te guiarei nesse portal de abundância.</h2>
                             <p className="text-lg md:text-xl text-white/50 font-serif italic leading-relaxed">
                                Elisa Clark Brasil dedicou anos à pesquisa de como os minerais agem no campo vibracional e físico. Hoje, através da SommersStore, ela abre as portas da sua metodologia para que você também possa transmutar matéria-prima em status e bem-estar.
                             </p>
                             <div className="text-emerald-500 font-serif italic text-2xl">— Elisa Clark Brasil</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 11. GUARANTEE (Seal) */}
            <section className="py-12 md:py-28 bg-[#050505] border-y border-white/5 text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <div className="inline-block px-12 py-12 rounded-full border border-emerald-500/20 bg-emerald-950/20 mb-12 relative overflow-hidden group">
                         <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🛡️</div>
                    </div>
                    <h2 className="text-4xl font-serif text-white mb-8 italic">Risco Zero. Transmutação Garantida.</h2>
                    <p className="text-lg md:text-xl text-white/40 font-serif italic mb-12">
                        Você tem 7 dias para mergulhar no método. Se dentro desse período você sentir que a alquimia não é para você, devolvemos seu investimento integralmente, sem perguntas. Nosso compromisso é com a sua evolução.
                    </p>
                </div>
            </section>

            {/* 12. FAQ (Noir Edition) */}
            <section className="py-12 md:py-28 bg-black">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-center text-4xl font-serif font-black mb-16 md:mb-24 italic">Dúvidas Frequentes</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Como terei acesso ao treinamento?", a: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com seus dados de acesso exclusivos à nossa plataforma premium." },
                            { q: "Preciso ter experiência com artesanato?", a: "Nenhuma. O método foi desenhado para te levar do zero absoluto ao domínio da alquimia mineral de forma guiada e simplificada." },
                            { q: "Quais materiais vou precisar?", a: "No curso fornecemos a lista completa de fornecedores e materiais básicos. Você pode começar com baixo investimento." },
                            { q: "O pagamento é seguro?", a: "Utilizamos as bandeiras de segurança mais robustas do mercado. Seus dados estão 100% protegidos por criptografia de ponta." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-8 md:p-10 flex justify-between items-center text-left hover:bg-emerald-950/10 transition-colors">
                                    <span className="text-lg md:text-xl font-serif italic text-white/80">{faq.q}</span>
                                    <span className={`text-emerald-500 transform transition-transform text-2xl ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                                </button>
                                {openFaq === i && (
                                    <div className="p-10 pt-0 text-white/40 font-serif italic leading-relaxed border-t border-white/5 mt-[-1px]">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 13. FOOTER (Noir Branding) */}
            <footer className="py-20 md:py-32 bg-black text-center border-t border-white/5">
                 <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center gap-12">
                        <div className="text-white/10 font-black tracking-[1.2rem] text-[10px] uppercase">Sommers Store • Digital Arts</div>
                        <div className="h-px w-20 bg-emerald-950" />
                        <div className="text-white/5 text-[9px] font-black uppercase tracking-[1em]">© 2026 Engenharia Atômica SommersStore</div>
                        <div className="mt-8 opacity-20 filter grayscale">
                             {/* Optional micro-logos */}
                             <div className="flex gap-8 text-[8px] uppercase tracking-widest text-white/60">
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
