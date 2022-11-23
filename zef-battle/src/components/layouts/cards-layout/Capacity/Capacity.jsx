import PropTypes from 'prop-types';

import './Capacity.scss';
import Button from '../../form-layout/Button/Button';

export default function Capacity({
	name,
	level,
	description,
	onClickDeleteButton,
}) {
	const bgColorLevel = () => {
		if (level > 66) {
			return '#8bcf69';
		} else if (level > 33) {
			return '#cfa369';
		} else {
			return '#cf6969';
		}
	};

	return (
		<div className="capacity">
			<div className="capacity__contain">
				<span className="capacity__contain__label">{name}</span>
				<div className="capacity__contain__meter">
					<div
						className="capacity__contain__meter__level"
						style={{ width: `${level}%`, backgroundColor: bgColorLevel() }}
					></div>
				</div>
			</div>
			<Button
				className="capacity__delete"
				type="reset"
				label="+"
				onClick={onClickDeleteButton}
			/>
			{description && (
				<div className="capacity__description">${description}</div>
			)}
		</div>
	);
}

Capacity.propTypes = {
	name: PropTypes.string.isRequired,
	level: PropTypes.number.isRequired,
	description: PropTypes.string,
	onClickDeleteButton: PropTypes.func.isRequired,
};
