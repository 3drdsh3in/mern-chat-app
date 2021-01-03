import React, {useState} from 'react';

import './ChatHeader.scss';

function ChatHeader({chatName, chatType}) {

  return (
    <>
      <div className="chat-header">
          <h5>{chatName}</h5>
          {
          chatType == 'FRIENDS' 
          ?
          <button>Friends <i className="fas fa-check"></i></button>
          :
          (chatType == 'GROUP' 
          ?
          <button>In Group <i className="fas fa-check"></i></button>
          :
          null)
          }
      </div>
    </>
  )
}

export default ChatHeader;