"use client";

import React from "react";
import Image from "next/image";

export default function SalesPageStrict() {
    const categories = [
        { title: "Relaxamento & Sono", desc: "Fórmulas para noites tranquilas e sono reparador." },
        { title: "Energia & Foco", desc: "Blends para despertar com vitalidade e clareza mental." },
        { title: "Amor-Próprio", desc: "Equilíbrio emocional e conexão com o poder feminino." },
        { title: "Alívio de Dores", desc: "Eficaz contra dores musculares e tensões diárias." },
        { title: "Kits Presenteáveis", desc: "Combinações sensoriais para encantar quem você ama." },
        { title: "Premium & Spa", desc: "O auge do luxo e bem-estar para rituais exclusivos." },
    ];

    const testimonials = [
        { name: "Juliana", age: 31, city: "São Paulo/SP", text: "Comecei com R$ 150 investidos... já tinha vendido mais de 200 unidades e conseguido minha primeira renda de R$ 2.800 em um único mês." },
        { name: "Patrícia", age: 26, city: "Belo Horizonte/MG", text: "Minha renda extra com sais terapêuticos paga todas as contas da casa. Trabalho de casa, no meu ritmo." },
        { name: "Amanda", age: 43, city: "Curitiba/PR", text: "Nunca tinha vendido nada... Hoje já fiz mais de 500 vendas e estou contratando minha primeira ajudante." },
    ];

    return (
        <div className="min-h-screen bg-[#fdfaf6] text-[#4a3f35] font-sans">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-[#e8dad0]">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/sales/assets/capa-curso-principal-01_1280x720.png"
                        alt="Sais de Banho Aromáticos"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-serif mb-6 text-[#2d241e]">
                        Método Essência Ativa BR
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">
                        Transforme o seu banho em um ritual terapêutico e a sua paixão em uma fonte de renda lucrativa.
                    </p>
                    <button className="bg-[#8b5e3c] text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-[#6f4b30] transition-colors">
                        QUERO COMEÇAR AGORA
                    </button>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-serif mb-8 italic">"Sua mente não desliga?"</h2>
                    <p className="text-lg leading-relaxed mb-6">
                        Você chega em casa exausta. O corpo pede descanso, mas a mente não desliga.
                        O estresse acumulado nos ombros parece impossível de remover.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Descubra como o poder da natureza pode dissolver essa tensão em apenas 20 minutos,
                        e como você pode levar esse bem-estar para outras pessoas enquanto cria seu próprio negócio.
                    </p>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-serif text-center mb-12">As 30 Fórmulas Terapêuticas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <div key={i} className="bg-[#f7ece2] p-8 rounded-2xl shadow-sm border border-[#decbb7]">
                                <h3 className="text-xl font-bold mb-4">{cat.title}</h3>
                                <p>{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proof Section */}
            <section className="py-20 px-4 bg-[#2d241e] text-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-serif text-center mb-16">Histórias de Sucesso</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white/10 p-8 rounded-xl backdrop-blur-sm italic relative">
                                <span className="text-6xl absolute -top-4 -left-2 text-[#8b5e3c] opacity-50">"</span>
                                <p className="mb-6 relative z-10">{t.text}</p>
                                <div className="font-bold text-[#decbb7]">
                                    {t.name}, {t.age} anos — {t.city}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 px-4 text-center bg-[#fdfaf6]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif mb-8">Comece hoje a sua jornada artesanal</h2>
                    <p className="text-xl mb-12">O momento perfeito não existe. Existe apenas a sua decisão.</p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-[#decbb7] flex-1 max-w-sm">
                            <h3 className="font-bold mb-2">Ebook+Bônus</h3>
                            <p className="text-4xl font-serif text-[#8b5e3c] mb-4">R$ 47,00</p>
                            <ul className="text-left text-sm space-y-2 mb-6">
                                <li>✅ Método Completo</li>
                                <li>✅ Guia 30 Blends</li>
                                <li>✅ Mentalidade de Vendas</li>
                            </ul>
                            <button className="w-full bg-[#8b5e3c] text-white py-3 rounded-lg font-bold">COMPRAR AGORA</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 text-center text-sm border-t border-[#decbb7] bg-[#f7ece2]">
                <p>© 2026 Sommers Store - Método Essência Ativa BR</p>
            </footer>
        </div>
    );
}
