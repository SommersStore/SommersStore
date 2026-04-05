import React from "react";
import Image from "next/image";
import PageShell from "./PageShell";

export default function ManifestoPage({ pageNum }: { pageNum: string }) {
  return (
    <PageShell pageNum={pageNum} className="justify-center px-24">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image src="/ebook/lotus.png" alt="Lotus" fill sizes="100vw" className="filter grayscale opacity-20 object-center object-contain" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508] opacity-80" />
      </div>

      <div className="relative z-10">
        <h2 className="title-gold italic text-6xl mb-12 text-center">O Manifesto Editorial</h2>
        <p className="font-serif italic text-[22px] leading-relaxed text-[#F5F5DC]/70 max-w-2xl mx-auto mb-8 text-center">
          &quot;Este volume não foi concebido para a pressa. Ele é a transcrição fiel de rituais que privilegiam a sofisticação silenciosa.&quot;
        </p>
        
        <div className="bg-[#C5A059]/5 border border-[#C5A059]/10 p-12 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 -translate-y-16 translate-x-16">
            <div className="w-full h-full rounded-full border border-[#C5A059]" />
          </div>
          <div className="grid grid-cols-2 gap-20 text-justify relative z-10">
            <div>
              <h3 className="title-gold font-bold text-xl mb-4 flex items-center gap-4 uppercase tracking-widest">
                <div className="w-3 h-3 bg-red-800 rounded-full shadow-[0_0_10px_rgba(139,0,0,0.5)]" /> 
                O Propósito
              </h3>
              <p className="text-base text-[#F5F5DC]/70 leading-relaxed font-serif italic">
                Este material não foi concebido para ditar regras banais ou simplistas de mercado. Sua verdadeira intenção é educar o olhar para o refinamento absoluto de fórmulas premium que transcendem o óbvio. Aqui, o perfil presenteável e a estética sensorial dos resorts e Spas mais luxuosos de Bali, Marrocos e Japão são destilados em protocolos práticos. O propósito é elevar o seu produto da categoria de &apos;comodidade&apos; para a de &apos;objeto de desejo&apos; inalcançável.
              </p>
            </div>
            <div>
              <h3 className="title-gold font-bold text-xl mb-4 flex items-center gap-4 uppercase tracking-widest">
                <div className="w-3 h-3 bg-red-800 rounded-full shadow-[0_0_10px_rgba(139,0,0,0.5)]" /> 
                A Obra
              </h3>
              <p className="text-base text-[#F5F5DC]/70 leading-relaxed font-serif italic">
                A composição deste volume repousa sobre fundações minerais rigorosas e uma curadoria de aromacologia de nicho internacional. As fórmulas aqui contidas são raras, desenhadas especificamente para estratégias de vendas High-Ticket onde a experiência de uso justifica o preço premium. Através de blends autorais e rituais de consagração, esta obra transforma o autocuidado em um sistema de biohacking sensorial e estética impecável.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
