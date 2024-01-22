"use client";

import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

export default function GlobalProvider({ children }) {
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
}
