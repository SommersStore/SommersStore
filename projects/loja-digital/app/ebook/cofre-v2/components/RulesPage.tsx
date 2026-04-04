import React from "react";
import Image from "next/image";
import PageShell from "./PageShell";

export default function RulesPage({ pageNum }: { pageNum: string }) {
  return (
    <PageShell pageNum={pageNum} className="justify-center flex-col px-24">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image src="/ebook/yuzu.png" alt="Botanicals" fill sizes="100vw" className="filter grayscale opacity-20 object-center object-contain scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508] opacity-80" />
      </div>

      <div className="relative z-10 text-center">
        <h2 className="title-gold italic text-6xl mb-6">Regras de Ouro</h2>
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="w-12 h-px bg-red-800" />
          <p className="technical-label text-[12px] text-[#C5A059] tracking-[1.2em] font-bold uppercase">
            COMO OPERAR ESTE MATERIAL COM SEGURANÇA E ELEGÂNCIA
          </p>
        </div>
        
        <div className="font-serif italic text-2xl leading-relaxed text-[#F5F5DC]/70 space-y-8 max-w-2xl mx-auto mb-20 text-center">
          <p>&quot;O verdadeiro luxo, no autocuidado artesanal, está situado no absoluto equilíbrio entre o mineral inorgânico e a vitalidade botânica.&quot;</p>
          <p className="text-lg text-[#F5F5DC]/70">Um bom blend não precisa gritar no aroma para ser notado. A sofisticação nasce da proporção silenciosa, da pureza dos cristais e da intenção que você deposita em cada grama de maturação.</p>
        </div>

        <div className="bg-[#C5A059]/5 border border-[#C5A059]/10 p-12 max-w-2xl mx-auto text-left relative overflow-hidden -mt-6">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 -translate-y-16 translate-x-16">
            <div className="w-full h-full rounded-full border border-[#C5A059]" />
          </div>

          <h3 className="technical-label text-[12px] text-[#C5A059] mb-8 flex items-center gap-4 font-bold tracking-widest">
            <div className="w-3 h-3 bg-red-800 rounded-full shadow-[0_0_10px_rgba(139,0,0,0.5)]" /> 
            MANDAMENTOS DA COLEÇÃO
          </h3>
          
          <ul className="grid grid-cols-1 gap-4 font-serif text-[#F5F5DC]/70 text-base italic">
            {[
              "Antes de qualquer comercialização, teste a estabilidade térmica e olfativa da sua mistura por no mínimo 48h.",
              "A estética visual é seu primeiro vendedor. Verifique a harmonia de cores sob luz natural e artificial.",
              "Umidade é o inimigo fatal. Todos os utensílios e recipientes devem ser higienizados e secos de forma cirúrgica.",
              "Transforme a venda em ritual. Entregue um guia de uso que induza o cliente ao estado de pausa e consciência.",
            ].map((rule, i) => (
              <li key={i} className={`flex gap-4 ${i < 3 ? 'border-b border-neutral-900 pb-3' : ''}`}>
                <span className="text-[#C5A059] font-bold not-italic">{String(i + 1).padStart(2, '0')}.</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
