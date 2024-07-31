import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap:20
      }}
    >
      <Text>PokeQuiz Game</Text>
      <Link href={'/settings'}>
      Open settings
      </Link>
      <Link href={'/rules'}>
      Open rules
      </Link>
    </View>
  );
}
