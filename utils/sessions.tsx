import { ImageSourcePropType } from "react-native";

interface Session {
    id: number;
    title: string;
    description: string;
    image: ImageSourcePropType | undefined;
}

export const sessions: Session[] = [
    {
        id: 1,
        title: "Forest Path",
        description: "Mindful walking through a serene forest path, surrounded by the sounds of nature.",
        image: require("@/assets/sessions/forest-path.jpg"),
    },
    {
        id: 2,
        title: "Beach Sunset",
        description: "Relaxing meditation on a beach at sunset, with calming ocean waves and a warm breeze.",
        image: require("@/assets/sessions/sunrise-sky.jpg"),
    },
    {
        id: 3,
        title: "Mountain View",
        description: "Guided meditation with a breathtaking mountain view, promoting inner peace and clarity.",
        image: require("@/assets/sessions/mountain-view.jpg"),
    },
    {
        id: 4,
        title: "Ocean Waves",
        description: "Meditation set to the sound of gentle ocean waves, helping you relax and unwind.",
        image: require("@/assets/sessions/ocean-waves.jpg"),
    },
    {
        id: 5,
        title: "Zen Stones",
        description: "Meditation in a peaceful zen garden setting, surrounded by calming stone arrangements.",
        image: require("@/assets/sessions/zen-stones.jpg"),
    }
]