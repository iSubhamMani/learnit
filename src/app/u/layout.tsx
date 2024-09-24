"use client";

import Navbar from "@/components/Navbar";
import StoreProvider from "@/components/StoreProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </StoreProvider>
    </div>
  );
}
