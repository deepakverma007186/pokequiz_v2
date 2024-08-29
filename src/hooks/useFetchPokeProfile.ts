import { API } from "@/api";
import { PokeCardProps } from "@/types";
import { useEffect, useState } from "react";

export default function useFetchPokeProfile(url: string) {
  const [data, setData] = useState<PokeCardProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const splitIdFromUrl = url.split("/").at(-2);
        console.log("🚀 ~ fetchProfile ~ splitIdFromUrl:", splitIdFromUrl);
        const response = await API.get<PokeCardProps>(`${splitIdFromUrl}`);
        setData(response?.data);
      } catch (error) {
        console.log("Error fetching Pokemon: ", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [url]);

  return { data, loading, error };
}
