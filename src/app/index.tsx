import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IMG } from "@/assets/images";
import { Link } from "expo-router";

type Props = {};

export default function Home(props: Props) {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.flexRow, marginTop: 20 }}>
        <View style={{ width: "10%", aspectRatio: 1 }}>
          <Image
            source={IMG.pokeball}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "black" }}>
          PokeQuiz
        </Text>
      </View>
      <Link href={"/profile"} asChild>
        <Pressable>
          <Text>Encyclopedia</Text>
        </Pressable>
      </Link>
      <View style={styles.flexRow}>
        <Link href={"/settings"} asChild>
          <Pressable>
            <Text>Settings</Text>
          </Pressable>
        </Link>
        <Link href={"/score"} asChild>
          <Pressable>
            <Text>Score</Text>
          </Pressable>
        </Link>
        <Link href={"/rules"} asChild>
          <Pressable>
            <Text>Rules</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 20,
  },
});
