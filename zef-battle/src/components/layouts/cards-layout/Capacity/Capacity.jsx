import PropTypes from 'prop-types';

import './Capacity.scss';

export default function Capacity({ name, level, desc, onClickDeleteButton }) {
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
			<button className="capacity__delete" onClick={onClickDeleteButton}>
				x
			</button>
			<div className="capacity__description">{desc}</div>
		</div>
	);
}

Capacity.propTypes = {
	name: PropTypes.string.isRequired,
	level: PropTypes.number.isRequired,
	desc: PropTypes.string.isRequired,
	onClickDeleteButton: PropTypes.func.isRequired,
};
