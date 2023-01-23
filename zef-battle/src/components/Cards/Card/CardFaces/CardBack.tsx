import { Link } from 'react-router-dom';

import defaultImage from './../../../../assets/images/card-default-image.png';

interface Props {
	id: number
	title: string
	imageUrl?: string
	isFamilyCard?: boolean,
}

export default function CardBackFace({ id, title, imageUrl, isFamilyCard = false }: Props) {
	return (
		<div
			className="card__inner__face card__inner__face--back"
			style={{
				backgroundImage: `url("${
					imageUrl && imageUrl !== ('' || '/')
						? process.env.REACT_APP_API_BASE_URL + '/' + imageUrl
						: !isFamilyCard && defaultImage
				}")`,
			}}
		>
			{!isFamilyCard ? (
				<span className="card__inner__face__title">{title}</span>
			) : (
				<Link to={`/families/${id}`}>
					<span className="card__inner__face__title">{title}</span>
				</Link>
			)}
		</div>
	);
}
