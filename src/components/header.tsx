import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
    return (
        <header className="sticky top-0 z-1000 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
                {/* Lado Izquierdo: Logo y Navegación */}
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Alfredo<span className="text-primary">.dev</span>
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        <Link
                            href="/projects"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Proyectos
                        </Link>
                    </nav>
                </div>

                {/* Versión Móvil (Logo simple) */}
                <div className="flex md:hidden">
                    <span className="font-bold">Alfredo.dev</span>
                </div>

                {/* Lado Derecho: Toggle y Redes (si quisieras agregarlas) */}
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <nav className="flex items-center">
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}