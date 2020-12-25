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
    this.state = {
      authenticated: true
    }
  }

  componentWillMount() {
    // Ideally change this to a check whether sesh_id hasn't expired.
    if (Object.keys(this.props.AccountDetails.acc_data).length === 0) {
      // COMMENT OUT FOR UI DEVELOPMENT:
      // this.setState({ authenticated: false });
    } else {
      // Emit AccountDetails to emit in the socket middleware client.
      this.props.emitAccountDetails(this.props.AccountDetails);
    }
  }

  render() {
    console.log(this.state.authenticated)
    return (
      this.state.authenticated
        ?
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
        :
        <>
          <h1>
            Not authenticated Please Login Again
        </h1>
        </>
    )
  }
}

export default Main;