import { COLORS } from "@/constants/Colors";
import { FONT, SIZE, STYLES } from "@/constants/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/constants/Responsive";
import useNewPokemon from "@/hooks/useNewPokemon";
import { RootState } from "@/store";
import {
  decreasePoints,
  increasePoints,
  removeLastPokemon,
  resetPoints,
} from "@/store/gameSlice";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ChooseOptions from "./chooseoptions";
import PokemonPic from "./pokemonpic";

export const LOADING_TIMEOUT: number = 1500;

export default function GameScreen() {
  const { points, options, currentPokemon } = useSelector(
    (state: RootState) => state.gamePokemon
  );
  const dispatch = useDispatch();
  const fetchNewPokemon = useNewPokemon();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log("GameScreen");

  const handleSkip = useCallback(() => {
    dispatch(decreasePoints(5));
    dispatch(removeLastPokemon());
    setIsLoading(true);
    fetchNewPokemon();
    setTimeout(() => {
      setIsLoading(false);
    }, LOADING_TIMEOUT);
  }, [dispatch, fetchNewPokemon]);

  const handleResetPoints = useCallback(() => {
    dispatch(resetPoints());
    dispatch(removeLastPokemon());
    router.replace("/");
  }, [dispatch]);

  const handleOptionSelect = useCallback(
    (selectedPokemon: string) => {
      console.log(selectedPokemon);
      if (
        selectedPokemon?.toLowerCase() === currentPokemon?.name?.toLowerCase()
      ) {
        dispatch(increasePoints(10));
      } else {
        dispatch(decreasePoints(5));
      }
      dispatch(removeLastPokemon());
      setIsLoading(true);
      fetchNewPokemon();
      setTimeout(() => {
        setIsLoading(false);
      }, LOADING_TIMEOUT);
    },
    [dispatch, currentPokemon?.name]
  );

  return (
    <View
      style={{
        ...styles.container,
        marginTop: -(StatusBar.currentHeight ?? 0),
      }}
    >
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>You scored</Text>
          <Text style={styles.pointsText}>{points}</Text>
        </View>
        <View style={STYLES.justify}>
          <Pressable style={styles.headerBtn} onPress={handleSkip}>
            <Text
              style={{
                fontFamily: FONT.mono,
                fontSize: textScale(18),
                color: COLORS.white,
              }}
            >
              Skip
            </Text>
            <MaterialIcons
              name="skip-next"
              size={SIZE.xl}
              color={COLORS.white}
            />
          </Pressable>
          <Pressable
            style={{
              ...styles.headerBtn,
              backgroundColor: `${COLORS.danger}40`,
            }}
            onPress={handleResetPoints}
          >
            <MaterialIcons
              name="exit-to-app"
              size={SIZE.xl}
              color={COLORS.danger}
            />
          </Pressable>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: SIZE.xl }}
        showsVerticalScrollIndicator={false}
      >
        <PokemonPic imgUri={currentPokemon?.imgUri} />
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <ChooseOptions
            fourPokemons={options || []}
            onOptionSelect={handleOptionSelect}
            isLoading={isLoading}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
});
