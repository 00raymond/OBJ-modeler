import { useRef, useState } from "react";
import {LightingOptions} from "@/components/types/lighting";

interface ThreeOptionsProps {
    setModel: (model: any) => void;
    setPose: (pose: any) => void;
    setBackground: (background: any) => void;
    setLightingOptions: (lightingOptions: LightingOptions) => void;
    lightingOptions: LightingOptions;
}

export default function ThreeOptionsBar(props: ThreeOptionsProps) {
    const [isModelActive, setIsModelActive] = useState(false);
    const fileInputModel = useRef<HTMLInputElement | null>(null);  // Updated ref with correct type

    const processModel = () => {

        if (fileInputModel.current) {
            let file = null;
            if ("files" in fileInputModel.current) {
                file = fileInputModel.current.files?.[0];
            }
            if (file) {
                console.log("Selected file:", file);

                // If file type isn't .obj, return and log
                if (file.type !== "application/octet-stream") {
                    console.log("Invalid file type");
                    return;
                }

                // You can now proceed to process the file or pass it to a handler
                setIsModelActive(true)
                props.setModel(file);
            } else {
                console.log("No file selected");
            }
        }
    }

    if (!isModelActive) {
        return (
            <div className={"bg-white bg-opacity-30 rounded-xl p-3 flex flex-col space-y-4"}>
                <div className={"bg-white bg-opacity-30"}>
                    <input type="file" accept=".obj" ref={fileInputModel} id="fileInput" />
                </div>
                <button onClick={processModel} className={"bg-gradient-to-br from-green-600 to-teal-500 text-white rounded-xl p-1"}>Submit</button>
            </div>
        );
    } else {
        return (
            <div>
                <p>Render Options</p>
            </div>
        );
    }
}
