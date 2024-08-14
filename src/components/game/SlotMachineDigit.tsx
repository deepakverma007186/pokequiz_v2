import { COLORS } from "@/utils/Colors";
import { FONT, SIZE } from "@/utils/CommonStyles";
import { textScale } from "@/utils/Responsive";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const DIGIT_HEIGHT = 40; // Height of each digit
type Props = {
  digit: number;
  actualPoints: number;
};
export default function SlotMachineDigit({ digit, actualPoints }: Props) {
  const translateY = useSharedValue(0);
  const color = actualPoints < 0 ? COLORS.danger : COLORS.secondary;

  useEffect(() => {
    // Animate the digit to simulate slot machine rolling
    translateY.value = withTiming(-digit * DIGIT_HEIGHT, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [digit]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={{ height: DIGIT_HEIGHT, overflow: "hidden" }}>
      <Animated.View style={animatedStyle}>
        {[...Array(10).keys()].map((num) => (
          <Text
            key={num}
            style={{ height: DIGIT_HEIGHT, ...styles.pointsText, color: color }}
          >
            {num}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  pointsText: {
    fontFamily: FONT.solid,
    fontSize: textScale(30),
    letterSpacing: SIZE.xs,
  },
});
