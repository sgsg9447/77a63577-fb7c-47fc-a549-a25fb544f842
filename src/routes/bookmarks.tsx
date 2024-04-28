import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/bookmarks")({
  component: () => <div>Hello /bookmarks!</div>,
});
