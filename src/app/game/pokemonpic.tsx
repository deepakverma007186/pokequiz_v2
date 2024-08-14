import { SIZE } from "@/utils/CommonStyles";
import { width } from "@/utils/Responsive";
import { useGameState } from "@/utils/selectors";
import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";

const PokemonPic = () => {
  const { currentPokemon } = useGameState();
  return (
    <View style={styles.container}>
      {currentPokemon && (
        <Image source={{ uri: currentPokemon?.imgUri }} style={styles.img} />
      )}
    </View>
  );
};

export default memo(PokemonPic);

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
