import { ReactNode } from 'react';

export interface SceneLayer {
    id: string;
    src: string;      // Ruta de la capa en /public/case-assets/
    alt: string;   // Ancho relativo al contenedor (ej: 20)
    rotation?: number;
    zIndex?: number;
    isInteractive: boolean;
    clickArea?: {
        top: string;
        left: string;
        width: string;
        height: string;
    };
    content?: ReactNode; // El componente que se abre (la evidencia)
}