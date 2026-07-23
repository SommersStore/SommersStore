"use client";

import React, { CSSProperties, useMemo, useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import "../design-system.css";

type CardAction =
  | { type: "viewer"; path: string }
  | { type: "pdf"; file: string }
  | { type: "both"; viewerPath: string; pdfFile: string }
  | { type: "soon" };

interface CatalogItem {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  tag: string;
  tagVariant: "gold" | "green" | "purple" | "blue" | "coral" | "rose" | "muted";
  progress?: number;
  locked?: boolean;
  action: CardAction;
}

interface CatalogGroup {
  id: string;
  label: string;
  accentKey: "bonus" | "ob" | "included" | "ritual" | "vault";
  items: CatalogItem[];
}

interface CatalogRow {
  id: string;
  rowNum: number;
  label: string;
  pageType: string;
  rowVariant?: string;
  anchorLabel: string;
  connectorAfter: string | null;
  anchor: CatalogItem;
  groups: CatalogGroup[];
}

interface HubCatalog {
  rows: CatalogRow[];
}

const TAG_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  gold: { bg: "rgba(245, 183, 83, 0.18)", color: "#ffd27a", border: "rgba(245, 183, 83, 0.42)" },
  green: { bg: "rgba(44, 199, 136, 0.16)", color: "#7ef0ba", border: "rgba(44, 199, 136, 0.36)" },
  purple: { bg: "rgba(167, 139, 250, 0.17)", color: "#c8b6ff", border: "rgba(167, 139, 250, 0.36)" },
  blue: { bg: "rgba(56, 189, 248, 0.15)", color: "#8bdcff", border: "rgba(56, 189, 248, 0.36)" },
  coral: { bg: "rgba(251, 113, 133, 0.15)", color: "#ff9cac", border: "rgba(251, 113, 133, 0.34)" },
  rose: { bg: "rgba(244, 114, 182, 0.14)", color: "#ffabd9", border: "rgba(244, 114, 182, 0.32)" },
  muted: { bg: "rgba(255,255,255,0.05)", color: "rgba(242,242,232,0.42)", border: "rgba(255,255,255,0.1)" },
};

const GROUP_ACCENT: Record<string, { border: string; bg: string; label: string; glow: string }> = {
  bonus: { border: "rgba(44,199,136,0.24)", bg: "rgba(12, 48, 42, 0.36)", label: "#6ee7b7", glow: "rgba(44,199,136,0.16)" },
  ob: { border: "rgba(56,189,248,0.24)", bg: "rgba(9, 37, 58, 0.36)", label: "#7dd3fc", glow: "rgba(56,189,248,0.16)" },
  included: { border: "rgba(167,139,250,0.25)", bg: "rgba(38, 27, 66, 0.34)", label: "#c4b5fd", glow: "rgba(167,139,250,0.16)" },
  ritual: { border: "rgba(251,113,133,0.25)", bg: "rgba(62, 18, 32, 0.32)", label: "#fda4af", glow: "rgba(251,113,133,0.14)" },
  vault: { border: "rgba(245,183,83,0.25)", bg: "rgba(62, 45, 18, 0.3)", label: "#facc6b", glow: "rgba(245,183,83,0.14)" },
};

function countAvailable(item: CatalogItem) {
  return !item.locked && item.action.type !== "soon" ? 1 : 0;
}

function coverStyle(cover?: string): CSSProperties {
  if (!cover || !cover.trim()) {
    return {
      background:
        "radial-gradient(circle at 30% 20%, rgba(245,183,83,0.34), transparent 34%), linear-gradient(135deg, #18213d 0%, #0b1220 48%, #241427 100%)",
    };
  }
  return {
    backgroundImage:
      `linear-gradient(180deg, rgba(4,6,12,0.05) 0%, rgba(4,6,12,0.72) 100%), url('${cover}')`,
  };
}

