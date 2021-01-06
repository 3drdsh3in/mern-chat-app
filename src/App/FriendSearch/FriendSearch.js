import React from 'react';

import {
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import { v4 as uuidv4 } from 'uuid';

import './FriendSearch.scss';

// Components:
import FriendItem from '../FriendItem/FriendItemContainer';
import NotificationItem from '../NotificationItem/NotificationItemContainer';

/*
Form Body That Controls How The New Friend Feature Adds New Friends.
*/
class FriendSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      emitSearch: false,
      searchData: []
    }
    this.searchTimeout = null;
    this.handleSearchAccount = this.handleSearchAccount.bind(this);
  }

  handleSearchAccount(event) {
    this.setState({ searchString: event.target.value });
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      console.log(this.props);
      fetch(`${window.location.protocol}//${window.location.host}/api/search/getFriends/${this.props.AccountDetails.acc_data._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          userNameQuery: event.target.value
        })
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data[0]['frStatus']);
          this.setState({ searchData: data });
        })
    }, 3000)
  }



  render() {
    return (
      <>
        <ModalBody>
          {this.state.searchData.map((accountItem) => (
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
          )}
          {/* <FriendItem friendStatus={"PENDING"} userName="Friendbro" fname="Al" lname="Stein" />
          <FriendItem friendStatus={"ACCEPTED"} userName="Requestbro" fname="Jeff" lname="Thew" /> */}

        </ModalBody>
        <ModalFooter>
          <input onChange={this.handleSearchAccount} type="text" placeholder="Search Users..." />
        </ModalFooter>
      </>
    )
  }
}

export default FriendSearch;