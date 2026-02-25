import { sessions } from "@/utils/sessions";
import { useUser } from "@clerk/clerk-expo";
import { useConversation } from "@elevenlabs/react-native";
import * as Brightness from 'expo-brightness';
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { Button } from "../ui/Button";
import { Gradient } from "../ui/Gradient";

export default function SessionScreen() {
    const { user } = useUser();
    const { sessionId } = useLocalSearchParams();
    const session = sessions.find((s) => s.id === Number(sessionId)) ?? sessions[0];

    const conversation = useConversation({
        onConnect: ({ conversationId }) => {
            console.log('Connected to conversation:', conversationId);
            setConversationId(conversationId);
        },
        onDisconnect: () => console.log('Disconnected from conversation'),
        onMessage: (message) => console.log('Received message:', message),
        onError: (error) => console.error('Conversation error:', error),
        onModeChange: (mode) => console.log('Conversation mode changed:', mode),
        onStatusChange: (prop) => {
            console.log('Conversation status changed:', prop.status);
            setConvStatus(prop.status);
        },
        onCanSendFeedbackChange: (prop) => console.log('Can send feedback changed:', prop.canSendFeedback),
        onUnhandledClientToolCall: (params) => console.log('Unhandled client tool call:', params),
        onAudioAlignment: (alignment) => console.log('Alignment data received:', alignment),

        clientTools: {
            handleSetBrightness: async (parameters: unknown) => {
                const { brightnessValue } = parameters as { brightnessValue: number };
                console.log('Adjusting brightness to:', { brightnessValue });
                
                const { status } = await Brightness.requestPermissionsAsync();
                if (status === 'granted') {
                    await Brightness.setSystemBrightnessAsync(brightnessValue);
                    return brightnessValue;
                }
            },
        },
    });

    const [convStatus, setConvStatus] = useState(conversation.status);
    const [isStarting, setIsStarting] = useState(false);
    const [conversationId, setConversationId] = useState<string | null>(null);

    const isConnectedOrConnecting = convStatus === "connected" || convStatus === "connecting";
    const isDisconnected = convStatus === "disconnected";

    const handlePress = async () => {
        if (isStarting) return;

        if (isDisconnected) {
        setIsStarting(true);
        try {
            await conversation.startSession({
            agentId: process.env.EXPO_PUBLIC_AGENT,
            dynamicVariables: {
                user_name: user?.username || "User",
                session_title: session.title,
                session_description: session.description,
            },
            });
        } catch (error) {
            console.error('Failed to start:', error);
        } finally {
            setIsStarting(false);
        }
        } else if (isConnectedOrConnecting) {
        try {
            await conversation.endSession();
        } catch (error) {
            console.error('Failed to end:', error);
        }
        }
    };

    let buttonVariant: "primary" | "outline" = "primary";
    let buttonText = "Start Conversation";

    if (isConnectedOrConnecting) {
        buttonVariant = "outline";
        buttonText = "End Conversation";
    }

    return (
        <>
            <Gradient 
                position="top" 
                isSpeaking={isConnectedOrConnecting}
            />

            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20 }}>
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>{session.title}</Text>
                <Text style={{ fontSize: 16, textAlign: "center" }}>{session.description}</Text>

                <Button
                variant={buttonVariant}
                onPress={handlePress}
                >
                    {buttonText}
                </Button>
            </View>
        </>
    );
}