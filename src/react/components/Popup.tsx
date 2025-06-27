import { useEffect, useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import ResultsList from "./resultsList/ResultsList";
import { getTab } from "../utlis/chrome";
import { fetchTracklist, warmServer } from "../utlis/apiService";

export default function Popup() {
  const [results, setResults] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [serverWarm, setServerWarm] = useState<boolean>(true);

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
    console.log("original title: ", mixTitle)
    setLoading(true);
    // const mixTitle = "stream leon vynehall fact | soundcloud";

    if (mixTitle.includes("soundcloud")) {
      // If its a soundcloud mix split the title by | and take the first part
      const mixTitleSplit = mixTitle.split(" | ")[0].slice(7);
      console.log("split title: ", mixTitleSplit);
      const mixTitleClean = mixTitleSplit.replace(/[^a-zA-Z0-9 ]/g, "");
      console.log("cleaned title: ", mixTitleClean);

      //Fetch the api data
      const { data, loading } = await fetchTracklist(mixTitleClean);
      setResults(data);
      setLoading(loading);
    } else if (mixTitle.includes("youtube")) {
      // If its a youtube mix split the title by - and take the first part
      const mixTitleSplit = mixTitle.split(" - ")[0];
      console.log("split title: ", mixTitleSplit);
      const mixTitleClean = mixTitleSplit.replace(/[^a-zA-Z0-9 ]/g, "");
      console.log("cleaned title: ", mixTitleClean);

      //Fetch the api data
      const { data, loading } = await fetchTracklist(mixTitleClean);
      setResults(data);
      setLoading(loading);
    } else {
      setResults("wrong platform");
      console.log("error");
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
          <p>warming up server...</p>
        </div>
      )}

      {results.length > 0 ? <ResultsList results={results} /> : "no results"}
    </div>
  );
}
