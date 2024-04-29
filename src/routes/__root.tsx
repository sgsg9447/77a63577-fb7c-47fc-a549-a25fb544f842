import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import Layout from "../components/layout";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Layout,
});
