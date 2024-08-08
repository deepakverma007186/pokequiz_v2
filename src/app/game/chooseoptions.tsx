import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONT, SIZE } from "@/constants/CommonStyles";
import { COLORS } from "@/constants/Colors";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/constants/Responsive";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type Props = {};

const ChoosePoints = React.memo((props: Props) => {
  const { options: fourPokemons, currentPokemon } = useSelector(
    (state: RootState) => state.gamePokemon
  );
  // console.log(fourPokemons, currentPokemon);
  console.log("ChoosePoints");
  return (
    <View style={styles.container}>
      {fourPokemons?.map((pokemon, index) => (
        <Pressable key={index} style={styles.btn}>
          <Text style={styles.text}>{pokemon?.name}</Text>
        </Pressable>
      ))}
    </View>
  );
});

export default ChoosePoints;
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
