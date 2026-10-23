import "./font.css";
import { createRoot } from "react-dom/client";
import { Provider as ChakraProvider } from "./components/ui/provider.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.jsx";
import { store } from "./store/index.js";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Data stays fresh for 5 mins
      gcTime: 15 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <App />
        <Toaster />
      </ChakraProvider>
    </QueryClientProvider>
  </ReduxProvider>,
);
