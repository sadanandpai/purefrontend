import type { Metadata } from "next";
import { GlobalWrapper } from "./global.wrapper";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "@/ui/styles/globals.scss";
import "@/ui/styles/styles.scss";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const bGr = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bgr",
});

export const metadata: Metadata = {
  title: "ClearFrontend",
  description: "Online Coding Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className} suppressHydrationWarning>
      <body className="antialiased">
        <GlobalWrapper>{children}</GlobalWrapper>
      </body>
    </html>
  );
}
