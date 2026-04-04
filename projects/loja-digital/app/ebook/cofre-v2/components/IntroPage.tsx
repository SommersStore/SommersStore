import React from "react";
import Image from "next/image";
import PageShell from "./PageShell";

export default function IntroPage({ pageNum }: { pageNum: string }) {
  return (
    <PageShell pageNum={pageNum} className="justify-center flex-col px-24">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image src="/ebook/introducao_v2.png" alt="Botanicals" fill sizes="100vw" className="filter grayscale opacity-30 object-center object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />
      </div>

      <div className="relative z-10 text-center mb-12">
        <p className="technical-label text-[12px] text-[#C5A059] tracking-[0.8em] font-bold uppercase mb-4">A Essência Ativa</p>
        <h2 className="title-gold italic text-6xl">Introdução Protocolar</h2>
        <div className="w-24 h-px bg-red-800 mx-auto mt-6" />
      </div>

      <div className="max-w-2xl mx-auto relative overflow-hidden bg-[#C5A059]/5 border border-[#C5A059]/10 p-12 backdrop-blur-md">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 -translate-y-16 translate-x-16">
          <div className="w-full h-full rounded-full border border-[#C5A059]" />
        </div>
        <div className="relative z-10 space-y-6 text-[#F5F5DC]/80 font-serif italic text-lg leading-relaxed text-justify">
          <p className="text-2xl text-center mb-10 text-white/90">
            &quot;Existem fórmulas que cumprem uma função. E existem fórmulas que criam uma experiência.&quot;
          </p>
          <p>
            O <span className="text-[#C5A059] font-bold">Cofre das Botânicas Secretas</span> nasce para ocupar esse segundo espaço: o da composição sensorial sofisticada, da apresentação refinada e do autocuidado transformado em ritual.
          </p>
          <p>
            Aqui, cada blend foi pensado para unir três pilares que elevam o valor percebido de um produto artesanal: a estética visual implacável, a intenção aromática madura, e uma imersão de uso memorável.
          </p>
          <p>
            Não se trata apenas de misturar minerais e óleos; trata-se de arquitetar um momento de pausa inegociável em um mundo que não para de gritar. Este volume é o seu passaporte para uma nova categoria de percepção, onde o invisível — o aroma e a frequência — se torna a sua ferramenta mais poderosa de soberania pessoal.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
