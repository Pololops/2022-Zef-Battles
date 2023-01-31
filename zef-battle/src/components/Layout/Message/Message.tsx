import { useMessageContext } from '../../../contexts/MessageContext';

import './Message.scss'

export default function Message() {
  const { messageContent } = useMessageContext()

  return (
    <div className="message">{messageContent}</div>
  );
}
