"use client";

import "./globals.css";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar } from "next-nprogress-bar";
import ChatBot from "@/components/ChatBot";
import { Toaster } from "@/components/ui/sonner";

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const sansFont = Bricolage_Grotesque({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "variable",
});

const serifFont = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sansFont.className} ${serifFont.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <AppProgressBar color="#000" options={{ showSpinner: false }} />
          {children}
          <ChatBot />
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
