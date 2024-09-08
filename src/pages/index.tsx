import Image from "next/image";
import { Inter } from "next/font/google";
import HeaderFixed from "@/components/header/header";
import ThreeScene from "@/components/three/threescene";
import {useState} from "react";
import ThreeOptionsBar from "@/components/three/threeoptions";
import {defaultLightingOptions, LightingOptions} from "@/components/types/lighting";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    // can be any .obj file
    const [model, setModel] = useState(null);
    const [pose, setPose] = useState(null);
    // type png or jpeg
    const [background, setBackground] = useState(null);

    const [lightingOptions, setLightingOptions] = useState<LightingOptions>(defaultLightingOptions);

  return (
    <div className={"bg-black"}>
        <HeaderFixed />
        <div className={"flex flex-row justify-center items-center"}>
            <ThreeOptionsBar
                setModel={setModel}
                setPose={setPose}
                setBackground={setBackground}
                setLightingOptions={setLightingOptions}
                lightingOptions={lightingOptions}
            />
            <ThreeScene
                model={model}
                pose={pose}
                background={background}
                lightingOptions={lightingOptions}
            />
        </div>
    </div>
  );
}
