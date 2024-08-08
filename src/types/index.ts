export type Pokemon = {
  name: string;
  imgUri?: string;
};

export type GameState = {
  currentPokemon: Pokemon | null;
  options: Pokemon[];
  points: number;
};
