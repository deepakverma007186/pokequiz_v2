import useNewPokemon from "@/hooks/useNewPokemon";
import {
  gainPoints,
  losePoints,
  removeLastPokemon,
  setHighScore,
  setIsLoading,
} from "@/store/gameSlice";
import { GAIN, LOADING_TIMEOUT, LOSE } from "@/utils";
import { COLORS } from "@/utils/Colors";
import { FONT, SIZE } from "@/utils/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/utils/Responsive";
import { useGameState } from "@/utils/selectors";
import React, { memo, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

type Props = {
  handleBottomSheet: () => void;
};

const ChooseOptions = ({ handleBottomSheet }: Props) => {
  const { isLoading, currentPokemon, points, lifeCount, options } =
    useGameState();
  const dispatch = useDispatch();
  const fetchNewPokemon = useNewPokemon();
  // check the life count
  const lifeCheck: boolean = lifeCount < 0;
  const opacity = lifeCheck ? 0.5 : 1;
  // console.log(fourPokemons);

  const handleOptionSelect = useCallback(
    (selectedPokemon: string) => {
      // life count is less than 1, so open the GameSheet
      if (!lifeCount) {
        dispatch(losePoints(LOSE));
        handleBottomSheet();
        setTimeout(() => {
          dispatch(setHighScore());
        }, LOADING_TIMEOUT);
        return;
      } else {
        const isMatching =
          selectedPokemon?.toLowerCase() ===
          currentPokemon?.name?.toLowerCase();
        isMatching ? dispatch(gainPoints(GAIN)) : dispatch(losePoints(LOSE));
        dispatch(removeLastPokemon());
        dispatch(setIsLoading(true));
        fetchNewPokemon();
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, LOADING_TIMEOUT);
      }
    },
    [dispatch, currentPokemon?.name]
  );

  return (
    <View style={styles.container}>
      {!isLoading &&
        options?.map((pokemon, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.btn, { opacity: opacity }]}
            disabled={lifeCheck}
            onPress={() => handleOptionSelect(pokemon?.name)}
          >
            <Text style={styles.text}>{pokemon?.name}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default memo(ChooseOptions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZE.lg,
  },
  btn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScaleVertical(10),
    padding: moderateScale(10),
    borderRadius: SIZE.xs,
    borderCurve: "continuous",
  },
  text: {
    fontFamily: FONT.mono,
    fontSize: textScale(20),
    color: COLORS.secondary,
    textTransform: "capitalize",
    textAlign: "center",
  },
});
