import { COLORS } from "@/constants/Colors";
import { FONT, SIZE, STYLES } from "@/constants/CommonStyles";
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from "@/constants/Responsive";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ChoosePoints from "./chooseoptions";
import PokemonPic from "./pokemonpic";

export default function GameScreen() {
  return (
    <View
      style={{
        ...styles.container,
        marginTop: -(StatusBar.currentHeight ?? 0),
      }}
    >
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>You scored</Text>
          <Text style={styles.pointsText}>120</Text>
        </View>
        <View style={STYLES.justify}>
          <Pressable style={styles.headerBtn}>
            <Text
              style={{
                fontFamily: FONT.mono,
                fontSize: textScale(18),
                color: COLORS.white,
              }}
            >
              Skip
            </Text>
            <MaterialIcons
              name="skip-next"
              size={SIZE.xl}
              color={COLORS.white}
            />
          </Pressable>
          <Pressable
            style={{
              ...styles.headerBtn,
              backgroundColor: `${COLORS.danger}40`,
            }}
          >
            <MaterialIcons
              name="exit-to-app"
              size={SIZE.xl}
              color={COLORS.danger}
            />
          </Pressable>
        </View>
      </View>
      <ScrollView
        // style={{ flexGrow: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: SIZE.xl }}
        showsVerticalScrollIndicator={false}
      >
        <PokemonPic />
        <ChoosePoints />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontFamily: FONT.mono,
    fontSize: textScale(20),
    color: COLORS.white,
  },
  pointsText: {
    fontFamily: FONT.solid,
    fontSize: textScale(30),
    color: COLORS.secondary,
    letterSpacing: SIZE.xs,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(40),
    paddingBottom: moderateScaleVertical(10),
  },
  headerBtn: {
    ...STYLES.flexRow,
    backgroundColor: `${COLORS.text}30`,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScaleVertical(8),
    borderRadius: SIZE.lg,
    borderCurve: "continuous",
  },
});
