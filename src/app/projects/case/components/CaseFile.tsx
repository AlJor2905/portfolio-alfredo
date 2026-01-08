"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip } from "lucide-react";

// Datos simulados (Tu CV o Perfil)
const TABS = [
    { id: "profile", label: "PERFIL" },
    { id: "background", label: "ANTECEDENTES" },
    { id: "skills", label: "ARMAMENTO" }, // Habilidades
];

export const CaseFile = () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="w-full h-full min-h-[500px] bg-[#dcd0b3] p-4 md:p-8 relative font-mono text-stone-900 shadow-2xl overflow-hidden flex flex-col">
            {/* Textura de carpeta */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')] pointer-events-none mix-blend-multiply"></div>

            {/* Cabecera del Expediente */}
            <div className="flex justify-between items-start mb-6 relative z-10 border-b-2 border-stone-800/20 pb-4">
                <div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-stone-800">EXPEDIENTE X-99</h2>
                    <p className="text-sm text-red-700 font-bold uppercase tracking-widest mt-1">CLASIFICACIÓN: MÁXIMA SEGURIDAD</p>
                </div>
                <Paperclip className="w-12 h-12 text-stone-400 opacity-80 rotate-45" />
            </div>

            {/* Navegación por Pestañas */}
            <div className="flex gap-2 mb-4 relative z-10">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2 text-sm font-bold uppercase border-t-2 border-x-2 rounded-t-lg transition-all ${activeTab === tab.id
                            ? "bg-[#f4f1ea] border-stone-800 text-black translate-y-[2px]"
                            : "bg-[#c5bba4] border-transparent text-stone-700 hover:bg-[#cfc5ae]"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Contenido Dinámico (Hoja de Papel) */}
            <div className="flex-1 bg-[#f4f1ea] p-8 shadow-sm relative z-10 border border-stone-300 min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                    >
                        {activeTab === "profile" && (
                            <div className="space-y-6">
                                <div className="flex gap-6 items-start">
                                    <div className="w-32 h-40 bg-stone-300 grayscale flex items-center justify-center border-4 border-white shadow-md rotate-[-2deg]">
                                        <span className="text-4xl">?</span>
                                    </div>
                                    <div className="space-y-2 text-sm md:text-base">
                                        <p><strong className="uppercase">Nombre Clave:</strong> DEVELOPER_01</p>
                                        <p><strong className="uppercase">Ubicación:</strong> <span className="bg-black text-black select-none px-1">REDACTED</span> (Remoto)</p>
                                        <p><strong className="uppercase">Estado:</strong> ACTIVO / DISPONIBLE</p>
                                        <p className="mt-4 italic border-l-4 border-red-800 pl-4 text-stone-600">
                                            "El sujeto muestra una capacidad peligrosa para resolver problemas complejos de Frontend en tiempos récord."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "background" && (
                            <div className="space-y-4">
                                <h3 className="uppercase font-bold border-b border-stone-400 pb-1">Historial Delictivo (Experiencia)</h3>
                                <ul className="list-disc pl-5 space-y-4 text-sm">
                                    <li>
                                        <strong>2023 - Presente:</strong> Lideró la operación "E-commerce" logrando un aumento del 40% en conversiones.
                                    </li>
                                    <li>
                                        <strong>2021 - 2023:</strong> Infiltrado en Solo Media. Desarrolló interfaces de usuario indetectables para la competencia.
                                    </li>
                                </ul>
                            </div>
                        )}

                        {activeTab === "skills" && (
                            <div className="grid grid-cols-2 gap-4">
                                {['React.js', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'Framer Motion'].map(skill => (
                                    <div key={skill} className="flex items-center gap-2 border border-stone-300 p-2 bg-stone-100">
                                        <div className="w-3 h-3 bg-stone-800 rounded-full animate-pulse"></div>
                                        <span className="font-bold uppercase text-xs tracking-wider">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Sello de Top Secret */}
                <div className="absolute bottom-4 right-4 border-4 border-stone-300 text-stone-300 px-4 py-2 font-bold text-4xl uppercase opacity-40 -rotate-12 pointer-events-none">
                    EVIDENCE
                </div>
            </div>
        </div>
    );
};