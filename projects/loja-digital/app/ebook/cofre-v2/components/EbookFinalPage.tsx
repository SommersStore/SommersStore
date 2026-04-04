import React from "react";
import Image from "next/image";

export default function EbookFinalPage({ pageNum }: { pageNum: string }) {
  return (
    <article className="page-a4 overflow-hidden relative border border-neutral-900/50 flex flex-col items-center justify-center text-center px-16">
      {/* Conteúdo Original Estável */}
      <div className="absolute inset-0 z-0">
        <Image src="/ebook/master_cover.png" alt="" fill className="object-cover opacity-20 grayscale" />
      </div>
      <div className="relative z-10 text-center">
        <h2 className="title-gold text-[60px] italic leading-tight mb-8">O Cofre está Sob seu Comando.</h2>
        <p className="font-serif text-[20px] text-neutral-400 italic">A maestria é eterna. O ritual agora é sua assinatura.</p>
      </div>
    </article>
  );
}
