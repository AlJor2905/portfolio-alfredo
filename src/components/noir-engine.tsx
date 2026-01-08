"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { SceneLayer } from "@/types/noir";
import { X } from "lucide-react";

// --- COMPONENTE DE POLVO FLOTANTE ---
const FloatingDust = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const particles = useMemo(() => {
        if (!mounted) return [];
        return Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            size: Math.random() * 3 + 1.5 + 'px',
            duration: Math.random() * 20 + 10 + 's',
            delay: Math.random() * 5 + 's',
        }));
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white rounded-full blur-[0.5px]"
                    style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
                    animate={{
                        x: [0, 15, -15, 0],
                        y: [0, -25, 10, 0],
                        opacity: [0, 1, 0.3, 0.8, 0]
                    }}
                    transition={{
                        duration: parseInt(p.duration),
                        repeat: Infinity,
                        ease: "linear",
                        delay: parseInt(p.delay)
                    }}
                />
            ))}
        </div>
    );
};

// --- MOTOR PRINCIPAL ---
export function NoirEngine({ layers }: { layers: SceneLayer[] }) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const activeLayer = layers.find(l => l.id === activeId);

    // 1. INPUT DEL MOUSE
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // 2. SUAVIZADO (Spring)
    // stiffness bajo y damping alto = movimiento pesado y cinematográfico
    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 300 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 300 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height } = currentTarget.getBoundingClientRect();
        // Convertimos a porcentaje (0 a 1)
        mouseX.set(clientX / width);
        mouseY.set(clientY / height);
    };

    // Constantes de animación
    const flickerDuration = 2.5;
    const flickerTimes = [0, 0.1, 0.3, 0.4, 0.6, 0.7, 1];
    const lightOpacityKeyframes = [0, 0, 0.8, 0.1, 0.9, 0.2, 1];
    const roomFilterKeyframes = [
        "brightness(0.1) contrast(1.2)", "brightness(0.1) contrast(1.2)",
        "brightness(0.7) contrast(1.1)", "brightness(0.2) contrast(1.3)",
        "brightness(0.8) contrast(1.0)", "brightness(0.3) contrast(1.2)",
        "brightness(1.0) contrast(1.0)"
    ];

    return (
        <div
            className="relative w-full aspect-video overflow-hidden bg-[#050505] shadow-2xl rounded-sm group select-none"
            onMouseMove={handleMouseMove}
        >

            {/* --- CAPAS VISUALES CON PARALLAX INDIVIDUAL --- */}
            {layers.map((layer) => {
                const isLightLayer = layer.id === 'light';

                // --- AQUÍ ESTÁ LA MAGIA ---
                // Usamos el zIndex como multiplicador. 
                // Si zIndex es bajo (fondo), se mueve poco. Si es alto (primer plano), se mueve mucho.
                // Multiplicamos por 2.5 para exagerar el efecto.
                const movementRange = (layer.zIndex || 5) * 2.5;

                // Transformamos el mouse (0 a 1) a pixeles de desplazamiento (-range a +range)
                // NOTA: Invertimos el rango ([range, -range]) para que se mueva contra el mouse (efecto profundidad)
                const x = useTransform(smoothX, [0, 1], [movementRange, -movementRange]);
                const y = useTransform(smoothY, [0, 1], [movementRange, -movementRange]);

                return (
                    <motion.div
                        key={`vis-${layer.id}`}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{
                            zIndex: layer.zIndex || 10,
                            x, // Aplicamos el valor calculado único para esta capa
                            y
                        }}
                        initial={isLightLayer ? { opacity: 0 } : { filter: "brightness(0.1) contrast(1.2)" }}
                        animate={isLightLayer
                            ? { opacity: lightOpacityKeyframes }
                            : { filter: roomFilterKeyframes }
                        }
                        transition={{
                            duration: flickerDuration, times: flickerTimes, ease: "easeInOut"
                        }}
                    >
                        <img
                            src={layer.src}
                            alt={layer.alt}
                            // Scale 1.05 evita bordes blancos al mover la imagen
                            className={`w-full h-full object-contain scale-[1.05] ${isLightLayer ? 'mix-blend-screen brightness-150' : 'mix-blend-normal'
                                }`}
                        />
                    </motion.div>
                );
            })}

            {/* --- CAPA DE POLVO (Parallax Medio) --- */}
            <motion.div
                className="absolute inset-0 z-[55] pointer-events-none"
                // El polvo está "flotando", le damos un movimiento fijo intermedio (como si fuera z=20)
                style={{
                    x: useTransform(smoothX, [0, 1], [30, -30]),
                    y: useTransform(smoothY, [0, 1], [30, -30])
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 0.6, 0.2, 0.8, 0.4, 1] }}
                transition={{ duration: flickerDuration, times: flickerTimes, ease: "easeInOut" }}
            >
                <FloatingDust />
            </motion.div>

            {/* --- TRIGGERS (Deben coincidir EXACTAMENTE con el Parallax visual) --- */}
            {layers.filter(l => l.isInteractive).map((layer) => {
                // Replicamos la misma fórmula matemática para que el click siga a la imagen
                const movementRange = (layer.zIndex || 5) * 2.5;
                const x = useTransform(smoothX, [0, 1], [movementRange, -movementRange]);
                const y = useTransform(smoothY, [0, 1], [movementRange, -movementRange]);

                return (
                    <motion.div
                        key={`trig-${layer.id}`}
                        className="absolute z-[80]"
                        style={{
                            top: layer.clickArea?.top,
                            left: layer.clickArea?.left,
                            width: layer.clickArea?.width,
                            height: layer.clickArea?.height,
                            x,
                            y
                        }}
                    >
                        <motion.button
                            onClick={() => setActiveId(layer.id)}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full h-full cursor-pointer rounded-xl border border-transparent hover:border-white/20 transition-all duration-300"
                            title={`Investigar ${layer.alt}`}
                        />
                    </motion.div>
                );
            })}

            {/* --- MODAL --- */}
            <AnimatePresence>
                {activeId && activeLayer && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveId(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.6, y: 100, rotate: -4 }}
                            animate={{
                                opacity: 1, scale: 1, y: 0, rotate: 0,
                                transition: { type: "spring", damping: 14, stiffness: 120 }
                            }}
                            exit={{ opacity: 0, scale: 0.6, y: 100, rotate: 4 }}
                            className="relative z-[110] w-full max-w-4xl"
                        >
                            <div className="bg-[#f0e6d2] text-stone-900 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden border border-white/10 p-1">
                                <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
                                    {activeLayer.content}
                                </div>

                                <button
                                    onClick={() => setActiveId(null)}
                                    className="absolute top-4 right-4 p-2 text-stone-500 hover:text-red-800 hover:bg-black/5 rounded-full transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- FILM GRAIN (Estático o movimiento muy leve) --- */}
            <div className="absolute inset-0 pointer-events-none z-[90] overflow-hidden">
                <div className="absolute inset-[-100%] opacity-[0.15] mix-blend-overlay animate-grain bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>

            <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          30% { transform: translate(2%, 2%); }
          50% { transform: translate(-1%, 3%); }
          70% { transform: translate(3%, -1%); }
        }
        .animate-grain {
          animation: grain 0.6s steps(3) infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 4px; }
      `}</style>
        </div>
    );
}