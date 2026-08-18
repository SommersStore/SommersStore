"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInAnonymously,
  type Auth,
  type User,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  enableIndexedDbPersistence,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  type Firestore,
} from "firebase/firestore";

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

type CategoryOption = {
  key: string;
  label: string;
  total: number;
  available: number;
};

type InboxEntry = {
  id: string;
  type: EntryType;
  name: string;
  destinationRowId: string;
  destinationLabel: string;
  destinationPath: string;
  destinationSectionLabel: string;
  destinationCategoryLabel: string;
  destinationSubdivisionLabel: string;
  value: number;
  date: string;
  installments: number;
  createdAtDevice: string;
  updatedAtDevice: string;
};

type FirebaseConfig = {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
};

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FINANCAS_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FINANCAS_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FINANCAS_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FINANCAS_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FINANCAS_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FINANCAS_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);
let firebaseApp: FirebaseApp | null = null;
let offlinePersistenceRequested = false;

type FirebaseServices = {
  auth: Auth;
  db: Firestore;
};

const typeThemes: Record<EntryType, { label: string; button: string; category: string }> = {
  receitas: {
    label: "RECEITAS",
    button: "border-sky-400/70 bg-sky-500/15 text-sky-100 shadow-[0_0_0_1px_rgba(14,165,233,0.12)]",
    category: "border-sky-400 bg-sky-400 text-slate-950",
  },
  despesas: {
    label: "DESPESAS",
    button: "border-emerald-400/70 bg-emerald-500/15 text-emerald-100 shadow-[0_0_0_1px_rgba(74,222,128,0.12)]",
    category: "border-emerald-400 bg-emerald-400 text-slate-950",
  },
  dividas: {
    label: "DÍVIDAS",
    button: "border-red-400/70 bg-red-500/15 text-red-100 shadow-[0_0_0_1px_rgba(239,68,68,0.12)]",
    category: "border-red-400 bg-red-500 text-white",
  },
};

function getConfiguredApp() {
  if (!hasFirebaseConfig) return null;
  if (!firebaseApp) firebaseApp = initializeApp(firebaseConfig);
  return firebaseApp;
}

function todayValue() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", ".");
  return Math.abs(Number(normalized) || 0);
}

const emptyDestinations: DestinationCatalog = { despesas: [], receitas: [], dividas: [] };

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function text(value: unknown, fallback = "") {
  return String(value || fallback).trim();
}

function normalizeDestination(value: unknown): Destination | null {
  const source = asRecord(value);
  const id = text(source.id);
  if (!id) return null;
  const label = text(source.label, "Sem nome");
  return {
    id,
    label,
    path: text(source.path),
    sectionLabel: text(source.sectionLabel),
    categoryKey: text(source.categoryKey, text(source.path)),
    categoryLabel: text(source.categoryLabel, text(source.path)),
    subdivisionLabel: text(source.subdivisionLabel, label),
    locked: source.locked === true,
    lockedReason: text(source.lockedReason) || undefined,
  };
}

function normalizeDestinationCatalog(value: unknown): DestinationCatalog {
  const source = asRecord(value);
  return {
    despesas: Array.isArray(source.despesas) ? source.despesas.map(normalizeDestination).filter(Boolean) as Destination[] : [],
    receitas: Array.isArray(source.receitas) ? source.receitas.map(normalizeDestination).filter(Boolean) as Destination[] : [],
    dividas: Array.isArray(source.dividas) ? source.dividas.map(normalizeDestination).filter(Boolean) as Destination[] : [],
  };
}

function hasDestinations(catalog: DestinationCatalog) {
  return catalog.despesas.length > 0 || catalog.receitas.length > 0 || catalog.dividas.length > 0;
}

function uniqueCategories(items: Destination[]) {
  return items.reduce<CategoryOption[]>((categories, item) => {
    const key = item.categoryKey || item.path;
    if (!key) return categories;
    const existing = categories.find(category => category.key === key);
    if (existing) {
      existing.total += 1;
      if (!item.locked) existing.available += 1;
      return categories;
    }
    categories.push({
      key,
      label: item.categoryLabel || item.path,
      total: 1,
      available: item.locked ? 0 : 1,
    });
    return categories;
  }, []);
}

