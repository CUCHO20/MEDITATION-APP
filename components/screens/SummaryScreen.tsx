import { useLocalSearchParams } from "@/.expo/types/router";
import { useState } from "react";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import { Gradient } from "../ui/Gradient";

export default function SummaryScreen() {
    const { conversationId} = useLocalSearchParams();
    const [conversation, setConversationId] = useState<ConversationResponse | null>(null);
    return (
        <>
            <Gradient position="bottom" isSpeaking={false} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{paddingHorizontal: 16}}
            >

            </ScrollView>
        </>
    )
}