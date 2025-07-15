import { useEffect, useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import ResultsList from "./resultsList/ResultsList";
import { getTab } from "../utlis/chrome";
import { warmServer } from "../utlis/apiService";
import useGetTracklist from "../hooks/useGetTracklist";

export default function Popup() {
  const [serverWarm, setServerWarm] = useState<boolean>(true);
  const [results, setResults] = useState<any>(""); //todo: fix type
  const [loading, setLoading] = useState<boolean>(false);

  // Warm up the server
  useEffect(() => {
    setServerWarm(false);
    const warm = async () => {
      const res = await warmServer();
      if (res) {
        setServerWarm(true);
      }
    };
    warm();
  }, []);

  // Get the tracklist
  const init = async (): Promise<void> => {
    const currentTab = await getTab();

    if (!currentTab || !currentTab.title) {
      // throw new Error(ERROR_MESSAGES.NO_TAB_FOUND);
    }

    const tabData = currentTab["title"].toLowerCase();
    const { results, loading } = useGetTracklist(tabData);
    setResults(results);
    setLoading(loading);
  };


  return (
    <div
      style={{
        width: "300px",
        height: "500px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "monospace",
      }}
    >
      {serverWarm ? (
        <Dashboard init={init} loading={loading} />
      ) : (
        <div>
          <p style={{ color: "white" }}>warming up server...</p>
        </div>
      )}

      {results.length > 0 ? (
        <ResultsList results={results} />
      ) : (
        <p style={{ color: "white" }}>no results</p>
      )}
    </div>
  );
}
