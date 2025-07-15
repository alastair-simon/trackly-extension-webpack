import { TracklistResult } from "./tracklist";

export interface UseGetTracklistReturn {
    /**
     * The results of the tracklist search
     */
    results: TracklistResult | string;
    /**
     * Whether the tracklist is loading
     */
    loading: boolean;
    /**
     * The error message if an error occurs
     */
}