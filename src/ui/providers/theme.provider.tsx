import { ThemeProvider as NextThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class">
      <Theme accentColor="plum">{children}</Theme>
    </NextThemeProvider>
  );
}
