import React from "react";
import Image from "next/image";
import PageShell from "./PageShell";

export default function ClosingPage({ pageNum }: { pageNum: string }) {
  return (
    <PageShell pageNum={pageNum} className="justify-center">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image src="/ebook/botanical.png" alt="Legacy" fill sizes="100vw" className="filter grayscale opacity-20 object-center object-cover scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508] opacity-80" />
      </div>

      <div className="relative z-10 text-center h-full flex flex-col items-center py-12">
        <div className="mt-32">
          <h2 className="title-gold italic text-6xl mb-6">O Legado Continua...</h2>
          <div className="flex flex-col items-center gap-4 mb-16">
            <div className="w-12 h-px bg-red-800" />
            <p className="technical-label text-[13px] text-[#C5A059] tracking-[0.6em] font-bold uppercase"
               style={{ textShadow: '0 2px 10px rgba(197, 160, 89, 0.4)' }}>
              PROTOCOLO DE SOBERANIA: SELADO
            </p>
          </div>
          
          <div className="font-serif italic text-2xl leading-relaxed text-[#F5F5DC]/75 space-y-8 max-w-xl mx-auto mb-20 text-center px-12">
            <p style={{ textShadow: '0 4px 20px rgba(197, 160, 89, 0.2)' }}>
              &quot;As melhores fórmulas não tratam o corpo. Elas devolvem a pessoa para si.&quot;
            </p>
            <p className="text-lg opacity-70">A partir deste ponto, a alquimia deixa de ser técnica e passa a ser identidade. O seu Cofre está aberto; certifique-se de que cada gota conte a história da sua própria soberania.</p>
          </div>
        </div>

        {/* Bloco Jurídico Centralizado com Transparência Etérea Restaurada */}
        <div className="mt-auto bg-[#050508]/10 border border-[#C5A059]/5 p-12 max-w-2xl mx-auto text-center relative overflow-hidden backdrop-blur-md">
          {/* Efeito Estético de Esfera no Fundo */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 -translate-y-16 translate-x-16 pointer-events-none">
            <div className="w-full h-full rounded-full border border-[#C5A059]" />
          </div>

          <h3 className="technical-label text-[12px] text-[#C5A059] mb-8 flex items-center justify-center gap-4 font-bold tracking-[0.4em] uppercase">
            <div className="w-3 h-3 bg-red-800 rounded-full shadow-[0_0_10px_rgba(139,0,0,0.5)]" /> 
            CERTIFICAÇÃO DE PROPRIEDADE
          </h3>
          
          <div className="font-serif text-neutral-500 text-[13.5px] italic space-y-8 px-8 flex flex-col items-center">
            <p className="leading-relaxed text-center w-full max-w-md">
              Este volume é um ativo digital exclusivo da Sommer&apos;s Store Ltda. 
              A reprodução sem autorização é um desvio de conduta ética e comercial.
            </p>
            
            <div className="border-t border-neutral-900/50 pt-8 mt-4 w-full flex flex-col items-center">
              <p className="text-[11px] uppercase text-[#F5F5DC]/20 tracking-[1.2em] font-light mb-6">Essência Ativa BR™</p>
              <div className="text-[10px] technical-label text-neutral-800 tracking-[0.5em] font-bold uppercase mt-auto">
                <p>Sommer&apos;s Store Ltda</p>
                <p className="mt-2 text-[9px] opacity-50">Todos os Direitos Reservados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
