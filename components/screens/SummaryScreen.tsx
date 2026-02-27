import { ConversationResponse } from "@/utils/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../ui/Button";
import { Gradient } from "../ui/Gradient";

export default function SummaryScreen() {
    const { conversationId} = useLocalSearchParams();
    const [conversation, setConversation] = useState<ConversationResponse | null>(null);
    const router = useRouter();

    useEffect(() => {
        getSummary();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function getSummary() {
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_BASE_URL}/api/conversation?conversationId=${conversationId}`,
        );

        const data: { conversation: ConversationResponse } = await response.json();
        setConversation(data.conversation);
    }

    console.log(JSON.stringify(conversation, null, 2));

    return (
        <>
            <Gradient position="bottom" isSpeaking={false} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{ paddingHorizontal: 16 }}
            >
                {conversation?.status !== "done" && (
                    <View style={{ gap: 16, paddingBottom: 16 }}>
                        <Text style={styles.title}>We are processing your conversation summary...</Text>
                        <Text style={styles.subtitle}>This may take a few moments.</Text>
                        <Text style={styles.subtitle}>
                            Current status: {conversation?.status}
                        </Text>
                        <Button
                            variant="secondary"
                            onPress={getSummary}
                        >
                            Refresh
                        </Button>
                    </View>
                )}
                {conversation?.status === "done" && (
                    <View style={{ gap: 16, paddingBottom: 16 }}>
                        <Text style={styles.caption}>{conversationId}</Text>
                        <Text style={styles.title}>
                            {conversation?.analysis?.call_summary_title}
                        </Text>
                        <Text style={styles.subtitle}>
                            {conversation?.analysis?.transcript_summary.trim()}
                        </Text>

                        <Text style={styles.title}>Stats</Text>
                        <Text style={styles.subtitle}>
                            {conversation?.metadata?.call_duration_secs} seconds
                        </Text>
                        <Text style={styles.subtitle}>
                            {conversation?.metadata?.cost} tokens
                        </Text>
                        <Text style={styles.subtitle}>
                            {new Date(
                                conversation?.metadata?.start_time_unix_secs! * 1000
                            ).toLocaleString()}
                        </Text>
                        <Text style={styles.title}>Transcript</Text>
                        <Text style={styles.subtitle}>
                            {conversation?.transcript.map((t) => t.message).join("\n")}
                        </Text>
                    </View>
                )}
                <View style={{ alignItems: "center", paddingVertical: 16 }}>
                    <Button onPress={() => router.dismissAll()}>Close</Button>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
    },
    caption: {
        fontSize: 12,
        color: "gray",
    },
});