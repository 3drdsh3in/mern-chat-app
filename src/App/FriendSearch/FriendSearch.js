import React from 'react';

import {
  ModalBody,
  ModalFooter,
  Button,
  Input
} from 'reactstrap';

import './FriendSearch.scss';

// Components:
import FriendItem from '../FriendItem/FriendItem';

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
          console.log(data[0]);
          console.log(data[0]['frStatus']);
          this.setState({ searchData: data });
        })
    }, 3000)
  }



  render() {
    console.log(this.state.searchData);
    return (
      <>
        <ModalBody>
          {this.state.searchData.map((accountItem) => (
            <FriendItem friendStatus={accountItem.frStatus} userName={accountItem.acc_usrname} fname={accountItem.acc_fname} lname={accountItem.acc_lname} />
          )
          )}
          {/* <FriendItem friendStatus={"PENDING"} userName="Friendbro" fname="Al" lname="Stein" />
          <FriendItem friendStatus={"ACCEPTED"} userName="Requestbro" fname="Jeff" lname="Thew" /> */}

        </ModalBody>
        <ModalFooter>
          <Input onChange={this.handleSearchAccount} type="text" placeholder="Search Users..." />
        </ModalFooter>
      </>
    )
  }
}

export default FriendSearch;