import { createFileRoute } from "@tanstack/react-router";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const Route = createFileRoute("/markets/")({
  component: MarketsPage,
});

export function MarketsPage() {
  return <div>Markets</div>;
}
