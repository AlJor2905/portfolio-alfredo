"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, ArrowLeft, Coffee, Briefcase } from "lucide-react"
import Link from "next/link"
import { BackToProjects } from "@/components/ui/back-to-projects"

export default function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState<'work' | 'break'>('work') // 'work' o 'break'

    // Referencia para el intervalo
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    // Duraciones en segundos
    const WORK_TIME = 25 * 60
    const BREAK_TIME = 5 * 60

    const toggleTimer = () => setIsActive(!isActive)

    const resetTimer = () => {
        setIsActive(false)
        setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME)
    }

    const switchMode = (newMode: 'work' | 'break') => {
        setMode(newMode)
        setIsActive(false)
        setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME)
    }

    // Lógica del contador
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((time) => time - 1)
            }, 1000)
        } else if (timeLeft === 0) {
            // Cuando llega a 0
            setIsActive(false)
            if (intervalRef.current) clearInterval(intervalRef.current)
            // Opcional: Aquí podrías poner un sonido de alarma
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isActive, timeLeft])

    // Formatear MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    // Calcular progreso para la barra (inverso)
    const totalTime = mode === 'work' ? WORK_TIME : BREAK_TIME
    const progress = ((totalTime - timeLeft) / totalTime) * 100

    return (
        <div className={`min-h-screen py-20 px-4 flex flex-col items-center justify-center transition-colors duration-500 ${mode === 'work' ? 'bg-background' : 'bg-emerald-950/10'}`}>

            <BackToProjects />

            <div className="w-full max-w-md bg-card rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.07)] p-8 border border-border/50 relative overflow-hidden">
                {/* Barra de progreso superior */}
                <div className="absolute top-0 left-0 h-1.5 bg-primary transition-all duration-1000 ease-linear" style={{ width: `${progress}%` }} />

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Pomodoro Focus</h1>
                    <p className="text-muted-foreground">Gestiona tu tiempo y mantén la productividad.</p>
                </div>

                {/* Selector de Modo */}
                <div className="flex bg-secondary p-1 rounded-xl mb-8">
                    <button
                        onClick={() => switchMode('work')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'work' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <Briefcase className="w-4 h-4" /> Trabajo
                    </button>
                    <button
                        onClick={() => switchMode('break')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'break' ? 'bg-card text-emerald-500 shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <Coffee className="w-4 h-4" /> Descanso
                    </button>
                </div>

                {/* Reloj Grande */}
                <div className="text-center mb-10">
                    <div className={`text-8xl font-mono font-bold tracking-tighter tabular-nums transition-colors ${mode === 'work' ? 'text-foreground' : 'text-emerald-500'}`}>
                        {formatTime(timeLeft)}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mt-2 uppercase tracking-widest">
                        {isActive ? (mode === 'work' ? 'Enfócate' : 'Relájate') : 'Pausado'}
                    </p>
                </div>

                {/* Controles */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={toggleTimer}
                        className={`h-16 w-16 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg ${isActive
                                ? 'bg-secondary text-foreground hover:bg-secondary/80'
                                : 'bg-primary text-primary-foreground hover:bg-primary/90'
                            }`}
                    >
                        {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="h-16 w-16 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                        title="Reiniciar"
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    )
}