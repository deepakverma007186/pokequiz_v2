import { store } from "@/store";
import { COLORS } from "@/utils/Colors";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <BottomSheetModalProvider>
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
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen
              name="game"
              options={{ title: "Game", animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="pokepedia"
              options={{ title: "Pokepedia", animation: "slide_from_right" }}
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
        </BottomSheetModalProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
