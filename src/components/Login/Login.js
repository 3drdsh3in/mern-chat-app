import React from 'react';
import './Login.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Form, FormGroup } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Login
      userName: "",
      password: "",

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
      modal: false
    };
    // Login Request Handler
    this.handleLogin = this.handleLogin.bind(this);
    // Modal Trigger
    this.toggleModal = this.toggleModal.bind(this);
    // SetOnChange (State Managing Callback)
    this.setOnChange = this.setOnChange.bind(this);
    // Create Account Request Handler
    this.handleNewAccount = this.handleNewAccount.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    fetch(`${window.location.protocol}//${window.location.host}/api/authenticate/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
  }

  // Create Account Handlers
  setOnChange(event) {
    let fieldID = event.target.id;
    let obj = {};
    obj[`${fieldID}`] = event.target.value;
    console.log(obj);
    this.setState(obj);
  }

  // Handles Modal Triggering
  toggleModal() {
    console.log(!this.state.modal);
    this.setState({ modal: !this.state.modal })
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
        console.log(data);
      })
  }



  render() {
    let days = [];
    let months = [];
    let years = [];
    for (let i = 1; i <= 31; i++) { days.push(i); }
    for (let i = 1; i <= 12; i++) { months.push(i); }
    for (let i = 1900; i <= (new Date()).getFullYear(); i++) { years.push(i); }
    return (
      <div className="wrapper fadeInDown" onSubmit={this.handleLogin}>
        <div id="formContent">
          <div className="wrapper-img fadeIn first">
            <img src="https://img.icons8.com/cute-clipart/256/000000/chat.png" id="icon" />
          </div>

          <form>
            <input type="text" id="userName" className="fadeIn second" name="userName" placeholder="Username" onChange={this.setOnChange} />
            <input type="password" id="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.setOnChange} />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#">Forgot Password?</a>
          </div>
          <div id="formFooter">
            <button className="createAccount fadeIn fifth" onClick={this.toggleModal}>Create Account</button>
            {/* newAccount Modal */}
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}><h3>Sign Up</h3></ModalHeader>
              <ModalBody>
                <form className="createAccount-form container">
                  <div className="createAccount-form-name">
                    {/* Name Fields */}
                    <input type="text" id="nafname" name="nafname" placeholder="First Name" onChange={this.setOnChange} />
                    <input type="text" id="nalname" name="nalname" placeholder="Last Name" onChange={this.setOnChange} />
                  </div>
                  {/* Email Field */}
                  <div className="createAccount-form-email">
                    <input type="text" id="naemailaddr" name="naemailaddr" placeholder="Email Address" onChange={this.setOnChange} />
                  </div>
                  {/* Username Field */}
                  <div className="createAccount-form-username">
                    <input type="text" id="nausername" name="nausername" placeholder="User Name" onChange={this.setOnChange} />
                  </div>
                  {/* Password Fields */}
                  <div className="createAccount-form-password">
                    <input type="password" id="napassword1" name="napassword1" placeholder="Password" onChange={this.setOnChange} />
                    <input type="password" id="napassword2" name="napassword2" placeholder="Confirm" onChange={this.setOnChange} />
                  </div>
                  <div className="createAccount-form-dob-label">
                    <h6>Date Of Birth:</h6>
                  </div>
                  {/* Date Of Birth Selectors: */}
                  <div className="createAccount-form-dob">
                    <select onChange={this.setOnChange} name="nadobday" id="nadobday" className="dob-day" value={this.state.nadobday}>
                      {days.map((val, idx) => (
                        <option value={val}>{val}</option>
                      ))
                      }
                    </select>
                    <select onChange={this.setOnChange} name="nadobmonth" id="nadobmonth" className="dob-month" value={this.state.nadobmonth}>
                      {months.map((val, idx) => (
                        <option value={val}>{val}</option>
                      ))
                      }
                    </select>
                    <select onChange={this.setOnChange} name="nadobyear" id="nadobyear" className="dob-year" value={this.state.nadobyear}>
                      {years.map((val, idx) => (
                        <option value={val}>{val}</option>
                      ))
                      }
                    </select>
                  </div>
                  {/* Gender Selector: */}
                  <div className="createAccount-form-gender-label">
                    <h6>Gender:</h6>
                  </div>
                  <select onChange={this.setOnChange} name="nagender" id="nagender" className="createAccount-form-gender">
                    <option value="N">---Choose A Gender Option---</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </form>
              </ModalBody>
              <ModalFooter>
                <button className="signUp" onClick={this.handleNewAccount}>Create Account</button>
                {/* Adds Space: {' '} */}
                {/* <button onClick={this.toggleModal}>Cancel</button> */}
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;