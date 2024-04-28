import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/markets")({
  component: () => <div>Hello /market!</div>,
});
