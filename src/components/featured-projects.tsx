import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { ProjectCard } from "./project-card"
import { allProjects } from "@/mock-data/data"


export function FeaturedProjects() {
    return (
        <section className="py-20 container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                        Proyectos Destacados
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Una selección de mis trabajos más recientes y desafiantes.
                    </p>
                </div>

                <Link
                    href="/projects"
                    className="hidden md:inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                    Ver todos los proyectos <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {allProjects.slice(0, 3).map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        tags={project.tags}
                        links={project.links}
                        color={project.color ?? ""}
                    />
                ))}
            </div>

            {/* Botón móvil para ver todos */}
            <div className="mt-8 text-center md:hidden">
                <Link
                    href="/projects"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    Ver todos los proyectos
                </Link>
            </div>
        </section>
    )
}