import React from "react";
import Image from "next/image";

export default function AlchemySilencePage({ pageNum }: { pageNum: string }) {
  return (
    <article className="page-a4 relative flex flex-col overflow-hidden border border-neutral-900/50">
      <div className="grid grid-cols-5 h-full w-full relative z-10 flex-1">
        {/* Coluna Esquerda: Texto Inspirador (60%) */}
        <div className="col-span-3 flex flex-col pl-24 pr-12 bg-[#050508] relative z-10 pt-12 pb-10">
          
          {/* 🛡️ Header Estilo Tarja: VISÃO & LEGADO - FIXO NO TOPO */}
          <div className="mb-0">
            <div className="bg-[#050508]/40 backdrop-blur-md border border-red-800/20 py-3 px-6 border-l-2 border-l-red-800 inline-block shadow-2xl">
              <p className="technical-label text-[11px] text-[#C5A059] font-bold uppercase tracking-[0.8em] p-0 m-0 drop-shadow-lg">
                Visão & Legado
              </p>
            </div>
          </div>

          <div className="flex-1" /> {/* CENTRALIZAÇÃO VERTICAL ELISA */}

          <div className="mb-0">
            <h2 className="title-gold italic text-6xl leading-tight block text-left">
              Elisa Clark
            </h2>
            <div className="w-20 h-px bg-red-800 mt-4 mb-16" />

            {/* Texto Justificado com cores vindas da p02 */}
            <div className="font-serif italic text-[18px] leading-relaxed text-[#F5F5DC]/70 space-y-12 max-w-lg">
              <div className="space-y-8 text-justify">
                <p className="first-letter:text-5xl first-letter:text-[#C5A059] first-letter:mr-3 first-letter:float-left">
                  Elisa Clark é a arquiteta visionária da <span className="text-[#C5A059] font-bold not-italic">Essência Ativa BR™</span>, um ecossistema dedicado ao bem-estar de alto padrão e à restauração sensorial profunda. Sob sua guarda, a marca desenvolveu sua linha mestre de <span className="text-[#C5A059] font-bold not-italic">Sais de Banho Terapêuticos e Artesanais</span>.
                </p>
                
                <p>
                  <span className="text-[#C5A059] font-bold not-italic text-[20px]">O Cofre das Botânicas Secretas</span> representa o ápice desta curadoria. Aqui, Elisa funde o rigor técnico com a intuição ancestral, criando protocolos que preparam o corpo para a soberania diária. 
                </p>
              </div>

              {/* 🖋️ Citação Compactada e Justificada */}
              <div className="bg-[#F5F5DC]/2 backdrop-blur-sm border border-white/5 px-8 py-4 border-l-2 border-l-red-800 shadow-2xl">
                <p className="text-[#F5F5DC]/70 italic text-[18px] text-justify leading-relaxed m-0">
                  &quot;O ritual é a ponte entre o caos e a ordem do eu interior. Começamos pelos sais, mas a jornada da Essência Ativa BR™ se expande para as velas aromáticas e novos portais que ainda estão por vir.&quot;
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1" /> {/* CENTRALIZAÇÃO VERTICAL ELISA */}
        </div>

        {/* Coluna Direita: Imagem com Selo de Transparência Sutil Compacto */}
        <div className="col-span-2 relative h-full w-full">
          <Image 
            src="/ebook/elisa_1.jpg" 
            alt="Elisa Clark" 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-transparent z-10" />
          
          {/* ✒️ Selo Compactado Estilo Pele de Vidro */}
          <div className="absolute bottom-28 right-8 z-20">
            <div className="bg-[#F5F5DC]/2 backdrop-blur-sm border border-white/5 px-6 py-3 border-l-2 border-l-red-800 inline-block text-left shadow-2xl">
              <p className="text-[#C5A059] italic text-[22px] leading-none mb-2 drop-shadow-md">
                Elisa Clark — 48
              </p>
              <p className="text-[#F5F5DC]/70 italic text-[16px] p-0 m-0 leading-none drop-shadow-sm">
                Essência Ativa BR™
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Manual - Sincronizado com Offset -right-12 para maior apoio à direita */}
      <div className="absolute bottom-12 left-24 right-24 pt-4 border-t border-neutral-900/50 flex justify-center items-center z-20">
        <span className="technical-label text-[10px] text-neutral-700 font-bold tracking-widest uppercase">THE BLACK PROTOCOL // DELUXE MASTER EDITION.</span>
        <span className="accent-red font-bold text-[11px] uppercase tracking-widest absolute -right-12 bg-[#050508] pl-4">PAG. {pageNum}</span>
      </div>
    </article>
  );
}
