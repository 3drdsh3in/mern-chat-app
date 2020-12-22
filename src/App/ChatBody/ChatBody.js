import React from 'react';

import './ChatBody.scss';

// Containers:
import Message from '../Message/MessageContainer';

import io from 'socket.io-client';

class ChatBody extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const socket = io();
    socket.emit('data_sent', {
      'data': 'data'
    })
  }

  render() {
    return (
      <div className="chatbody">
      <div className="chatbody-messages">
        <Message msgString="Yes" isSender={false} />
        <Message msgString="Yes" isSender={true} />
      </div>
      <div className="chatbody-form">
        <hr />
        <div className="chatbody-form-textbox">
          <input type="text" />
          <button>
          <i class="fas fa-caret-right fa-3x"></i>
          </button>
        </div>
      </div>
      </div>
    )
  }
}

export default ChatBody;