import React from 'react';

// Reactstrap dependencies:
import {
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

import './NewGroup.scss';

class NewGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.checkBoxChangeHandler = this.checkBoxChangeHandler.bind(this);
  }

  checkBoxChangeHandler(event) {
    console.log(event.target.checked);
    console.log(event.target.id);
  }

  render() {
    let acc_friends = this.props.AccountDetails.acc_data.acc_friends;
    return (
      <>
        <ModalBody>
          <FormGroup className="modal-body-item" check>
            <div className="modal-body-item-title_input">
              <label for="g_title"><h5>Group Title:</h5></label>
              <input id="g_title" type="text" name="g_title" />
            </div>
          </FormGroup>
          <FormGroup className="modal-body-item" check>
            <div className="modal-body-item-friend_select_input">
              <h5>Add Friends:</h5>
              <div className="modal-body-item-friend_select_input-wrapper">

                {
                  acc_friends.map((friend) => {
                    return (
                      <>
                        <div className="modal-body-item-friend_select_input-wrapper-item">
                          <label for={friend._id + '_input'} check><h6>{friend.acc_usrname}</h6></label>
                          <input onChange={this.checkBoxChangeHandler} type="checkbox" name="check" id={friend._id + '_input'} />
                        </div>
                      </>
                    )
                  })
                }
              </div>
            </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggleModalHandler}>Create Group</Button>{' '}
          <Button color="secondary" onClick={this.props.toggleModalHandler}>Cancel</Button>
        </ModalFooter>
      </>
    )
  }
}

export default NewGroupForm;