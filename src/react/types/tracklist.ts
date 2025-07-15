export interface TracklistResult {
  /**
   * The query used to search for the tracklist
   */
  query?: string;
  /**
   * The results of the tracklist search
   */
  results?: Array<{
    /**
     * The ID of the track
     */
    id: string;
    /**
     * The artist of the track
     */
    artist: string;
    /**
     * The title of the track
     */
    track: string;
    /**
     * The link to the youtube video
     */
    link: string;
    /**
     * The thumbnail url of the track
     */
    thumbnail: string;
  }>;
}
