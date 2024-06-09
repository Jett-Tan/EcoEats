import { Stack, Navigator } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="(modalTabs)/home" options={{ headerShown: false }} />
      <Stack.Screen name="(modalTabs)/community" options={{ headerShown: false }} />
      <Stack.Screen name="(modalTabs)/profile" options={{ headerShown: false }} />
      <Stack.Screen name="(modalTabs)/rewards" options={{ headerShown: false }} />
      <Stack.Screen name="(modalTabs)/free" options={{ headerShown: true }} />
      <Stack.Screen name="(modalTabs)/sell" options={{ headerShown: true }} />

      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="signup" options={{ headerShown: false }}/>
      <Stack.Screen name="login" options={{ headerShown: false }}/>
      <Stack.Screen name="createProfile" options={{ headerShown: false }}/>
      <Stack.Screen name="myPreferences" options={{ headerShown: false }}/>
      <Stack.Screen name="shareLocation" options={{ headerShown: false }}/>
      <Stack.Screen name="setLocation" options={{ headerShown: false }}/>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
