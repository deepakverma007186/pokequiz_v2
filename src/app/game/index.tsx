import GameLoading from "@/components/game/GameLoading";
import GameSheet from "@/components/GameSheet";
import { COLORS } from "@/utils/Colors";
import { SIZE } from "@/utils/CommonStyles";
import { width } from "@/utils/Responsive";
import { useGameState } from "@/utils/selectors";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  BackHandler,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import ChooseOptions from "../../components/game/chooseoptions";
import PokeHeader from "../../components/game/header";
import PokemonPic from "../../components/game/pokemonpic";

export default function GameScreen() {
  const { isLoading } = useGameState();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%"], []);

  const handleBottomSheet = () => bottomSheetRef.current?.present();
  const handleDismissBottomSheet = () => bottomSheetRef.current?.dismiss();

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
      <PokeHeader handleBottomSheet={handleBottomSheet} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: SIZE.xl }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <GameLoading isLoading={isLoading} />
        ) : (
          <>
            <PokemonPic />
            <ChooseOptions handleBottomSheet={handleBottomSheet} />
          </>
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
        <GameSheet handleDismissBottomSheet={handleDismissBottomSheet} />
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
