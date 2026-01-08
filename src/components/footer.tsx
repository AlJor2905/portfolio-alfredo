import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background">
            <div className="container mx-auto px-4 py-8 md:py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Lado Izquierdo: Marca y Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="text-lg font-bold">
                            Alfredo<span className="text-primary">.dev</span>
                        </span>
                        <p className="text-sm text-muted-foreground text-center md:text-left">
                            © {new Date().getFullYear()} Alfredo. Construido con Next.js & Tailwind.
                        </p>
                    </div>

                    {/* Lado Derecho: Redes Sociales */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://github.com"
                            target="_blank"
                            className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <Github className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <Linkedin className="w-5 h-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                            href="mailto:tuemail@ejemplo.com"
                            className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <Mail className="w-5 h-5" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}