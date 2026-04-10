"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        // Descomentar quando a página de login estiver pronta
        // router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        background: "#050508",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-montserrat)"
      }}>
        <div style={{
          padding: "20px",
          border: "1px solid rgba(197, 160, 89, 0.2)",
          borderRadius: "8px",
          color: "#C5A059",
          fontSize: "12px",
          letterSpacing: "4px",
          textTransform: "uppercase",
          animation: "pulse 2s infinite"
        }}>
          Verificando Acesso Elite...
        </div>
      </div>
    );
  }

  // Por enquanto libera o acesso para testes, mas monitora o estado do usuário
  return <>{children}</>;
}
