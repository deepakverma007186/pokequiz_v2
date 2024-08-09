import { IMG } from "@/assets/images";
import BottomSection from "@/components/home/BottomSection";
import { COLORS } from "@/constants/Colors";
import { FONT, SIZE, STYLES } from "@/constants/CommonStyles";
import {
  height,
  moderateScaleVertical,
  textScale,
  width,
} from "@/constants/Responsive";
import useFetchRandomPokemon from "@/hooks/useFetchRandomPokemon";
import { setOptions, setPokemon } from "@/store/gameSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

type Props = {};

export default function Home(props: Props) {
  const dispatch = useDispatch();
  const fetchPokemon = useCallback(async () => {
    console.log("fetchPokemon function all");
    try {
      const randromPokemon = await useFetchRandomPokemon();
      dispatch(
        setPokemon({
          name: randromPokemon?.name,
          imgUri:
            randromPokemon?.sprites?.other?.["official-artwork"]?.front_default,
        })
      );
      dispatch(setOptions(randromPokemon));
    } catch (error) {
      console.error("Failed to fetch pokemon:", error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is still mounted

    if (isMounted) {
      fetchPokemon();
    }

    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={[STYLES.flexRow, styles.titleLogo]}>
        <View style={{ width: width * 0.16, aspectRatio: 1 }}>
          <Image
            source={IMG.pokeball}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={styles.title}>PokeQuiz</Text>
      </View>
      <Link href={"/game"} asChild>
        <Pressable style={styles.startBtnContainer}>
          <AntDesign name="playcircleo" size={100} color={COLORS.secondary} />
          <Text style={{ ...styles.text, color: COLORS.secondary }}>
            Let's Start
          </Text>
        </Pressable>
      </Link>
      <BottomSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleLogo: {
    marginTop: moderateScaleVertical(40),
    backgroundColor: COLORS.primary,
    width: width,
    height: height * 0.12,
    columnGap: SIZE.lg,
  },
  title: {
    fontFamily: FONT.outline,
    fontSize: textScale(SIZE.xl * 2),
    color: COLORS.secondary,
  },
  text: {
    fontFamily: FONT.mono,
    fontSize: textScale(SIZE.lg),
    color: COLORS.primary,
  },
  startBtnContainer: {
    alignItems: "center",
    gap: SIZE.base,
    marginVertical: moderateScaleVertical(80),
  },
});
