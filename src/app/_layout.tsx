import { Stack } from "expo-router"

export default function RootLayout ()  {
  return (
    <Stack screenOptions={{headerShown:false, animation:'slide_from_right'}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="settings/index" />
        <Stack.Screen name="rules/index" />
    </Stack>
  )
}