import SlotMachineDigit from "@/components/game/SlotMachineDigit";
import { LOADING_TIMEOUT } from "@/utils";
import { COLORS } from "@/utils/Colors";
import { FONT, SIZE, STYLES } from "@/utils/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/utils/Responsive";
import useNewPokemon from "@/hooks/useNewPokemon";
import usePositivePoints from "@/hooks/usePositivePoints";
import {
  losePoints,
  setHighScore,
  setIsLoading,
  skippedCurrentPokemon,
} from "@/store/gameSlice";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useGameState } from "@/utils/selectors";

type Props = {
  handleBottomSheet: () => void;
};

const PokeHeader = ({ handleBottomSheet }: Props) => {
  const { points, lifeCount } = useGameState();
  const dispatch = useDispatch();
  const fetchNewPokemon = useNewPokemon();
  const pointsText = usePositivePoints(points);

  // check the life count
  const lifeCheck: boolean = lifeCount <= 0;
  const displayLifeCount = lifeCount < 0 ? 0 : lifeCount;
  const opacity = lifeCheck ? 0.5 : 1;

  const handleSkip = useCallback(() => {
    // life count is less than 1, so open the GameSheet
    if (lifeCheck) {
      dispatch(losePoints(5));
      dispatch(setHighScore());
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
      <View>
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
      <View style={{ ...STYLES.justify, columnGap: SIZE.xl }}>
        <View style={{ position: "relative" }}>
          <AntDesign name="heart" size={SIZE.lg * 1.5} color={COLORS.danger} />
          <Text style={styles.lifeText}>{displayLifeCount}</Text>
        </View>
        <Pressable
          disabled={lifeCheck}
          style={[styles.headerBtn, { opacity: opacity }]}
          onPress={handleSkip}
        >
          <Text style={styles.skipText}>Skip</Text>
          <MaterialIcons name="skip-next" size={SIZE.xl} color={COLORS.white} />
        </Pressable>
      </View>
      <Pressable onPress={handleReset}>
        <Feather name="menu" size={SIZE.xl * 1.5} color={COLORS.white} />
      </Pressable>
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
    fontSize: textScale(16),
    color: COLORS.white,
  },
});
