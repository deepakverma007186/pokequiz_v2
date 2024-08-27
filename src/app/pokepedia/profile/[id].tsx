import Header from "@/components/Header";
import useFetchPokeProfile from "@/hooks/useFetchPokeProfile";
import { COLORS } from "@/utils/Colors";
import { FONT, SIZE } from "@/utils/CommonStyles";
import { height, moderateScale, textScale, width } from "@/utils/Responsive";
import { useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Profile() {
  const scrollRef = useRef<ScrollView>(null);
  const { name, url } = useLocalSearchParams();
  // console.log("🚀 ~ Profile ~ itemData:", name, url);

  const { data: pokemon, loading, error } = useFetchPokeProfile(url as string);

  if (loading) {
    return <ActivityIndicator size={"large"} color={COLORS.white} />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  // console.log("🚀 ~ Profile ~ pokemon:", pokemon);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      stickyHeaderIndices={[0]}
      overScrollMode="never"
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
    >
      <Header
        title={pokemon?.name}
        titleStyle={styles.title}
        containerStyle={styles.header}
      />
      <View style={styles.imagebackgroundStyle}>
        <Image
          source={{
            uri: pokemon?.sprites?.other?.["official-artwork"]?.front_default,
          }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.belowTitleContainer}>
        <Text style={styles.title}>{pokemon?.name}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.heightWeightContainer}>
          <Text style={styles.text}>Weight: {pokemon?.weight}</Text>
          <Text style={styles.text}>Height: {pokemon?.height}</Text>
        </View>
        <View style={[styles.extraContent, { backgroundColor: "skyblue" }]} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  title: {
    fontFamily: FONT.mono,
    fontSize: textScale(24),
    color: COLORS.secondary,
    textTransform: "capitalize",
  },
  imagebackgroundStyle: {
    width: width,
    height: height * 0.4,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  header: {
    // position: "absolute",
    // top: 0,
    // right: 0,
    // left: 0,
    // top: 0,
    // zIndex: 10,
  },
  scrollViewContent: {
    paddingTop: height * 0.4,
  },
  belowTitleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "baseline",
    padding: moderateScale(16),
    // backgroundColor: "coral",
  },
  detailsContainer: { flex: 1, backgroundColor: "teal" },
  extraContent: {
    height: height,
    // width: width,
    borderRadius: SIZE.base,
    margin: moderateScale(16),
  },
  heightWeightContainer: {
    backgroundColor: COLORS.primary,
    padding: moderateScale(10),
    margin: moderateScale(16),
    borderRadius: SIZE.base,
  },
  text: {
    fontFamily: FONT.mono,
    fontSize: textScale(16),
    color: COLORS.secondary,
  },
});
