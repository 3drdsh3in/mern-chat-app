import React, { useState } from 'react';

import './Message.scss';

function Message({ senderName, msgString, isSender, marginBottom, messageSpan }) {

  console.log(senderName);

  return (
    isSender
      ?
      // Sender:
      (
        marginBottom
          ?
          <div className="message sender margin-bottom">
            <p>{msgString}</p>
          </div>
          :
          <div className="message sender">
            <p>{msgString}</p>
          </div>
      )
      :
      (// Others User Messages:
        marginBottom
          ?
          <>
            <span className="message-span">{senderName}</span>
            <div className="message reciever margin-bottom">
              <p>{msgString}</p>
            </div>
          </>
          :
          <>
            <span className="message-span">{senderName}</span>
            <div className="message reciever">
              <p>{msgString}</p>
            </div>
          </>
      )
  )
}

export default Message;