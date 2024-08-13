import { SIZE } from "@/constants/CommonStyles";
import { width } from "@/constants/Responsive";
import React, { memo } from "react";
import { Image, StyleSheet, View } from "react-native";

type props = {
  imgUri: string | undefined;
};

const PokemonPic = ({ imgUri }: props) => {
  return (
    <View style={styles.container}>
      {imgUri && <Image source={{ uri: imgUri }} style={styles.img} />}
    </View>
  );
};

export default memo(PokemonPic);

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: SIZE.xl,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
