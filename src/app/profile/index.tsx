import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

type Props = {};

export default function Profile(props: Props) {
  return (
    <View>
      <Pressable onPress={() => router.replace("/")}>
        <Text style={{ color: "white", fontSize: 30 }}>Back to main</Text>
      </Pressable>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
