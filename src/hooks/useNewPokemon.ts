import { useCallback } from "react";
import { useDispatch } from "react-redux";
import useFetchRandomPokemon from "./useFetchRandomPokemon";
import { setOptions, setPokemon } from "@/store/gameSlice";

const useNewPokemon = () => {
  const dispatch = useDispatch();

  const fetchAndSetPokemon = useCallback(async () => {
    try {
      const randomPokemon = await useFetchRandomPokemon();
      dispatch(
        setPokemon({
          name: randomPokemon?.name,
          imgUri:
            randomPokemon?.sprites?.other?.["official-artwork"]?.front_default,
        })
      );
      dispatch(setOptions(randomPokemon));
    } catch (error) {
      console.error("Failed to fetch pokemon:", error);
    }
  }, [dispatch]);

  return fetchAndSetPokemon;
};

export default useNewPokemon;
