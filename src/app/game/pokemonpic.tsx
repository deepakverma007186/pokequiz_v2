import { SIZE } from "@/constants/CommonStyles";
import { width } from "@/constants/Responsive";
import { Image, View } from "react-native";

export default function PokemonPic() {
  const demoPicUri =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png";
  return (
    <View
      style={{
        width: width * 0.9,
        aspectRatio: 1,
        alignSelf: "center",
        // backgroundColor: "skyblue",
        marginTop: SIZE.xl,
      }}
    >
      <Image
        source={{ uri: demoPicUri }}
        style={{
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
    </View>
  );
}
