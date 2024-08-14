import { COLORS } from "@/utils/Colors";
import { FONT, SIZE, STYLES } from "@/utils/CommonStyles";
import { textScale } from "@/utils/Responsive";
import { resetGame } from "@/store/gameSlice";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useGameState } from "@/utils/selectors";
import { LOADING_TIMEOUT } from "@/utils";

type Props = {
  handleDismissBottomSheet: () => void;
};

export default function GameSheet({ handleDismissBottomSheet }: Props) {
  const { points, lifeCount } = useGameState();
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(lifeCount, "lifeCount");

  const handleContinue = useCallback(() => {
    handleDismissBottomSheet();
  }, []);
  const handleLeave = useCallback(() => {
    router.replace("/");
    setTimeout(() => {
      dispatch(resetGame());
    }, LOADING_TIMEOUT);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PokeQuiz Score</Text>
      <Text style={styles.scoreText}>{points}</Text>
      <View style={styles.btnContainer}>
        <Pressable
          style={[styles.btn, { backgroundColor: COLORS.background }]}
          onPress={handleLeave}
        >
          <SimpleLineIcons
            name="logout"
            size={SIZE.base}
            color={COLORS.white}
          />
          <Text style={[styles.btnText, { color: COLORS.white }]}>Leave</Text>
        </Pressable>
        {lifeCount >= 0 && (
          <Pressable style={styles.btn} onPress={handleContinue}>
            <Text style={styles.btnText}>Continue</Text>
          </Pressable>
        )}
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
    letterSpacing: 4,
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
    ...STYLES.flexRow,
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
