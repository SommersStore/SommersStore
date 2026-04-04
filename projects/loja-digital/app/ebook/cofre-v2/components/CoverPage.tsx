import React from "react";
import Image from "next/image";

export default function CoverPage() {
  return (
    <section className="page-a4 px-24 pt-12 pb-8 flex flex-col justify-between items-center text-center bg-[#050508] relative overflow-hidden text-white/90">
      {/* TÍTULO ORIGINAL */}
      <div className="pt-12 relative z-10 w-full">
        <h1 className="text-4xl text-neutral-500 font-serif italic mb-2">O Cofre das Botânicas Secretas</h1>
        <div className="w-12 h-px bg-red-800 mx-auto mb-8" />
        <h2 className="text-7xl title-gold italic tracking-tighter leading-none mb-12">
          THE BLACK <br/> PROTOCOL
        </h2>
      </div>

      {/* IMAGEM NOVA (MASTER_COVER) — Única alteração mantida */}
      <div className="relative w-full h-[400px] border border-[#C5A059]/20 rounded-sm overflow-hidden shadow-[0_0_30px_rgba(197,160,89,0.08)]">
        <Image src="/ebook/master_cover.png" alt="The Black Protocol Master Cover" fill className="object-cover object-center image-pop" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/20 via-transparent to-[#050508]/20" />
      </div>

      {/* RODAPÉ ORIGINAL */}
      <div className="pb-8 mt-auto relative z-10 w-full border-t border-neutral-900/40 pt-8">
        <div className="mb-10">
          <p className="title-gold font-serif italic text-2xl opacity-90 leading-relaxed max-w-lg mx-auto">
            &quot;O verdadeiro luxo é o domínio absoluto sobre a própria paz e descanso.&quot;
          </p>
        </div>
        <div className="technical-label text-neutral-600 tracking-[0.3em] font-bold uppercase flex flex-col items-center gap-6">
          <p className="text-[13px] opacity-80 whitespace-nowrap text-neutral-600">Essência Ativa BR™</p>
          <p className="text-[10px] opacity-100 whitespace-nowrap text-neutral-600">DELUXE MASTER EDITION.</p>
        </div>
      </div>
    </section>
  );
}
