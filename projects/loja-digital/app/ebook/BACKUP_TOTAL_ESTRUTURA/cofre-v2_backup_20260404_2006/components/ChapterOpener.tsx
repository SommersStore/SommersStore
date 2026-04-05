import React from "react";
import Image from "next/image";
import PageShell from "./PageShell";

interface ChapterOpenerProps {
  chapter: {
    chapterId: string;
    chapterTitle: string;
    chapterDesc: string;
    chapterManifesto: string;
    chapterSpecs: string[];
    imageAbertura: string;
  };
  pageNum: string;
}

export default function ChapterOpener({ chapter, pageNum }: ChapterOpenerProps) {
  const titleLines = chapter.chapterTitle.split(/\s+/); // Divide por espaços para controle de linha

  return (
    <PageShell pageNum={pageNum} className="justify-start pt-12 px-24">
      {/* 🌌 Background Imagem - Atmosfera Imersiva */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image 
          src={chapter.imageAbertura || "/ebook/master_cover.png"} 
          alt="Chapter Background" 
          fill 
          sizes="100vw" 
          className="filter grayscale opacity-25 object-center object-cover scale-105 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />
      </div>

      {/* 🛡️ Tarja Rubi de Identificação */}
      <div className="relative z-10 mb-10 text-left">
        <div className="bg-[#050508]/40 backdrop-blur-md border border-red-800/20 py-3 px-6 border-l-4 border-l-red-800 inline-block shadow-2xl">
          <p className="technical-label text-[11px] text-[#C5A059] font-bold uppercase tracking-[0.8em] p-0 m-0 drop-shadow-lg">
            Protocolo — Capítulo {chapter.chapterId}
          </p>
        </div>
      </div>

      {/* 🏛️ Conjunto do Título Monumental */}
      <div className="relative z-10 mb-16 max-w-4xl">
        <h1 className="title-gold text-[88px] leading-[0.85] italic tracking-tighter flex flex-col drop-shadow-2xl">
          {titleLines.map((line, i) => (
            <span key={i} className={i === 1 ? "ml-16" : i === 2 ? "ml-32" : ""}>
              {line}
            </span>
          ))}
        </h1>
        <div className="w-32 h-px bg-red-800/60 mt-8" />
      </div>

      {/* 🖋️ Descrição de Abertura */}
      <div className="relative z-10 mb-20 max-w-2xl">
        <p className="font-serif text-[26px] leading-[1.3] text-[#F5F5DC]/80 italic border-l border-neutral-800 pl-8">
          &quot;{chapter.chapterDesc}&quot;
        </p>
      </div>

      {/* 📊 Seção Técnica e Manifesto (Base) */}
      <div className="relative z-10 grid grid-cols-5 gap-12 mt-auto pb-4">
        {/* Box Manifesto (Ocupa 3 colunas) */}
        <div className="col-span-3 bg-[#050508]/60 backdrop-blur-xl border border-[#C5A059]/10 p-10 shadow-inner">
          <h5 className="technical-label text-[9px] text-[#C5A059] mb-6 uppercase tracking-[0.5em] font-bold opacity-60">O Manifesto Ativo</h5>
          <p className="font-serif text-[17px] leading-relaxed italic text-neutral-300 opacity-90 text-justify">
            {chapter.chapterManifesto}
          </p>
        </div>
        
        {/* Especificações (Ocupa 2 colunas) */}
        <div className="col-span-2 flex flex-col justify-center border-l border-neutral-900/50 pl-12">
          <div className="space-y-6">
            <h5 className="technical-label text-[9px] text-[#C5A059] mb-4 uppercase tracking-[0.5em] font-bold opacity-60">Ficha de Campo</h5>
            {chapter.chapterSpecs?.map((spec, s) => (
              <div key={s} className="flex items-center gap-4 border-b border-neutral-950 pb-4">
                <div className="w-1.5 h-1.5 bg-red-800 rounded-full shadow-[0_0_10px_rgba(139,0,0,0.4)]" />
                <span className="font-serif italic text-[17px] text-neutral-400 tracking-wide">{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
