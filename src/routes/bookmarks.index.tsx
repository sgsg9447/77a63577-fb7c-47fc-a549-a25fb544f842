import { createFileRoute } from "@tanstack/react-router";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const Route = createFileRoute("/bookmarks/")({
  component: BookmarksPage,
});

function BookmarksPage() {
  return <div>BookmarksPage</div>;
}
