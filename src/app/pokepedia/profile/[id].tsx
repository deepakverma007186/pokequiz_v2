import useFetchPokeProfile from "@/hooks/useFetchPokeProfile";
import { COLORS } from "@/utils/Colors";
import { FONT, SIZE } from "@/utils/CommonStyles";
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from "@/utils/Responsive";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const IMAGE_HEIGHT = height * 0.4;

export default function Profile() {
  const { name, url } = useLocalSearchParams();
  const { data: pokemon, loading, error } = useFetchPokeProfile(url as string);
  const router = useRouter();
  const scrollY = useSharedValue(0);
  // // console.log("🚀 ~ Profile ~ itemData:", name, url);
  const imgURI = pokemon?.sprites?.other?.["official-artwork"]?.front_default;
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const scrollAnimatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT],
      [0, -IMAGE_HEIGHT],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }],
    };
  });
  const mainImageAnimationStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT / 2, IMAGE_HEIGHT],
      [1, 0.3, 0]
    );
    const translateY = interpolate(scrollY.value, [0, -IMAGE_HEIGHT], [0, -40]);
    return { opacity, transform: [{ translateY }] };
  });
  const titleTextAnimationStyles = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT],
      [0, 40],
      Extrapolation.CLAMP
    );
    const fontSize = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT],
      [24, 20],
      Extrapolation.CLAMP
    );
    return { transform: [{ translateX }], fontSize };
  });
  const smallImageAnimationStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT / 2, IMAGE_HEIGHT],
      [0, 0, 1]
    );
    return { opacity };
  });

  if (loading) {
    return <ActivityIndicator size={"large"} color={COLORS.white} />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  // console.log("🚀 ~ Profile ~ pokemon:", pokemon);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => (router.canGoBack() ? router.back() : router.dismiss())}
        style={styles.backBtn}
      >
        <Ionicons
          name="arrow-back-sharp"
          color={COLORS.secondary}
          size={textScale(20)}
        />
      </Pressable>
      <Animated.View
        style={[styles.imagebackgroundStyle, mainImageAnimationStyles]}
      >
        <Image
          source={{ uri: imgURI }}
          resizeMode="contain"
          style={styles.image}
        />
      </Animated.View>
      <Animated.View style={scrollAnimatedStyles}>
        <Animated.View style={[styles.belowTitleContainer]}>
          <Animated.Text style={[styles.title, titleTextAnimationStyles]}>
            {pokemon?.name}
          </Animated.Text>
          <Animated.View
            style={[styles.imagebackgroundStyle2, smallImageAnimationStyles]}
          >
            <Image
              source={{ uri: imgURI }}
              resizeMode="contain"
              style={styles.image}
            />
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          onScroll={handleScroll}
          contentContainerStyle={{ paddingBottom: moderateScaleVertical(40) }}
          style={{ backgroundColor: "coral", zIndex: 99 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.detailsContainer}>
            <View style={styles.heightWeightContainer}>
              <Text style={styles.text}>Weight: {pokemon?.weight}</Text>
              <Text style={styles.text}>Height: {pokemon?.height}</Text>
            </View>
            <View
              style={[styles.extraContent, { backgroundColor: "skyblue" }]}
            />
            <View style={[styles.extraContent, { backgroundColor: "lime" }]} />
          </View>
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    position: "absolute",
    top: 0,
    zIndex: 2,
    padding: moderateScale(16),
  },
  title: {
    fontFamily: FONT.mono,
    fontSize: textScale(24),
    color: COLORS.secondary,
    textTransform: "capitalize",
  },
  imagebackgroundStyle: {
    width: width,
    height: IMAGE_HEIGHT,
  },
  imagebackgroundStyle2: {
    width: width * 0.06,
    aspectRatio: 1 / 1,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    // padding: SIZE.base / 4,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  belowTitleContainer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "coral",
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "teal",
    paddingBottom: moderateScaleVertical(80),
  },
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
