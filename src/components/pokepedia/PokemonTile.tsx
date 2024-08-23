import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import React from "react";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/utils/Responsive";
import { COLORS } from "@/utils/Colors";
import { FONT, SIZE } from "@/utils/CommonStyles";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface PokemonTileProps {
  item: {
    name: string;
    url: string;
  };
  viewableItems: SharedValue<ViewToken[]>;
}

export default function PokemonTile({ item, viewableItems }: PokemonTileProps) {
  const pokemonNumber = item?.url.split("/").at(-2);

  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
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

  return (
    <Animated.View style={rStyle}>
      <TouchableOpacity activeOpacity={0.8} style={styles.container}>
        <Text style={styles.text}>#{pokemonNumber}</Text>
        <Text
          style={[styles.text, { fontSize: textScale(26) }]}
          numberOfLines={1}
        >
          {item?.name}
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
    borderCurve: "continuous",
    paddingHorizontal: moderateScale(16),
    columnGap: SIZE.xl,
  },
  text: {
    fontFamily: FONT.solid,
    color: COLORS.secondary,
    fontSize: textScale(16),
    letterSpacing: 2,
    textTransform: "capitalize",
  },
});
