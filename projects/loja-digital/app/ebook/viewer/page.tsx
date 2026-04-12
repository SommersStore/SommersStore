"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToCofre() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ebook/viewer/cofre-master");
  }, [router]);

  return <div style={{ background: '#050508', minHeight: '100vh' }}></div>;
}
