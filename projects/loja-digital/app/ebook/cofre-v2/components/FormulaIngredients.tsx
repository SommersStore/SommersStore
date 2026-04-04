"use client";

import React from "react";
import Image from "next/image";
import type { Formula } from "../types/chapters";

interface FormulaIngredientsProps {
  item: Formula;
  pageNum: string;
}

export default function FormulaIngredients({ item, pageNum }: FormulaIngredientsProps) {
  // Decomposição da origem para a lista
  const originParts = item.origin.split(/\s*[—-]\s*/);
  const region = originParts[0];
  const concept = originParts[1];

  return (
    <article className="page-a4 px-24 pt-12 pb-8 relative border border-neutral-900/50 flex flex-col">
      {/* Background sutil */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#050508] to-[#050508]" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-6 mb-8">
          <div className="bg-[#050508]/20 backdrop-blur-sm border border-red-800/10 py-3 px-5 border-l-4 border-l-red-800 inline-block shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
            <p className="technical-label text-[11px] text-[#C5A059] font-bold uppercase tracking-[0.6em] p-0 m-0 drop-shadow-lg">
              COMPOSIÇÃO VISUAL – F{item.id}
            </p>
          </div>
        </div>

        {/* 🏛️ Quadro de Origem Padronizado - Ficha Técnica Lateral (Margem Técnica de PX-16 / 64px) */}
        <div className="absolute top-0 -right-8 max-w-[220px] border-l border-red-800 bg-[#050508]/20 backdrop-blur-sm p-4 shadow-xl z-20">
          <h5 className="technical-label text-[11px] text-[#C5A059] mb-4 uppercase tracking-[0.6em] font-bold opacity-80">ORIGEM</h5>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 bg-red-800 rounded-full shrink-0 mt-1.5" />
              <span className="font-serif text-[13px] italic text-neutral-400 leading-tight opacity-90">{region}</span>
            </div>
            {concept && (
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-red-800 rounded-full shrink-0 mt-1.5" />
                <span className="font-serif text-[13px] italic text-neutral-400 leading-tight opacity-90">{concept}</span>
              </div>
            )}
            <div className="flex items-start gap-3">
              <div className="w-1 h-1 bg-red-800 rounded-full shrink-0 mt-1.5" />
              <span className="font-serif text-[13px] italic text-neutral-400 leading-none opacity-90">
                {item.ingredients.length} insumos selecionados
              </span>
            </div>
          </div>
        </div>

        <h3 className="title-gold text-4xl italic leading-tight tracking-tight mb-4 pr-32">
          {item.title.replace(/\u00A0/g, ' ')}
        </h3>
        <div className="w-16 h-px bg-red-800/60 mt-4" />
      </div>

      {/* Grid de Ingredientes Cinematográfico 9:16 */}
      <div className="formula-grid-container relative z-10">
        {item.ingredientImages.map((ing, i) => (
          <div key={i} className="ingredient-cinematic-card">
            <div className="img-frame">
              <div className="absolute inset-0 bg-neutral-900/40 z-0" />
              <Image
                src={ing.imagePath}
                alt={ing.name}
                fill
                sizes="300px"
                className="object-cover filter brightness-90 contrast-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '0'; // Apenas oculta a imagem quebrada
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
              
              {/* ID Tag superior */}
              <div className="absolute top-2 left-2 z-20">
                <span className="text-[8px] text-red-800 font-bold uppercase tracking-tighter font-[Montserrat,sans-serif]">
                  INS_0{i + 1}
                </span>
              </div>
            </div>
            
            {/* Legendagem Base */}
            <p className="ingredient-name">{ing.name}</p>
            <p className="ingredient-qty uppercase">{ing.quantity}</p>
          </div>
        ))}
      </div>

      {/* Nota de qualidade sutil junto ao rodapé */}
      <div className="relative z-10 mb-2 bg-[#C5A059]/5 border-l-2 border-red-800/30 p-4">
        <p className="font-serif text-[11px] italic text-neutral-500 leading-relaxed max-w-3xl">
          Todos os insumos devem ser adquiridos de fornecedores certificados com laudo de pureza. 
          A qualidade dos óleos essenciais é determinante para o resultado final da composição e para a segurança dermatológica do produto acabado.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-1 pt-4 border-t border-neutral-900/50 flex justify-center items-center relative z-10">
        <span className="technical-label text-[10px] text-neutral-700 font-bold tracking-widest uppercase">THE BLACK PROTOCOL // DELUXE MASTER EDITION.</span>
        <span className="accent-red font-bold text-[11px] uppercase tracking-widest absolute -right-8 bg-[#050508] pl-4">PAG. {pageNum}</span>
      </div>
    </article>
  );
}
