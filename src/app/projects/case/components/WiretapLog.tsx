"use client";
import { motion } from "framer-motion";
import { Phone, Play, Pause } from "lucide-react";
import { useState } from "react";

export const WiretapLog = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="w-full h-full bg-zinc-900 text-green-500 p-6 md:p-10 font-mono relative overflow-hidden shadow-2xl border border-zinc-700">
            {/* Efecto de pantalla CRT antigua */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
            <div className="absolute inset-0 bg-green-500/5 animate-pulse pointer-events-none z-10"></div>

            {/* Cabecera */}
            <div className="flex justify-between items-end border-b border-green-500/30 pb-4 mb-6 relative z-30">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                        <Phone className="w-6 h-6 animate-pulse" />
                        INTERCEPCIÓN #404
                    </h2>
                    <p className="text-xs text-green-500/60 mt-1">FREQ: 104.5 MHz | ENCRIPTACIÓN: NULA</p>
                </div>
                <div className="flex items-center gap-1">
                    {/* Visualizador de Audio Falso */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-green-500"
                            animate={{ height: isPlaying ? [10, 30, 15, 40, 10] : 4 }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.1,
                                repeatType: "mirror"
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Contenido: Transcripción (Chat) */}
            <div className="space-y-6 text-sm md:text-base h-[300px] overflow-y-auto pr-2 relative z-30 custom-scrollbar">
                <div className="opacity-50 text-xs text-center mb-4">--- INICIO DE GRABACIÓN ---</div>

                <div className="flex flex-col gap-1">
                    <span className="font-bold text-green-400">[02:14 AM] DESCONOCIDO:</span>
                    <p className="pl-4 border-l border-green-500/20">"¿Has conseguido localizar al desarrollador?"</p>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-bold text-green-300">[02:14 AM] INFORMANTE:</span>
                    <p className="pl-4 border-l border-green-500/20">"Sí. Es difícil de rastrear, pero he encontrado sus canales de comunicación."</p>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-bold text-green-400">[02:15 AM] DESCONOCIDO:</span>
                    <p className="pl-4 border-l border-green-500/20">"Dame los detalles. Necesitamos ese código para ayer."</p>
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-bold text-green-300">[02:15 AM] INFORMANTE:</span>
                    <div className="pl-4 border-l border-green-500/20 bg-green-900/20 p-4 mt-2 rounded border border-green-500/30">
                        <p className="mb-2 text-xs uppercase tracking-widest opacity-70">Datos de Contacto:</p>
                        <ul className="space-y-2">
                            <li>EMAIL: ortialfredo@gmail.com</li>
                            <li>LINKEDIN: /in/ortizalfredo</li>
                            <li>GITHUB: @AlJor2905</li>
                        </ul>
                    </div>
                </div>

                <div className="opacity-50 text-xs text-center mt-8">--- CONEXIÓN PERDIDA ---</div>
            </div>

            {/* Controles (Decorativos pero interactivos) */}
            <div className="absolute bottom-6 right-6 z-30">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-2 px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-colors text-xs font-bold uppercase tracking-widest"
                >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? "Pausar Cinta" : "Reproducir"}
                </button>
            </div>
        </div>
    );
};