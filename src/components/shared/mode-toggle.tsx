"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "rounded-full p-1 hover:bg-muted/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors",
      )}
    >
      {theme === "dark" ? <Sun className="h-4 w-4 fill-primary" /> : <Moon className="h-4 w-4 fill-primary" />}
    </button>
  )
}

