import React from 'react';

// Sass:
import './MainNav.scss';

// React Router:
import { Link } from 'react-router-dom';


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
    console.log('CONSTRUCT MainNav')
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

  async logoutHandler(e) {
    console.log(this.state.redirectToLogin);
    await this.props.setClientIdWrapper('');
    await this.setState({ redirectToLogin: true });
    await this.props.updateLogState(false);
    await this.props.reInitializeStore();
    this.props.resetClientStore();
  }

  render() {
    console.log(this.state.redirectToLogin);
    let acc_freqs = this.props.AccountDetails.acc_data.acc_freqs
    if (!acc_freqs) {
      return (
        <>
          No Friend Requests Found.
        </>
      )
    }
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
            {/* Notifications Feature Trigger */}
            {acc_freqs.length > 0
              ?
              <NavLink onClick={this.toggleNotifications} href="#">
                <i id="notifications" className="fas fa-bell"></i>
                <span className="badge">{acc_freqs.length}</span>
              </NavLink>
              :
              <NavLink onClick={this.toggleNotifications} href="#">
                <i id="notifications" className="fas fa-bell"></i>
              </NavLink>
            }
            {/* Notifications Feature Body */}
            <Modal isOpen={this.state.notificationsIsOpen} toggle={this.toggleNotifications} className="">
              <ModalHeader toggle={this.toggleNotifications}>Friend Requests</ModalHeader>
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
                <Link to={`/profile/${this.props.AccountDetails.acc_data._id}`}>
                  <DropdownItem>
                    <span><i className="fas fa-user"></i>{" "}Profile</span>
                  </DropdownItem>
                </Link>
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