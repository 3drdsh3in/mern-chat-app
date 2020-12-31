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
  }
  render() {
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
                <div className="modal-body-item-friend_select_input-wrapper-item">
                  <label for="exampleCheck" check><h6>Check me out</h6></label>
                  <input type="checkbox" name="check" id="exampleCheck" />
                </div>
                <div className="modal-body-item-friend_select_input-wrapper-item">
                  <label for="exampleCheck" check><h6>Check me out</h6></label>
                  <input type="checkbox" name="check" id="exampleCheck" />
                </div>
              </div>
            </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggleModal}>Create Group</Button>{' '}
          <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
        </ModalFooter>
      </>
    )
  }
}

export default NewGroupForm;