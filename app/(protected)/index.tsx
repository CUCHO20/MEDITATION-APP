import { sessions } from "@/utils/sessions";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      {sessions.map((session) => (
        <Pressable 
          key={session.id}
          style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
          onPress={() => router.navigate({
            pathname: '/session',
            params: { sessionId: session.id }
          })}
        >
          <Text>{session.title}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
