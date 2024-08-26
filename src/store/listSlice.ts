import pokemonList from "@/constants/pokemon.json";
import { PokeObject } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokeObjectListProp {
  list: PokeObject[];
  isRefreshed: boolean;
}

const initialState: PokeObjectListProp = {
  list: [],
  isRefreshed: false,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setIsRefreshed: (state, action: PayloadAction<boolean>) => {
      state.isRefreshed = action.payload;
    },
  },
});

export const { setIsRefreshed } = listSlice.actions;

export default listSlice.reducer;
