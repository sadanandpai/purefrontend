"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@radix-ui/themes";
import { Moon, Sun } from "lucide-react";
import classes from "./theme-switch.module.scss";

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={classes.themeSwitcher}>
      <Sun />
      <Switch
        onCheckedChange={(value) => setTheme(value ? "dark" : "light")}
        defaultChecked={theme === "dark"}
      />
      <Moon />
    </div>
  );
};
