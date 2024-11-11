import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <Theme appearance="light">{children}</Theme>;
}
