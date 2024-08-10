import { COLORS } from "@/constants/Colors";
import { FONT, SIZE, STYLES } from "@/constants/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from "@/constants/Responsive";
import { RootState } from "@/store";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

type Props = {};

export default function BottomSection(props: Props) {
  const { points } = useSelector((state: RootState) => state.gamePokemon);
  return (
    <View style={styles.bottomSection}>
      <Link href={"/profile"} asChild>
        <Pressable style={styles.encycloBtn}>
          <Text style={styles.encycloBtnText}>Pokepedia</Text>
          <MaterialIcons name="explore" size={30} color={COLORS.secondary} />
        </Pressable>
      </Link>
      <View style={styles.bottomOptionsContainer}>
        <Link href={"/settings"} asChild>
          <Pressable style={styles.bottomOptionBtn}>
            <MaterialIcons name="settings" size={30} color={COLORS.primary} />
            <Text style={{ ...styles.text, fontSize: textScale(14) }}>
              Settings
            </Text>
          </Pressable>
        </Link>
        <Link href={"/score"} asChild>
          <Pressable style={styles.bottomOptionBtn}>
            <Entypo name="bar-graph" size={30} color={COLORS.primary} />
            <Text style={{ ...styles.text, fontSize: textScale(14) }}>
              Score
            </Text>
          </Pressable>
        </Link>
        <Link href={"/rules"} asChild>
          <Pressable style={styles.bottomOptionBtn}>
            <MaterialCommunityIcons
              name="timeline-help"
              size={30}
              color={COLORS.primary}
            />
            <Text style={{ ...styles.text, fontSize: textScale(14) }}>
              Rules
            </Text>
          </Pressable>
        </Link>
      </View>
      <View style={styles.highScoreContainer}>
        <Text style={styles.scoreText}>High Score • {points}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreText: {
    fontFamily: FONT.mono,
    fontSize: textScale(24),
    color: COLORS.secondary,
    textAlign: "center",
  },
  text: {
    fontFamily: FONT.mono,
    fontSize: textScale(SIZE.lg),
    color: COLORS.primary,
  },

  encycloBtn: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: SIZE.xs,
    marginVertical: moderateScaleVertical(20),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(10),
    borderCurve: "continuous",
    borderRadius: SIZE.xl,
    backgroundColor: COLORS.primary,
  },
  encycloBtnText: {
    fontSize: textScale(24),
    color: COLORS.secondary,
    fontFamily: FONT.mono,
  },
  bottomSection: {
    position: "absolute",
    bottom: moderateScaleVertical(20),
    right: 0,
    left: 0,
    alignItems: "center",
  },
  bottomOptionsContainer: {
    ...STYLES.flexRow,
    marginVertical: moderateScaleVertical(30),
    columnGap: moderateScale(60),
  },
  bottomOptionBtn: { alignItems: "center" },
  highScoreContainer: {
    padding: moderateScale(10),
    marginVertical: moderateScaleVertical(20),
    width: width,
    backgroundColor: COLORS.primary,
  },
});
