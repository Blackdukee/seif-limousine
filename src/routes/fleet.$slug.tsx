import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/fleet/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$lang/fleet/$slug",
      params: { lang: "en", slug: params.slug },
    });
  },
});
