import React from "react";
import Image from "next/image";
import type { Chapter, Formula } from "../types/chapters";

interface FormulaTechnicalProps {
  item: Formula;
  pageNum: string;
}

export default function FormulaSensorial({ item, pageNum }: FormulaTechnicalProps) {
  return (
    <article className="page-a4 overflow-hidden relative px-16 pt-12 pb-8 flex flex-col">
      <div className="absolute inset-0 z-0 bg-[#050508]">
        <Image src={item.imageSensorial} alt={item.title} fill className="object-cover opacity-50 image-pop" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/10 to-[#050508]/30" />
      </div>
      <div className="mt-auto relative z-10 mb-4 w-full">
        <div className="w-full">
          <h2 className="title-gold text-[82px] mb-20 italic leading-[0.95] tracking-tight">
            {item.title.split('\u00A0').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < item.title.split('\u00A0').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
        </div>
        
        <div className="flex gap-12 justify-between items-start w-full">
          <div className="flex-1">
            <div className="mb-10 bg-[#050508]/20 backdrop-blur-sm border border-red-800/10 px-5 py-2.5 border-l-2 border-l-red-800 inline-block shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
              <p className="technical-label text-[12px] text-[#C5A059] font-bold uppercase tracking-[0.5em] p-0 m-0 drop-shadow-lg">
                {item.origin.split(/\s*[—-]\s*/)[0]}
              </p>
              {item.origin.split(/\s*[—-]\s*/)[1] && (
                <p className="technical-label text-[9px] text-neutral-400 font-bold uppercase tracking-[0.3em] p-0 mt-3 opacity-90">
                  {item.origin.split(/\s*[—-]\s*/)[1]}
                </p>
              )}
            </div>
            <p className="font-serif italic text-2xl leading-relaxed text-[#F5F5DC]/90 max-w-xl">
              &quot;{item.signature}&quot;
            </p>
          </div>
          
          <div className="flex-1 border-l border-neutral-800 p-8 bg-[#050508]/30 backdrop-blur-sm">
            <h5 className="technical-label text-[10px] text-[#C5A059] mb-6 uppercase tracking-[0.3em] font-bold">O Arquétipo Sensorial Absoluto</h5>
            <p className="font-serif text-[16px] leading-relaxed italic text-neutral-400 opacity-90 text-justify">
              {item.experienceDesc}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-6 right-8 z-20">
        <div className="[writing-mode:vertical-rl] bg-[#050508]/20 backdrop-blur-sm border border-red-800/10 py-6 px-3 border-t-2 border-t-red-800 inline-block shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
          <span className="technical-label text-[10px] text-[#C5A059] inline-block font-bold tracking-[0.8em] drop-shadow-lg">
            LEGACY PROTOCOL – {item.id}
          </span>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-neutral-900/50 flex justify-between relative z-10">
        <span className="technical-label text-[10px] text-neutral-700 font-bold tracking-widest">THE BLACK PROTOCOL // DELUXE MASTER EDITION.</span>
        <span className="accent-red font-bold text-[10px]">PAG. {pageNum}</span>
      </div>
    </article>
  );
}
