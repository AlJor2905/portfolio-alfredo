"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, RefreshCw, Loader2, AlertCircle, Trophy, Crown, Medal, Target, PartyPopper, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { BackToProjects } from "@/components/ui/back-to-projects"

// Tipos
interface APIQuestion {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

interface Question {
    question: string
    options: string[]
    answerIndex: number
}

export default function QuizDev() {
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const decodeHTML = (html: string) => {
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }

    const fetchQuestions = async () => {
        setLoading(true)
        setError(null)
        setQuestions([])
        setShowScore(false)
        setScore(0)
        setCurrentQuestion(0)
        setSelectedOption(null)
        setIsAnswered(false)

        try {
            const res = await fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
            if (!res.ok) throw new Error("Error al conectar con la API")
            const data = await res.json()
            if (data.results.length === 0) throw new Error("No se encontraron preguntas")

            const processedQuestions: Question[] = data.results.map((q: APIQuestion) => {
                const allOptions = [...q.incorrect_answers, q.correct_answer]
                const shuffledOptions = allOptions.sort(() => Math.random() - 0.5)
                const correctIndex = shuffledOptions.indexOf(q.correct_answer)

                return {
                    question: decodeHTML(q.question),
                    options: shuffledOptions.map(opt => decodeHTML(opt)),
                    answerIndex: correctIndex
                }
            })

            setQuestions(processedQuestions)
        } catch (err) {
            setError("Hubo un error cargando las preguntas. Intenta de nuevo.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchQuestions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAnswerClick = (optionIndex: number) => {
        if (isAnswered) return

        setSelectedOption(optionIndex)
        setIsAnswered(true)

        if (optionIndex === questions[currentQuestion].answerIndex) {
            setScore(score + 1)
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedOption(null)
                setIsAnswered(false)
            } else {
                setShowScore(true)
            }
        }, 1500)
    }

    // --- NUEVA FUNCIÓN: Determinar el feedback final ---
    const getFeedback = () => {
        const percentage = (score / questions.length) * 100

        if (percentage === 100) {
            return { message: "¡Perfecto!", color: "text-yellow-500", bg: "bg-yellow-500/10", icon: Crown }
        } else if (percentage >= 80) {
            return { message: "¡Excelente trabajo!", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: Trophy }
        } else if (percentage >= 50) {
            return { message: "¡Bien hecho!", color: "text-blue-500", bg: "bg-blue-500/10", icon: Medal }
        } else {
            return { message: "Sigue practicando", color: "text-muted-foreground", bg: "bg-secondary", icon: Target }
        }
    }

    // Obtenemos el feedback solo cuando se muestra el puntaje
    const feedback = showScore ? getFeedback() : null
    const FeedbackIcon = feedback?.icon || Trophy

    return (
        <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-background">

            <BackToProjects />

            <div className="w-full max-w-lg bg-card rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.07)] p-8 border border-border/50 min-h-[400px] flex flex-col justify-center">

                {loading && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-muted-foreground">Cargando preguntas...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center">
                        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2">Error</h3>
                        <p className="text-muted-foreground mb-6">{error}</p>
                        <button
                            onClick={fetchQuestions}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                )}

                {/* --- PANTALLA FINAL MEJORADA --- */}
                {!loading && !error && showScore && feedback && (
                    <div className="text-center py-4 animate-in fade-in slide-in-from-bottom-4">
                        {/* Icono y Color Dinámico */}
                        <div className={`inline-flex p-4 rounded-full ${feedback.bg} ${feedback.color} mb-6 transition-all duration-500 transform hover:scale-110`}>
                            <FeedbackIcon className="w-12 h-12" />
                        </div>

                        {/* Mensaje Dinámico */}
                        <h2 className="text-3xl font-bold mb-2">{feedback.message}</h2>
                        <p className="text-muted-foreground mb-8">Tu puntuación final es:</p>

                        <div className={`text-6xl font-bold ${feedback.color} mb-8`}>
                            {score} <span className="text-2xl text-muted-foreground font-normal">/ {questions.length}</span>
                        </div>

                        <button
                            onClick={fetchQuestions}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" /> Jugar otra vez
                        </button>
                    </div>
                )}

                {!loading && !error && !showScore && questions.length > 0 && (
                    <div className="animate-in fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-medium text-muted-foreground">
                                Pregunta {currentQuestion + 1}/{questions.length}
                            </span>
                            <span className="text-xs font-bold px-2 py-1 bg-secondary rounded-md text-secondary-foreground">
                                Computación
                            </span>
                        </div>

                        <div className="w-full bg-secondary h-2 rounded-full mb-8 overflow-hidden">
                            <div
                                className="bg-primary h-full transition-all duration-300"
                                style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                            />
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold mb-8 min-h-[4rem]">
                            {questions[currentQuestion].question}
                        </h2>

                        <div className="space-y-3">
                            {questions[currentQuestion].options.map((option, index) => {
                                // --- MEJORA DE UI EN LOS BOTONES ---
                                // Estado base: Fondo de tarjeta, borde sutil, hover gris claro. Mucho mejor contraste.
                                let buttonClass = "bg-card hover:bg-secondary/50 border-border/50"

                                if (isAnswered) {
                                    if (index === questions[currentQuestion].answerIndex) {
                                        buttonClass = "bg-emerald-500 text-white border-emerald-600 shadow-md transform scale-[1.02]" // Correcta
                                    } else if (index === selectedOption) {
                                        buttonClass = "bg-red-500 text-white border-red-600 opacity-80" // Incorrecta elegida
                                    } else {
                                        buttonClass = "opacity-40 grayscale bg-card border-transparent" // Las demás (inactivas)
                                    }
                                } else if (selectedOption === index) {
                                    buttonClass = "bg-primary text-primary-foreground border-primary" // Seleccionando...
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerClick(index)}
                                        disabled={isAnswered}
                                        // Agregamos 'border' a la clase base para que el border-color funcione
                                        className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center ${buttonClass}`}
                                    >
                                        <span className="font-medium pr-4">{option}</span>
                                        {isAnswered && index === questions[currentQuestion].answerIndex && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                                        {isAnswered && index === selectedOption && index !== questions[currentQuestion].answerIndex && <XCircle className="w-5 h-5 shrink-0" />}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}