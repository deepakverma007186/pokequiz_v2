import allPokemons from "@/constants/pokemon.json";
import { PokeObject } from "@/types";
import { useEffect, useState } from "react";

const useTodaysFifty = () => {
  const [todaysFifty, setTodaysFifty] = useState<PokeObject[]>([]);
  useEffect(() => {
    const pickRandomFifty = () => {
      const shuffled = [...allPokemons].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 50);
    };

    setTodaysFifty(pickRandomFifty());
  }, []);
  return todaysFifty;
};

export default useTodaysFifty;
