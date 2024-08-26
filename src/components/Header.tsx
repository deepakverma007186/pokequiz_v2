import { COLORS } from "@/utils/Colors";
import { FONT } from "@/utils/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/utils/Responsive";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewProps } from "react-native";

interface HeaderProps {
  title?: string;
  containerStyle?: ViewProps;
}

export default function Header({ title, containerStyle }: HeaderProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        onPress={() => (router.canGoBack() ? router.back() : router.dismiss())}
      >
        <Ionicons
          name="arrow-back-sharp"
          color={COLORS.secondary}
          size={textScale(20)}
        />
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: moderateScale(20),
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(16),
  },
  title: {
    fontFamily: FONT.mono,
    fontSize: textScale(20),
    color: COLORS.secondary,
  },
});
