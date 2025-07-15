import { useState } from "react";
import ResultsItem from "./ResultsItem";

export default function ResultsList({ results }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="trackly-results-list__container" style={{ height: isOpen ? "150px" : "10px" }}>
      <div className="trackly-results-list__header">
        <p className="trackly-results-list__arrow">^</p>
        <button className="trackly-results-list__query" onClick={()=> setIsOpen(isOpen)}>{results.query}</button>
      </div>
      <div className="trackly-results-list__results">
        {results ? (
          <ul>
            {results.results.map((track: any) => (
              <ResultsItem key={track.id} track={track} />
            ))}
          </ul>
        ) : (
          "no tracks found"
        )}
      </div>
    </div>
  );
}
