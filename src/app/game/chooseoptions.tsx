import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONT, SIZE } from "@/constants/CommonStyles";
import { COLORS } from "@/constants/Colors";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/constants/Responsive";

type Props = {};

export default function ChoosePoints(props: Props) {
  const fourPokemons = [
    "top here",
    "r",
    "aosdokn45ijdsflksadkfjasddflkjsdf",
    "bottom here",
  ];
  return (
    <View style={styles.container}>
      {fourPokemons?.map((pokemon, index) => (
        <Pressable key={index} style={styles.btn}>
          <Text style={styles.text}>{pokemon}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZE.lg,
  },
  btn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScaleVertical(10),
    padding: moderateScale(10),
    borderRadius: SIZE.xs,
    borderCurve: "continuous",
  },
  text: {
    fontFamily: FONT.mono,
    fontSize: textScale(20),
    color: COLORS.secondary,
  },
});
