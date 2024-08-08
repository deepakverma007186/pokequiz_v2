import axios from "axios";

export const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const API = axios.create({
  baseURL: POKEMON_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
