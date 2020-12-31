import React from 'react';

// Reactstrap dependencies:
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

//Components:
import ChatItem from '../ChatItem/ChatItem';
import NewGroupForm from '../NewGroup/NewGroupContainer';

// Style Sheets
import './SideBar.scss';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selectedIndex: -1,
      openModal: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ openModal: !this.state.openModal });
  }

  // Component Initial State:
  // Chat Windows For All Friends/Groups
  // (Get from ACCOUNT_IN entity for the corresponding acc_id stored on redux state)
  // Consequent Rerenders:
  // Potentially New Chat Groups (Includes Friends) being added
  render() {
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

            {/* Insert Group Chat Items, Somehow pass isSelected feature to this.state.selectedIndex */}
            <ChatItem
              onClick={(event) => { this.setState({ selectedIndex: 0 }) }}
              userId={`${'SomeNameFromReduxProps'}`}
              userMsg={`${'SomeMsgFromReduxProps'}`}
              isSelected={true}
            />
            <ChatItem
              onClick={(event) => { this.setState({ selectedIndex: 1 }) }}
              userId={`${'SomeNameFromReduxProps'}`}
              userMsg={`${'SomeMsgFromReduxProps'}`}
            />
            <ChatItem
              onClick={(event) => { this.setState({ selectedIndex: 2 }) }}
              userId={`${'SomeNameFromReduxProps'}`}
              userMsg={`${'SomeMsgFromReduxProps'}`}
            />
          </div>
        </div>
      </>
    )
  }
}

export default SideBar;