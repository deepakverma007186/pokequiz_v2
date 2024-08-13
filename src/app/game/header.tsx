import SlotMachineDigit from "@/components/game/SlotMachineDigit";
import { LOADING_TIMEOUT } from "@/constants";
import { COLORS } from "@/constants/Colors";
import { FONT, SIZE, STYLES } from "@/constants/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/constants/Responsive";
import useNewPokemon from "@/hooks/useNewPokemon";
import usePositivePoints from "@/hooks/usePositivePoints";
import {
  resetGame,
  setIsLoading,
  skippedCurrentPokemon,
} from "@/store/gameSlice";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

type Props = {
  points: number;
  lifeCount: number;
  handleBottomSheet: () => void;
};

const PokeHeader = ({ points, lifeCount, handleBottomSheet }: Props) => {
  console.log("🚀 ~ PokeHeader ~ lifeCount:", lifeCount);
  const dispatch = useDispatch();
  const fetchNewPokemon = useNewPokemon();
  const router = useRouter();
  const pointsText = usePositivePoints(points);

  const handleSkip = useCallback(() => {
    if (lifeCount <= 0) {
      handleBottomSheet();
      return;
    }
    dispatch(skippedCurrentPokemon(5));
    dispatch(setIsLoading(true));
    fetchNewPokemon();
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, LOADING_TIMEOUT);
  }, [dispatch, fetchNewPokemon, lifeCount]);

  const handleReset = useCallback(() => {
    // dispatch(resetGame());
    // router.replace("/");
    handleBottomSheet();
  }, [dispatch]);

  return (
    <View style={styles.headerContainer}>
      <View style={{}}>
        <Text style={styles.headerText}>You scored</Text>
        <View style={{ flexDirection: "row" }}>
          {pointsText.map((digit, index) => (
            <SlotMachineDigit
              key={index}
              digit={Number(digit)}
              actualPoints={points}
            />
          ))}
        </View>
      </View>
      <View style={{ position: "relative" }}>
        <AntDesign name="heart" size={SIZE.lg * 1.5} color={COLORS.danger} />
        <Text style={styles.lifeText}>{lifeCount}</Text>
      </View>
      <View style={STYLES.justify}>
        <Pressable style={styles.headerBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
          <MaterialIcons name="skip-next" size={SIZE.xl} color={COLORS.white} />
        </Pressable>
        <Pressable
          style={[styles.headerBtn, { backgroundColor: `${COLORS.danger}40` }]}
          onPress={handleReset}
        >
          <MaterialIcons
            name="exit-to-app"
            size={SIZE.xl}
            color={COLORS.danger}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default React.memo(PokeHeader);

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONT.mono,
    fontSize: textScale(20),
    color: COLORS.white,
  },
  pointsText: {
    fontFamily: FONT.solid,
    fontSize: textScale(30),
    color: COLORS.secondary,
    letterSpacing: SIZE.xs,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(40),
    paddingBottom: moderateScaleVertical(10),
  },
  headerBtn: {
    ...STYLES.flexRow,
    backgroundColor: `${COLORS.text}30`,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScaleVertical(8),
    borderRadius: SIZE.lg,
    borderCurve: "continuous",
  },
  lifeText: {
    position: "absolute",
    top: SIZE.base,
    left: SIZE.lg,
    fontFamily: FONT.mono,
    fontSize: textScale(16),
    color: COLORS.white,
  },
  skipText: {
    fontFamily: FONT.mono,
    fontSize: textScale(18),
    color: COLORS.white,
  },
});
