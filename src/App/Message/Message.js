import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './Message.scss';

function Message({ senderName, msgString, isSender, marginBottom, messageSpan, senderId }) {

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
            <span className="message-span">
              <Link to={
                {
                  pathname: `/profile/${senderId}`,
                  key: uuidv4(), // we could use Math.random, but that's not guaranteed unique.
                  state: {
                    applied: true
                  }
                }
              }>
                {senderName}
              </Link>
            </span>
            <div className="message reciever margin-bottom">
              <p>{msgString}</p>
            </div>
          </>
          :
          <>
            <span className="message-span">
              <Link to={`/profile/${senderId}`}>
                {senderName}
              </Link>
            </span>
            <div className="message reciever">
              <p>{msgString}</p>
            </div>
          </>
      )
  )
}

export default Message;