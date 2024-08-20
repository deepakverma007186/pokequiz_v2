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
  const shimmerColors = [
    `rgba(0, 117, 190, 0.1)`,
    `rgba(0, 117, 190, 0.4)`,
    `rgba(0, 117, 190, 0.1)`,
  ];
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Shimmer
          visible={!isLoading}
          shimmerColors={shimmerColors}
          style={{ width: "100%", height: "100%" }}
        ></Shimmer>
      </View>
      <View style={styles.optionsContainer}>
        {[1, 2, 3, 4].map((btn, index) => (
          <Shimmer
            key={index}
            style={styles.btn}
            visible={!isLoading}
            shimmerColors={shimmerColors}
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
    overflow: "hidden",
    borderRadius: SIZE.lg,
  },
  optionsContainer: {
    flex: 1,
    width: width * 0.9,
    alignSelf: "center",
    marginTop: moderateScaleVertical(20),
    marginHorizontal: moderateScale(16),
  },
  btn: {
    width: "100%",
    height: "16%",
    marginVertical: moderateScaleVertical(10),
    borderRadius: SIZE.xs,
    borderCurve: "continuous",
    overflow: "hidden",
  },
});
