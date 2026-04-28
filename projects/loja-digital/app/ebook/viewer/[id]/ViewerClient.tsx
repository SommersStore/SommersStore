"use client";

import React from "react";
import "../../cofre-v2/styles.css";
import protocolChapters from "../../cofre-v2/data/chapters";
import sinergiasChapters from "../../cofre-v2/data/sinergias";
import fornecedoresChapters from "../../cofre-v2/data/fornecedores";
import ritualNoiteChapters from "../../cofre-v2/data/ritual-noite";
import { Chapter, Formula } from "../../cofre-v2/types/chapters";

import CoverPage from "../../cofre-v2/components/CoverPage";
import IntroPage from "../../cofre-v2/components/IntroPage";
import ManifestoPage from "../../cofre-v2/components/ManifestoPage";
import RulesPage from "../../cofre-v2/components/RulesPage";
import GeometryPage from "../../cofre-v2/components/GeometryPage";
import SummaryPage from "../../cofre-v2/components/SummaryPage";
import ChapterOpener from "../../cofre-v2/components/ChapterOpener";
import FormulaSensorial from "../../cofre-v2/components/FormulaSensorial";
import FormulaIngredients from "../../cofre-v2/components/FormulaIngredients";
import FormulaTechnical from "../../cofre-v2/components/FormulaTechnical";
import ClosingPage from "../../cofre-v2/components/ClosingPage";
import AlchemySilencePage from "../../cofre-v2/components/AlchemySilencePage";

export default function ViewerClient({ id }: { id: string }) {
  let currentChapters: Chapter[] = protocolChapters;
  let pdfName = "O_Cofre_das_Botanicas_Secretas.pdf";

  if (id === "sinergias") {
    currentChapters = sinergiasChapters;
    pdfName = "30_Sinergias_Sommers_Store.pdf";
  } else if (id === "fornecedores") {
    currentChapters = fornecedoresChapters;
    pdfName = "Guia_Fornecedores_Master.pdf";
  } else if (id === "ritual-noite") {
    currentChapters = ritualNoiteChapters;
    pdfName = "Ritual_da_Meia_Noite.pdf";
  }

  return (
    <div className="viewer-container" style={{ background: "#050508" }}>
      <div style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        background: "rgba(5,5,8,0.8)",
        padding: "10px 20px",
        border: "1px solid rgba(197, 160, 89, 0.3)",
        backdropFilter: "blur(10px)",
        borderRadius: "4px"
      }}>
        <a
          href={`/downloads/${pdfName}`}
          style={{
            color: "#C5A059",
            textDecoration: "none",
            fontSize: "11px",
            fontWeight: "bold",
            letterSpacing: "2px",
            textTransform: "uppercase"
          }}
          download
        >
          Download PDF Premium
        </a>
      </div>

      <div className="ebook-wrapper" style={{
        minHeight: "100vh",
        background: "#050508",
        paddingTop: "40px",
        paddingBottom: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <CoverPage />
        <IntroPage pageNum="01" />
        <ManifestoPage pageNum="02" />
        <RulesPage pageNum="03" />
        <GeometryPage pageNum="04" />
        <SummaryPage chapters={currentChapters} pageNum="05" />

        {currentChapters.map((chapter: Chapter, cIdx: number) => {
          const formulasBefore = currentChapters
            .slice(0, cIdx)
            .reduce((acc: number, current: Chapter) => acc + current.formulas.length, 0);
          const chapterPageNum = cIdx + (formulasBefore * 3) + 6;

          return (
            <React.Fragment key={chapter.chapterId}>
              <ChapterOpener chapter={chapter} pageNum={String(chapterPageNum).padStart(2, "0")} />

              {chapter.formulas.map((item: Formula, fIdx: number) => {
                const sensorialPage = chapterPageNum + 1 + (fIdx * 3);
                const technicalPage = sensorialPage + 1;
                const ingredientsPage = technicalPage + 1;

                return (
                  <React.Fragment key={item.id}>
                    <FormulaSensorial item={item} pageNum={String(sensorialPage).padStart(2, "0")} />
                    <FormulaTechnical item={item} pageNum={String(technicalPage).padStart(2, "0")} />
                    <FormulaIngredients item={item} pageNum={String(ingredientsPage).padStart(2, "0")} startIndex={0} endIndex={6} />
                    {item.id === "16" ? (
                      <FormulaIngredients item={item} pageNum={String(ingredientsPage + 1).padStart(2, "0")} startIndex={6} endIndex={12} />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}

        <AlchemySilencePage pageNum="--" />
        <ClosingPage pageNum="--" />
      </div>
    </div>
  );
}
