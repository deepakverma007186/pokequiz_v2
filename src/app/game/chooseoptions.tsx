import { COLORS } from "@/constants/Colors";
import { FONT, SIZE } from "@/constants/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/constants/Responsive";
import { Pokemon } from "@/types";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  fourPokemons: Pokemon[];
  onOptionSelect: (selectedPokemon: string) => void;
  isLoading: boolean;
};

const ChooseOptions = ({ fourPokemons, onOptionSelect, isLoading }: Props) => {
  console.log("ChooseOptions", fourPokemons);

  return (
    <View style={styles.container}>
      {!isLoading &&
        fourPokemons?.map((pokemon, index) => (
          <TouchableOpacity
            key={index}
            style={styles.btn}
            onPress={() => onOptionSelect(pokemon?.name)}
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
