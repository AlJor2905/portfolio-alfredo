import { NoirEngine } from "@/components/noir-engine";
import { SceneLayer } from "@/types/noir";
import { TypewriterClue } from "./components/TypewriterClue";
import { FilmStrip } from "./components/FilmStrip";
import { EvidenceBoard } from "./components/EvidenceBoard";
import { WiretapLog } from "./components/WiretapLog";
import { CaseFile } from "./components/CaseFile";

const CAPAS_CASO: SceneLayer[] = [
    {
        id: "fondo",
        src: "/case-assets/01_mesa_fondo.png", // Tu capa base
        alt: "Mesa",
        isInteractive: false,
        zIndex: 2
    },
    {
        id: "telefono",
        src: "/case-assets/02_telefono.png", // Capa con solo el teléfono
        alt: "Teléfono",
        isInteractive: true,
        zIndex: 2,
        clickArea: {
            top: "0%",
            left: "75%",
            width: "25%",
            height: "30%",
        },
        content: <WiretapLog />
    },
    {
        id: "archivos",
        src: "/case-assets/03_carpetas.png", // Capa con solo las carpetas
        alt: "Archivos",
        isInteractive: true,
        zIndex: 5,
        clickArea: {
            top: "50%",
            left: "0%",
            width: "25%",
            height: "50%",
        },
        content: <CaseFile />,
    },
    {
        id: "typewriter",
        src: "/case-assets/04_typewriter.png",
        alt: "Typewriter",
        isInteractive: true,
        zIndex: 3,
        clickArea: {
            top: "0%",
            left: "0%",
            width: "25%",
            height: "40%",
        },
        content: <TypewriterClue />,
    },
    {
        id: "pictures",
        src: "/case-assets/05_pictures.png",
        alt: "Pictures",
        isInteractive: true,
        zIndex: 3,
        clickArea: {
            top: "60%",
            left: "75%",
            width: "25%",
            height: "40%",
        },
        content: <EvidenceBoard />,
    },
    {
        id: "camera_rolls",
        src: "/case-assets/06_camera_rolls.png",
        alt: "Camera Rolls",
        isInteractive: true,
        zIndex: 15,
        clickArea: {
            top: "30%",
            left: "70%",
            width: "30%",
            height: "30%",
        },
        content: <FilmStrip />,
    },
    {
        id: "pen",
        src: "/case-assets/07_pen.png",
        alt: "Pen",
        isInteractive: false,
        zIndex: 20
    },
    {
        id: "light",
        src: "/case-assets/08_light.png",
        alt: "Light",
        isInteractive: false,
        zIndex: 9
    },
    {
        id: "lamp",
        src: "/case-assets/09_lamp.png",
        alt: "Lamp",
        isInteractive: false,
        zIndex: 9
    }
];


export default function CasoNoirPage() {
    return (
        <div className="min-h-screen bg-stone-950 py-12 px-4">
            <div className="w-full mx-auto">
                <NoirEngine
                    layers={CAPAS_CASO}
                />
            </div>
        </div>
    );
}