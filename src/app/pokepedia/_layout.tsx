import { COLORS } from "@/utils/Colors";
import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="profile/[id]"
        options={{ animation: "slide_from_right" }}
      />
    </Stack>
  );
}
