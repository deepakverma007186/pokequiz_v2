import { TRIM_LENGTH } from "@/utils";
import { COLORS } from "@/utils/Colors";
import { FONT, SIZE } from "@/utils/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/utils/Responsive";
import { Href, useRouter } from "expo-router"; // Updated to use useRouter
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewToken } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface PokemonTileProps {
  item: {
    id: string;
    name: string;
    url: string;
  };
  viewableItems: SharedValue<ViewToken[]>;
}

export default function PokemonTile({ item, viewableItems }: PokemonTileProps) {
  const router = useRouter(); // Initialize router using useRouter hook

  const pokemonNumber = item?.url.split("/").at(-2);
  const pokemonName =
    item?.name?.length >= TRIM_LENGTH
      ? item?.name.slice(0, TRIM_LENGTH) + "..."
      : item?.name;

  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((viewItem) => viewItem.isViewable)
        .find((viewableItem) => viewableItem.item.name === item.name)
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0.8),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.9),
        },
      ],
    };
  }, []);

  const params = new URLSearchParams({
    name: item?.name,
    url: item?.url,
  }).toString();

  return (
    <Animated.View style={rStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={() =>
          router.push(`/pokepedia/profile/${item.id}?${params}` as Href)
        }
      >
        <Text style={styles.text}>#{pokemonNumber}</Text>
        <Text style={styles.nameText} numberOfLines={1}>
          {pokemonName}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScaleVertical(10),
    backgroundColor: COLORS.primary,
    borderRadius: SIZE.lg,
    paddingHorizontal: moderateScale(16),
    columnGap: SIZE.xl,
  },
  text: {
    fontFamily: FONT.mono,
    color: COLORS.secondary,
    fontSize: textScale(16),
    textTransform: "capitalize",
  },
  nameText: {
    fontFamily: FONT.solid,
    color: COLORS.secondary,
    fontSize: textScale(26),
    letterSpacing: 2,
    textTransform: "capitalize",
  },
});
