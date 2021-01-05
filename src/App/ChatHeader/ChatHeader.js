import React, { useState } from 'react';

import './ChatHeader.scss';

function ChatHeader({ chatName, chatType, viewedGrp, leaveGroup, leaveGroupStore, acc_id }) {

  const handleLeaveGroup = () => {
    leaveGroupStore({
      g_id: viewedGrp._id,
    })
    leaveGroup({
      g_id: viewedGrp._id,
      acc_id: acc_id
    });
  }

  return (
    <>
      <div className="chat-header">
        <h5>{chatName}</h5>
        {
          // 'FRIENDS IS NOT IMPLEMENTED YET, SO FORGET ABOUT IT!'
          chatType == 'FRIENDS'
            ?
            <button>Friends <i className="fas fa-check"></i></button>
            :
            (chatType == 'GROUP'
              ?
              <button onClick={handleLeaveGroup}>In Group <i className="fas fa-check"></i></button>
              :
              null)
        }
      </div>
    </>
  )
}

export default ChatHeader;