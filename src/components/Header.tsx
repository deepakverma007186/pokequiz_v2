import { COLORS } from "@/utils/Colors";
import { FONT } from "@/utils/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from "@/utils/Responsive";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface HeaderProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function Header({
  title,
  titleStyle,
  containerStyle,
}: HeaderProps) {
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
      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
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
    width: width,
  },
  title: {
    fontFamily: FONT.solid,
    fontSize: textScale(20),
    color: COLORS.secondary,
    textTransform: "capitalize",
    letterSpacing: 4,
  },
});
