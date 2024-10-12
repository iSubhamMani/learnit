"use client";

import Navbar from "@/components/Navbar";
import NavbarMobileBottom from "@/components/NavbarMobileBottom";
import StoreProvider from "@/components/StoreProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div className="bg-base-200 flex-1 md:flex-0 flex flex-col pb-10 md:pb-0">
            {children}
          </div>
          <NavbarMobileBottom />
        </QueryClientProvider>
      </StoreProvider>
    </div>
  );
}
