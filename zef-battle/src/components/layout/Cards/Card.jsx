export default function Card({title, imageUrl}) {
  return (
		<div className="card">
			<div className="card__title">{title}</div>
			<img className="card__image" src={imageUrl} alt={`illustration de la famille ${title}`} />
		</div>
	);
}
