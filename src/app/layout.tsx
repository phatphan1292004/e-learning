import type { Metadata } from "next";
import "./globals.scss";
import { inter } from "@/utils";
import { ClerkProvider } from "@clerk/nextjs";

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider } from "@/shared/common/theme-provider";
export const metadata: Metadata = {
  title: "Ucademy",
  description: "Nền tảng học lập trình trực tuyến siêu cấp vip pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex items-center justify-center h-screen w-full">{children}</div>
            <ToastContainer
              autoClose={2000}
              className="text-sm font-medium"
              position="top-right"
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
