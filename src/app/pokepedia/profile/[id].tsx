import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function Profile() {
  const { name, url } = useLocalSearchParams();
  console.log("🚀 ~ Profile ~ itemData:", name, url);

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
