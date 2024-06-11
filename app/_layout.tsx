import { Stack, useRouter } from "expo-router";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{gestureEnabled:false}} >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="savedTab" options={{ headerShown: true }} />

      <Stack.Screen name="(modalTabs)/home" options={{ headerShown: false,animation:"none",animationDuration:0  }} />
      <Stack.Screen name="(modalTabs)/community" options={{ headerShown: false,animation:"none",animationDuration:0  }} />
      <Stack.Screen name="(modalTabs)/profile" options={{ headerShown: false,animation:"none",animationDuration:0  }} />
      <Stack.Screen name="(modalTabs)/rewards" options={{ headerShown: false,animation:"none",animationDuration:0  }} />
      <Stack.Screen name="(modalTabs)/free" options={{ headerShown: false,animation:"none",animationDuration:0 }} />
      <Stack.Screen name="(modalTabs)/sell" options={{ headerShown: false,animation:"none",animationDuration:0 }} />

      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="signup" options={{ headerShown: false }}/>
      <Stack.Screen name="login" options={{ headerShown: false }}/>
      <Stack.Screen name="createProfile" options={{ headerShown: false }}/>
      <Stack.Screen name="myPreferences" options={{ headerShown: false }}/>
      <Stack.Screen name="shareLocation" options={{ headerShown: false }}/>
      <Stack.Screen name="setLocation" options={{ headerShown: false }}/>
      <Stack.Screen name="locationPage" options={{ headerShown: false }}/>
      <Stack.Screen name="myReservations" options={{ headerShown: true }}/>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
