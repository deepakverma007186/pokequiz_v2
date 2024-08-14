import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const useGameState = () => {
  return useSelector((state: RootState) => state.gamePokemon);
};
