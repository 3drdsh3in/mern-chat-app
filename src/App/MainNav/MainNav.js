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
} from 'reactstrap';

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsIsOpen: false,
      notificationsIsOpen: false
    }
    this.toggleOptions = this.toggleOptions.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleOptions() {
    this.setState({ optionsIsOpen: !this.state.optionsIsOpen });
  }

  toggleNotifications() {
    this.setState({ notificationsIsOpen: !this.state.notificationsIsOpen });
  }

  render() {
    return (
      <>
        <div>
          <Navbar className="mainnav" color="light" light expand="md">
            <NavbarBrand href="/"><img src="https://img.icons8.com/cute-clipart/64/000000/chat.png" id="icon" /></NavbarBrand>
            <Nav className="mr-auto"></Nav>
            <NavLink href="#"><i id="new-user" className="fas fa-plus-square"></i></NavLink>
            <UncontrolledDropdown>
              <DropdownToggle nav>
                <i id="notifications" className="fas fa-bell"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem id="notifications-fr">
                  <span><i className="fas fa-user"></i>{" "}Profile</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
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
                <DropdownItem>
                  <span><i className="fas fa-power-off"></i>{" "}Logout</span>
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