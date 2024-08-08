import { API } from "@/api";

export default async function useFetchRandomPokemon() {
  try {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const response = await API.get(`/${randomId}`);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Pokemon: ", error);
    throw error;
  }
}
