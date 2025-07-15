import { useState, useEffect } from "react";
import { fetchTracklist } from "../utlis/tracklistApi";
import { extractQuery } from "../utlis/extractQuery";
import {
  TracklistResult,
  UseGetTracklistReturn,
  ERROR_MESSAGES,
} from "../types";

export default function useGetTracklist(tab: string): UseGetTracklistReturn {
  const [results, setResults] = useState<TracklistResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        setError(null);
        setLoading(true);
        setResults(null);

        // Extract the query from the tab
        const query = extractQuery(tab);

        if (!query) {
          throw new Error(ERROR_MESSAGES.INVALID_TITLE);
        }

        // Fetch the API data
        const { data, loading } = await fetchTracklist(query);

        if (loading) {
          throw new Error(ERROR_MESSAGES.API_ERROR);
        }

        // Check API response
        if (!data || (Array.isArray(data) && data.length === 0)) {
          setResults(null);
        } else {
          setResults(data);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
        setError(errorMessage);
        setResults(null);
        console.error("useGetTracklist error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [tab]);

  return { results, loading, error };
}
