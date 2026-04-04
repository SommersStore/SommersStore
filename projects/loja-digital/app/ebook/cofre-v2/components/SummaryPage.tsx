import React from "react";
import Image from "next/image";
import PageShell from "./PageShell";
import protocolChapters from "../data/chapters";
import type { Chapter, Formula } from "../types/chapters";

interface SummaryPageProps {
  chapters: Chapter[];
  pageNum: string;
}

export default function SummaryPage({ chapters, pageNum }: SummaryPageProps) {
  // Configuração de numeração dinâmica: 3 páginas por fórmula (Sensorial + Ingredientes + Técnica)
  // P06 é a abertura do Cap I
  const getPageNum = (capIdx: number, formulaIdx: number) => {
    const formulasBefore = chapters.slice(0, capIdx).reduce((acc: number, c: Chapter) => acc + c.formulas.length, 0);
    // Cada capítulo anterior: 1 abertura + (fórmulas * 3 páginas)
    const chapterStart = 6 + (capIdx * 1) + (formulasBefore * 3);
    // Página da fórmula: abertura + 1 (Sensorial) + (posição * 3)
    return String(chapterStart + 1 + (formulaIdx * 3)).padStart(2, '0');
  };

  return (
    <PageShell pageNum={pageNum} className="justify-center pt-8 px-12 font-serif overflow-hidden">
      {/* Background Decorativo — Sutil e Nobre */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image src="/ebook/botanical.png" alt="Botanicals" fill sizes="100vw" className="filter grayscale opacity-[0.14] object-center object-contain scale-125 shadow-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#050508]/60 to-[#050508] opacity-95" />
      </div>

      <div className="relative z-10 w-full flex flex-col h-full max-h-[880px]">
        {/* Cabeçalho do Sumário — Subindo especificamente os títulos */}
        <div className="text-center mb-10 -mt-8">
          <p className="technical-label text-[12px] text-[#C5A059] tracking-[1.2em] font-bold uppercase mb-0.5 opacity-60 italic border-none shadow-none">ARQUIVO DE COMPOSIÇÕES</p>
          <h2 className="title-gold italic text-[48px] mb-1 leading-none whitespace-nowrap border-none shadow-none">O Cofre das Botânicas Secretas</h2>
          <div className="w-16 h-px bg-red-800 mx-auto" />
        </div>

        {/* Quadro Único — Otimizado Verticalmente para os 5 Capítulos */}
        <div className="max-w-4xl mx-auto w-full relative overflow-hidden bg-[#C5A059]/5 border border-[#C5A059]/10 p-6 shadow-none rounded-sm">
          <div className="absolute top-0 right-0 w-80 h-80 opacity-5 -translate-y-40 translate-x-40 pointer-events-none">
            <div className="w-full h-full rounded-full border border-[#C5A059] scale-150 shadow-none border-none" />
          </div>
          
          <div className="flex flex-col space-y-2">
            {chapters.map((cap, i) => (
              <div key={i} className="relative z-10">
                {/* Cabeçalho de Capítulo — Design Seco e Luxuoso */}
                <h3 className="technical-label text-[13px] text-[#C5A059] mb-1 tracking-[0.2em] border-b border-neutral-900/50 pb-1 font-bold flex items-center justify-between italic uppercase border-none shadow-none">
                  <span className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 bg-red-800 rounded-full shadow-none border-none" />
                    CAP. {cap.chapterId} — {cap.chapterTitle.toUpperCase()}
                  </span>
                  <span className="text-[10px] opacity-30 font-sans tracking-normal border-none shadow-none">CORE_{cap.chapterId}</span>
                </h3>

                {/* Lista de Fórmulas — Usando a Fonte da P07 (18px italic) apenas no Título */}
                <div className="flex flex-col gap-0.5 px-3">
                  {cap.formulas.map((f: Formula, j: number) => (
                    <div key={f.id} className="flex justify-between items-baseline border-b border-neutral-900/20 pb-0.5 group hover:border-[#C5A059]/30 transition-colors border-none shadow-none">
                      <span className="text-[#F5F5DC]/90 text-[18px] italic tracking-tight group-hover:text-[#F5F5DC] transition-all duration-300 leading-none border-none shadow-none">
                        {f.title.replace(/\u00A0/g, ' ')}
                        <span className="opacity-20 text-[10px] uppercase tracking-tighter ml-3 font-sans font-normal border-none shadow-none">({f.category})</span>
                      </span>
                      <div className="flex-1 border-b border-dotted border-white/5 mx-4" />
                      <span className="text-[#C5A059] text-[11px] font-bold tracking-widest sans-extra-light shrink-0 border-none shadow-none">
                        PAG. {getPageNum(i, j)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer de Encerramento Superior ao Rodapé Oficial — Removido para limpeza */}
      </div>
    </PageShell>
  );
}
