"use client";

import { Button } from "./button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "../../../lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme();

  const handleToggle = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Manually update the html class for immediate effect
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        "h-9 w-9 rounded-xl border-slate-200 dark:border-slate-600 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300 shadow-sm hover:shadow-md",
        className,
      )}
      onClick={handleToggle}
    >
      {currentTheme === "dark" ? (
        <Sun className="h-4 w-4 text-amber-500 drop-shadow-sm" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300" />
      )}
      <span className="sr-only">
        {currentTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"}
      </span>
    </Button>
  );
}
