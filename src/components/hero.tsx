import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
    return (
        <section className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">

            {/* Efecto de fondo sutil (Glow) para que no se vea vacío sin imagen */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>

            <div className="space-y-8 max-w-4xl mx-auto">

                {/* Titulo Principal */}
                <h1 className="text-4xl font-extrabold tracking-loose sm:text-5xl md:text-6xl lg:text-7xl">
                    Arquitectura Limpia. <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                        Impacto Real.
                    </span>
                </h1>

                {/* Descripción Larga (Basada en tu texto) */}
                <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    <p>
                        Con más de <span className="text-foreground font-semibold">7+ años de experiencia Front end</span>,
                        me especializo en construir aplicaciones web rápidas, accesibles y centradas en el usuario.
                    </p>
                    <p>
                        He liderado el desarrollo de soluciones críticas en ecosistemas SaaS e E-commerce, siempre buscando el equilibrio perfecto entre rendimiento técnico, usabilidad y objetivos de negocio.
                    </p>
                </div>

                {/* Área de Acción */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                    <Link
                        href="/projects"
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-8 font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:scale-105"
                    >
                        <span className="mr-2">Ver mi trabajo</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    {/* Redes Sociales (Ahora alineadas al centro junto al botón o abajo) */}
                    <div className="flex items-center gap-4">
                        <Link href="https://github.com/AlJor2905" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full">
                            <Github className="h-6 w-6" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="https://linkedin.com/in/ortizalfredo" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full">
                            <Linkedin className="h-6 w-6" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="mailto:ortialfredo@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-secondary rounded-full">
                            <Mail className="h-6 w-6" />
                            <span className="sr-only">Email</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}