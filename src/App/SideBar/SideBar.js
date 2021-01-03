import React from 'react';

// Reactstrap dependencies:
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// uuid
import { v4 as uuidv4 } from 'uuid';

//Components:
import ChatItem from '../ChatItem/ChatItem';
import NewGroupForm from '../NewGroup/NewGroupContainer';

// Style Sheets
import './SideBar.scss';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      selectedIndex: 0,
      openModal: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleClickEvt = this.handleClickEvt.bind(this);
  }

  toggleModal() {
    this.setState({ openModal: !this.state.openModal });
  }

  handleClickEvt(idx) {
    this.props.updateSelectedChatItem(idx);
  }

  // Component Initial State:
  // Chat Windows For All Friends/Groups
  // (Get from ACCOUNT_IN entity for the corresponding acc_id stored on redux state)
  // Consequent Rerenders:
  // Potentially New Chat Groups (Includes Friends) being added
  render() {
    let acc_grps = this.props.AccountDetails.acc_data.acc_grps;
    return (
      <>
        <div className="sidebar">
          <div className="sidebar-header">
            <h3>Chats</h3>
            <button onClick={this.toggleModal} className="sidebar-header-newgroup-button">
              <i className="fas fa-user-plus"></i>
            </button>
            <Modal isOpen={this.state.openModal} toggle={this.toggleModal} className="">
              <ModalHeader toggle={this.toggleModal}>New Group</ModalHeader>
              <NewGroupForm toggleModalHandler={this.toggleModal} />
            </Modal>
          </div>
          <hr />
          {/* Friends/Groups Item Entry */}
          <div className="sidebar-body">
            <div onClick={() => this.handleClickEvt(0)}>
              {0 == this.props.SideBarDetails.selectedChatItem
                ?
                <ChatItem
                  userId={`Welcome ${this.props.AccountDetails.acc_data.acc_usrname}`}
                  userMsg={`Click here for more details.`}
                  key={uuidv4()}
                  isSelected={true}
                />
                :
                <ChatItem
                  userId={`Welcome ${this.props.AccountDetails.acc_data.acc_usrname}`}
                  userMsg={`Click here for more details.`}
                  key={uuidv4()}
                  isSelected={false}
                />
              }
            </div>
            {/* Sample World Chat Component (Will need to create this entity in the DB later on!) */}
            {/* <div onClick={() => this.handleClickEvt(1)}>
              {1 == this.props.SideBarDetails.selectedChatItem
                ?
                <ChatItem
                  userId={`World Chat`}
                  userMsg={`Click here to talk to other users.`}
                  key={uuidv4()}
                  isSelected={true}
                />
                :
                <ChatItem
                  userId={`World Chat`}
                  userMsg={`Click here to talk to other users.`}
                  key={uuidv4()}
                  isSelected={false}
                />
              }
            </div> */}
            {/* All the ChatGroups the user/account is currently in. */}
            {
              acc_grps.map((grp, idx) => (
                <div onClick={() => this.handleClickEvt(idx + 1)}>
                  {idx + 1 == this.props.SideBarDetails.selectedChatItem
                    ?
                    <ChatItem
                      userId={grp.g_title}
                      userMsg={grp.g_type}
                      key={uuidv4()}
                      isSelected={true}
                    />
                    :
                    <ChatItem
                      userId={grp.g_title}
                      userMsg={grp.g_type}
                      key={uuidv4()}
                      isSelected={false}
                    />}
                </div>
              ))
            }
            {/* Insert Group Chat Items, Somehow pass isSelected feature to this.state.selectedIndex */}
          </div>
        </div>
      </>
    )
  }
}

export default SideBar;