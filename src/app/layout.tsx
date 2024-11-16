import type { Metadata } from "next";
import "@/ui/styles/globals.scss";
import "@/ui/styles/styles.scss";
import { GlobalWrapper } from "./glabal.wrapper";

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <GlobalWrapper>{children}</GlobalWrapper>
      </body>
    </html>
  );
}
