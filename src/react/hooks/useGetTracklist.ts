import { useState, useEffect } from "react";
import { fetchTracklist } from "../utlis/apiService";
import { extractQuery } from "../utlis/extractQuery";

// Define proper types
interface TracklistResult {
  query?: string;
  results?: Array<{
    id: string;
    link: string;
    thumbnail: string;
    artist: string;
    track: string;
  }>;
}

interface UseGetTracklistReturn {
  results: TracklistResult | string;
  loading: boolean;
  error: string | null;
}

const ERROR_MESSAGES = {
  INVALID_PLATFORM: "Unsupported platform. Please use SoundCloud or YouTube.",
  NO_TAB_FOUND: "No active tab found.",
  INVALID_TITLE: "Invalid or empty title.",
  API_ERROR: "Failed to fetch tracklist data.",
  NETWORK_ERROR: "Network error occurred.",
} as const;

export default function useGetTracklist(tab: string): UseGetTracklistReturn {
  const [results, setResults] = useState<TracklistResult | string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        setError(null);
        setLoading(true);
        setResults("");

        const query = extractQuery(tab);

        if (!query) {
          throw new Error(ERROR_MESSAGES.INVALID_TITLE);
        }

        // Fetch the API data
        const { data, loading: apiLoading } = await fetchTracklist(query);

        if (apiLoading) {
          throw new Error(ERROR_MESSAGES.API_ERROR);
        }

        // Validate API response
        if (!data || (Array.isArray(data) && data.length === 0)) {
          setResults("No tracks found for this query.");
        } else {
          setResults(data);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
        setError(errorMessage);
        setResults(errorMessage);
        console.error("useGetTracklist error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [tab]);

  return { results, loading, error };
}
