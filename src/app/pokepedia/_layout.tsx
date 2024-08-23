import Header from "@/components/Header";
import { moderateScale } from "@/utils/Responsive";
import { Slot } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Layout() {
  return (
    <View style={styles.container}>
      <Header title="Pokepedia" />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
  },
});
