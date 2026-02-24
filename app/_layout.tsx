import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { ElevenLabsProvider } from '@elevenlabs/react-native';
import { Stack } from "expo-router";
import React from 'react';

function RootLayoutWithAuth() {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return null;
  }

  return (
    <ElevenLabsProvider>
      <Stack>
        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </ElevenLabsProvider>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.CLERK_PUBLISHABLE_KEY}
    >
      <RootLayoutWithAuth />
    </ClerkProvider>
  );
}
