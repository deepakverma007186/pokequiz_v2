import useFetchRandomPokemon from "@/hooks/useFetchRandomPokemon";
import { setIsLoading, setOptions, setPokemon } from "@/store/gameSlice";
import { Slot } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function GameLayout() {
  const dispatch = useDispatch();

  // useCallback to memoize the fetchPokemon function
  const fetchPokemon = useCallback(async () => {
    console.log("fetchPokemon function called");
    try {
      dispatch(setIsLoading(true));
      const randomPokemon = await useFetchRandomPokemon();
      if (randomPokemon) {
        dispatch(
          setPokemon({
            name: randomPokemon.name,
            imgUri:
              randomPokemon.sprites?.other?.["official-artwork"]?.front_default,
          })
        );
        dispatch(setOptions(randomPokemon));
        dispatch(setIsLoading(false));
      }
    } catch (error) {
      console.error("Failed to fetch pokemon:", error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  // Render the Slot component
  return <Slot />;
}
