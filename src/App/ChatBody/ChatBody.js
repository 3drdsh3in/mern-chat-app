import React from 'react';

import './ChatBody.scss';

// Containers:
import Message from '../Message/MessageContainer';

class ChatBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInput: ''
    }
    this.submitMessageInput = this.submitMessageInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  submitMessageInput() {
    console.log(this.state.messageInput);
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.submitMessageInput();
    }
  }

  render() {
    // console.log(this.props.AccountDetails.acc_data._id);
    // console.log(this.props.viewedGrp);
    let clientId = this.props.AccountDetails.acc_data._id;
    let displayMessages = this.props.viewedGrp.g_messages;
    return (
      <div className="chatbody">
        <div className="chatbody-messages">
          {
            displayMessages.map((msg) => (
              <Message senderName={msg._id.acc_usrname} msgString={msg.msg_string} isSender={clientId == msg._id._id} />
            ))
          }
          {/* <Message senderName={''} msgString="Yes" isSender={false} />
          <Message senderName={''} msgString="Yes" isSender={true} /> */}
        </div>
        <div className="chatbody-form">
          <hr />
          <div className="chatbody-form-textbox">
            <input onKeyPress={this.handleKeyPress} onChange={(e) => { this.setState({ messageInput: e.target.value }) }} type="text" placeholder="Say something..." />
            <button onClick={this.submitMessageInput}>
              <i className="fas fa-caret-right fa-3x"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatBody;