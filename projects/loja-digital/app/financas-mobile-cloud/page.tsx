import type { Metadata, Viewport } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import FinancasMobileCloudClient from "./FinancasMobileCloudClient";

export const metadata: Metadata = {
  title: "Finanças Mobile | Sommer's Store",
  description: "Lancamentos financeiros para conferencia posterior no painel local.",
  manifest: "/financas-mobile-cloud.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Financas",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b13",
};

type EntryType = "despesas" | "receitas" | "dividas";

type Destination = {
  id: string;
  label: string;
  path: string;
  sectionLabel: string;
  categoryKey: string;
  categoryLabel: string;
  subdivisionLabel: string;
  locked?: boolean;
  lockedReason?: string;
};

type DestinationCatalog = Record<EntryType, Destination[]>;

type Unit = {
  token: string;
  key: string;
  label: string;
  rows: Record<string, unknown>[];
};

const ENTRY_TYPES: EntryType[] = ["despesas", "receitas", "dividas"];
const EXPENSE_GROUPS = [
  { key: "gasolina", label: "Gasolina" },
  { key: "extras", label: "Despesas X" },
  { key: "mercado", label: "Mercado" },
];
const DEBT_GROUPS = [
  { key: "payslip", label: "Holerite" },
  { key: "old", label: "Dividas antigas" },
  { key: "current", label: "Dividas atuais" },
];
const SECTION_FALLBACK: Record<EntryType, string> = {
  receitas: "Receitas",
  despesas: "Despesas",
  dividas: "Dividas",
};

