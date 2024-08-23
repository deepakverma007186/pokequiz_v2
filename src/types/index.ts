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
