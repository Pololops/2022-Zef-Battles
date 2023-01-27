import { useContext, useEffect } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';

import './Message.scss'

export default function Message() {
  const { message, setMessage } = useContext(MessageContext)

  return (
    <div className="message">{message}</div>
  );
}
