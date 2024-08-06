import { STYLES } from "@/constants/CommonStyles";
import { moderateScale } from "@/constants/Responsive";
import { Image, StyleSheet, Text, View } from "react-native";

export default function GameScreen() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text>You scored</Text>
          <Text>120</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Skip</Text>
          <Text>Quit</Text>
        </View>
      </View>
      <View>
        <Image />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
  },
});
