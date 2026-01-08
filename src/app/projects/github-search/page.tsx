"use client"

import { useState } from "react"
import { Search, Github, Users, FolderGit2, Calendar, MapPin, Link as LinkIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BackToProjects } from "@/components/ui/back-to-projects"

interface UserData {
    avatar_url: string
    name: string
    login: string
    bio: string
    public_repos: number
    followers: number
    following: number
    html_url: string
    created_at: string
    location: string | null
    blog: string | null
}

export default function GithubSearch() {
    const [username, setUsername] = useState("")
    const [userData, setUserData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (!username.trim()) return

        setLoading(true)
        setError(null)
        setUserData(null)

        try {
            const res = await fetch(`https://api.github.com/users/${username}`)

            if (!res.ok) {
                throw new Error("Usuario no encontrado")
            }

            const data = await res.json()
            setUserData(data)
        } catch (err) {
            setError("No encontramos a ese usuario. Intenta con otro.")
        } finally {
            setLoading(false)
        }
    }

    // Formatear fecha (ej: 2023-01-01 -> 1 ene 2023)
    const formatDate = (isoString: string) => {
        const date = new Date(isoString)
        return date.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
    }

    return (
        <div className="min-h-screen py-20 px-4 flex flex-col items-center bg-background">

            {/* Botón Volver */}
            <BackToProjects />

            <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Buscador GitHub</h1>
                    <p className="text-muted-foreground">Explora perfiles y estadísticas de desarrolladores.</p>
                </div>

                {/* Barra de Búsqueda */}
                <form onSubmit={handleSearch} className="relative mb-8 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-11 pr-4 py-4 bg-card border-none rounded-2xl text-foreground placeholder-muted-foreground shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.07)] focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        placeholder="Escribe un usuario (ej: vercel)..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "..." : "Buscar"}
                    </button>
                </form>

                {/* Estado de Error */}
                {error && (
                    <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 rounded-xl text-center mb-8 animate-in fade-in slide-in-from-top-4">
                        {error}
                    </div>
                )}

                {/* Tarjeta de Perfil */}
                {userData && (
                    <div className="bg-card rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.07)] animate-in fade-in slide-in-from-bottom-4 border border-border/50">
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">

                            {/* Avatar */}
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-lg shrink-0">
                                <Image
                                    src={userData.avatar_url}
                                    alt={userData.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Info Principal */}
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold">{userData.name || userData.login}</h2>
                                        <Link href={userData.html_url} target="_blank" className="text-primary hover:underline">
                                            @{userData.login}
                                        </Link>
                                    </div>
                                    <span className="text-xs text-muted-foreground mt-2 md:mt-0 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" /> Unido el {formatDate(userData.created_at)}
                                    </span>
                                </div>

                                <p className="text-muted-foreground mt-4">{userData.bio || "Este usuario no tiene biografía."}</p>

                                {/* Datos extra */}
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground mt-2">
                                    {userData.location && (
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" /> {userData.location}
                                        </div>
                                    )}
                                    {userData.blog && (
                                        <div className="flex items-center gap-1">
                                            <LinkIcon className="w-4 h-4" />
                                            <a href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors truncate max-w-[200px]">
                                                Website
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mt-8 bg-secondary/50 rounded-xl p-4 border border-border">
                            <div className="text-center">
                                <div className="text-xs text-muted-foreground font-medium mb-1 flex items-center justify-center gap-1">
                                    <FolderGit2 className="w-3 h-3" /> Repos
                                </div>
                                <span className="text-xl font-bold text-foreground">{userData.public_repos}</span>
                            </div>
                            <div className="text-center border-l border-border">
                                <div className="text-xs text-muted-foreground font-medium mb-1 flex items-center justify-center gap-1">
                                    <Users className="w-3 h-3" /> Seguidores
                                </div>
                                <span className="text-xl font-bold text-foreground">{userData.followers}</span>
                            </div>
                            <div className="text-center border-l border-border">
                                <div className="text-xs text-muted-foreground font-medium mb-1 flex items-center justify-center gap-1">
                                    <Users className="w-3 h-3" /> Siguiendo
                                </div>
                                <span className="text-xl font-bold text-foreground">{userData.following}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}