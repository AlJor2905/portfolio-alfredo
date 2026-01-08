import {
    Code2,
    Database,
    Palette,
    Settings2,
} from "lucide-react"

// Definimos esquemas de colores para cada categoría
const colorSchemes = {
    blue: {
        icon: "text-blue-500",
        badgeBg: "bg-blue-100 dark:bg-blue-900/30",
        badgeText: "text-blue-700 dark:text-blue-300",
        badgeBorder: "border-blue-200 dark:border-blue-800",
        badgeHover: "hover:bg-blue-200 dark:hover:bg-blue-800/50 hover:border-blue-400 dark:hover:border-blue-600",
    },
    green: {
        icon: "text-emerald-500",
        badgeBg: "bg-emerald-100 dark:bg-emerald-900/30",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        badgeBorder: "border-emerald-200 dark:border-emerald-800",
        badgeHover: "hover:bg-emerald-200 dark:hover:bg-emerald-800/50 hover:border-emerald-400 dark:hover:border-emerald-600",
    },
    purple: {
        icon: "text-purple-500",
        badgeBg: "bg-purple-100 dark:bg-purple-900/30",
        badgeText: "text-purple-700 dark:text-purple-300",
        badgeBorder: "border-purple-200 dark:border-purple-800",
        badgeHover: "hover:bg-purple-200 dark:hover:bg-purple-800/50 hover:border-purple-400 dark:hover:border-purple-600",
    },
    orange: {
        icon: "text-orange-500",
        badgeBg: "bg-orange-100 dark:bg-orange-900/30",
        badgeText: "text-orange-700 dark:text-orange-300",
        badgeBorder: "border-orange-200 dark:border-orange-800",
        badgeHover: "hover:bg-orange-200 dark:hover:bg-orange-800/50 hover:border-orange-400 dark:hover:border-orange-600",
    },
}

const skillCategories = [
    {
        title: "Core & Frameworks",
        icon: Code2,
        color: colorSchemes.blue, // Asignamos color azul
        skills: [
            "React",
            "TypeScript",
            "JavaScript (ES6+)",
            "Next.js",
            "AngularJS",
            "Angular 2+",
            "PHP",
            "Ruby"
        ],
    },
    {
        title: "State & Data",
        icon: Database,
        color: colorSchemes.green, // Asignamos color verde
        skills: [
            "Zustand",
            "Redux Toolkit",
            "Context API",
            "GraphQL (Apollo)",
            "TanStack Query",
            "REST APIs",
            "MySQL"
        ],
    },
    {
        title: "Design & UI",
        icon: Palette,
        color: colorSchemes.purple, // Asignamos color morado
        skills: [
            "Tailwind CSS",
            "SCSS",
            "Material UI",
            "Ant Design",
            "Headless UI",
            "Responsive Design",
            "Figma",
            "UX/UI"
        ],
    },
    {
        title: "Architecture & Ops",
        icon: Settings2,
        color: colorSchemes.orange, // Asignamos color naranja
        skills: [
            "AI-Driven Dev",
            "Legacy Migrations",
            "Performance Tuning",
            "Jest",
            "React Testing Library",
            "Git",
            "Docker",
            "CI/CD",
            "Agile"
        ],
    },
]

export function TechStack() {
    return (
        <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                        Mi Stack Tecnológico
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Combinación de herramientas modernas y metodologías robustas para crear soluciones escalables.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {skillCategories.map((category, index) => {
                        const Icon = category.icon;
                        const colors = category.color;

                        return (
                            <div
                                key={index}
                                className="group bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg bg-secondary group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors duration-300`}>
                                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-card-foreground">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colors.badgeBg} ${colors.badgeText} ${colors.badgeBorder} ${colors.badgeHover} transition-all duration-200 cursor-default hover:scale-105 animate-fade-in-up`}
                                            style={{ animationDelay: `${skillIndex * 50}ms` }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}