import { StyleSheet } from "react-native";

export const SIZE = {
  xs: 4,
  sm: 8,
  base: 12,
  lg: 16,
  xl: 20,
};

export const FONT = {
  solid: "pokeSolid",
  outline: "pokeHollow",
  mono: "spaceMono",
};

export const STYLES = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SIZE.sm,
  },
  justify: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SIZE.sm,
  },
});
