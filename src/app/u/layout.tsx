"use client";

import Navbar from "@/components/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        {children}
      </QueryClientProvider>
    </div>
  );
}
