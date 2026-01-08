"use client"

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackToProjects() {
    return (
        <div className="w-full max-w-md mb-6">
            <Link href="/projects" className="text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Volver a proyectos
            </Link>
        </div>
    )
}