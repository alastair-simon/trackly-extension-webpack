export default function ResultsItem({ track }: any) {
  return (
    <li key={track.id} className="trackly-results-list__item">
      <a href={track.link} target="_blank" className="trackly-results-list__item-link">
        <img src={track.thumbnail} className="trackly-results-list__item-thumbnail" />
      </a>
      <div className="trackly-results-list__item-info">
        <p>{track.artist}</p>
        <p>{track.track}</p>
      </div>
    </li>
  );
}
