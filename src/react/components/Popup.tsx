import { useEffect, useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import ResultsList from "./resultsList/ResultsList";
import { getTab } from "../utlis/chrome";
import { fetchTracklist, warmServer } from "../utlis/apiService";

export default function Popup() {
  const [results, setResults] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Warm up the server
  useEffect(() => {
    const warm = async () => {
      await warmServer();
    };
    console.log("warming up server...");
    warm();
  }, []);


  const init = async (): Promise<void> => {
    const tab = await getTab();
    const mixTitle = tab["title"].toLowerCase();
    setLoading(true);
    // const mixTitle = "stream leon vynehall fact | soundcloud";

    if (mixTitle.includes("soundcloud")) {
      // If its a soundcloud mix split the title by | and take the first part
      const mixTitleShort = mixTitle.split(" | ")[0].slice(7).split(" by ")[0];
      console.log("original title: ", mixTitleShort);

      //Fetch the api data
      const { data, loading } = await fetchTracklist(mixTitleShort);
      setResults(data);
      setLoading(loading);
    } else if (mixTitle.includes("youtube")) {
      // If its a youtube mix split the title by - and take the first part
      const mixTitleShort = mixTitle.split(" - ")[0];
      console.log("original title: ", mixTitleShort);

      //Fetch the api data
      const { data, loading } = await fetchTracklist(mixTitleShort);
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
        background: "white",
        border: "1px solid rgb(220, 220, 220)",
        borderRadius: "20px",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "monospace"
      }}
    >
      <Dashboard init={init} loading={loading} />
      <ResultsList results={results} />
    </div>
  );
}
