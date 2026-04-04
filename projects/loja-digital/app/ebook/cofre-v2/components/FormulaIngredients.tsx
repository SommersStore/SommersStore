"use client";

import React from "react";
import Image from "next/image";
import type { Chapter, Formula } from "../types/chapters";

interface FormulaIngredientsProps {
  item: Formula;
  pageNum: string;
}

export default function FormulaIngredients({ item, pageNum }: FormulaIngredientsProps) {
  return (
    <article className="page-a4 px-16 pt-12 pb-8 relative border border-neutral-900/50 flex flex-col">
      {/* Background sutil */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0a10] to-[#050508]" />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-16">
        <div className="flex items-center gap-6 mb-12">
          <div className="bg-[#050508]/20 backdrop-blur-sm border border-red-800/10 py-3 px-5 border-l-4 border-l-red-800 inline-block shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
            <p className="technical-label text-[11px] text-[#C5A059] font-bold uppercase tracking-[0.6em] p-0 m-0 drop-shadow-lg">
              COMPOSIÇÃO VISUAL – F{item.id}
            </p>
          </div>
        </div>
        <h3 className="title-gold text-4xl italic leading-tight tracking-tight mb-4">
          {item.title.replace(/\u00A0/g, ' ')}
        </h3>
        <p className="technical-label text-[10px] text-neutral-500 tracking-[0.4em]">
          {item.origin} • {item.ingredients.length} INSUMOS SELECIONADOS
        </p>
        <div className="w-16 h-px bg-red-800/60 mt-4" />
      </div>

      {/* Grid de Ingredientes */}
      <div className="relative z-10 flex-1">
        <div className="ingredient-grid">
          {item.ingredientImages.map((ing, i) => (
            <div key={i} className="ingredient-card">
              <div className="img-frame">
                <div className="absolute inset-0 bg-neutral-900/40" />
                <Image
                  src={ing.imagePath}
                  alt={ing.name}
                  fill
                  sizes="200px"
                  className="object-cover filter brightness-90 contrast-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.opacity = '0'; // Apenas oculta a imagem quebrada, revelando o quadro escuro
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/40 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-[9px] text-red-800 font-bold uppercase tracking-tighter font-[Montserrat,sans-serif]">
                    INS_0{i + 1}
                  </span>
                </div>
              </div>
              <p className="ingredient-name">{ing.name}</p>
              <p className="ingredient-qty">{ing.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nota de qualidade sutil junto ao rodapé */}
      <div className="relative z-10 mb-6 bg-[#C5A059]/5 border-l-2 border-red-800/30 p-4">
        <p className="font-serif text-[11px] italic text-neutral-500 leading-relaxed max-w-3xl">
          Todos os insumos devem ser adquiridos de fornecedores certificados com laudo de pureza. 
          A qualidade dos óleos essenciais é determinante para o resultado final da composição e para a segurança dermatológica do produto acabado.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-neutral-900/50 flex justify-between relative z-10">
        <span className="technical-label text-[10px] text-neutral-700 font-bold tracking-widest">THE BLACK PROTOCOL // DELUXE MASTER EDITION.</span>
        <span className="accent-red font-bold text-[10px]">PAG. {pageNum}</span>
      </div>
    </article>
  );
}
