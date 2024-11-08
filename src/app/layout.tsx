import type { Metadata } from "next";
import "@/ui/styles/globals.scss";
import "@/ui/styles/styles.scss";

export const metadata: Metadata = {
  title: "PureFrontend",
  description: "Online Coding Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
