import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell/Shell";


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

