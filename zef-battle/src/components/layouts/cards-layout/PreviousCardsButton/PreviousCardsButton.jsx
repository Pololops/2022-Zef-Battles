import { Link } from 'react-router-dom';

export default function PreviousCardsButton() {
	return (
		<Link to="/families" className="card card--previous">
			<div className="card__inner">
				<div className="card__inner__face card__inner__face--back">
					<span>◁</span>
				</div>
			</div>
		</Link>
	);
}
