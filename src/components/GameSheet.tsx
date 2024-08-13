import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { FONT, SIZE } from "@/constants/CommonStyles";
import { COLORS } from "@/constants/Colors";
import { textScale } from "@/constants/Responsive";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { resetGame } from "@/store/gameSlice";

export default function GameSheet() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleContinue = () => {
    return;
  };
  const handleLeave = useCallback(() => {
    router.replace("/");
    dispatch(resetGame());
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokeQuiz Score</Text>
      <Text style={styles.scoreText}>200</Text>
      <View style={styles.btnContainer}>
        <Pressable
          style={[styles.btn, { backgroundColor: COLORS.background }]}
          onPress={handleLeave}
        >
          <Text style={[styles.btnText, { color: COLORS.white }]}>Leave</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={handleContinue}>
          <Text style={styles.btnText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE.lg,
    paddingVertical: SIZE.xl * 1.5,
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    fontFamily: FONT.solid,
    fontSize: textScale(24),
    color: COLORS.secondary,
    letterSpacing: 2,
  },
  scoreText: {
    textAlign: "center",
    fontFamily: FONT.solid,
    fontSize: textScale(60),
    color: COLORS.secondary,
    letterSpacing: 2,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: SIZE.lg,
  },
  btn: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    borderCurve: "continuous",
  },
  quitBtn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    borderCurve: "continuous",
  },
  btnText: {
    textAlign: "center",
    fontFamily: FONT.mono,
    fontSize: textScale(16),
    color: COLORS.primary,
  },
});
