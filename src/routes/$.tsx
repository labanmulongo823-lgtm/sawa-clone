import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const SawaApp = lazy(() => import("@/SawaApp"));

export const Route = createFileRoute("/$")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "KHWWC — Kirinyaga Healthcare Workers Welfare" },
      { name: "description", content: "Member portal for contributions, beneficiaries, statements, donations and events." },
      { property: "og:title", content: "KHWWC — Kirinyaga Healthcare Workers Welfare" },
      { property: "og:description", content: "Member portal for contributions, beneficiaries, statements, donations and events." },
    ],
  }),
  component: Shell,
});

export function Shell() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <SawaApp />
    </Suspense>
  );
}
