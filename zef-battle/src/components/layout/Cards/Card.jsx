import { useState } from 'react';
import defaultImage from '../../../assets/images/card-default-image.png';

export default function Card({ title, imageUrl, isCharacter }) {
	const [isFlipped, setIsFlipped] = useState(false);

	const clickHandler = (event) => {
		event.preventDefault();
		if (isCharacter) setIsFlipped((previousSate) => !previousSate);
	};

	return (
		<div className="card">
			<div
				className={'card__inner' + (isFlipped ? ' is-flipped' : '')}
				onClick={clickHandler}
			>
				<div
					className="card__inner__face card__inner__face--front"
					style={{
						backgroundImage: `url("${imageUrl && imageUrl !== ('' || '/') ? imageUrl : defaultImage}")`,
					}}
				>
					<div className="card__inner__face__title">{title}</div>
				</div>

				<div className="card__inner__face card__inner__face--back">
					<div className="card__inner__face__title">{title}</div>
					BACKFACE CARD
				</div>
			</div>
		</div>
	);
}
