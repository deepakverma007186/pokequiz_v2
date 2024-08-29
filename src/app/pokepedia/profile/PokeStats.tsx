import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, textScale, width } from "@/utils/Responsive";
import { FONT, SIZE } from "@/utils/CommonStyles";
import { COLORS } from "@/utils/Colors";
import { StatsProps } from "@/types";

interface PokeStatsProps {
  stats: StatsProps[] | undefined;
}
export default function PokeStats({ stats }: PokeStatsProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={stats}
        keyExtractor={(_, i) => `${i}`}
        renderItem={({ item }) => <CardTile item={item} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={2}
        contentContainerStyle={{ rowGap: SIZE.base }}
        columnWrapperStyle={{ columnGap: SIZE.base }}
      />
    </View>
  );
}

const CardTile = ({ item }: { item: StatsProps }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.text}>{item?.stat?.name}</Text>
      <Text style={styles.score}>{item?.base_stat}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
  },
  cardContainer: {
    flex: 1,
    width: "50%",
    aspectRatio: 1 / 1,
    borderRadius: SIZE.base,
    backgroundColor: COLORS.primary,
    justifyContent: "space-between",
    padding: moderateScale(16),
  },
  text: {
    fontFamily: FONT.mono,
    fontSize: textScale(18),
    color: COLORS.secondary,
    textTransform: "capitalize",
  },
  score: {
    fontFamily: FONT.mono,
    fontSize: textScale(80),
    color: COLORS.secondary,
    textAlign: "center",
  },
});
