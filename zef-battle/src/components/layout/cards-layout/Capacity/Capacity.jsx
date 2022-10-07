import PropTypes from 'prop-types';

import './Capacity.scss';

export default function Capacity({ name, level, desc }) {
  const bgColorLevel = () => {
    if (level > 66) {
      return '#8bcf69';
    } else if (level > 33) {
      return '#cfa369';
    } else {
      return '#cf6969';
    }
  }

	return (
		<div className="capacity">
			<span className="capacity__label">{name}</span>
			<div className="capacity__meter">
				<div
					className="capacity__meter__level"
					style={{ width: `${level}%`, backgroundColor: bgColorLevel() }}
				></div>
			</div>
			<div className="capacity__description">{desc}</div>
		</div>
	);
}

Capacity.propTypes = {
	name: PropTypes.string.isRequired,
	level: PropTypes.number.isRequired,
	desc: PropTypes.string.isRequired,
};
