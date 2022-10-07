import PropTypes from 'prop-types';

import './Button.scss';

export default function Button({ type, label, onClick }) {
	return (
		<button className={`button button--${type}`} type={type} onClick={onClick}>
			{label}
		</button>
	);
}

Button.propTypes = {
	type: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

