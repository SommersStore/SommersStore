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
  const titleLines = chapter.chapterTitle.split("\u00A0");

  return (
    <PageShell pageNum={pageNum} className="justify-center">
      {/* 🌌 Background Imagem - RECUPERADA */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image 
          src={chapter.imageAbertura || "/ebook/master_cover.png"} 
          alt="Chapter Background" 
          fill 
          sizes="100vw" 
          className="filter grayscale opacity-30 object-center object-cover scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508]" />
      </div>

      <div className="relative z-10 w-full pl-24 pt-2 text-left">
        {/* 🛡️ Tarja Rubi Alinhada */}
        <div className="mb-12 bg-[#050508]/20 backdrop-blur-sm border border-red-800/10 py-3 px-6 border-l-4 border-l-red-800 inline-block shadow-[0_5px_15px_rgba(0,0,0,0.3)] -ml-4">
          <p className="technical-label text-[12px] text-[#C5A059] font-bold uppercase tracking-[0.8em] p-0 m-0 drop-shadow-lg">
            Capítulo — {chapter.chapterId}
          </p>
        </div>

        <div className="mb-16 -ml-4 w-[110%]">
          <h1 className="title-gold text-[82px] leading-[0.9] italic tracking-tighter flex flex-col">
            {titleLines.map((line, i) => (
              <span key={i} className={i === 1 ? "ml-12" : i === 2 ? "ml-24" : ""}>
                {line}
              </span>
            ))}
          </h1>
        </div>
        
        <p className="font-serif text-[24px] leading-snug text-[#F5F5DC]/90 italic max-w-xl mb-12">
          &quot;{chapter.chapterDesc}&quot;
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-10 mt-6 mb-2 px-12">
        {/* 🏛️ Box Manifesto Alpino */}
        <div className="bg-[#050508]/40 border border-[#C5A059]/10 p-10 -translate-y-4 backdrop-blur-md relative text-center">
          <h5 className="technical-label text-[10px] text-[#C5A059] mb-4 uppercase tracking-[0.4em] font-bold opacity-70">O Manifesto das Botânicas&nbsp;Secretas</h5>
          <p className="font-serif text-[18px] leading-snug italic text-neutral-300 opacity-90 text-justify">
            {chapter.chapterManifesto}
          </p>
        </div>
        
        {/* 📜 Especificações Técnicas Rubi */}
        <div className="flex flex-col justify-center -translate-y-4">
          <div className="space-y-6">
            <h5 className="technical-label text-[10px] text-[#C5A059] mb-4 uppercase tracking-[0.4em] font-bold opacity-70 border-b border-neutral-900 pb-2">Especificações Técnicas</h5>
            {chapter.chapterSpecs?.map((spec, s) => (
              <div key={s} className="flex items-center gap-4 border-b border-neutral-900 pb-3">
                <div className="w-2 h-2 bg-red-800 rounded-full shadow-[0_0_8px_rgba(139,0,0,0.5)]" />
                <span className="font-serif italic text-[18px] text-neutral-400">{spec}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 h-px bg-neutral-900 w-full opacity-30" />
        </div>
      </div>
    </PageShell>
  );
}
