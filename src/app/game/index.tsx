import GameSheet from "@/components/GameSheet";
import Loading from "@/components/Loading";
import { COLORS } from "@/constants/Colors";
import { SIZE } from "@/constants/CommonStyles";
import { width } from "@/constants/Responsive";
import { RootState } from "@/store";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  BackHandler,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import ChooseOptions from "./chooseoptions";
import PokeHeader from "./header";
import PokemonPic from "./pokemonpic";

export default function GameScreen() {
  const { isLoading, points, lifeCount, currentPokemon, options } = useSelector(
    (state: RootState) => state.gamePokemon
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%"], []);

  const handleBottomSheet = () => bottomSheetRef.current?.present();

  const renderBackDrop = useCallback((props: any) => {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  }, []);

  useEffect(() => {
    const backAction = () => {
      handleBottomSheet();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <PokeHeader
        lifeCount={lifeCount}
        points={points}
        handleBottomSheet={handleBottomSheet}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: SIZE.xl }}
        showsVerticalScrollIndicator={false}
      >
        <PokemonPic imgUri={currentPokemon?.imgUri} />
        {isLoading ? (
          <Loading />
        ) : (
          <ChooseOptions
            fourPokemons={options || []}
            isLoading={isLoading}
            currentPokemon={currentPokemon}
          />
        )}
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetRef}
        style={{ flex: 1 }}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: COLORS.primary }}
        handleIndicatorStyle={{
          backgroundColor: COLORS.secondary,
          width: width * 0.2,
        }}
        backdropComponent={renderBackDrop}
      >
        <GameSheet />
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -(StatusBar.currentHeight ?? 0),
  },
});