function asArray(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(item => item && typeof item === "object") as Record<string, unknown>[] : [];
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function text(value: unknown, fallback = "") {
  return String(value || fallback).trim();
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map(item => text(item)).filter(Boolean) : [];
}

function orderedKeys(saved: unknown, defaults: string[]) {
  const order = asStringArray(saved).filter((key, index, keys) => defaults.includes(key) && keys.indexOf(key) === index);
  defaults.forEach(key => {
    if (!order.includes(key)) order.push(key);
  });
  return order;
}

function buildDestinationCatalog(): DestinationCatalog {
  const empty: DestinationCatalog = { despesas: [], receitas: [], dividas: [] };
  try {
    const raw = readFileSync(join(process.cwd(), "..", "financas", "data", "fin2_data.json"), "utf8");
    const payload = JSON.parse(raw);
    const sheet = asRecord(payload.sheet || payload);
    const sectionLabels = asRecord(sheet.sectionLabels);
    const expenseGroupLabels = asRecord(sheet.expenseGroupLabels);
    const debtGroupLabels = asRecord(sheet.debtGroupLabels);
    const customGroups = asRecord(sheet.customGroups);
    const customMaps = ENTRY_TYPES.reduce<Record<EntryType, Map<string, string>>>((acc, groupKey) => {
      acc[groupKey] = new Map(
        asArray(customGroups[groupKey]).map(entry => [text(entry.key), text(entry.label, "Subaba")])
      );
      return acc;
    }, { despesas: new Map(), receitas: new Map(), dividas: new Map() });

    function sectionLabel(groupKey: EntryType) {
      return text(sectionLabels[groupKey], SECTION_FALLBACK[groupKey]);
    }

    function customGroupKey(groupKey: EntryType, row: Record<string, unknown>) {
      const customKey = text(row.customGroup);
      return customKey && customMaps[groupKey].has(customKey) ? customKey : "";
    }

    function expenseGroupKey(row: Record<string, unknown>) {
      const key = text(row.expenseGroup).toLowerCase();
      return EXPENSE_GROUPS.some(entry => entry.key === key) ? key : "";
    }

    function isPayslipDebtRow(row: Record<string, unknown>) {
      return row.source === "payslipDebt" || Boolean(row.payslipDebtKey);
    }

    function isOldDebtRow(row: Record<string, unknown>) {
      return row.oldDebt === true && !isPayslipDebtRow(row);
    }

    function debtGroupKey(row: Record<string, unknown>) {
      if (isPayslipDebtRow(row)) return "payslip";
      return isOldDebtRow(row) ? "old" : "current";
    }

    function rowLocked(groupKey: EntryType, row: Record<string, unknown>) {
      if (row.payslipRole) return "Linha controlada pelo holerite";
      if (groupKey === "dividas" && isPayslipDebtRow(row)) return "Divida sincronizada do holerite";
      return "";
    }

    function customUnits(groupKey: EntryType, rows: Record<string, unknown>[]): Unit[] {
      return asArray(customGroups[groupKey]).map(entry => {
        const key = text(entry.key);
        return {
          token: `custom:${key}`,
          key,
          label: text(entry.label, "Subaba"),
          rows: rows.filter(row => customGroupKey(groupKey, row) === key),
        };
      }).filter(unit => unit.key);
    }

    function rowUnit(groupKey: EntryType, row: Record<string, unknown>): Unit {
      const id = text(row.id);
      return {
        token: `row:${id}`,
        key: id,
        label: text(row.label, sectionLabel(groupKey)),
        rows: [row],
      };
    }

    function expenseUnits(rows: Record<string, unknown>[]): Unit[] {
      const defaults = EXPENSE_GROUPS.map(entry => entry.key);
      const byKey = new Map(EXPENSE_GROUPS.map(entry => [entry.key, entry.label]));
      return orderedKeys(sheet.expenseGroupOrder, defaults).map(key => ({
        token: `expense:${key}`,
        key,
        label: text(expenseGroupLabels[key], byKey.get(key) || key),
        rows: rows.filter(row => expenseGroupKey(row) === key),
      }));
    }

    function debtUnits(rows: Record<string, unknown>[]): Unit[] {
      const defaults = DEBT_GROUPS.map(entry => entry.key);
      const byKey = new Map(DEBT_GROUPS.map(entry => [entry.key, entry.label]));
      return orderedKeys(sheet.debtGroupOrder, defaults).map(key => ({
        token: `debt:${key}`,
        key,
        label: text(debtGroupLabels[key], byKey.get(key) || key),
        rows: rows.filter(row => debtGroupKey(row) === key && !customGroupKey("dividas", row)),
      }));
    }

    function defaultUnits(groupKey: EntryType, rows: Record<string, unknown>[]): Unit[] {
      const groupedCustomUnits = customUnits(groupKey, rows);
      if (groupKey === "receitas") {
        const ungrouped = rows.filter(row => !customGroupKey(groupKey, row)).map(row => rowUnit(groupKey, row));
        return groupedCustomUnits.concat(ungrouped);
      }
      if (groupKey === "despesas") {
        const payslipRows = rows.filter(row => row.payslipRole).map(row => rowUnit(groupKey, row));
        const groupedRows = expenseUnits(rows);
        const customRows = groupedCustomUnits;
        const ungrouped = rows
          .filter(row => !row.payslipRole && !expenseGroupKey(row) && !customGroupKey(groupKey, row))
          .map(row => rowUnit(groupKey, row));
        return groupedRows.concat(customRows, ungrouped, payslipRows);
      }
      if (groupKey === "dividas") {
        return debtUnits(rows).concat(groupedCustomUnits);
      }
      return [];
    }

    function orderedUnits(groupKey: EntryType, rows: Record<string, unknown>[]) {
      const units = defaultUnits(groupKey, rows);
      if (groupKey === "despesas") return units;
      const byToken = new Map(units.map(unit => [unit.token, unit]));
      const topLevelOrder = asRecord(sheet.topLevelOrder);
      const saved = asStringArray(topLevelOrder[groupKey])
        .filter((token, index, tokens) => byToken.has(token) && tokens.indexOf(token) === index);
      units.forEach(unit => {
        if (!saved.includes(unit.token)) saved.push(unit.token);
      });
      return saved.map(token => byToken.get(token)).filter(Boolean) as Unit[];
    }

    const catalog = { ...empty };
    ENTRY_TYPES.forEach(groupKey => {
      const rows = asArray(sheet[groupKey]);
      const label = sectionLabel(groupKey);
      catalog[groupKey] = orderedUnits(groupKey, rows).flatMap(unit => unit.rows
        .filter(row => text(row.id))
        .map(row => {
          const lockedReason = rowLocked(groupKey, row);
          const subdivisionLabel = text(row.label, "Sem nome");
          return {
            id: text(row.id),
            label: subdivisionLabel,
            path: `${label} / ${unit.label}`,
            sectionLabel: label,
            categoryKey: unit.token,
            categoryLabel: unit.label,
            subdivisionLabel,
            locked: Boolean(lockedReason),
            lockedReason: lockedReason || undefined,
          };
        }));
    });
    return catalog;
  } catch {
    return empty;
  }
}

export default function FinancasMobileCloudPage() {
  return <FinancasMobileCloudClient destinations={buildDestinationCatalog()} />;
}
