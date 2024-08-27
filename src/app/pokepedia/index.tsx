import { ANIMATIONS } from "@/assets/animation";
import Header from "@/components/Header";
import PokemonTile from "@/components/pokepedia/PokemonTile";
import useTodaysFifty from "@/hooks/useTodayFifty";
import { COLORS } from "@/utils/Colors";
import { FONT } from "@/utils/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from "@/utils/Responsive";
import LottieView from "lottie-react-native";
import React from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

const ListEmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <LottieView
      autoPlay
      source={ANIMATIONS.looking}
      style={{ width: width * 0.8, aspectRatio: 1 / 1 }}
    />
    <Text style={styles.emptyText}>No Pokémon available today!</Text>
  </View>
);

export default function Pokepedia() {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const todaysFifty = useTodaysFifty();

  return (
    <View style={styles.container}>
      <Header title="Pokepedia" />
      <FlatList
        data={todaysFifty}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonTile item={item} viewableItems={viewableItems} />
        )}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={({ viewableItems: vItems }) =>
          (viewableItems.value = vItems)
        }
        contentContainerStyle={{
          gap: moderateScaleVertical(12),
          padding: moderateScaleVertical(20),
        }}
        scrollEventThrottle={16}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(20),
    gap: moderateScaleVertical(10),
  },
  emptyText: {
    fontFamily: FONT.mono,
    fontSize: textScale(14),
    color: COLORS.white,
  },
  text: {
    fontFamily: FONT.mono,
    fontSize: textScale(12),
    color: COLORS.white,
  },
});
