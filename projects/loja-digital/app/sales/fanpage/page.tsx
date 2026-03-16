"use client";

import React from "react";
import Image from "next/image";

export default function FanpageBridge() {
  return (
    <div className="min-h-screen bg-[#f3f4f6] text-slate-800 font-sans">
      {/* Fake Facebook-style Header */}
      <header className="bg-[#1877f2] text-white py-2 px-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-black text-[#1877f2]">f</div>
          <div className="bg-white/20 rounded-full px-4 py-1 flex items-center gap-2 text-sm">
             🔍 <span className="opacity-50">Pesquisar no Facebook</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
            <span className="text-xl">🏠</span>
            <span className="text-xl">📺</span>
            <span className="text-xl">🏪</span>
        </div>
      </header>

      <main className="max-w-xl mx-auto mt-4 px-4 pb-20">
        {/* Post Container */}
        <article className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border">
                <Image src="/sales/assets/Elisa Clark.jpg" alt="Elisa Clark" width={48} height={48} className="object-cover" />
            </div>
            <div>
                <div className="font-bold hover:underline cursor-pointer">Elisa Clark - Alquimia Brasileira</div>
                <div className="text-xs text-slate-500">Patrocinado · 🌐</div>
            </div>
          </div>

          <div className="px-4 pb-4 text-sm leading-relaxed">
            Muitas pessoas me perguntam como eu transformei meu banho em um portal de cura e, ao mesmo tempo, criei uma renda lucrativa trabalhando de casa. 🌿✨ 
            <br /><br />
            Eu preparei um vídeo especial onde mostro o passo a passo da <strong>Alquimia dos Sentidos</strong>. Se você sente que seu brilho está se apagando no cansaço do dia, isso é para você.
          </div>

          <div className="relative aspect-video group cursor-pointer" onClick={() => window.location.href='/sales/vsl'}>
             <Image src="/sales/assets/v3-hero-light.png" alt="Video Preview" fill className="object-cover" />
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                   <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
                </div>
             </div>
             <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded text-white flex justify-between items-center">
                <div className="text-xs font-bold uppercase tracking-widest">Apresentação Gratuita</div>
                <div className="bg-emerald-600 px-3 py-1 rounded text-[10px] font-black">ASSISTIR AGORA</div>
             </div>
          </div>

          <div className="p-4 border-t border-slate-100 flex justify-between text-slate-500 text-sm">
             <span>👍 1.2k</span>
             <span>456 Comentários</span>
          </div>
        </article>

        {/* Real User Comments Simulation */}
        <div className="mt-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase px-1">Comentários relevantes</h3>
            {[
                { name: "Adriana Silva", text: "Gente, o vídeo dela é incrível! Eu já comecei a fazer os sais e vendi os primeiros 10 kits no condomínio.", likes: 12 },
                { name: "Luciana Perera", text: "Finalmente algo que faz sentido. O banho agora é meu momento sagrado.", likes: 8 }
            ].map((c, i) => (
                <div key={i} className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0" />
                    <div className="bg-[#f0f2f5] p-3 rounded-2xl flex-1 text-xs">
                        <div className="font-bold">{c.name}</div>
                        <div>{c.text}</div>
                        <div className="mt-1 font-bold text-slate-500">Curtir · Responder · {c.likes} curtidas</div>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
