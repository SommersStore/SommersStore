"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, isConfigValid } from "@/lib/firebase";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(isConfigValid);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isConfigValid || !auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (!firebaseUser) {
        const next = encodeURIComponent(pathname || "/hub");
        router.replace(`/login?next=${next}`);
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#111827",
        color: "#f8fafc",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        fontFamily: "var(--font-geist-sans)"
      }}>
        <div style={{
          border: "1px solid rgba(56,189,248,0.26)",
          borderRadius: "8px",
          padding: "18px 20px",
          background: "rgba(15,23,42,0.82)",
          color: "#7dd3fc",
          fontSize: "12px",
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase"
        }}>
          Verificando acesso seguro
        </div>
      </div>
    );
  }

  if (!isConfigValid || !auth) {
    return (
      <main style={{
        minHeight: "100vh",
        background: "#111827",
        color: "#f8fafc",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        fontFamily: "var(--font-geist-sans)"
      }}>
        <section style={{
          width: "min(480px, 100%)",
          border: "1px solid rgba(248,250,252,0.12)",
          borderRadius: "8px",
          padding: "24px",
          background: "rgba(15,23,42,0.86)"
        }}>
          <p style={{ margin: "0 0 8px", color: "#38bdf8", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Firebase pendente
          </p>
          <h1 style={{ margin: "0 0 12px", fontSize: "24px" }}>Configure o acesso seguro</h1>
          <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6 }}>
            Preencha as variaveis NEXT_PUBLIC_FIREBASE_* no arquivo .env.local antes de usar o painel privado.
          </p>
        </section>
      </main>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
