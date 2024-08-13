import { GameState, Pokemon } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import pokemonList from "@/constants/pokemon.json";

const initialState: GameState = {
  currentPokemon: undefined,
  options: [],
  points: 100,
  lifeCount: 3,
  skipCount: 0,
  isLoading: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
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
    gainPoints: (state, action: PayloadAction<number>) => {
      state.points += action.payload;

      // Check if points are a multiple of 100 to gain a life
      if (state.points > 100 && state.points % 100 === 0) {
        state.lifeCount += 1;
      }
    },
    losePoints: (state, action: PayloadAction<number>) => {
      state.points -= action.payload;
      state.lifeCount -= 1;
      // if (state.lifeCount < 1) {
      //   state.currentPokemon = undefined;
      //   state.options = [];
      //   state.points = 100;
      //   state.lifeCount = 3;
      //   state.skipCount = 0;
      // }
    },
    resetGame: (state) => {
      state.currentPokemon = undefined;
      state.options = [];
      state.points = 100;
      state.lifeCount = 3;
      state.skipCount = 0;
    },
    removeLastPokemon: (state) => {
      state.currentPokemon = undefined;
      state.options = [];
    },
    skippedCurrentPokemon: (state, action: PayloadAction<number>) => {
      state.skipCount += 1;
      state.points -= action.payload;
      state.currentPokemon = undefined;
      state.options = [];
      if (state.skipCount === 2) {
        state.points -= action.payload;
        state.lifeCount -= 1;
        state.skipCount = 0;
      }

      // if (state.lifeCount < 1) {
      //   state.currentPokemon = undefined;
      //   state.options = [];
      //   state.points = 100;
      //   state.lifeCount = 3;
      //   state.skipCount = 0;
      // }
    },
  },
});

export const {
  gainPoints,
  losePoints,
  resetGame,
  setOptions,
  setPokemon,
  removeLastPokemon,
  skippedCurrentPokemon,
  setIsLoading,
} = gameSlice.actions;

export default gameSlice.reducer;
