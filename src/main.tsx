import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/Root.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CoinListPage from "./pages/CoinListPage.tsx";
import CoinPage from "./pages/CoinPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import StrategyPage from "./pages/StrategyPage.tsx";

//
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        path: "/coins",
        element: <CoinListPage />,
        children: [
          {
            path: "/coins/:id",
            element: <CoinPage />
          }
        ]
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/backtest",
        element: <StrategyPage />,
      },

    ],
  },




]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 15_000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
          {/* <App /> */}
          <RouterProvider router={router} />
            
        <ReactQueryDevtools></ReactQueryDevtools>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
