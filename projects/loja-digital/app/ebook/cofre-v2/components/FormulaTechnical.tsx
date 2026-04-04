import React from "react";
import Image from "next/image";
import type { Chapter, Formula } from "../types/chapters";

interface FormulaTechnicalProps {
  item: Formula;
  pageNum: string;
}

export default function FormulaTechnical({ item, pageNum }: FormulaTechnicalProps) {
  // Flag para identificar páginas densas que precisam de ajuste de altura para o rodapé respirar
  const isDensePage = item.id === '07' || item.id === '08' || item.id === '09' || item.id === '11' || item.id === '16';

  return (
    <article className="page-a4 px-16 pt-12 pb-8 justify-between relative border border-neutral-900/50 flex flex-col">
      <div className="shadow-flow-container">
        <Image src={item.imageShadow} alt="" fill sizes="50vw" />
        <div className="shadow-flow-mask" />
      </div>

      <div className="relative z-10 border-l-2 border-red-800/40 pl-6 pt-2">
        <div className={`${isDensePage ? 'mb-12' : 'mb-16'} bg-[#050508]/20 backdrop-blur-sm border border-red-800/10 py-3 px-6 border-l-4 border-l-red-800 inline-block shadow-[0_5px_15px_rgba(0,0,0,0.3)]`}>
          <h4 className="technical-label text-[12px] text-[#C5A059] font-bold uppercase tracking-[0.8em] p-0 m-0 drop-shadow-lg">
            FÓRMULA - {item.id}
          </h4>
        </div>
        
        <div className={`grid grid-cols-2 ${isDensePage ? 'gap-6' : 'gap-8'} mb-4 items-start`}>
          <div>
            <h5 className="title-gold font-bold text-lg uppercase mb-6 tracking-widest flex items-center gap-2 leading-none">
              <div className="w-2 h-2 bg-red-800 rounded-full" /> Insumos Elite
            </h5>
            <ul className="text-[18px] space-y-4 font-serif italic text-neutral-300">
              {item.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-3 border-b border-neutral-900 pb-3">
                  <span className="text-[11px] text-red-800 font-bold uppercase tracking-tighter">0{i+1}</span>
                  <span className="leading-tight">{ing}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="title-gold font-bold text-lg uppercase mb-6 tracking-widest flex items-center gap-2 leading-none">
              <div className="w-2 h-2 bg-red-800 rounded-full" /> Alchemists Protocol
            </h5>
            <p className={`text-[16px] leading-relaxed text-neutral-200 font-serif italic border-b border-neutral-900 text-justify ${isDensePage ? 'mb-6 pb-4' : 'mb-8 pb-6'}`}>
              {item.ritual}
            </p>
            
            <div className="mb-6">
              <h6 className="technical-label text-[12px] mb-4 text-[#C5A059] font-bold">Modo de Preparo</h6>
              <ol className={`font-serif italic leading-relaxed text-neutral-400 ${isDensePage ? 'text-[15.5px] space-y-2' : 'text-[16px] space-y-3'}`}>
                {item.preparation.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-red-800 font-bold shrink-0">{i+1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={`border-l-2 border-red-800 bg-red-800/5 ${isDensePage ? 'p-4' : 'p-5'}`}>
              <p className="technical-label text-[11px] mb-2 text-[#C5A059] font-bold uppercase">Apresentação Luxury</p>
              <p className={`${isDensePage ? 'text-[13.5px]' : 'text-[15px]'} text-neutral-400 italic leading-snug text-justify`}>
                {item.presentationBox || "Envase em vidro escurecido. Adicione flores secas no topo para selar a assinatura visual da marca Essência Ativa BR™."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`relative z-10 text-center border-y border-neutral-900/50 mt-auto ${isDensePage ? 'py-4' : 'py-6'}`}>
        <p className={`title-gold font-serif italic opacity-90 leading-tight ${item.legacyPhrase.length > 150 ? 'text-xl px-12' : 'text-[26px] px-8'}`}>
          &quot;{item.legacyPhrase}&quot;
        </p>
      </div>

      <div className="pt-4 border-t border-neutral-900/50 flex justify-between relative z-10">
        <span className="technical-label text-[10px] text-neutral-700 font-bold tracking-widest">THE BLACK PROTOCOL // DELUXE MASTER EDITION.</span>
        <span className="accent-red font-bold text-[10px]">PAG. {pageNum}</span>
      </div>
    </article>
  );
}
