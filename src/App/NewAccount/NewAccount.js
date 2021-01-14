import React from 'react';
import { ModalHeader, ModalBody, ModalFooter, Label, Input, Form, FormGroup, FormFeedback } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

import './NewAccount.scss';

class NewAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // New Account
      nafname: "",
      nalname: "",
      nausername: "",
      naemailaddr: "",
      napassword1: "",
      napassword2: "",
      nadobday: 1,
      nadobmonth: 1,
      nadobyear: (new Date()).getFullYear(),
      nagender: "N",
      usrinvalid: false,
      emailinvalid: false,
      pwinvalid: false,
    }
    // SetOnChange (State Managing Callback)
    this.setOnChange = this.setOnChange.bind(this);
    // Create Account Request Handler
    this.handleNewAccount = this.handleNewAccount.bind(this);
    // Modal Trigger
    this.toggleModal = this.toggleModal.bind(this);
  }

  // Create Account Handlers
  setOnChange(event) {
    let fieldID = event.target.id;
    let obj = {};
    obj[`${fieldID}`] = event.target.value;
    this.setState(obj);
    this.setState({
      emailinvalid: false,
      usrinvalid: false,
      pwinvalid: false
    })
  }

  // Feedbback Togglers
  invalidateEmailFeedback() {
    this.setState({ emailinvalid: true })
  }
  invalidateUserFeedback() {
    this.setState({ usrinvalid: true })
  }
  invalidatePasswordFeedback() {
    this.setState({ pwinvalid: true })
  }

  handleNewAccount(event) {
    // Check #1: Check if passwords match:
    // Check #2 Check if username is being used already:
    // Check #3 Check if email is being used already:
    fetch(`${window.location.protocol}//${window.location.host}/api/authenticate/newaccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        nafname: this.state.nafname,
        nalname: this.state.nalname,
        nausername: this.state.nausername,
        naemailaddr: this.state.naemailaddr,
        napassword1: this.state.napassword1,
        napassword2: this.state.napassword2,
        nadobday: this.state.nadobday,
        nadobmonth: this.state.nadobmonth,
        nadobyear: this.state.nadobyear,
        nagender: this.state.nagender
      })
    })
      .then(res => res.json())
      .then(data => {
        // If 'data' is an array, then it has errors
        if (Array.isArray(data)) {
          // Handles error messages
          data.map((item, idx) => {
            if ('code' in item) {
              switch (item.code) {
                case "EMAIL_REGISTERED":
                  this.invalidateEmailFeedback();
                  break;
                case "USERNAME_REGISTERED":
                  this.invalidateUserFeedback();
                  break;
                case "PASSWORD_MISMATCH":
                  this.invalidatePasswordFeedback();
                  break;
              }
            }
          })
          // If 'data' is an object, then it has no errors
        } else {
          // Close Modal (Probably Trigger an alert or something asw to tell the user they signed up!)
          this.toggleModal();
        }
      })
  }

  // Handles Modal Triggering
  toggleModal() {
    this.setState({ modal: !this.state.modal })
  }


  render() {
    let days = [];
    let months = [];
    let years = [];
    for (let i = 1; i <= 31; i++) { days.push(i); }
    for (let i = 1; i <= 12; i++) { months.push(i); }
    for (let i = 1900; i <= (new Date()).getFullYear(); i++) { years.push(i); }
    return (
      <>
        <ModalHeader toggle={this.toggleModal}><h3>Sign Up</h3></ModalHeader>
        <ModalBody>

          <Form className="createAccount-form container">
            <FormGroup className="createAccount-form-name">
              {/* Name Fields */}
              <Input type="text" id="nafname" name="nafname" placeholder="First Name" onChange={this.setOnChange} />
              <Input type="text" id="nalname" name="nalname" placeholder="Last Name" onChange={this.setOnChange} />
            </FormGroup>
            {/* Email Field */}
            <FormGroup className="createAccount-form-email">
              {
                this.state.emailinvalid
                  ?
                  <Input type="text" id="naemailaddr" name="naemailaddr" placeholder="Email Address" onChange={this.setOnChange} invalid />
                  :
                  <Input type="text" id="naemailaddr" name="naemailaddr" placeholder="Email Address" onChange={this.setOnChange} />
              }
              <FormFeedback invalid>Emails is taken</FormFeedback>
            </FormGroup>
            {/* Username Field */}
            <FormGroup className="createAccount-form-username">
              {
                this.state.usrinvalid ?
                  <Input invalid type="text" id="nausername" name="nausername" placeholder="User Name" onChange={this.setOnChange} />
                  :
                  <Input type="text" id="nausername" name="nausername" placeholder="User Name" onChange={this.setOnChange} />
              }
              <FormFeedback invalid>Username is taken</FormFeedback>
            </FormGroup>
            {/* Password Fields */}
            <FormGroup className="createAccount-form-password">
              {this.state.pwinvalid ?
                <>
                  <Input invalid type="password" id="napassword1" name="napassword1" placeholder="Password" onChange={this.setOnChange} />
                  <Input invalid type="password" id="napassword2" name="napassword2" placeholder="Confirm" onChange={this.setOnChange} />
                </>
                :
                <>
                  <Input type="password" id="napassword1" name="napassword1" placeholder="Password" onChange={this.setOnChange} />
                  <Input type="password" id="napassword2" name="napassword2" placeholder="Confirm" onChange={this.setOnChange} />
                </>
              }
              <FormFeedback invalid>You will not be able to see this</FormFeedback>
            </FormGroup>
            <FormGroup className="createAccount-form-dob">
              <div className="createAccount-form-dob-label">
                <h6>Date Of Birth:</h6>
              </div>
              {/* Date Of Birth Selectors: */}
              <select onChange={this.setOnChange} name="nadobday" id="nadobday" className="dob-day" value={this.state.nadobday}>
                {days.map((val, idx) => (
                  <option key={uuidv4()} value={val}>{val}</option>
                ))
                }
              </select>
              <select onChange={this.setOnChange} name="nadobmonth" id="nadobmonth" className="dob-month" value={this.state.nadobmonth}>
                {months.map((val, idx) => (
                  <option key={uuidv4()} value={val}>{val}</option>
                ))
                }
              </select>
              <select onChange={this.setOnChange} name="nadobyear" id="nadobyear" className="dob-year" value={this.state.nadobyear}>
                {years.map((val, idx) => (
                  <option key={uuidv4()} value={val}>{val}</option>
                ))
                }
              </select>
            </FormGroup>
            {/* Gender Selector: */}
            <FormGroup>
              <div className="createAccount-form-gender-label">
                <h6>Gender:</h6>
              </div>
              <select onChange={this.setOnChange} name="nagender" id="nagender" className="createAccount-form-gender">
                <option key={uuidv4()} value="N">---Choose A Gender Option---</option>
                <option key={uuidv4()} value="M">Male</option>
                <option key={uuidv4()} value="F">Female</option>
              </select>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="createAccount-footer">
          <button className="signUp" onClick={this.handleNewAccount}>Create Account</button>
          {/* Adds Space: {' '} */}
        </ModalFooter>
      </>
    )
  }
}

export default NewAccount;