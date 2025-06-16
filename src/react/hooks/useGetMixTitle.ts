import { useState, useEffect } from "react";
import { getTab } from "../utlis/chrome";

export function useGetMixTitle() {
  const [mixName, setMixName] = useState<string>(""); //TODO: return tracklist

  useEffect(() => {
    const init = async (): Promise<void> => {
      const tab = await getTab();
      const mixTitle = tab["title"].toLowerCase();
      console.log(mixTitle);

      if (mixTitle.includes("soundcloud")) {
        setMixName(tab["title"]); //TODO:  replace with fetch logic
        console.log("success");
      } else if (mixTitle.includes("youtube")) {
        setMixName(tab["title"]); //TODO: replace with fetch logic
        console.log("success");
      } else {
        setMixName("wrong platform");
        console.log("error");
      }
    };
    init();
  }, []);

  return { mixName, setMixName };
}
