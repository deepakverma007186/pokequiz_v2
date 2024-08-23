import {
  Pressable,
  StyleSheet,
  StyleSheetProperties,
  Text,
  View,
  ViewProps,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/utils/Colors";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/utils/Responsive";
import { FONT } from "@/utils/CommonStyles";
import { router } from "expo-router";

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
  },
  title: {
    fontFamily: FONT.mono,
    fontSize: textScale(20),
    color: COLORS.secondary,
    // letterSpacing: 4,
  },
});
