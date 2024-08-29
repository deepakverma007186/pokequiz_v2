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
import PokeStats from "./PokeStats";
import GameLayout from "@/app/game/_layout";
import GameLoading from "@/components/game/GameLoading";
import ProfileLoading from "./ProfileLoading";

const IMAGE_HEIGHT = height * 0.4;
const HEADER_HEIGHT = moderateScaleVertical(60);

export default function Profile() {
  const { name, url } = useLocalSearchParams();
  const { data: pokemon, loading, error } = useFetchPokeProfile(url as string);
  const router = useRouter();
  const scrollY = useSharedValue(0);

  const imgURI = pokemon?.sprites?.other?.["official-artwork"]?.front_default;

  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const marginLeft = interpolate(scrollY.value, [0, IMAGE_HEIGHT], [0, 36]);
    return { marginLeft };
  });
  const titleContainerStyle = useAnimatedStyle(() => {
    const marginTop = interpolate(scrollY.value, [0, IMAGE_HEIGHT], [-20, 4]);
    return { marginTop };
  });

  const titleStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(scrollY.value, [0, IMAGE_HEIGHT], [40, 20]);
    return { fontSize };
  });
  const smallImageStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT - HEADER_HEIGHT, IMAGE_HEIGHT],
      [0, 0, 1]
    );
    return { opacity };
  });

  const imageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT],
      [0, IMAGE_HEIGHT],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT],
      [1, 0.5],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [0, IMAGE_HEIGHT],
      [1, 0],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

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
      {loading ? (
        <ProfileLoading isLoading={loading} />
      ) : (
        <Animated.ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          bouncesZoom={false}
          bounces={false}
        >
          <Animated.View style={[styles.imageContainer, imageStyle]}>
            <Image source={{ uri: imgURI }} style={styles.image} />
          </Animated.View>
          <Animated.View style={[styles.header, headerStyle]}>
            <Animated.View style={[styles.row, titleContainerStyle]}>
              <Animated.Text style={[styles.headerTitle, titleStyle]}>
                {pokemon?.name}
              </Animated.Text>
            </Animated.View>
            <Animated.Image
              source={{ uri: imgURI }}
              style={[styles.smallImage, smallImageStyle]}
            />
          </Animated.View>

          <View style={styles.detailsContainer}>
            <View style={styles.typeContainer}>
              <Text style={styles.typeText}>
                {pokemon?.types[0]?.type?.name}
              </Text>
            </View>
            <View style={styles.heightWeightContainer}>
              <Text style={styles.text}>Weight: {pokemon?.weight}</Text>
              <Text style={styles.text}>Height: {pokemon?.height}</Text>
            </View>
            <PokeStats stats={pokemon?.stats} />
          </View>
        </Animated.ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(16),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: moderateScale(10),
  },
  backBtn: {
    padding: moderateScale(16),
    position: "absolute",
    top: 0,
    zIndex: 20,
  },
  headerTitle: {
    fontFamily: FONT.solid,
    fontSize: textScale(20),
    color: COLORS.secondary,
    textTransform: "capitalize",
    letterSpacing: 4,
  },
  smallImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  imageContainer: {
    width: width,
    height: IMAGE_HEIGHT,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    minHeight: height - HEADER_HEIGHT / 2,
  },
  typeContainer: {
    alignItems: "flex-start",
    marginTop: moderateScaleVertical(10),
  },
  typeText: {
    backgroundColor: COLORS.secondary,
    paddingVertical: moderateScaleVertical(4),
    paddingHorizontal: moderateScale(16),
    marginHorizontal: moderateScale(16),
    borderRadius: SIZE.xl,
    fontFamily: FONT.mono,
    fontSize: textScale(16),
    color: COLORS.background,
    textTransform: "capitalize",
    textAlign: "center",
  },
  heightWeightContainer: {
    padding: moderateScale(16),
    borderRadius: SIZE.base,
  },
  text: {
    fontFamily: FONT.mono,
    fontSize: textScale(20),
    color: COLORS.secondary,
  },
});
