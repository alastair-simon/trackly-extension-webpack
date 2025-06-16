interface DashboardProps {
  init: () => Promise<void>;
  loading: boolean;
}

export default function Dashboard({ init, loading }: DashboardProps) {
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
        }}
      >
        <h1>Trackly</h1>
        <button onClick={init}>Find tracklist</button>
        <p>{loading && "loading..."}</p>
      </div>
    </div>
  );
}
