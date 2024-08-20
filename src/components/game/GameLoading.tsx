import { COLORS } from "@/utils/Colors";
import { SIZE } from "@/utils/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from "@/utils/Responsive";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const Shimmer = createShimmerPlaceholder(LinearGradient);

interface GameLoadingProps {
  isLoading: boolean;
}

export default function GameLoading({ isLoading }: GameLoadingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Shimmer
          visible={!isLoading}
          shimmerColors={[COLORS.primary, COLORS.background, COLORS.primary]}
          style={{ width: "100%", height: "100%" }}
        ></Shimmer>
      </View>
      <View style={styles.optionsContainer}>
        {[1, 2, 3, 4].map((btn, index) => (
          <Shimmer
            key={index}
            style={styles.btn}
            visible={!isLoading}
            shimmerColors={[COLORS.primary, COLORS.background, COLORS.primary]}
          ></Shimmer>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    width: width * 0.9,
    aspectRatio: 1 / 1,
    alignSelf: "center",
    marginTop: SIZE.xl,
    backgroundColor: "red",
    overflow: "hidden",
    borderRadius: SIZE.lg,
  },
  optionsContainer: {
    flex: 1,
    width: width * 0.9,
    marginTop: moderateScaleVertical(20),
    marginHorizontal: moderateScale(16),
  },
  btn: {
    width: "100%",
    height: "15%",
    backgroundColor: COLORS.primary,
    marginVertical: moderateScaleVertical(10),
    padding: moderateScale(10),
    borderRadius: SIZE.xs,
    borderCurve: "continuous",
  },
});