function entryType(value: unknown): EntryType {
  const raw = text(value);
  return raw === "receitas" || raw === "dividas" ? raw : "despesas";
}

function normalizeInboxEntry(id: string, value: unknown): InboxEntry | null {
  const source = asRecord(value);
  if (text(source.status) !== "pending") return null;
  return {
    id,
    type: entryType(source.type),
    name: text(source.name, "Lancamento"),
    destinationRowId: text(source.destinationRowId),
    destinationLabel: text(source.destinationLabel),
    destinationPath: text(source.destinationPath),
    destinationSectionLabel: text(source.destinationSectionLabel),
    destinationCategoryLabel: text(source.destinationCategoryLabel),
    destinationSubdivisionLabel: text(source.destinationSubdivisionLabel),
    value: Math.abs(Number(source.value) || 0),
    date: text(source.date, todayValue()),
    installments: Math.max(1, Math.min(12, Math.round(Number(source.installments) || 1))),
    createdAtDevice: text(source.createdAtDevice),
    updatedAtDevice: text(source.updatedAtDevice),
  };
}

function moneyLabel(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value) || 0);
}

function moneyInputValue(value: number) {
  return value ? String(Number(value).toFixed(2)).replace(".", ",") : "";
}

export default function FinancasMobileCloudClient({ destinations = emptyDestinations }: { destinations?: DestinationCatalog }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [mobileEnabled, setMobileEnabled] = useState(true);
  const [entryType, setEntryType] = useState<EntryType>("despesas");
  const [categoryByType, setCategoryByType] = useState<Record<EntryType, string>>({ despesas: "", receitas: "", dividas: "" });
  const [destinationByType, setDestinationByType] = useState<Record<EntryType, string>>({ despesas: "", receitas: "", dividas: "" });
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState(todayValue());
  const [installments, setInstallments] = useState("1");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [services, setServices] = useState<FirebaseServices | null>(null);
  const [liveDestinations, setLiveDestinations] = useState<DestinationCatalog | null>(null);
  const [pendingEntries, setPendingEntries] = useState<InboxEntry[]>([]);
  const [editingEntryId, setEditingEntryId] = useState("");

  useEffect(() => {
    const app = getConfiguredApp();
    if (!app) return undefined;
    const auth = getAuth(app);
    const db = getFirestore(app);
    let cancelled = false;
    setPersistence(auth, browserLocalPersistence).catch(() => null);
    if (!offlinePersistenceRequested) {
      offlinePersistenceRequested = true;
      enableIndexedDbPersistence(db).catch(() => null);
    }
    setServices({ auth, db });
    const unsubscribeControl = onSnapshot(
      doc(db, "financasMobileControl", "main"),
      snapshot => {
        if (!cancelled) setMobileEnabled(!snapshot.exists() || snapshot.data().enabled !== false);
      },
      () => {
        if (!cancelled) setMobileEnabled(true);
      }
    );
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (cancelled) return;
      setUser(currentUser);
      setAuthReady(Boolean(currentUser));
      if (!currentUser) {
        signInAnonymously(auth)
          .catch(error => {
            if (!cancelled) setStatus(error instanceof Error ? error.message : "Nao consegui conectar o app.");
          });
      }
    });
    return () => {
      cancelled = true;
      unsubscribeControl();
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!services) return undefined;
    return onSnapshot(
      doc(services.db, "financasMobileCatalog", "main"),
      snapshot => {
        if (!snapshot.exists()) return;
        const catalog = normalizeDestinationCatalog(snapshot.data().destinations);
        if (hasDestinations(catalog)) setLiveDestinations(catalog);
      },
      () => null
    );
  }, [services]);

  useEffect(() => {
    if (!services || !user) {
      setPendingEntries([]);
      return undefined;
    }
    return onSnapshot(
      collection(services.db, "users", user.uid, "financasMobileInbox"),
      snapshot => {
        const entries = snapshot.docs
          .map(item => normalizeInboxEntry(item.id, item.data()))
          .filter(Boolean) as InboxEntry[];
        entries.sort((a, b) => String(b.updatedAtDevice || b.createdAtDevice).localeCompare(String(a.updatedAtDevice || a.createdAtDevice)));
        setPendingEntries(entries);
      },
      error => setStatus(error instanceof Error ? error.message : "Nao consegui carregar o historico.")
    );
  }, [services, user]);

  const destinationCatalog = liveDestinations || destinations;
  const activeDestinations = useMemo(() => destinationCatalog[entryType] || [], [destinationCatalog, entryType]);
  const categoryOptions = useMemo(() => uniqueCategories(activeDestinations), [activeDestinations]);
  const defaultCategory = categoryOptions.find(category => category.available > 0)?.key || categoryOptions[0]?.key || "";
  const activeCategory = categoryByType[entryType] || defaultCategory;
  const visibleDestinations = activeCategory
    ? activeDestinations.filter(destination => (destination.categoryKey || destination.path) === activeCategory)
    : activeDestinations;
  const selectableDestinations = visibleDestinations.filter(destination => !destination.locked);
  const selectedDestination =
    selectableDestinations.find(destination => destination.id === destinationByType[entryType])
    || selectableDestinations[0]
    || activeDestinations.find(destination => !destination.locked)
    || null;

  useEffect(() => {
    if (!activeDestinations.length) return;
    const nextCategory = activeCategory || defaultCategory;
    const nextVisible = nextCategory ? activeDestinations.filter(destination => (destination.categoryKey || destination.path) === nextCategory) : activeDestinations;
    const nextSelectable = nextVisible.filter(destination => !destination.locked);
    const currentDestination = nextSelectable.find(destination => destination.id === destinationByType[entryType]);
    if (nextCategory !== categoryByType[entryType]) {
      setCategoryByType(previous => ({ ...previous, [entryType]: nextCategory }));
    }
    if (!currentDestination) {
      setDestinationByType(previous => ({ ...previous, [entryType]: nextSelectable[0]?.id || "" }));
    }
  }, [activeCategory, activeDestinations, categoryByType, defaultCategory, destinationByType, entryType]);

  function selectCategory(categoryKey: string) {
    const nextDestination = activeDestinations.find(destination => (destination.categoryKey || destination.path) === categoryKey && !destination.locked) || null;
    setCategoryByType(previous => ({ ...previous, [entryType]: categoryKey }));
    setDestinationByType(previous => ({ ...previous, [entryType]: nextDestination?.id || "" }));
  }

  function resetForm() {
    setName("");
    setValue("");
    setInstallments("1");
    setEditingEntryId("");
  }

  function findDestination(type: EntryType, rowId: string) {
    return (destinationCatalog[type] || []).find(destination => destination.id === rowId) || null;
  }

  function startEditPendingEntry(entry: InboxEntry) {
    const destination = findDestination(entry.type, entry.destinationRowId);
    setEntryType(entry.type);
    if (destination) {
      setCategoryByType(previous => ({ ...previous, [entry.type]: destination.categoryKey || destination.path }));
      setDestinationByType(previous => ({ ...previous, [entry.type]: destination.id }));
    } else {
      setDestinationByType(previous => ({ ...previous, [entry.type]: "" }));
    }
    setName(entry.name);
    setValue(moneyInputValue(entry.value));
    setDate(entry.date || todayValue());
    setInstallments(String(entry.installments || 1));
    setEditingEntryId(entry.id);
    setStatus("Corrigindo lancamento pendente.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deletePendingEntry(entryId: string) {
    if (!services || !user || busy) return;
    if (!mobileEnabled) {
      setStatus("App do celular desativado pelo painel do notebook.");
      return;
    }
    const entry = pendingEntries.find(item => item.id === entryId);
    if (!window.confirm(`Excluir ${entry?.name || "este lancamento"}?`)) return;
    setBusy(true);
    setStatus("Excluindo...");
    try {
      await deleteDoc(doc(services.db, "users", user.uid, "financasMobileInbox", entryId));
      if (editingEntryId === entryId) resetForm();
      setStatus("Lancamento pendente excluido.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Nao consegui excluir.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!editingEntryId) return;
    if (pendingEntries.some(entry => entry.id === editingEntryId)) return;
    setName("");
    setValue("");
    setInstallments("1");
    setEditingEntryId("");
    setStatus("Lancamento importado pelo notebook.");
  }, [editingEntryId, pendingEntries]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!services || !user) return;
    if (!mobileEnabled) {
      setStatus("App do celular desativado pelo painel do notebook.");
      return;
    }
    const amount = parseMoney(value);
    const launchName = name.trim() || selectedDestination?.label || "";
    if (!selectedDestination || selectedDestination.locked) {
      setStatus("Escolha uma subcategoria com subdivisao editavel.");
      return;
    }
    if (!amount || !launchName) {
      setStatus("Informe nome e valor.");
      return;
    }
    setBusy(true);
    setStatus("Salvando...");
    try {
      const payload = {
        type: entryType,
        name: launchName,
        destinationRowId: selectedDestination.id,
        destinationLabel: selectedDestination.label,
        destinationPath: selectedDestination.path,
        destinationSectionLabel: selectedDestination.sectionLabel,
        destinationCategoryLabel: selectedDestination.categoryLabel,
        destinationSubdivisionLabel: selectedDestination.subdivisionLabel,
        value: amount,
        date,
        installments: Math.max(1, Math.min(12, Math.round(Number(installments) || 1))),
        status: "pending",
        source: "financas-mobile-cloud",
        clientMode: "anonymous",
        updatedAt: serverTimestamp(),
        updatedAtDevice: new Date().toISOString(),
        importedAt: null,
      };
      if (editingEntryId) {
        await updateDoc(doc(services.db, "users", user.uid, "financasMobileInbox", editingEntryId), payload);
      } else {
        await addDoc(collection(services.db, "users", user.uid, "financasMobileInbox"), {
          ...payload,
          createdAt: serverTimestamp(),
          createdAtDevice: new Date().toISOString(),
        });
      }
      const wasEditing = Boolean(editingEntryId);
      setName("");
      setValue("");
      setInstallments("1");
      setEditingEntryId("");
      setStatus(wasEditing ? "Lancamento corrigido." : "Lancamento salvo.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Não consegui salvar.");
    } finally {
      setBusy(false);
    }
  }

  if (!hasFirebaseConfig) {
    return (
      <main className="min-h-screen bg-[#070b13] px-4 py-6 text-slate-100">
        <section className="mx-auto flex max-w-md flex-col gap-4">
          <div className="text-center">
            <p className="text-xs font-black tracking-[0.18em] text-amber-300">Sommer&apos;s Store</p>
            <h1 className="mt-2 text-3xl font-black">Finanças Mobile</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Esta tela ja e hospedavel, mas a captura 24h precisa das variaveis Firebase no build/deploy.
            </p>
          </div>
          <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
            Configure `NEXT_PUBLIC_FINANCAS_FIREBASE_*` e publique no Firebase Hosting. Sem isso, o celular nao tem uma nuvem para gravar quando o notebook estiver desligado.
          </div>
        </section>
      </main>
    );
  }

  if (!services || !authReady || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070b13] px-4 text-slate-100">
        <div className="rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm font-black text-slate-300">
          Conectando app 24h...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b13] px-4 py-6 text-slate-100">
      <section className="mx-auto flex max-w-md flex-col gap-4">
        <header className="text-center">
          <p className="text-xs font-black tracking-[0.18em] text-emerald-300">Sommer&apos;s Store</p>
          <h1 className="mt-2 text-3xl font-black">Finanças Mobile</h1>
        </header>

        {!mobileEnabled && (
          <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-sm font-black leading-6 text-red-100">
            App do celular desativado pelo painel do notebook.
          </div>
        )}

        <form className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/70 p-4" onSubmit={handleSubmit}>
            {editingEntryId && (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-300/40 bg-amber-300/10 px-3 py-2 text-xs font-black text-amber-100">
                <span>Corrigindo pendente</span>
                <button className="rounded-md border border-amber-200/40 px-2 py-1 text-[11px] text-amber-50" onClick={resetForm} type="button">
                  CANCELAR
                </button>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2">
              {(["receitas", "despesas", "dividas"] as EntryType[]).map(type => {
                const theme = typeThemes[type];
                return (
                  <button
                    className={`min-h-12 rounded-lg border px-2 py-3 text-[11px] font-black leading-4 ${theme.button} ${entryType === type ? "ring-2 ring-white/60" : "opacity-78"}`}
                    key={type}
                    onClick={() => setEntryType(type)}
                    type="button"
                  >
                    {theme.label}
                  </button>
                );
              })}
            </div>
            {categoryOptions.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map(category => (
                  <button
                    className={`min-h-11 rounded-lg border px-2 py-2 text-xs font-black leading-4 ${activeCategory === category.key ? typeThemes[entryType].category : "border-slate-700 bg-slate-900 text-slate-300"} ${category.available ? "" : "opacity-60"}`}
                    key={category.key}
                    onClick={() => selectCategory(category.key)}
                    type="button"
                    title={`${category.label}: ${category.total}`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
            <label className="flex flex-col gap-1 text-xs font-black uppercase text-slate-400">
              Subdivisao
              <select
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-base text-slate-100"
                disabled={!selectableDestinations.length}
                value={selectedDestination?.id || ""}
                onChange={event => setDestinationByType(previous => ({ ...previous, [entryType]: event.target.value }))}
              >
                {!selectableDestinations.length && <option value="">Sem subdivisao editavel</option>}
                {visibleDestinations.length ? visibleDestinations.map(destination => (
                  <option disabled={destination.locked} key={destination.id} value={destination.id}>
                    {destination.label}{destination.locked ? " (protegido)" : ""}
                  </option>
                )) : (
                  <option value="">Sem destino cadastrado</option>
                )}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-black uppercase text-slate-400">
              Nome
              <input className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-base text-slate-100" value={name} onChange={event => setName(event.target.value)} placeholder={selectedDestination?.subdivisionLabel || selectedDestination?.label || "Mercado, pedagio, salario..."} />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-xs font-black uppercase text-slate-400">
                Valor
                <input className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-base text-slate-100" value={value} onChange={event => setValue(event.target.value)} inputMode="decimal" placeholder="0,00" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-black uppercase text-slate-400">
                Parcelas
                <input className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-base text-slate-100" value={installments} onChange={event => setInstallments(event.target.value)} min="1" max="12" type="number" />
              </label>
            </div>
            <label className="flex flex-col gap-1 text-xs font-black uppercase text-slate-400">
              Data
              <input className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-base text-slate-100" value={date} onChange={event => setDate(event.target.value)} type="date" />
            </label>
            <button className="rounded-lg bg-emerald-600 px-4 py-3 text-sm font-black text-white disabled:opacity-50" disabled={busy || !mobileEnabled} type="submit">
              {editingEntryId ? "ATUALIZAR" : "SALVAR"}
            </button>
        </form>

        {status && (
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-center text-xs font-bold leading-5 text-slate-300">
            {status}
          </div>
        )}

        <section className="flex flex-col gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-4">
          <header className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-black text-slate-100">Historico pendente</h2>
            <span className="rounded-md border border-slate-700 px-2 py-1 text-xs font-black text-slate-300">{pendingEntries.length}</span>
          </header>
          {pendingEntries.length ? (
            <div className="flex flex-col gap-2">
              {pendingEntries.map(entry => (
                <article className="rounded-lg border border-slate-800 bg-slate-900/70 p-3" key={entry.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-black text-slate-100">{entry.name}</div>
                      <div className="mt-1 text-xs font-bold leading-5 text-slate-400">
                        {entry.destinationPath || entry.destinationCategoryLabel || typeThemes[entry.type].label} / {entry.destinationSubdivisionLabel || entry.destinationLabel || entry.destinationRowId}
                      </div>
                      <div className="mt-1 text-xs font-bold text-slate-500">
                        {entry.date}{entry.installments > 1 ? ` - ${entry.installments}x` : ""}
                      </div>
                    </div>
                    <div className="shrink-0 text-right text-sm font-black text-emerald-200">{moneyLabel(entry.value)}</div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button className="rounded-md border border-sky-400/50 bg-sky-500/10 px-3 py-2 text-xs font-black text-sky-100 disabled:opacity-50" disabled={busy} onClick={() => startEditPendingEntry(entry)} type="button">
                      EDITAR
                    </button>
                    <button className="rounded-md border border-red-400/50 bg-red-500/10 px-3 py-2 text-xs font-black text-red-100 disabled:opacity-50" disabled={busy} onClick={() => deletePendingEntry(entry.id)} type="button">
                      EXCLUIR
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-800 px-3 py-4 text-center text-xs font-bold text-slate-500">
              Nenhum lancamento pendente.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
