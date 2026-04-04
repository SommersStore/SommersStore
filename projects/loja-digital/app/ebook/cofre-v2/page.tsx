"use client";

import React from "react";
import "./styles.css";
import protocolChapters from "./data/chapters";
import { Chapter, Formula } from "./types/chapters";
import CoverPage from "./components/CoverPage";
import IntroPage from "./components/IntroPage";
import ManifestoPage from "./components/ManifestoPage";
import RulesPage from "./components/RulesPage";
import GeometryPage from "./components/GeometryPage";
import SummaryPage from "./components/SummaryPage";
import ChapterOpener from "./components/ChapterOpener";
import FormulaSensorial from "./components/FormulaSensorial";
import FormulaIngredients from "./components/FormulaIngredients";
import FormulaTechnical from "./components/FormulaTechnical";
import ClosingPage from "./components/ClosingPage";
import AlchemySilencePage from "./components/AlchemySilencePage";

export default function MasterEditionEbook() {
  return (
    <div className="ebook-wrapper" style={{ minHeight:'100vh', background:'#050508', paddingTop:'40px', paddingBottom:'40px', display:'flex', flexDirection:'column', alignItems:'center' }}>

      {/* PÁGINA 00 - CAPA (SEM NÚMERO) */}
      <CoverPage />

      {/* PÁGINAS INICIAIS (01-05) */}
      <IntroPage pageNum="01" />
      <ManifestoPage pageNum="02" />
      <RulesPage pageNum="03" />
      <GeometryPage pageNum="04" />
      <SummaryPage chapters={protocolChapters} pageNum="05" />

      {/* CAPÍTULOS DINÂMICOS (06-??) */}
      {protocolChapters.map((chapter: Chapter, cIdx: number) => {
        const formulasBefore = protocolChapters.slice(0, cIdx).reduce((acc: number, c: Chapter) => acc + c.formulas.length, 0);
        // Cada Capítulo abre com 1 pág + Fórmulas (3 pags cada: Sensorial, Ingredientes, Técnica)
        const chapterPageNum = (cIdx * 1) + (formulasBefore * 3) + 6;

        return (
          <React.Fragment key={chapter.chapterId}>
            <ChapterOpener chapter={chapter} pageNum={String(chapterPageNum).padStart(2, '0')} />

            {chapter.formulas.map((item: Formula, fIdx: number) => {
              const sensorialPage = chapterPageNum + 1 + (fIdx * 3);
              const ingredientsPage = sensorialPage + 1;
              const technicalPage = ingredientsPage + 1;

              return (
                <React.Fragment key={item.id}>
                  {/* PÁGINA 1: SENSORIAL (IMAGEM GRANDE) */}
                  <FormulaSensorial item={item} pageNum={String(sensorialPage).padStart(2, '0')} />
                  
                  {/* PÁGINA 2: INGREDIENTES (GRID DE IMAGENS) */}
                  <FormulaIngredients item={item} pageNum={String(ingredientsPage).padStart(2, '0')} />
                  
                  {/* PÁGINA 3: TÉCNICA (PREPARO E RITUAL) */}
                  <FormulaTechnical item={item} pageNum={String(technicalPage).padStart(2, '0')} />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}

      {/* PÁGINA FINAL - ALQUIMIA DO SILÊNCIO (ÚLTIMA FÓRMULA + 2) */}
      {/* O cálculo dinâmico acima garante que as páginas sigam a sequência correta. 
          A página final virá logo após a última página da 16ª fórmula. */}
      
      <AlchemySilencePage pageNum="59" />
      <ClosingPage pageNum="60" />

    </div>
  );
}
