import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "./_components/Header";
import { BottomNews } from "./_components/BottomNews";
import { Hi } from "./_components/Hi";

export const metadata: Metadata = {
  title: "TUKA.COM",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col items-center mt-[80px]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Hi />
          {children}
          <BottomNews />
        </ThemeProvider>
      </body>
      <link rel="icon" href="./public/favicon.ico" />
    </html>
  );
}
