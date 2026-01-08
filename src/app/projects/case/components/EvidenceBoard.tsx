"use client";
import { motion } from "framer-motion";

// Datos simulados (puedes pasarlos como props)
const EVIDENCE_PHOTOS = [
    { id: 1, src: "/case-assets/evidence-1.jpg", label: "PROYECTO ALPHA", rotation: -5 },
    { id: 2, src: "/case-assets/evidence-2.jpg", label: "SITIO E-COMMERCE", rotation: 3 },
    { id: 3, src: "/case-assets/evidence-3.jpg", label: "DASHBOARD", rotation: -2 },
];

export const EvidenceBoard = () => {
    return (
        <div className="w-full min-h-[60vh] bg-[#1a1a1a] p-8 relative flex flex-wrap items-center justify-center gap-8 overflow-hidden">
            {/* Fondo de corcho o mesa oscura */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')]"></div>

            {EVIDENCE_PHOTOS.map((photo) => (
                <motion.div
                    key={photo.id}
                    drag
                    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                    whileHover={{ scale: 1.1, zIndex: 50, rotate: 0 }}
                    whileDrag={{ scale: 1.2, zIndex: 100, cursor: "grabbing" }}
                    initial={{ rotate: photo.rotation, y: 100, opacity: 0 }}
                    animate={{ rotate: photo.rotation, y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative bg-white p-3 pb-12 shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-grab w-64 rotate-2"
                >
                    {/* Imagen (Placeholder gris si no tienes imagen aún) */}
                    <div className="w-full h-48 bg-stone-300 overflow-hidden grayscale contrast-125">
                        {/* <img src={photo.src} className="w-full h-full object-cover" /> */}
                        <div className="w-full h-full flex items-center justify-center text-stone-500 text-xs">
                            FOTO DE EVIDENCIA
                        </div>
                    </div>

                    {/* Etiqueta escrita a mano */}
                    <div className="absolute bottom-4 left-0 right-0 text-center font-serif text-stone-900 font-bold tracking-widest">
                        {photo.label}
                    </div>

                    {/* Cinta adhesiva visual */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-100/80 rotate-1 shadow-sm"></div>
                </motion.div>
            ))}

            <div className="absolute bottom-4 left-4 text-stone-500 font-mono text-xs">
                * Arrastre las fotos para examinar
            </div>
        </div>
    );
};