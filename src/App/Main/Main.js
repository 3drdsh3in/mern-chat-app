import React from 'react';

// Containers:
import MainNav from '../MainNav/MainNavContainer';
import SideBar from '../SideBar/SideBarContainer';
import ChatHeader from '../ChatHeader/ChatHeaderContainer';
import ChatBody from '../ChatBody/ChatBodyContainer';

import './Main.scss';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="main">
          <div className="main-header">
            <MainNav />
          </div>
          <div className="main-body">
            <div className="main-body-side">
              <SideBar />
            </div>
            <div className="main-body-content">
            {/* Pass In Actual State Props Instead of the hard coded shit here! */}
              <ChatHeader chatName="Fuck" chatType="G" />
              <ChatBody />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Main;