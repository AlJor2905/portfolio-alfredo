"use client"

import { useState, useEffect, useCallback } from "react"
import { Copy, RefreshCw, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BackToProjects } from "@/components/ui/back-to-projects"

export default function PasswordGenerator() {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState(16)
    const [includeUppercase, setIncludeUppercase] = useState(true)
    const [includeLowercase, setIncludeLowercase] = useState(true)
    const [includeNumbers, setIncludeNumbers] = useState(true)
    const [includeSymbols, setIncludeSymbols] = useState(true)
    const [copied, setCopied] = useState(false)
    const [strength, setStrength] = useState(0)

    // Lógica principal de generación
    const generatePassword = useCallback(() => {
        let charset = ""
        if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
        if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (includeNumbers) charset += "0123456789"
        if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-="

        if (charset === "") {
            setPassword("")
            return
        }

        let generatedPassword = ""
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length)
            generatedPassword += charset[randomIndex]
        }
        setPassword(generatedPassword)
        calculateStrength(generatedPassword)
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

    // Calcular fuerza simple (0-4)
    const calculateStrength = (pass: string) => {
        let score = 0
        if (pass.length > 8) score++
        if (pass.length > 12) score++
        if (/[A-Z]/.test(pass)) score++
        if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++
        setStrength(score)
    }

    // Generar al cargar la página
    useEffect(() => {
        generatePassword()
    }, [generatePassword])

    const copyToClipboard = () => {
        if (!password) return
        navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Colores para la barra de fuerza
    const getStrengthColor = () => {
        if (strength <= 1) return "bg-red-500"
        if (strength === 2) return "bg-orange-500"
        if (strength === 3) return "bg-yellow-500"
        return "bg-emerald-500" // 4
    }

    const getStrengthLabel = () => {
        if (strength <= 1) return "Débil"
        if (strength === 2) return "Regular"
        if (strength === 3) return "Buena"
        return "Fuerte"
    }

    return (
        <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-background">

            {/* Botón Volver */}
            <BackToProjects />

            <div className="w-full max-w-md bg-card rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.07)] p-6 md:p-8 border border-border/50">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-foreground mb-2">Generador de Contraseñas</h1>
                    <p className="text-muted-foreground text-sm">Crea contraseñas seguras y aleatorias al instante.</p>
                </div>

                {/* Display de la contraseña */}
                <div className="relative mb-6">
                    <div className="w-full bg-secondary/50 rounded-xl p-4 pr-12 text-center break-all font-mono text-xl md:text-2xl text-foreground min-h-[4rem] flex items-center justify-center border border-border">
                        {password}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-background rounded-lg transition-colors text-muted-foreground hover:text-primary"
                        title="Copiar"
                    >
                        {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                </div>

                {/* Barra de Fuerza */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-xs font-medium text-muted-foreground w-12">{getStrengthLabel()}</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ease-out ${getStrengthColor()}`}
                            style={{ width: `${(strength / 4) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Controles */}
                <div className="space-y-6">
                    {/* Slider Longitud */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Longitud</label>
                            <span className="text-lg font-bold text-primary">{length}</span>
                        </div>
                        <input
                            type="range"
                            min="6"
                            max="32"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full cursor-pointer accent-primary"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={includeUppercase}
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                                className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                            />
                            <span className="text-sm group-hover:text-foreground transition-colors">Mayúsculas</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={includeLowercase}
                                onChange={(e) => setIncludeLowercase(e.target.checked)}
                                className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                            />
                            <span className="text-sm group-hover:text-foreground transition-colors">Minúsculas</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                                className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                            />
                            <span className="text-sm group-hover:text-foreground transition-colors">Números</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={(e) => setIncludeSymbols(e.target.checked)}
                                className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                            />
                            <span className="text-sm group-hover:text-foreground transition-colors">Símbolos</span>
                        </label>
                    </div>

                    {/* Botón Generar */}
                    <button
                        onClick={generatePassword}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/25"
                    >
                        <RefreshCw className="w-5 h-5" /> Generar Nueva
                    </button>
                </div>
            </div>
        </div>
    )
}