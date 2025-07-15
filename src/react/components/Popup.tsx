import { useEffect, useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import ResultsList from "./resultsList/ResultsList";
import { getTab } from "../utlis/chrome";
import { fetchTracklist, warmServer } from "../utlis/apiService";
import { removeDuplicateWords } from "../utlis/removeDuplicateWords";
export default function Popup() {
  const [serverWarm, setServerWarm] = useState<boolean>(true);
  const [results, setResults] = useState<string>("");
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

  const init = async (): Promise<void> => {
    const tab = await getTab();
    const mixTitle = tab["title"].toLowerCase();
    setLoading(true);

    if (mixTitle.includes("soundcloud")) {
      // If its a soundcloud mix split the title by | and take the first part
      const querySplit = mixTitle.split(" | ")[0].slice(7);

      // Remove duplicate words
      const query = removeDuplicateWords(querySplit);

      //Fetch the api data
      const { data, loading } = await fetchTracklist(query);

      setResults(data);
      setLoading(loading);
    } else if (mixTitle.includes("youtube")) {
      // If its a youtube mix split the title by - and take the first part
      const querySplit = mixTitle.split(" - ")[0];

      // Remove duplicate words
      const query = removeDuplicateWords(querySplit);

      //Fetch the api data
      const { data, loading } = await fetchTracklist(query);
      setResults(data);
      setLoading(loading);
    } else {
      setResults("wrong platform");
    }
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
