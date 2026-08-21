import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/$serviceSlug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$lang/services/$serviceSlug",
      params: { lang: "en", serviceSlug: params.serviceSlug },
      statusCode: 301,
    });
  },
});
