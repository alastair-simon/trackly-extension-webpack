import { useEffect } from "react";

export default function ResultsList({ results }: any) {
  useEffect(() => {
    if (results) console.log(results.results);
  }, [results]);

  return (
    <div
      style={{
        overflow: "auto",
        height: "400px",
        width: "100%",
        background: "#ebebeb",
        borderRadius: "20px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <p>
        <b>{results.query}</b>
      </p>
      {results ? (
        <ul style={{ listStyle: "none", margin: "0", padding: "0" }}>
          {results.results.map((track: any) => (
            <li
              style={{
                marginBottom: "10px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
              key={track.id}
            >
              <a href={track.link} target="_blank">
                <img src={track.thumbnail} />
              </a>
              <p>
                {track.artist}
                <br />
                {track.track}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        "no tracks found"
      )}
    </div>
  );
}
