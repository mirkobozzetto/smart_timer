import clsx from "clsx";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const inter = Inter_Tight({
  subsets: ["latin"],
  weight: "100",
});

export const metadata: Metadata = {
  title: "Apple Timer",
  description: "Codeline challenge !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "bg-dark/90")}>{children}</body>
    </html>
  );
}
