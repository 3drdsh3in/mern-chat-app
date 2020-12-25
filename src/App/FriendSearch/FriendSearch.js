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
      emitSearch: false
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
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
    }, 3000)
  }

  render() {
    return (
      <>
        <ModalBody>
          <FriendItem friendStatus={"UNSENT"} userName="Dudebro" fname="Edward" lname="Shen" />
          <FriendItem friendStatus={"PENDING"} userName="Friendbro" fname="Al" lname="Stein" />
          <FriendItem friendStatus={"ACCEPTED"} userName="Requestbro" fname="Jeff" lname="Thew" />
        </ModalBody>
        <ModalFooter>
          <Input onChange={this.handleSearchAccount} type="text" placeholder="Search Users..." />
        </ModalFooter>
      </>
    )
  }
}

export default FriendSearch;