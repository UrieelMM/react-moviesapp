import { useState, useEffect } from "react";

export default function useFetch(url, opciones) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await fetch(url, opciones);
        const json = await res.json();
        setLoading(false);
        setResult(json);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    data();
  }, [url, opciones]);

  return { loading, result, error };
}
