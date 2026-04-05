import React from "react";
import Image from "next/image";
import PageShell from "./PageShell";
import { Chapter, Formula } from "../types/chapters";

interface SummaryPagePart2Props {
  chapters: Chapter[];
  pageNum: string;
}

export default function SummaryPagePart2({ chapters, pageNum }: SummaryPagePart2Props) {
  // Página 2: Capítulos IV e V
  const page2Chapters = chapters.slice(3, 5);
  
  // Cálculo de página inicial coerente: 3 páginas por fórmula
  let cumulativePage = 30; 

  return (
    <PageShell pageNum={pageNum} className="justify-center pt-24 px-24 font-serif">
      {/* Background Decorativo */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image src="/ebook/botanical.png" alt="Botanicals" fill sizes="100vw" className="filter grayscale opacity-[0.14] object-center object-contain rotate-180 scale-125 shadow-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] opacity-95" />
      </div>

      <div className="relative z-10 w-full mb-12">
        <div className="text-center mb-12">
          <p className="technical-label text-[14px] text-[#C5A059] tracking-[1em] font-bold uppercase mb-4 opacity-60 italic border-none shadow-none">ARQUIVO DE COMPOSIÇÕES</p>
          <h2 className="title-gold italic text-[84px] mb-4 leading-none tracking-tighter border-none shadow-none">Protocolo Negro</h2>
          <div className="w-24 h-px bg-red-800 mx-auto" />
        </div>

        {/* Quadro Principal Parte II */}
        <div className="max-w-4xl mx-auto w-full relative overflow-hidden bg-[#C5A059]/5 border border-[#C5A059]/10 p-12 rounded-sm shadow-none">
          <div className="absolute top-0 right-0 w-80 h-80 opacity-5 -translate-y-40 translate-x-40">
            <div className="w-full h-full rounded-full border border-[#C5A059] scale-150" />
          </div>
          
          <div className="flex flex-col space-y-12">
            {page2Chapters.map((cap: Chapter, iIdx: number) => {
              const capStart = cumulativePage;
              cumulativePage += 1 + (cap.formulas.length * 3);

              return (
                <div key={iIdx} className="relative z-10">
                  <h3 className="technical-label text-[16px] text-[#C5A059] mb-6 tracking-widest border-b border-neutral-900 pb-3 font-bold flex items-center justify-between italic uppercase border-none shadow-none">
                    <span className="flex items-center gap-4">
                      <div className="w-3.5 h-3.5 bg-red-800 rounded-full" />
                      CAP. {cap.chapterId} — {cap.chapterTitle.toUpperCase()}
                    </span>
                    <span className="text-[12px] opacity-40 font-sans tracking-normal">({cap.formulas.length} FÓRMULAS)</span>
                  </h3>

                  <div className="grid grid-cols-1 gap-5">
                    {cap.formulas.map((f: Formula, jIdx: number) => (
                      <div key={f.id} className="flex justify-between items-baseline border-b border-neutral-900/30 pb-2 group hover:border-[#C5A059]/40 transition-colors">
                        <span className="text-[#F5F5DC]/90 text-[20px] italic tracking-tight group-hover:text-[#F5F5DC] transition-all duration-300 leading-none">
                          {f.title.replace(/\u00A0/g, ' ')}
                          <span className="opacity-20 text-[12px] uppercase tracking-tighter ml-4 font-sans">P_{f.category}</span>
                        </span>
                        <div className="flex-1 border-b border-dotted border-white/10 mx-6" />
                        <span className="text-[#C5A059] text-[16px] font-bold tracking-widest sans-extra-light shrink-0">
                          PAG. {String(capStart + 1 + (jIdx * 3)).padStart(2, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12 opacity-40">
          <p className="technical-label text-[11px] tracking-[0.5em] uppercase font-bold">— PARTE II / II —</p>
        </div>
      </div>
    </PageShell>
  );
}
