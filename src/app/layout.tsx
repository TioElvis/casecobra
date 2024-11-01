import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
// @components
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const roboto = Roboto({ weight: ["500"], subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Casecobra",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="it">
      <body className={roboto.className}>
        <header className="w-full h-14 sticky top-0 z-[99] bg-white">
          <Navbar />
        </header>
        <main className="min-h-[calc(100vh-3.5rem-1px)] flex flex-col grainy-light">
          <Providers>{children}</Providers>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
