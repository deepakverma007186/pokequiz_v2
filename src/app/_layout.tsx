import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            paddingTop: StatusBar.currentHeight,
            backgroundColor: "#e8e8e8",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Home", animation: "simple_push" }}
        />
        <Stack.Screen
          name="profile/index"
          options={{ title: "Profile", animation: "ios" }}
        />
        <Stack.Screen
          name="settings"
          options={{ title: "Settings", animation: "slide_from_left" }}
        />
        <Stack.Screen
          name="score/index"
          options={{ title: "Score", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="rules"
          options={{ title: "Rules", animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="share"
          options={{ title: "Share", presentation: "modal" }}
        />
      </Stack>
    </>
  );
}
