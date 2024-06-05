import { auth } from "@/components/auth/firebaseConfig";
import { Stack } from "expo-router";

export default function RootLayout() {
  console.log('====================================');
  console.log('auth:', auth.currentUser);
  console.log('====================================');
  return (
    <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="index" options={{ headerShown: false }}/>
    <Stack.Screen name="signup" options={{ headerShown: false }}/>
    <Stack.Screen name="login" options={{ headerShown: false }}/>
    <Stack.Screen name="createProfile" options={{ headerShown: false }}/>
    <Stack.Screen name="+not-found" />
    </Stack>
  );
}
