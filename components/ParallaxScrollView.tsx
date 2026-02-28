import { sessions } from "@/utils/sessions";
import { Image } from "expo-image";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Extrapolation, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated";
import { Button } from "./ui/Button";

export const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const HEADER_HEIGHT = 400;

export default function ParallaxScrollView({ children }: PropsWithChildren) {
    const todaySession = sessions[Math.floor(Math.random() * sessions.length)];
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        const scrollY = scrollOffset.value;

        const scale = interpolate(
            scrollY,
            [-HEADER_HEIGHT, 0],
            [2, 1],
            Extrapolation.CLAMP
        );

        const translateY = interpolate(
            scrollY,
            [-HEADER_HEIGHT, 0],
            [-HEADER_HEIGHT * 0.35, 0],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateY },
                { scale },
            ],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                bounces={true}
                overScrollMode="always"
            >
                <Animated.View
                    style={[
                        headerAnimatedStyle,
                        {
                            height: HEADER_HEIGHT,
                            overflow: 'hidden'
                        }
                    ]}
                >
                    <Image
                        source={todaySession.image}
                        placeholder={blurhash}
                        contentFit="cover"
                        style={{ width: '100%', height: HEADER_HEIGHT }}
                    />
                </Animated.View>

                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <View style={{ flex: 5 }} />

                        <Text style={styles.headerSubtitle}>Featured Session</Text>
                        <Text style={styles.headerTitle}>{todaySession.title}</Text>
                        <Text style={styles.headerDescription}>{todaySession.description}</Text>
                        <Button variant="primary">Start Session</Button>

                        <View style={{ flex: 1 }} />
                    </View>
                </View>
                {children}
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'white',
        opacity: 0.5,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    headerDescription: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    headerContainer: {
        position: 'absolute',
        width: '100%',
        height: HEADER_HEIGHT,
        experimental_backgroundImage:
            'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
        padding: 20,
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    }
});