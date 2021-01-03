import React from 'react';

// Containers:
import MainNav from '../MainNav/MainNavContainer';
import SideBar from '../SideBar/SideBarContainer';
import ChatHeader from '../ChatHeader/ChatHeaderContainer';
import ChatBody from '../ChatBody/ChatBodyContainer';
import WelcomeBody from '../WelcomeBody/WelcomeBody';

import './Main.scss';

import { v4 as uuidv4 } from 'uuid';

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
      this.setState({ authenticated: false });
    } else {
      // Emit AccountDetails to emit in the socket middleware client.
      this.props.emitAccountDetails(this.props.AccountDetails);
    }
  }

  render() {
    let grps = this.props.AccountDetails.acc_data.acc_grps;
    let selectedChatGrpIdx = this.props.SideBarDetails.selectedChatItem;
    let viewedGrp = grps[selectedChatGrpIdx - 1];
    console.log(viewedGrp);
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

              {this.props.SideBarDetails.selectedChatItem == 0
                ?
                <div key={uuidv4()} className="main-body-content">
                  <WelcomeBody />
                </div>
                :
                <div key={uuidv4()} className="main-body-content">
                  <ChatHeader chatName={viewedGrp.g_title} chatType={viewedGrp.g_type} />
                  <ChatBody viewedGrp={viewedGrp} />
                </div>
              }
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