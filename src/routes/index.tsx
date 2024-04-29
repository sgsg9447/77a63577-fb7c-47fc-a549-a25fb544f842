import { createFileRoute } from "@tanstack/react-router";
import { MarketsPage } from "./markets.index";

export const Route = createFileRoute("/")({
  component: MarketsPage,
});
