"use client";
import { motion } from "framer-motion";

export const FilmStrip = () => {
    const frames = [1, 2, 3, 4, 5]; // Representan tus skills o snippets de código

    return (
        <div className="w-full bg-stone-900 py-12 px-4 overflow-x-auto custom-scrollbar">
            <h3 className="text-stone-400 font-mono text-center mb-8 uppercase tracking-widest text-sm">
                MATERIAL CLASIFICADO - ROLLO #404
            </h3>

            <div className="flex gap-0 min-w-max px-8">
                {frames.map((frame) => (
                    <div key={frame} className="relative group">

                        {/* Diseño de la Tira de Película (Perforaciones) */}
                        <div className="bg-black py-4 px-2 flex flex-col gap-4 border-y-8 border-stone-800">
                            {/* Perforaciones Superiores */}
                            <div className="h-4 flex gap-2 justify-center overflow-hidden">
                                {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-4 bg-stone-800 rounded-sm" />)}
                            </div>

                            {/* El Cuadro de la Foto */}
                            <div className="w-64 h-40 bg-stone-800 relative overflow-hidden cursor-crosshair">
                                {/* Imagen en Negativo (Efecto por defecto) */}
                                <div className="absolute inset-0 bg-stone-700 flex items-center justify-center text-stone-500 font-bold text-4xl group-hover:invert transition-all duration-300 filter invert">
                                    {/* Aquí iría tu imagen real */}
                                    JS
                                </div>

                                {/* Overlay de ruido */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                            </div>

                            {/* Perforaciones Inferiores */}
                            <div className="h-4 flex gap-2 justify-center overflow-hidden">
                                {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-4 bg-stone-800 rounded-sm" />)}
                            </div>
                        </div>

                        {/* Número de frame */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-stone-500 font-mono text-xs">
                            Frame {frame}A
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};