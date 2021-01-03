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
    this.messagesEndRef = React.createRef();
    this.submitMessageInput = this.submitMessageInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom()
  }
  componentDidUpdate() {
    this.scrollToBottom()
  }

  submitMessageInput() {
    console.log(this.state.messageInput);
    //g_id and 
    this.props.sendNewMessage({
      g_id: this.props.viewedGrp._id,
      msg_string: this.state.messageInput
    });
  }

  // Scrolls page to bottom (ngl, idk what is really happening here)
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.submitMessageInput();
    }
  }

  render() {
    let clientId = this.props.AccountDetails.acc_data._id;
    let displayMessages = this.props.viewedGrp.g_messages;
    return (
      <div className="chatbody">
        <div className="chatbody-messages">
          {
            displayMessages.map((msg, idx, elements) => {
              console.log(msg);
              return (
                !(idx + 1 >= elements.length)
                  ?
                  (msg.m_sender._id != elements[idx + 1].m_sender._id
                    ?
                    // Last message in a row by a specific user.
                    <Message
                      senderName={msg.m_sender.acc_usrname}
                      msgString={msg.msg_string}
                      isSender={clientId == msg.m_sender._id}
                      marginBottom={true}
                    />
                    :
                    <Message
                      senderName={msg.m_sender.acc_usrname}
                      msgString={msg.msg_string}
                      isSender={clientId == msg.m_sender._id}
                      marginBottom={false}
                    />)
                  :
                  <Message
                    senderName={msg.m_sender.acc_usrname}
                    msgString={msg.msg_string}
                    isSender={clientId == msg.m_sender._id}
                    marginBottom={false}
                  />
              )
            })
          }
          <div ref={this.messagesEndRef} />
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