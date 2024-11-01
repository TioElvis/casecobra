import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["500"], subsets: ["latin"] });

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
        <main className="min-h-[calc(100vh-3.5rem-1px)] flex flex-col grainy-light">
          {children}
        </main>
      </body>
    </html>
  );
}
