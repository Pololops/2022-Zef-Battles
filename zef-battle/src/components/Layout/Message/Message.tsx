import { useContext } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';

import './Message.scss'

export default function Message() {
  const { messageContent } = useContext(MessageContext)

  return (
    <div className="message">{messageContent}</div>
  );
}
