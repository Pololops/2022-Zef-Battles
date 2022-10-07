import PropTypes from 'prop-types';

export default function Button({ type, value }) {
  return (
    <button className="button" type={type} value={value}>{value}</button>
  );
}

Button.propTypes = {
	type: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

