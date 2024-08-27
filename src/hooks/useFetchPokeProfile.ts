import { API } from "@/api";
import { useEffect, useState } from "react";

export default function useFetchPokeProfile(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
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
        const response = await API.get(`${splitIdFromUrl}`);
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
