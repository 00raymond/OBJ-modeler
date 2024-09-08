// Options type for lighting: position, color, intensity, angle
export interface LightingOptions {
    position: {
        x: number;
        y: number;
        z: number;
    };
    scale: {
        x: number;
        y: number;
        z: number;
    };
    color: string; // Hex color code or color name
    intensity: number; // Light intensity, typically between 0 and 1
    angle?: number; // Optional angle property for directional/spot lights
}

export const defaultLightingOptions: LightingOptions = {
    position: {
        x: 10,
        y: 80,
        z: 30
    },
    scale: {
        x: 0.1,
        y: 0.1,
        z: 0.1
    },
    color: '#ffffff', // White color in hex format
    intensity: 1,     // Maximum intensity
    angle: Math.PI / 4 // 45 degrees, useful for spotlights or directional lights
};