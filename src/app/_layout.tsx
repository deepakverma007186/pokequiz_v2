import { COLORS } from "@/constants/Colors";
import { store } from "@/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    pokeSolid: require("../assets/fonts/Pokemon-Solid.ttf"),
    pokeHollow: require("../assets/fonts/Pokemon-Hollow.ttf"),
    spaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <StatusBar barStyle={"light-content"} translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            paddingTop: StatusBar.currentHeight,
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: "Home", animation: "simple_push" }}
        />
        <Stack.Screen
          name="game/index"
          options={{ title: "Game", animation: "simple_push" }}
        />
        <Stack.Screen
          name="profile/index"
          options={{ title: "Profile", animation: "slide_from_right" }}
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
    </Provider>
  );
}
