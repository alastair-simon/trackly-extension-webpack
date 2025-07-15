import { useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import ResultsList from "./resultsList/ResultsList";
import { getTab } from "../utlis/chrome";
import useGetTracklist from "../hooks/useGetTracklist";
import { ERROR_MESSAGES, TracklistResult } from "../types";

export default function Popup() {
  const [tracklistData, setTracklistData] = useState<TracklistResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTracklistFromTab = async (): Promise<void> => {
    // Get the current tab data from chrome
    const currentTab = await getTab();

    if (!currentTab || !currentTab.title) {
      throw new Error(ERROR_MESSAGES.NO_TAB_FOUND);
    }

    const tabTitle = currentTab["title"].toLowerCase();
    // Get the tracklist
    const { results, loading } = useGetTracklist(tabTitle);

    setTracklistData(results);
    setIsLoading(loading);
  };

  return (
    <div className="trackly-popup__container">
      <Dashboard fetchTracklist={fetchTracklistFromTab} loading={isLoading} />
      <ResultsList results={tracklistData} />
    </div>
  );
}
