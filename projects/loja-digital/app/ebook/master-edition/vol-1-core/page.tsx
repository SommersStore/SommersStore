'use client';

import React from 'react';
import Image from 'next/image';
import '../styles.css';

/**
 * THE BLACK PROTOCOL: VOLUME I - O PREÂMBULO
 * Orquestração: @architect Aria + @copywriter Sage
 * Status: Build Estrito / Imutável
 */

export default function Volume1Core() {
  return (
    <main className="ebook-master-frame font-serif bg-[#050508]">
      
      {/* ── PAGE 01: MASTER COVER ── */}
      <section className="page-a4 relative flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/ebook/master_cover_v2.png" 
            alt="The Black Protocol Master Cover" 
            fill 
            className="object-cover opacity-90 grayscale brightness-75" 
          />
          <div className="cover-overlay"></div>
        </div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="technical-label mb-8">SOMMERSSTORE © MMXV — MMXXVI</div>
          <h1 className="text-[92px] title-gold font-light italic leading-none tracking-[-0.06em]">
            The Black Protocol
          </h1>
          <div className="mt-6 flex flex-col items-center gap-1">
            <h2 className="sans-extra-light text-[11px] tracking-[0.8em] uppercase text-white/50">Master Edition</h2>
            <div className="h-px w-24 bg-[#C5A059]/30 mt-4 backdrop-blur-sm"></div>
          </div>
          
          <div className="absolute bottom-[-160px] flex flex-col items-center">
            <p className="sans-extra-light text-[9px] uppercase tracking-[0.4em] text-white/40">Curadoria Analítica por</p>
            <p className="title-gold italic text-[14px] mt-2">Elisa Clark</p>
          </div>
        </div>

        {/* Footer Imutável */}
        <div className="footer-stamp">
          <span>vol i: preâmbulo</span>
          <span className="opacity-0">01</span> {/* Capa não exibe número visível mas reserva o espaço */}
          <span>aristocratic ritual</span>
        </div>
      </section>

      {/* ── PAGE 02: O MANIFESTO ── */}
      <section className="page-a4 relative p-[3.2rem] flex flex-col justify-center">
        <div className="max-w-[520px]">
          <div className="technical-label text-[#C5A059]/50 mb-12">I. Manifesto Editorial</div>
          
          <h2 className="manifesto-title text-white italic">
            O Despertar da <span className="title-gold">Alquimia</span>
          </h2>
          
          <div className="manifesto-body text-[#F5F5DC]/80 space-y-6">
            <p>
              O tempo de ignorância sobre a própria biologia energética terminou. O que você segura agora não é um manual de perfumes, nem uma lista de receitas caseiras. 
              <strong> The Black Protocol</strong> é a transmutação final — a união entre a botânica secular e os segredos da vibração hertziana.
            </p>
            
            <p>
              Nesta <em>Master Edition</em>, decidimos fracionar o conhecimento em 5 pilares para proteger a sua mente do excesso, e permitir que o seu espírito absorva a densidade de cada elemento. Aqui, cada mililitro é uma decisão; cada grama de sal é um portal.
            </p>

            <blockquote className="border-l border-[#C5A059]/30 pl-6 py-2 my-8 italic text-[#C5A059]">
              "A verdadeira aristocracia não está no que você possui, mas no segredo ritual que você domina em sua própria presença."
            </blockquote>

            <p className="text-[13px] opacity-80 decoration-gold/30">
              Prepare-se. O volume II selará a sua transição. No Volume IV, a matéria será sua para governar. Mas agora, relaxe a sua tensão e deixe a sua percepção se tornar... negra.
            </p>
          </div>

          <div className="mt-16 flex items-center gap-4">
             <div className="h-px bg-white/10 flex-1"></div>
             <div className="text-[10px] technical-label text-white/20">ELISA CLARK — RITUALIST EDITION</div>
             <div className="h-px bg-white/10 flex-1"></div>
          </div>
        </div>

        {/* Footer Imutável */}
        <div className="footer-stamp">
          <span>the black protocol</span>
          <span className="text-[10px] text-white/50">02</span>
          <span>MMXXVI</span>
        </div>
      </section>

    </main>
  );
}
