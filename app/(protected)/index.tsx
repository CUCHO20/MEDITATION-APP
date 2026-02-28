import ParallaxScrollView, { blurhash } from "@/components/ParallaxScrollView";
import { sessions } from "@/utils/sessions";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  return (
    <ParallaxScrollView>
      <SafeAreaView edges={['top']}>
        <Text style={styles.title}>Explore Sessions</Text>
        <ScrollView
          horizontal
          contentContainerStyle={{
            paddingLeft: 16,
            gap: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          {sessions.map((session) => (
            <Pressable
              key={session.id}
              style={styles.sessionContainer}
              onPress={() => 
                router.navigate({
                  pathname: '/session',
                  params: { sessionId: session.id }
                })
              }
            >
              <Image
                source={session.image}
                style={styles.sessionImage}
                contentFit="cover"
                transition={1000}
                placeholder={{ blurhash }}
              />
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  experimental_backgroundImage:
                    'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)',
                  borderRadius: 16,
                }}
              >
                <Text style={styles.sessionTitle}>{session.title}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.title}>Recents</Text>
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
  },
  sessionContainer: {
    position: 'relative',
  },
  sessionImage: {
    width: 250,
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sessionTitle: {
    position: 'absolute',
    width: '100%',
    bottom: 16,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});