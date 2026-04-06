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
          className="opacity-50 object-center object-cover scale-105 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />
      </div>

      {/* 🛡️ Tarja Rubi de Identificação */}
      <div className="relative z-10 mb-8 text-left">
        <div className="bg-[#050508]/40 backdrop-blur-md border border-red-800/20 py-3 px-6 border-l-4 border-l-red-800 inline-block shadow-2xl">
          <p className="technical-label text-[11px] text-[#C5A059] font-bold uppercase tracking-[0.8em] p-0 m-0 drop-shadow-lg">
            Protocolo — Capítulo {chapter.chapterId}
          </p>
        </div>
      </div>

      {/* 🏛️ Conjunto do Título Monumental */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="title-gold text-[82px] leading-[0.95] italic tracking-tight drop-shadow-2xl">
          {chapter.chapterTitle}
        </h1>
        <div className="w-32 h-px bg-red-800/60 mt-8" />
      </div>

      <div className="flex-1" /> {/* ESPAÇO 1: Título => Texto */}

      {/* 🖋️ Descrição de Abertura */}
      <div className="relative z-10 max-w-2xl">
        <p className="font-serif text-[26px] leading-[1.3] text-[#F5F5DC]/80 italic border-l border-neutral-800 pl-8 pb-2">
          &quot;{chapter.chapterDesc}&quot;
        </p>
      </div>

      <div className="flex-1" /> {/* ESPAÇO 2: Texto => Quadros */}

      {/* 📊 Seção Técnica e Manifesto (Base) */}
      <div className="relative z-10 grid grid-cols-5 gap-12">
        {/* Box Manifesto (Ocupa 3 colunas) */}
        <div className="col-span-3 bg-[#050508]/30 backdrop-blur-sm border border-[#C5A059]/10 p-10 shadow-inner">
          <h5 className="technical-label text-[10px] !text-[#C5A059] mb-6 uppercase tracking-[0.3em] font-bold">O Manifesto Ativo</h5>
          <p className="font-serif text-[16px] leading-relaxed italic text-neutral-400 opacity-90 text-justify">
            {chapter.chapterManifesto}
          </p>
        </div>
        
        {/* Especificações (Ocupa 2 colunas) */}
        <div className="col-span-2 flex flex-col justify-center pl-2 border-none">
          <div className="w-full bg-[#050508]/20 backdrop-blur-sm border border-red-800/10 pl-4 pr-2 py-4 border-l-2 border-l-red-800 shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
            <p className="technical-label text-[10px] !text-[#C5A059] font-bold uppercase tracking-[0.5em] p-0 m-0 drop-shadow-lg mb-3">
              Ficha de Campo
            </p>
            {chapter.chapterSpecs?.map((spec, s) => (
              <div key={s} className="flex items-center gap-2 mb-3">
                <div className="w-1 h-1 bg-red-800 rounded-full shadow-[0_0_10px_rgba(139,0,0,0.4)] opacity-80 shrink-0" />
                <p className="font-serif text-[15px] leading-relaxed italic text-neutral-400 opacity-90 m-0 tracking-tight">
                  {spec}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1" /> {/* ESPAÇO 3: Quadros => Rodapé */}
    </PageShell>
  );
}
