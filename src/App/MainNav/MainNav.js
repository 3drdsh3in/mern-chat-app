import React from 'react';

// Sass:
import './MainNav.scss';

// ReactStrap Dependencies:
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
} from 'reactstrap';
// uuid Dependency:
import { v4 as uuidv4 } from 'uuid';

// React Router Dependencies:
import {
  Redirect
} from 'react-router';

// Containers:
import FriendSearch from '../FriendSearch/FriendSearchContainer';
import NotificationItem from '../NotificationItem/NotificationItemContainer';


class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsIsOpen: false,
      notificationsIsOpen: false,
      newFriendModalState: false,
      redirectToLogin: false
    }
    this.toggleOptions = this.toggleOptions.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.toggleNewFriend = this.toggleNewFriend.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  toggleOptions() {
    this.setState({ optionsIsOpen: !this.state.optionsIsOpen });
  }

  toggleNotifications() {
    this.setState({ notificationsIsOpen: !this.state.notificationsIsOpen });
  }

  toggleNewFriend() {
    this.setState({ newFriendModalState: !this.state.newFriendModalState });
  }

  logoutHandler() {
    this.props.reInitializeStore();
    this.setState({ redirectToLogin: true });
  }

  render() {
    let acc_freqs = this.props.AccountDetails.acc_data.acc_freqs
    return (
      <>
        <div>
          <Navbar className="mainnav" color="light" light expand="md">
            <NavbarBrand href="/"><img src="https://img.icons8.com/cute-clipart/64/000000/chat.png" id="icon" /></NavbarBrand>
            <Nav className="mr-auto"></Nav>
            {/* Add New User Feature */}
            <NavLink onClick={this.toggleNewFriend} href="#"><i id="new-user" className="fas fa-plus-square"></i></NavLink>
            <Modal isOpen={this.state.newFriendModalState} toggle={this.toggleNewFriend} className="">
              <ModalHeader toggle={this.toggleNewFriend}>Add Friend</ModalHeader>
              <FriendSearch />
            </Modal>
            {/* Notifications Feature */}
            <NavLink onClick={this.toggleNotifications} href="#"><i id="notifications" className="fas fa-bell"></i></NavLink>
            <Modal isOpen={this.state.notificationsIsOpen} toggle={this.toggleNotifications} className="">
              <ModalHeader toggle={this.toggleNotifications}>Notifications</ModalHeader>
              {acc_freqs.map((acc_freq) => {
                return (
                  <>
                    <NotificationItem
                      key={uuidv4()}
                      senderId={acc_freq.fr_sender_id._id}
                      senderData={acc_freq.fr_sender_id}
                      notificationTitle={`${acc_freq.fr_sender_id.acc_usrname}`}
                      notificationLabel="Friend Request"
                      notificationType={'FRIEND_REQUEST'} />
                  </>
                )
              })}
            </Modal>

            {/* Caret Dropwon Feature */}
            <UncontrolledDropdown>
              <DropdownToggle nav>
                <i className="fas fa-caret-down"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <span><i className="fas fa-user"></i>{" "}Profile</span>
                </DropdownItem>
                <DropdownItem>
                  <span><i className="fas fa-cog"></i>{" "}Settings</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.logoutHandler}>
                  <span><i className="fas fa-power-off"></i>{" "}Logout</span>
                  {
                    this.state.redirectToLogin
                      ?
                      <Redirect to="/" />
                      :
                      null
                  }
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Navbar>
        </div>
      </>
    )
  }
}

export default MainNav;