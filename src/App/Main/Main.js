import React from 'react';
import * as crypto from 'crypto';

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
      this.setState({ authenticated: false });
    } else {
      // Must Initialize Client Before Any Kinda of emissions or the client's socket endpoints
      // will not be created!
      this.props.initializeClient();
      this.props.emitAccountDetails(this.props.AccountDetails);
    }
  }

  render() {
    let grps = this.props.AccountDetails.acc_data.acc_grps;
    let selectedChatGrpIdx = this.props.SideBarDetails.selectedChatItem;
    if (grps == undefined || selectedChatGrpIdx == undefined) {
      return (
        <h1>
          Not authenticated Please Login Again
        </h1>
      )
    }
    let viewedGrp = grps[selectedChatGrpIdx - 1];
    let acc_id = this.props.AccountDetails.acc_data._id;
    return (
      this.state.authenticated
        ?
        this.props.SocketErrorDetails.errorMessage.name !== 'TokenExpiredError'
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
                    <WelcomeBody accountDetails={this.props.AccountDetails} />
                  </div>
                  :
                  <div key={uuidv4()} className="main-body-content">
                    <ChatHeader acc_id={acc_id} viewedGrp={viewedGrp} chatName={viewedGrp.g_title} chatType={viewedGrp.g_type} />
                    <ChatBody viewedGrp={viewedGrp} />
                  </div>
                }
              </div>
            </div>
          </>
          :
          <>
            <h1>
              {`Error Name: ${this.props.SocketErrorDetails.errorMessage.name}`}
            </h1>
            <p>
              {`Error Message: ${this.props.SocketErrorDetails.errorMessage.message}`}
            </p>
            <p>
              {`Expired At: ${Date(this.props.SocketErrorDetails.errorMessage.expiredAt)}`}
            </p>
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