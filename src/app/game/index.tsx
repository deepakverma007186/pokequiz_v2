import Loading from "@/components/Loading";
import { SIZE } from "@/constants/CommonStyles";
import { RootState } from "@/store";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import ChooseOptions from "./chooseoptions";
import PokeHeader from "./header";
import PokemonPic from "./pokemonpic";

export default function GameScreen() {
  const game = useSelector((state: RootState) => state.gamePokemon);

  return (
    <View style={styles.container}>
      <PokeHeader lifeCount={game?.lifeCount} points={game?.points} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: SIZE.xl }}
        showsVerticalScrollIndicator={false}
      >
        <PokemonPic imgUri={game?.currentPokemon?.imgUri} />
        {game?.isLoading ? (
          <Loading />
        ) : (
          <ChooseOptions
            fourPokemons={game?.options || []}
            isLoading={game?.isLoading}
            currentPokemon={game?.currentPokemon}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -(StatusBar.currentHeight ?? 0),
  },
});
