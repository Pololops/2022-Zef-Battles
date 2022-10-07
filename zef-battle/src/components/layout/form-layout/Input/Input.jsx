import PropTypes from 'prop-types';
import useAutoFocus from '../../../../hooks/useAutoFocusRef';

export default function Input({
	type,
	name,
	value,
	placeholder,
	onChange,
	isFocus,
}) {
	const focus = useAutoFocus(isFocus);

	return (
		<input
			ref={focus}
			type={type}
			name={name}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

Input.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	isFocus: PropTypes.bool,
};

Input.defaultProps = {
	isFocus: false,
};
