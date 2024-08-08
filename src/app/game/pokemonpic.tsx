import { SIZE } from "@/constants/CommonStyles";
import { width } from "@/constants/Responsive";
import { RootState } from "@/store";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const PokemonPic = React.memo(() => {
  const { currentPokemon } = useSelector(
    (state: RootState) => state.gamePokemon
  );
  console.log("PokemonPic");

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentPokemon?.imgUri }} style={styles.img} />
    </View>
  );
});

export default PokemonPic;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: SIZE.xl,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
