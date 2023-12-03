import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWSClient, httpBatchLink, wsLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import MainPage from "./MainPage";

const App = () => {
  const wsClient = createWSClient({
    url: "ws://localhost:4000",
  });

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        wsLink({
          client: wsClient,
        }),
        httpBatchLink({
          url: "http://localhost:4000/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
