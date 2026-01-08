"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Si usas TypeScript, mantén los tipos. Si no, quita ": React.ComponentProps<...>".
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}