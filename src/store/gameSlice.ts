import { GameState, Pokemon } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import pokemonList from "@/constants/pokemon.json";

const initialState: GameState = {
  currentPokemon: undefined,
  options: [],
  points: 330,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPokemon: (state, action: PayloadAction<Pokemon | undefined>) => {
      state.currentPokemon = action.payload;
    },
    setOptions: (state, action: PayloadAction<Pokemon>) => {
      state.options = [action.payload];
      while (state.options.length < 4) {
        const randomPokemon =
          pokemonList[Math.floor(Math.random() * pokemonList.length)];
        if (
          !state.options.find(
            (pokemon) => pokemon?.name === randomPokemon?.name
          )
        ) {
          state.options.push(randomPokemon);
        }
      }
      state.options = state.options.sort(() => Math.random() - 0.5);
    },
    increasePoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;
    },
    decreasePoints: (state, action: PayloadAction<number>) => {
      state.points -= action.payload;
    },
    resetPoints: (state) => {
      state.points = 0;
    },
    removeLastPokemon: (state) => {
      state.currentPokemon = undefined;
      state.options = [];
    },
  },
});

export const {
  decreasePoints,
  increasePoints,
  resetPoints,
  setOptions,
  setPokemon,
  removeLastPokemon,
} = gameSlice.actions;

export default gameSlice.reducer;
