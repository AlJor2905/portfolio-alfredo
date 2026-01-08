import Link from "next/link"
import { Github, ExternalLink, FolderGit2 } from "lucide-react"

interface ProjectCardProps {
    title: string
    description: string
    tags: string[]
    links: {
        demo: string
        github: string
    }
    color: string
}

export function ProjectCard({ title, description, tags, links, color }: ProjectCardProps) {
    return (
        <div className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] dark:hover:shadow-[0_20px_40px_rgb(255,255,255,0.1)]">
            {/* Área de Imagen / Placeholder */}
            <div className={`h-48 w-full bg-gradient-to-br ${color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/90 group-hover:scale-110 transition-transform duration-300">
                    <FolderGit2 className="w-12 h-12 opacity-50" />
                </div>
            </div>

            {/* Contenido */}
            <div className="flex flex-col flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <div className="flex gap-2">
                        <Link href={links.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link href={links.demo} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                            <ExternalLink className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                <p className="text-muted-foreground mb-6 line-clamp-3">
                    {description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}