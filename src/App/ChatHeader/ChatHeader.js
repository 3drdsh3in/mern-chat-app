import React, {useState} from 'react';

import './ChatHeader.scss';

function ChatHeader({chatName, chatType}) {

  return (
    <>
      <div className="chat-header">
          <h5>{chatName}</h5>
          {
          chatType == 'F' 
          ?
          <button>Friends <i class="fas fa-check"></i></button>
          :
          (chatType == 'G' 
          ?
          <button>In Group <i class="fas fa-check"></i></button>
          :
          null)
          }
      </div>
    </>
  )
}

export default ChatHeader;