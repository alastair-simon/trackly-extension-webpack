interface DashboardProps {
  fetchTracklist: () => Promise<void>;
  loading: boolean;
}

export default function Dashboard({ fetchTracklist, loading }: DashboardProps) {
  return (
    <div className="trackly-dashboard__container">
        <h1>Trackly</h1>
        <button onClick={fetchTracklist}>Find tracklist</button>
        <p>{loading && "loading..."}</p>
    </div>
  );
}
