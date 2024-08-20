import { IMG } from "@/assets/images";
import BottomSection from "@/components/home/BottomSection";
import { START, SURPRISE_ME } from "@/utils";
import { COLORS } from "@/utils/Colors";
import { FONT, SIZE, STYLES } from "@/utils/CommonStyles";
import {
  height,
  moderateScaleVertical,
  textScale,
  width,
} from "@/utils/Responsive";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Href, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  DeviceEventEmitter,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import QuickActions, { ShortcutItem } from "react-native-quick-actions";

type Props = {};

export default function Home(props: Props) {
  const router = useRouter();

  useEffect(() => {
    const processActions = (action: ShortcutItem) => {
      console.log("action called", action);
      const navigateTo = action.userInfo.url as string;
      router.push(navigateTo as Href);
      // router.replace("/");
    };
    QuickActions.setShortcutItems([
      {
        type: START,
        title: "Start new game",
        subtitle: "Let's score more and beat the high score.",
        icon: START,
        userInfo: {
          url: "/game",
        },
      },
      {
        type: SURPRISE_ME,
        title: "Surprise Pokemon",
        subtitle: "Welcome to the world of pokemon.",
        icon: SURPRISE_ME,
        userInfo: {
          url: "/profile",
        },
      },
    ]);

    // app is in exit mode
    QuickActions.popInitialAction()
      .then(processActions)
      .catch((error) => {
        console.log("Quick Action Error", error);
      });

    // app running in background
    const quickActionShortcut = DeviceEventEmitter.addListener(
      "quickActionShortcut",
      processActions
    );

    return () => {
      QuickActions.clearShortcutItems();
      // DeviceEventEmitter.removeAllListeners();
      quickActionShortcut.remove();
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
      <Pressable
        style={styles.startBtnContainer}
        onPress={() => router.replace("/game")}
      >
        <AntDesign name="playcircleo" size={100} color={COLORS.secondary} />
        <Text style={{ ...styles.text, color: COLORS.secondary }}>
          Let's Start
        </Text>
      </Pressable>
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
    fontFamily: FONT.solid,
    fontSize: textScale(SIZE.xl * 2),
    color: COLORS.secondary,
    letterSpacing: 2,
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
