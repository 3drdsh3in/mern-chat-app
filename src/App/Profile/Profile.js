import React from 'react';

import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './Profile.scss';

import MainNav from '../MainNav/MainNavContainer';
import FriendItem from '../FriendItem/FriendItemContainer';
import NotificationItem from '../NotificationItem/NotificationItemContainer';
import GroupItem from '../GroupItem/GroupItem';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayData: {}
    }
  }

  componentWillMount() {
    console.log(this.props);
    fetch(`${window.location.protocol}//${window.location.host}/api/search/getAccountData/${this.props.match.params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        userId: this.props.AccountDetails.acc_data._id
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ displayData: data });
      })
  }

  render() {
    return (
      <div className="wrapper_profile">
        <MainNav />

        <div className="profile">
          <div className="profile-header">
            <div className="profile-header-img">
              <h1>
                {this.state.displayData.acc_usrname ?
                  this.state.displayData.acc_usrname.charAt(0)
                  :
                  ''}
              </h1>
            </div>
            <div className="profile-header-details">
              <h1>
                {this.state.displayData.acc_usrname}
              </h1>
              <p>{this.state.displayData.acc_gender} | {new Date().getFullYear() - new Date(this.state.displayData.acc_dob).getFullYear()}</p>
            </div>
          </div>
          <hr />
          <div className="profile-body">
            <div className="profile-body-bio">
              <h3>
                Biography:
              </h3>
              <p>
                {this.state.displayData.acc_bio}
              </p>
            </div>
            <hr />
            <div className="profile-body-relations">
              <div className="profile-body-relations_friends">
                <h3>Friends</h3>
                <div className="profile-body-relations_friends_section">
                  {
                    this.state.displayData.acc_friends
                      ?
                      this.state.displayData.acc_friends.map((accountItem) => (

                        accountItem.frStatus == 'R_SENT'
                          ?
                          <NotificationItem
                            key={uuidv4()}
                            senderId={accountItem._id}
                            notificationTitle={accountItem.acc_usrname}
                            notificationLabel="Friend Request"
                            notificationType={'FRIEND_REQUEST'}
                          />
                          :
                          <FriendItem
                            key={uuidv4()}
                            acc_id={accountItem._id}
                            friendStatus={accountItem.frStatus}
                            userName={accountItem.acc_usrname}
                            fname={accountItem.acc_fname}
                            lname={accountItem.acc_lname}
                            searchData={accountItem}
                          />

                      )
                      )
                      :
                      null
                  }
                </div>
                {/* Spit out components for friends here! (FriendItem?) */}
              </div>
              <div className="profile-body-relations_groups">
                <h3>Groups</h3>
                <div className="profile-body-relations_groups_section">
                  {/*  */}
                  {
                    this.state.displayData.acc_grps
                      ?
                      this.state.displayData.acc_grps.map((grp) => (
                        <GroupItem g_title={grp.g_title} g_type={grp.g_type} g_size={grp.g_members.length} />
                      ))
                      :
                      null
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Profile);