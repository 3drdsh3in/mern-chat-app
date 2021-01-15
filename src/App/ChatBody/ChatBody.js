import React from 'react';

import './ChatBody.scss';

// Containers:
import Message from '../Message/MessageContainer';
import TypingPopup from '../TypingPopup/TypingPopupContainer';

class ChatBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInput: ''
    }
    this.messagesEndRef = React.createRef();
    this.submitMessageInput = this.submitMessageInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom()
  }
  componentDidUpdate() {
    console.log('UPDATE');
    this.scrollToBottom()
    // if (this.state.messageInput === '') {
    //   // Emit action that sends:
    //   // group _id and this.props.AccountDetails.acc_usrname
    //   // to the server.
    //   this.props.emitNotTyping({
    //     acc_id: this.props.AccountDetails.acc_data._id,
    //     g_id: this.props.AccountDetails.acc_data.acc_grps[this.props.SideBarDetails.selectedChatItem - 1]._id,
    //     g_members: this.props.AccountDetails.acc_data.acc_grps[this.props.SideBarDetails.selectedChatItem - 1].g_members,
    //     emitter: this.props.AccountDetails.acc_data.acc_usrname
    //   })
    // }
  }

  async submitMessageInput() {
    if (this.state.messageInput !== '') {
      await this.props.sendNewMessage({
        g_id: this.props.viewedGrp._id,
        msg_string: this.state.messageInput
      });
      console.log(this.state.messageInput);
      this.setState({ messageInput: '' })
      console.log(this.state.messageInput);
    }
  }

  // Scrolls page to bottom (ngl, idk what is really happening here)
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
  }

  handleKeyPress(event) {
    console.log('KEYPRESS:', event.key);
    if (event.key == 'Enter') {
      this.submitMessageInput();
    }
  }

  async handleKeyDown(event) {
    console.log('KEYDOWN:', event.key);
    if (this.state.messageInput !== '') {
      // Emit action that sends:
      // group _id and this.props.AccountDetails.acc_usrname
      // to the server.
      await this.props.emitTyping({
        acc_id: this.props.AccountDetails.acc_data._id,
        g_id: this.props.AccountDetails.acc_data.acc_grps[this.props.SideBarDetails.selectedChatItem - 1]._id,
        g_members: this.props.AccountDetails.acc_data.acc_grps[this.props.SideBarDetails.selectedChatItem - 1].g_members,
        emitter: this.props.AccountDetails.acc_data.acc_usrname
      })
    }
    if (this.state.messageInput === '') {
      // Emit action that sends:
      // group _id and this.props.AccountDetails.acc_usrname
      // to the server.
      await this.props.emitNotTyping({
        acc_id: this.props.AccountDetails.acc_data._id,
        g_id: this.props.AccountDetails.acc_data.acc_grps[this.props.SideBarDetails.selectedChatItem - 1]._id,
        g_members: this.props.AccountDetails.acc_data.acc_grps[this.props.SideBarDetails.selectedChatItem - 1].g_members,
        emitter: this.props.AccountDetails.acc_data.acc_usrname
      })
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
                      senderId={msg.m_sender._id}
                    />
                    :
                    <Message
                      senderName={msg.m_sender.acc_usrname}
                      msgString={msg.msg_string}
                      isSender={clientId == msg.m_sender._id}
                      marginBottom={false}
                      senderId={msg.m_sender._id}
                    />)
                  :
                  <Message
                    senderName={msg.m_sender.acc_usrname}
                    msgString={msg.msg_string}
                    isSender={clientId == msg.m_sender._id}
                    marginBottom={false}
                    senderId={msg.m_sender._id}
                  />
              )
            })
          }
          <div ref={this.messagesEndRef} />
        </div>
        <div className="chatbody-form">
          <hr />
          <div className="chatbody-form-textbox">
            <input
              onChange={async (e) => { await this.setState({ messageInput: e.target.value }) }}
              onKeyPress={this.handleKeyPress}
              onKeyUp={this.handleKeyDown}
              type="text"
              placeholder="Say something..."
            />
            <button onClick={this.submitMessageInput}>
              <i className="fas fa-caret-right fa-3x"></i>
            </button>
          </div>
          <TypingPopup />
        </div>
      </div>
    )
  }
}

export default ChatBody;