export type Pokemon = {
  name: string;
  imgUri?: string;
};

export type GameState = {
  currentPokemon?: Pokemon;
  options?: Pokemon[];
  points: number;
};
