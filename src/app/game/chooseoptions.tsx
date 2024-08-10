import { LOADING_TIMEOUT } from "@/constants";
import { COLORS } from "@/constants/Colors";
import { FONT, SIZE } from "@/constants/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/constants/Responsive";
import useNewPokemon from "@/hooks/useNewPokemon";
import {
  gainPoints,
  losePoints,
  removeLastPokemon,
  setIsLoading,
} from "@/store/gameSlice";
import { Pokemon } from "@/types";
import React, { memo, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

type Props = {
  fourPokemons: Pokemon[];
  isLoading: boolean;
  currentPokemon?: Pokemon;
};

const ChooseOptions = ({ fourPokemons, isLoading, currentPokemon }: Props) => {
  const dispatch = useDispatch();
  const fetchNewPokemon = useNewPokemon();
  console.log(fourPokemons);

  const handleOptionSelect = useCallback(
    (selectedPokemon: string) => {
      const isMatching =
        selectedPokemon?.toLowerCase() === currentPokemon?.name?.toLowerCase();
      if (isMatching) {
        dispatch(gainPoints(10));
      } else {
        dispatch(losePoints(5));
      }
      dispatch(removeLastPokemon());
      dispatch(setIsLoading(true));
      fetchNewPokemon();
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, LOADING_TIMEOUT);
    },
    [dispatch, currentPokemon?.name]
  );

  return (
    <View style={styles.container}>
      {!isLoading &&
        fourPokemons?.map((pokemon, index) => (
          <TouchableOpacity
            key={index}
            style={styles.btn}
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
