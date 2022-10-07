import PropTypes from 'prop-types';

export default function Button({ type, value, onClick }) {
	return (
		<button className="button" type={type} value={value} onClick={onClick}>
			{value}
		</button>
	);
}

Button.propTypes = {
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

