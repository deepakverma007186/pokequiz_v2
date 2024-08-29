import { SIZE } from "@/utils/CommonStyles";
import { height, moderateScale, width } from "@/utils/Responsive";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const Shimmer = createShimmerPlaceholder(LinearGradient);

interface ProfileLoadingProps {
  isLoading: boolean;
}

export default function ProfileLoading({ isLoading }: ProfileLoadingProps) {
  const shimmerColors = [
    `rgba(0, 117, 190, 0.2)`,
    `rgba(0, 117, 190, 0.5)`,
    `rgba(0, 117, 190, 0.2)`,
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Shimmer
          visible={!isLoading}
          shimmerColors={shimmerColors}
          shimmerStyle={[
            StyleSheet.absoluteFill,
            { width: "100%", height: "100%" },
          ]}
        />
        <Shimmer
          visible={!isLoading}
          shimmerColors={[
            `rgba(0, 117, 190, 0.2)`,
            `rgba(0, 117, 190, 0.4)`,
            `rgba(0, 117, 190, 0.2)`,
          ]}
          style={styles.titleContainer}
        />
      </View>
      <View style={styles.optionsContainer}>
        {[1, 2, 3, 4, 5, 6].map((btn, index) => (
          <Shimmer
            key={index}
            style={styles.cardContainer}
            visible={!isLoading}
            shimmerColors={shimmerColors}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  imgContainer: {
    width: width * 0.9,
    height: "44%",
    alignSelf: "center",
    marginTop: SIZE.xl,
    overflow: "hidden",
    borderRadius: SIZE.base,
  },
  titleContainer: {
    width: width * 0.5,
    height: "16%",
    borderRadius: SIZE.base,
    position: "absolute",
    bottom: 16,
    left: 16,
    zIndex: 10,
  },
  optionsContainer: {
    width: width * 0.9,
    alignSelf: "center",
    margin: moderateScale(16),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    height: height * 0.2,
    borderRadius: SIZE.base,
    marginBottom: moderateScale(16),
  },
});
