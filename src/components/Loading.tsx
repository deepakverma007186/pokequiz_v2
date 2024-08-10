import { ANIMATIONS } from "@/assets/animation";
import { SIZE } from "@/constants/CommonStyles";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.loadingContainer}>
      <LottieView
        style={styles.loading}
        source={ANIMATIONS.loading}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    width: SIZE.base * 5,
    aspectRatio: 1,
  },
  loadingContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000080",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});
