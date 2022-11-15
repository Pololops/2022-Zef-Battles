import PropTypes from 'prop-types';

import './Button.scss';

export default function Button({ type, label, onClick }) {
	return (
		<button className={`${type ? `button button--${type}` : 'button'}`} onClick={onClick}>
			{label}
		</button>
	);
}

Button.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

