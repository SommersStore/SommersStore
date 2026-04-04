import React from "react";
import Image from "next/image";

interface PageShellProps {
  pageNum: string;
  children: React.ReactNode;
  className?: string;
}

export default function PageShell({ pageNum, children, className = "" }: PageShellProps) {
  return (
    <article className={`page-a4 px-16 pt-12 pb-8 flex flex-col relative border border-neutral-900/50 overflow-hidden ${className}`}>
      {/* Footer Fixo */}
      <div className="absolute bottom-12 left-16 right-16 pt-4 border-t border-neutral-900/50 flex justify-between z-20">
        <span className="technical-label text-[10px] text-neutral-700 font-bold tracking-widest uppercase">THE BLACK PROTOCOL // DELUXE MASTER EDITION.</span>
        <span className="accent-red font-bold text-[10px] uppercase tracking-widest">PAG. {pageNum}</span>
      </div>
      {children}
    </article>
  );
}
