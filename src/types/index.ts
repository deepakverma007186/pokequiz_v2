export type Pokemon = {
  name: string;
  imgUri?: string;
};

export type GameState = {
  currentPokemon?: Pokemon;
  options?: Pokemon[];
  points: number;
  lifeCount: number;
  skipCount: number;
  isLoading: boolean;
  highScore: number;
};

export type PokeObject = {
  id: string;
  name: string;
  url: string;
};

export interface StatsProps {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}

export interface PokeCardProps {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  stats: StatsProps[];
}
