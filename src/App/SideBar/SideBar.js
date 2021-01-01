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
      selectedIndex: 0,
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
            <ChatItem
              onClick={(event) => { this.setState({ selectedIndex: 0 }) }}
              userId={`Welcome ${this.props.AccountDetails.acc_data.acc_usrname}`}
              userMsg={`Click here for more details.`}
              isSelected={true}
            />
            <ChatItem
              onClick={(event) => { this.setState({ selectedIndex: 1 }) }}
              userId={'World Chat'}
              userMsg={'Click here to talk to other users.'}
              isSelected={false}
            />
            {
              acc_grps.map((grp, idx) => (
                <ChatItem
                  onClick={(event) => { this.setState({ selectedIndex: idx + 2 }) }}
                  userId={grp.g_title}
                  userMsg={grp.g_type}
                  isSelected={false}
                />
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