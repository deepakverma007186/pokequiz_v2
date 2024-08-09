import { COLORS } from "@/constants/Colors";
import { FONT, SIZE, STYLES } from "@/constants/CommonStyles";
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from "@/constants/Responsive";
import useNewPokemon from "@/hooks/useNewPokemon";
import { RootState } from "@/store";
import {
  gainPoints,
  losePoints,
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
import SlotMachineDigit from "@/components/game/SlotMachineDigit";
import LottieView from "lottie-react-native";
import { ANIMATIONS } from "@/assets/animation";
import usePositivePoints from "@/hooks/usePositivePoints";

export const LOADING_TIMEOUT: number = 2000;

export default function GameScreen() {
  const { points, options, currentPokemon } = useSelector(
    (state: RootState) => state.gamePokemon
  );
  const dispatch = useDispatch();
  const fetchNewPokemon = useNewPokemon();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log("GameScreen");
  const pointsText = usePositivePoints(points);

  const handleSkip = useCallback(() => {
    dispatch(losePoints(5));
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
        dispatch(gainPoints(10));
      } else {
        dispatch(losePoints(5));
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
          {/* <Text style={styles.pointsText}>
            {points}
          </Text> */}
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
          <LottieView
            style={styles.loading}
            source={ANIMATIONS.loading}
            autoPlay
            loop
          />
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
  loading: {
    position: "absolute",
    width: SIZE.base * 5,
    aspectRatio: 1,
    top: height / 2 - SIZE.base * 5,
    alignSelf: "center",
  },
});
