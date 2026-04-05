import React from "react";
import Image from "next/image";
import PageShell from "./PageShell";

export default function AlchemySilencePage({ pageNum }: { pageNum: string }) {
  return (
    <PageShell pageNum={pageNum} className="justify-center overflow-hidden">
      <div className="grid grid-cols-2 h-full w-full">
        {/* Coluna Esquerda: Texto Inspirador */}
        <div className="flex flex-col justify-center px-24 bg-[#050508] relative z-10">
          <div className="mb-12">
            <p className="technical-label text-[11px] text-[#C5A059] tracking-[0.8em] font-bold uppercase mb-4 opacity-60">Direção & Visão</p>
            <h2 className="title-gold italic text-6xl leading-tight mb-8">Elisa Clark:<br/>A Guardiã do<br/>Invisível</h2>
            <div className="w-20 h-px bg-red-800" />
          </div>

          <div className="font-serif italic text-[19px] leading-relaxed text-[#F5F5DC]/90 space-y-8 max-w-md">
            <p className="first-letter:text-5xl first-letter:text-[#C5A059] first-letter:mr-3 first-letter:float-left">
              O Protocolo Negro não é apenas uma coleção de fórmulas; é o testamento de uma alma que entendeu que o luxo supremo não é o que se possui, mas o que se sente no silêncio absoluto de uma banheira à meia-noite.
            </p>
            
            <p>
              Elisa é a coordenadora do projeto **Essência Ativa BR™** e de **O Cofre das Botânicas Secretas**. Ela nos ensinou que cada resina que sangra e cada mineral que repousa carrega uma frequência. Ela não cria produtos; ela arquiteta portais.
            </p>

            <p className="text-[#C5A059]/80 border-l border-[#C5A059]/20 pl-6 py-2">
              &quot;Não se apresse. A beleza exige maturação. O mundo lá fora pode esperar quatro anos por um Palo Santo, e ele pode esperar vinte minutos pelo seu renascimento.&quot;
            </p>

            <div className="pt-8 opacity-60">
              <p className="text-sm tracking-widest uppercase font-bold text-[#C5A059]">Elisa Clark — 48 Anos</p>
              <p className="text-xs italic text-neutral-500">Mentora e Visionária do Bem-Estar</p>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Imagem de Elisa Clark */}
        <div className="relative h-full w-full">
          <Image 
            src="/elisa_1.jpg" 
            alt="Elisa Clark" 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-80"
          />
          {/* Overlay de Gradiente para suavizar a transição */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050508_100%)] opacity-40 z-10" />
        </div>
      </div>
    </PageShell>
  );
}
