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
      isOpen: false,
    }
    this.toggleOptions = this.toggleOptions.bind(this);
  }

  toggleOptions() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/"><img src="https://img.icons8.com/cute-clipart/64/000000/chat.png" id="icon" /></NavbarBrand>
            <Nav className="mr-auto"></Nav>
            <NavLink href="#"><i id="new-user" class="fas fa-user-plus"></i></NavLink>
            <NavLink href="#"><i id="notifications" class="fas fa-bell"></i></NavLink>
            <UncontrolledDropdown>
              <DropdownToggle nav>
                <i class="fas fa-caret-down"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <span><i class="fas fa-user"></i>{" "}Profile</span>
                </DropdownItem>
                <DropdownItem>
                  <span><i class="fas fa-cog"></i>{" "}Settings</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <span><i class="fas fa-power-off"></i>{" "}Logout</span>
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