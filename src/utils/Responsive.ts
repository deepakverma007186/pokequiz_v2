import { Dimensions, StatusBar, Platform } from "react-native";

// Defining types for dimensions
const { width, height }: { width: number; height: number } =
  Dimensions.get("window");

// Update these guidelines for a 6-inch screen (e.g., iPhone 11 dimensions)
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

// Utility function types
const scale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scale(size) - size) * factor;
const moderateScaleVertical = (size: number, factor: number = 0.5): number =>
  size + (verticalScale(size) - size) * factor;

const textScale = (percent: number): number => {
  const screenHeight: number = Dimensions.get("window").height;
  const ratio: number = screenHeight / Dimensions.get("window").width;

  const deviceHeight: number =
    Platform.OS === "android"
      ? screenHeight - (StatusBar.currentHeight ?? 0)
      : screenHeight;

  const adjustedHeight: number =
    ratio > 1.8 ? deviceHeight * 0.126 : deviceHeight * 0.15;

  const heightPercent: number = (percent * adjustedHeight) / 100;
  return Math.round(heightPercent);
};

// Exporting the functions and dimensions with type annotations
export {
  scale,
  verticalScale,
  textScale,
  moderateScale,
  moderateScaleVertical,
  width,
  height,
};
