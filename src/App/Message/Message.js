import React, {useState} from 'react';

import './Message.scss';

function Message({msgString, isSender}) {
  return(
    isSender
    ?
    <div className="message sender">
      <p>{msgString}</p>
    </div>
    :
    <div className="message reciever">
      <p>{msgString}</p>
    </div>
  )
}

export default Message;