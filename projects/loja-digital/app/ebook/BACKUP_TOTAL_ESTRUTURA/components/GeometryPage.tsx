import React from "react";
import Image from "next/image";
import PageShell from "./PageShell";

export default function GeometryPage({ pageNum }: { pageNum: string }) {
  const pillars = [
    { num: "01", title: "Base Mineral", desc: "O corpo de sustentação físico. Cristais de Mar Morto, Rosa e Epsom definem cor, peso, volume e entrega de ação mineral purificadora." },
    { num: "02", title: "Base Aromática", desc: "A espinha dorsal olfativa. Cítricos para manhã, resinas terrestres para noites e especiarias para rituais abundantes." },
    { num: "03", title: "Forma Botânica", desc: "O contraste e choque estético. Fios de açafrão em sal rosa, ou pétalas claríssimas em sal negro basáltico. O componente que \"dá o clique\" no Instagram." },
    { num: "04", title: "Base Visual", desc: "Embalagens pesadas, vidros espessos, rótulos texturizados, a caixa e a tipografia que transborda a inteligência da sua marca materializada." },
  ];

  return (
    <PageShell pageNum={pageNum} className="justify-center px-24">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image src="/ebook/botanical.png" alt="Botanicals" fill sizes="100vw" className="filter grayscale opacity-20 object-center object-contain scale-125" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508] opacity-80" />
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-12">
          <p className="technical-label text-[12px] text-[#C5A059] tracking-[1.2em] font-bold uppercase mb-4">MECÂNICA ESTRUTURAL</p>
          <h2 className="title-gold italic text-6xl mb-6">A Geometria do Blend</h2>
          <div className="w-12 h-px bg-red-800 mx-auto" />
        </div>
        
        <p className="font-serif italic text-2xl leading-relaxed text-[#F5F5DC]/70 max-w-2xl mx-auto mb-10 text-center">
          &quot;Construir alta perfumaria e cosmética não é um exercício de intuição amadora. Toda fórmula se ergue perante quatro fundações imutáveis:&quot;
        </p>

        <div className="bg-[#C5A059]/5 border border-[#C5A059]/10 py-8 px-12 max-w-3xl mx-auto text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 -translate-y-16 translate-x-16">
            <div className="w-full h-full rounded-full border border-[#C5A059]" />
          </div>
          <h3 className="technical-label text-[12px] text-[#C5A059] mb-8 flex items-center gap-4 font-bold tracking-widest uppercase">
            <div className="w-3 h-3 bg-red-800 rounded-full shadow-[0_0_10px_rgba(139,0,0,0.5)]" /> 
            Arquitetura da Composição
          </h3>
          <div className="grid grid-cols-2 gap-x-16 gap-y-12 font-serif text-[#F5F5DC]/70 italic">
            {pillars.map((p) => (
              <div key={p.num} className="border-b border-neutral-900 pb-6">
                <span className="text-[#C5A059] font-bold not-italic text-[19px] block mb-2">{p.num}. {p.title}</span>
                <p className="text-[15px] text-[#F5F5DC]/70 leading-relaxed text-justify">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