export default function HubClient({ catalog }: { catalog: HubCatalog }) {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const rows = useMemo(() => (Array.isArray(catalog?.rows) ? catalog.rows : []), [catalog]);

  const summary = useMemo(() => {
    const total = rows.reduce((acc, row) => acc + 1 + row.groups.reduce((gAcc, group) => gAcc + group.items.length, 0), 0);
    const available = rows.reduce((acc, row) => {
      const groupItems = row.groups.flatMap((group) => group.items);
      return acc + countAvailable(row.anchor) + groupItems.reduce((itemAcc, item) => itemAcc + countAvailable(item), 0);
    }, 0);
    const completed = rows.reduce((acc, row) => {
      const groupItems = row.groups.flatMap((group) => group.items);
      return acc + (row.anchor.progress === 100 ? 1 : 0) + groupItems.filter((item) => item.progress === 100).length;
    }, 0);
    return { total, available, completed };
  }, [rows]);

  const handleLogout = async () => {
    if (auth) await signOut(auth);
    router.push("/login");
  };

  const navigate = (action: CardAction) => {
    if (action.type === "viewer" && action.path) router.push(action.path);
    if (action.type === "both" && action.viewerPath) router.push(action.viewerPath);
    if (action.type === "pdf" && action.file) window.open(`/downloads/${action.file}`, "_blank");
  };

  const scrollToRow = (id: string) => {
    document.getElementById(`hub-row-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AuthGuard>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=Montserrat:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body {
          margin: 0;
          max-width: 100%;
          overflow-x: hidden;
          background: #070911;
        }
        :root {
          --hub-gold: #f5b753;
          --hub-cream: #fff7df;
          --hub-ink: #070911;
          --hub-surface: rgba(13, 17, 30, 0.76);
          --hub-line: rgba(255, 255, 255, 0.1);
          --hub-muted: rgba(255, 247, 223, 0.56);
          --hub-faint: rgba(255, 247, 223, 0.22);
        }
        .hub {
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          color: var(--hub-cream);
          font-family: 'Montserrat', sans-serif;
          background:
            radial-gradient(circle at 12% 8%, rgba(20,184,166,0.26), transparent 27%),
            radial-gradient(circle at 78% 4%, rgba(245,183,83,0.22), transparent 25%),
            radial-gradient(circle at 86% 55%, rgba(168,85,247,0.23), transparent 26%),
            linear-gradient(135deg, #07111c 0%, #0b0c17 46%, #180f22 100%);
          display: grid;
          grid-template-columns: 238px minmax(0, 1fr);
        }
        .hub-side {
          position: sticky;
          top: 0;
          min-width: 0;
          max-width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 30px 18px;
          border-right: 1px solid rgba(255,255,255,0.12);
          background: linear-gradient(180deg, rgba(6,9,17,0.94), rgba(10,13,25,0.82));
          backdrop-filter: blur(18px);
        }
        .hub-logo {
          padding: 0 8px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .hub-logo-mark {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          margin-bottom: 14px;
          background: linear-gradient(135deg, rgba(245,183,83,0.95), rgba(20,184,166,0.78));
          color: #09111d;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.12em;
          box-shadow: 0 16px 42px rgba(20,184,166,0.16);
        }
        .hub-logo-text {
          display: block;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.32em;
          color: #fff;
          text-transform: uppercase;
        }
        .hub-logo-sub {
          display: block;
          margin-top: 7px;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--hub-gold);
          text-transform: uppercase;
        }
        .hub-nav-group-label {
          margin: 24px 8px 10px;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--hub-faint);
        }
        .hub-nav-item {
          width: 100%;
          min-height: 40px;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 12px;
          border: 1px solid transparent;
          border-radius: 8px;
          background: transparent;
          color: var(--hub-muted);
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.09em;
          text-align: left;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .hub-nav-item:hover,
        .hub-nav-item.active {
          color: #fff;
          border-color: rgba(245,183,83,0.2);
          background: rgba(255,255,255,0.06);
        }
        .hub-nav-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2dd4bf, #f5b753);
          flex-shrink: 0;
        }
        .hub-side-footer {
          margin-top: auto;
          padding: 18px 8px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .hub-user-badge {
          display: grid;
          grid-template-columns: 40px minmax(0, 1fr);
          gap: 10px;
          align-items: center;
          margin-bottom: 14px;
        }
        .hub-avatar {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,0.14);
          background: linear-gradient(135deg, rgba(244,114,182,0.25), rgba(56,189,248,0.18));
          font-size: 11px;
          font-weight: 900;
          color: #fff;
        }
        .hub-user-name {
          font-size: 10px;
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .hub-user-email {
          max-width: 146px;
          margin-top: 3px;
          color: var(--hub-faint);
          font-size: 9px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hub-logout-btn {
          width: 100%;
          min-height: 38px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          color: var(--hub-muted);
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .hub-logout-btn:hover {
          color: #fff;
          border-color: rgba(245,183,83,0.35);
        }
        .hub-main {
          min-width: 0;
          max-width: 100%;
          overflow-x: hidden;
          padding: 28px 34px 64px;
        }
        .hub-hero {
          position: relative;
          overflow: hidden;
          min-width: 0;
          max-width: 100%;
          min-height: 254px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          background:
            linear-gradient(90deg, rgba(7,9,17,0.96) 0%, rgba(7,9,17,0.78) 44%, rgba(7,9,17,0.28) 100%),
            url('/sais/assets/sais_banho_hero_premium_light_v3.png') center right / cover;
          display: grid;
          align-items: end;
          padding: 30px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.28);
        }
        .hub-hero::after {
          content: "";
          position: absolute;
          inset: auto 24px 0 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,183,83,0.55), rgba(45,212,191,0.55), transparent);
        }
        .hub-hero-content {
          position: relative;
          z-index: 1;
          max-width: 690px;
          width: 100%;
          min-width: 0;
        }
        .hub-eyebrow {
          margin: 0 0 10px;
          color: #7dd3fc;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }
        .hub-title {
          margin: 0;
          max-width: 660px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5vw, 70px);
          line-height: 0.96;
          font-weight: 700;
          letter-spacing: 0;
          color: #fff;
          overflow-wrap: break-word;
        }
        .hub-title em {
          color: var(--hub-gold);
          font-style: italic;
        }
        .hub-hero-copy {
          max-width: 560px;
          margin: 16px 0 0;
          color: rgba(255,247,223,0.72);
          font-size: 14px;
          line-height: 1.75;
        }
        .hub-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 22px;
          width: 100%;
          max-width: 520px;
        }
        .hub-stat {
          min-height: 72px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          padding: 12px;
          backdrop-filter: blur(12px);
        }
        .hub-stat-value {
          display: block;
          color: #fff;
          font-size: 21px;
          font-weight: 900;
        }
        .hub-stat-label {
          display: block;
          margin-top: 4px;
          color: var(--hub-faint);
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .hub-content {
          margin-top: 28px;
          display: grid;
          gap: 26px;
          min-width: 0;
          max-width: 100%;
        }
        .hub-row-wrap {
          min-width: 0;
          max-width: 100%;
          scroll-margin-top: 24px;
        }
        .hub-row-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 12px;
        }
        .hub-row-num {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(245,183,83,0.38);
          background: rgba(245,183,83,0.12);
          color: var(--hub-gold);
          font-size: 11px;
          font-weight: 900;
        }
        .hub-row-title {
          color: #fff;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .hub-row-rule {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(245,183,83,0.34), transparent);
        }
        .hub-product-row {
          overflow: hidden;
          min-width: 0;
          max-width: 100%;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          background: rgba(8, 11, 21, 0.72);
          display: grid;
          grid-template-columns: 254px minmax(0, 1fr);
          box-shadow: 0 18px 50px rgba(0,0,0,0.24);
        }
        .hub-product-row.upsell {
          border-color: rgba(167,139,250,0.22);
        }
        .hub-anchor {
          min-width: 0;
          padding: 18px;
          border-right: 1px solid rgba(255,255,255,0.08);
          display: grid;
          align-content: start;
          gap: 12px;
        }
        .hub-anchor-eyebrow,
        .hub-group-label,
        .hub-card-sub {
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .hub-anchor-eyebrow {
          color: var(--hub-faint);
        }
        .hub-scroll-rail {
          min-width: 0;
          max-width: 100%;
          display: flex;
          align-items: stretch;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(245,183,83,0.38) transparent;
        }
        .hub-scroll-rail::-webkit-scrollbar { height: 7px; }
        .hub-scroll-rail::-webkit-scrollbar-thumb { background: rgba(245,183,83,0.38); border-radius: 99px; }
        .hub-group {
          min-width: 252px;
          width: max-content;
          flex-shrink: 0;
          padding: 18px;
          border-left: 1px solid rgba(255,255,255,0.08);
        }
        .hub-group:first-child { border-left: none; }
        .hub-group-header {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 14px;
          white-space: nowrap;
        }
        .hub-group-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          box-shadow: 0 0 24px currentColor;
        }
        .hub-group-count {
          min-width: 24px;
          height: 22px;
          border: 1px solid;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-size: 9px;
          font-weight: 900;
        }
        .hub-group-cards {
          display: flex;
          gap: 12px;
        }
        .hub-card {
          position: relative;
          flex-shrink: 0;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 8px;
          background: rgba(255,255,255,0.055);
          cursor: pointer;
          transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
        }
        .hub-card-anchor { width: 216px; }
        .hub-card-companion { width: 184px; }
        .hub-card:hover,
        .hub-card.is-hovered {
          transform: translateY(-5px);
          border-color: rgba(245,183,83,0.4);
          box-shadow: 0 20px 52px rgba(0,0,0,0.38);
        }
        .hub-card.locked {
          opacity: 0.62;
          cursor: default;
        }
        .hub-card.locked:hover {
          transform: none;
          border-color: rgba(255,255,255,0.11);
          box-shadow: none;
        }
        .hub-card-img {
          width: 100%;
          aspect-ratio: 3 / 4;
          position: relative;
          overflow: hidden;
          background: #111827;
        }
        .hub-card-img-inner {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.55s ease;
        }
        .hub-card:hover .hub-card-img-inner { transform: scale(1.05); }
        .hub-card-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(140deg, transparent 0%, rgba(255,255,255,0.22) 48%, transparent 54%);
          transform: translateX(-120%);
          transition: transform 0.65s ease;
        }
        .hub-card:hover .hub-card-shine { transform: translateX(120%); }
        .hub-card-tag {
          position: absolute;
          top: 10px;
          left: 10px;
          max-width: calc(100% - 20px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border: 1px solid;
          border-radius: 6px;
          padding: 5px 8px;
          backdrop-filter: blur(8px);
          font-size: 7px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .hub-card-lock {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          background: rgba(5,7,13,0.65);
          color: rgba(255,255,255,0.8);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .hub-badge-done {
          position: absolute;
          right: 10px;
          bottom: 10px;
          border: 1px solid rgba(110,231,183,0.35);
          border-radius: 6px;
          background: rgba(6,78,59,0.62);
          color: #a7f3d0;
          padding: 5px 8px;
          font-size: 7px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .hub-card-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 4px;
          background: rgba(255,255,255,0.12);
        }
        .hub-card-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #2dd4bf, #f5b753, #f472b6);
        }
        .hub-card-body {
          padding: 13px;
          min-height: 126px;
          display: grid;
          align-content: start;
          gap: 8px;
        }
        .hub-card-sub {
          color: var(--hub-faint);
          line-height: 1.35;
          min-height: 22px;
        }
        .hub-card-title {
          margin: 0;
          min-height: 44px;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: 0;
          overflow-wrap: anywhere;
        }
        .hub-card-companion .hub-card-title {
          font-size: 17px;
        }
        .hub-card-actions {
          display: flex;
          gap: 7px;
          margin-top: 2px;
        }
        .hub-btn,
        .hub-btn-soon {
          min-width: 0;
          min-height: 34px;
          flex: 1;
          border-radius: 7px;
          border: 1px solid;
          padding: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: normal;
          line-height: 1.15;
        }
        .hub-btn {
          cursor: pointer;
        }
        .hub-btn-primary {
          color: #09111d;
          border-color: rgba(245,183,83,0.7);
          background: linear-gradient(135deg, #f5b753, #7dd3fc);
        }
        .hub-btn-secondary {
          color: var(--hub-cream);
          border-color: rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.07);
        }
        .hub-btn-soon {
          display: grid;
          place-items: center;
          color: var(--hub-faint);
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.035);
          cursor: default;
          text-align: center;
        }
        .hub-connector {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 34px;
          margin: 0 0 0 15px;
          color: var(--hub-faint);
        }
        .hub-connector-vline {
          width: 1px;
          height: 34px;
          background: linear-gradient(180deg, rgba(245,183,83,0.45), rgba(45,212,191,0.28));
        }
        .hub-connector-label {
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        @media (max-width: 1100px) {
          .hub { grid-template-columns: 1fr; }
          .hub-side {
            position: relative;
            height: auto;
            padding: 16px;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }
          .hub-logo { display: flex; align-items: center; gap: 12px; padding-bottom: 14px; }
          .hub-logo-mark { margin-bottom: 0; }
          .hub-nav-group-label { display: none; }
          .hub-nav-scroll { display: flex; gap: 8px; overflow-x: auto; padding-top: 14px; }
          .hub-nav-item { width: auto; min-width: 150px; }
          .hub-side-footer { display: none; }
          .hub-main { padding: 20px 16px 44px; }
          .hub-product-row { grid-template-columns: 1fr; }
          .hub-anchor { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
          .hub-card-anchor { width: 190px; }
        }
        @media (max-width: 640px) {
          .hub-hero { min-height: 430px; align-items: end; padding: 22px; background-position: center; }
          .hub-stats { grid-template-columns: 1fr; max-width: 100%; }
          .hub-group-cards { flex-wrap: nowrap; }
          .hub-card-anchor { width: min(100%, 216px); }
          .hub-card-companion { width: 168px; }
          .hub-title { font-size: 34px; }
        }
      `}</style>

      <div className="hub">
        <aside className="hub-side">
          <div className="hub-logo">
            <div className="hub-logo-mark">SS</div>
            <div>
              <span className="hub-logo-text">Sommers Store</span>
              <span className="hub-logo-sub">Área de Membros</span>
            </div>
          </div>

          <span className="hub-nav-group-label">Acervo</span>
          <div className="hub-nav-scroll">
            <button className="hub-nav-item active" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span className="hub-nav-dot" />
              Visão geral
            </button>
            {rows.map((row) => (
              <button key={row.id} className="hub-nav-item" onClick={() => scrollToRow(row.id)}>
                <span className="hub-nav-dot" />
                {row.label}
              </button>
            ))}
          </div>

          <div className="hub-side-footer">
            <div className="hub-user-badge">
              <div className="hub-avatar">EA</div>
              <div>
                <div className="hub-user-name">Membro Elite</div>
                <div className="hub-user-email">{auth?.currentUser?.email}</div>
              </div>
            </div>
            <button className="hub-logout-btn" onClick={handleLogout}>Encerrar sessão</button>
          </div>
        </aside>

        <main className="hub-main">
          <section className="hub-hero">
            <div className="hub-hero-content">
              <p className="hub-eyebrow">Bem-vinda de volta</p>
              <h1 className="hub-title">Seu acervo <em>Essência Ativa</em></h1>
              <p className="hub-hero-copy">
                Produtos, bônus e leitores digitais organizados em uma biblioteca privada, visual e pronta para evoluir junto com cada compra.
              </p>
              <div className="hub-stats">
                <div className="hub-stat">
                  <span className="hub-stat-value">{summary.total}</span>
                  <span className="hub-stat-label">Entregáveis</span>
                </div>
                <div className="hub-stat">
                  <span className="hub-stat-value">{summary.available}</span>
                  <span className="hub-stat-label">Liberados</span>
                </div>
                <div className="hub-stat">
                  <span className="hub-stat-value">{summary.completed}</span>
                  <span className="hub-stat-label">Concluídos</span>
                </div>
              </div>
            </div>
          </section>

          <div className="hub-content">
            {rows.map((row, idx) => {
              const isUpsell = row.rowVariant === "upsell";
              const anchorBg = isUpsell
                ? "linear-gradient(180deg, rgba(167,139,250,0.14), rgba(8,11,21,0.18))"
                : "linear-gradient(180deg, rgba(245,183,83,0.12), rgba(8,11,21,0.18))";

              return (
                <React.Fragment key={row.id}>
                  <section className="hub-row-wrap" id={`hub-row-${row.id}`}>
                    <div className="hub-row-eyebrow">
                      <div className="hub-row-num">{String(row.rowNum).padStart(2, "0")}</div>
                      <span className="hub-row-title">{row.label}</span>
                      <div className="hub-row-rule" />
                    </div>

                    <div className={`hub-product-row${isUpsell ? " upsell" : ""}`}>
                      <div className="hub-anchor" style={{ background: anchorBg }}>
                        <span className="hub-anchor-eyebrow">{row.anchorLabel}</span>
                        <Card p={row.anchor} size="anchor" hovered={hovered} setHovered={setHovered} navigate={navigate} />
                      </div>

                      <div className="hub-scroll-rail">
                        {row.groups.map((group) => {
                          const accent = GROUP_ACCENT[group.accentKey] ?? GROUP_ACCENT.bonus;
                          return (
                            <div
                              key={group.id}
                              className="hub-group"
                              style={{ background: accent.bg, boxShadow: `inset 0 1px 0 ${accent.border}` }}
                            >
                              <div className="hub-group-header">
                                <div className="hub-group-dot" style={{ background: accent.label, color: accent.glow }} />
                                <span className="hub-group-label" style={{ color: accent.label }}>{group.label}</span>
                                <span className="hub-group-count" style={{ color: accent.label, borderColor: accent.border }}>
                                  {group.items.length}
                                </span>
                              </div>
                              <div className="hub-group-cards">
                                {group.items.map((p) => (
                                  <Card key={p.id} p={p} size="companion" hovered={hovered} setHovered={setHovered} navigate={navigate} />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  {row.connectorAfter && idx < rows.length - 1 && (
                    <div className="hub-connector">
                      <div className="hub-connector-vline" />
                      <span className="hub-connector-label">{row.connectorAfter}</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function Card({
  p,
  size = "companion",
  hovered,
  setHovered,
  navigate,
}: {
  p: CatalogItem;
  size?: "anchor" | "companion";
  hovered: string | null;
  setHovered: (id: string | null) => void;
  navigate: (a: CardAction) => void;
}) {
  const tag = TAG_STYLES[p.tagVariant] ?? TAG_STYLES.muted;
  const isAvailable = !p.locked && p.action.type !== "soon";

  return (
    <article
      className={`hub-card hub-card-${size}${p.locked ? " locked" : ""}${hovered === p.id ? " is-hovered" : ""}`}
      onMouseEnter={() => !p.locked && setHovered(p.id)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => isAvailable && navigate(p.action)}
    >
      <div className="hub-card-img">
        <div className="hub-card-img-inner" style={coverStyle(p.cover)} />
        <div className="hub-card-shine" />
        <span className="hub-card-tag" style={{ background: tag.bg, color: tag.color, borderColor: tag.border }}>{p.tag}</span>
        {p.locked && <div className="hub-card-lock">Bloqueado</div>}
        {p.progress === 100 && <span className="hub-badge-done">Concluído</span>}
        {typeof p.progress === "number" && p.progress > 0 && p.progress < 100 && (
          <div className="hub-card-progress">
            <div className="hub-card-progress-fill" style={{ width: `${p.progress}%` }} />
          </div>
        )}
      </div>
      <div className="hub-card-body">
        <p className="hub-card-sub">{p.subtitle}</p>
        <h2 className="hub-card-title">{p.title}</h2>
        <div className="hub-card-actions" onClick={(event) => event.stopPropagation()}>
          <ActionButtons action={p.action} navigate={navigate} />
        </div>
      </div>
    </article>
  );
}

function ActionButtons({ action, navigate }: { action: CardAction; navigate: (a: CardAction) => void }) {
  if (action.type === "soon") {
    return <span className="hub-btn-soon">Em preparação</span>;
  }

  if (action.type === "viewer") {
    return <button className="hub-btn hub-btn-primary" onClick={() => navigate(action)}>Acessar</button>;
  }

  if (action.type === "pdf") {
    return <button className="hub-btn hub-btn-primary" onClick={() => navigate(action)}>Baixar PDF</button>;
  }

  return (
    <>
      <button className="hub-btn hub-btn-primary" onClick={() => navigate({ type: "viewer", path: action.viewerPath })}>Ler online</button>
      <button className="hub-btn hub-btn-secondary" onClick={() => window.open(`/downloads/${action.pdfFile}`, "_blank")}>PDF</button>
    </>
  );
}
