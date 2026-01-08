import { ProjectCard } from "@/components/project-card"
import { allProjects } from "@/mock-data/data"

export default function ProjectsPage() {
    return (
        <div className="container mx-auto px-4 py-24">
            <div className="max-w-2xl mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Mis Proyectos</h1>
                <p className="text-muted-foreground text-lg">
                    Aquí encontrarás una colección completa de mis desarrollos, desde aplicaciones web complejas hasta herramientas experimentales y utilidades.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project, index) => (
                    <ProjectCard key={index} {...project} color={project.color ?? ""} />
                ))}
            </div>
        </div>
    )
}