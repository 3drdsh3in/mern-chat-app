import React, { useState } from 'react';

import './ChatItem.scss';

function ChatItem(props) {
  // Initial State: Most Recent Message On The Database Via an HTTP request.
  // Consequent Rerenders: New Dynamic Messages sent to this specific chat 
  // (Requires socket endpoints to emit the corresponding data from the client)
  const [chatName, setChatName] = useState(props.userId);
  const [chatMsg, setChatMsg] = useState(props.userMsg);
  const [isSelected, setSelectedState] = useState(props.isSelected);
  console.log(props);
  return (
    isSelected
      ?
      // Selected Render
      <div className="chatitem selected">
        <h6>{chatName}</h6>
        <p>{chatMsg}</p>
      </div>
      :
      // Not Selected Render
      <div className="chatitem">
        <h6>{chatName}</h6>
        <p>{chatMsg}</p>
      </div>
  )
}
export default ChatItem;