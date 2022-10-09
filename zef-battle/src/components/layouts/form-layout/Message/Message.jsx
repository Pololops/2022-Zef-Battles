import PropTypes from 'prop-types';

export default function Message({ message }) {
  return (
    <div className="message">{message}</div>
  );
}

Message.propTypes = {
  prop: PropTypes.string.isRequired,
};
