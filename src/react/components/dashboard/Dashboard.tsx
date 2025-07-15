interface DashboardProps {
  fetchTracklist: () => Promise<void>;
  loading: boolean;
}

export default function Dashboard({ fetchTracklist, loading }: DashboardProps) {
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          color: "white"
        }}
      >
        <h1>Trackly</h1>
        <button onClick={fetchTracklist}>Find tracklist</button>
        <p>{loading && "loading..."}</p>
      </div>
    </div>
  );
}
