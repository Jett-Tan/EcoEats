import { Stack, Navigator } from "expo-router";

export default function RootLayout() {
  console.log('====================================');
  console.log();
  console.log('====================================');
  return (
    <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="index" options={{ headerShown: false }}/>
    <Stack.Screen name="signup" options={{ headerShown: false }}/>
    <Stack.Screen name="login" options={{ headerShown: false }}/>
    <Stack.Screen name="createProfile" options={{ headerShown: false }}/>
    <Stack.Screen name="myPreferences" options={{ headerShown: false }}/>
    <Stack.Screen name="+not-found" />
    </Stack>
  );
}
