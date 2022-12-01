import PropTypes from 'prop-types';

import './Button.scss';

export default function Button({ className, type, label, onClick }) {
	return (
		<div
			className={`${type ? `button button--${type}` : 'button'} ${className}`}
			onClick={onClick}
		>
			{label}
		</div>
	);
}

Button.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};

Button.defaultProps = {
	className: '',
};
