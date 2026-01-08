"use client";
import { motion } from "framer-motion";

export const TypewriterClue = () => {
    const text = "24 de Octubre, 1954.\n\nHe estado rastreando el código fuente durante semanas. El sujeto demuestra un dominio excepcional de React y arquitecturas escalables. No deja huellas de errores en la consola.\n\nSi estás leyendo esto, ya sabes de lo que es capaz...";

    const characters = text.split("");

    return (
        <div className="w-full h-full bg-[#f4f1ea] p-8 md:p-12 font-mono text-stone-900 shadow-inner relative overflow-hidden">
            {/* Textura de papel viejo */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none"></div>

            <div className="max-w-2xl mx-auto relative z-10">
                <h2 className="text-3xl font-black mb-8 uppercase tracking-widest border-b-2 border-stone-800 pb-2">
                    CONFESIÓN #001
                </h2>

                <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                    {characters.map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.05, delay: index * 0.03 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-3 h-6 bg-stone-900 ml-1 align-middle"
                    />
                </p>

                <div className="mt-12 flex justify-end">
                    <div className="transform -rotate-6 border-4 border-red-800 text-red-800 px-4 py-2 font-bold text-2xl uppercase opacity-80 mask-stamp">
                        Top Secret
                    </div>
                </div>
            </div>
        </div>
    );
};