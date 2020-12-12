import React from 'react';
import './Login.scss';
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Form, FormGroup } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      modal: false
    };
    this.setLoginUserName = this.setLoginUserName.bind(this);
    this.setLoginPassword = this.setLoginPassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  // Login Field Handlers
  setLoginUserName(event) {
    this.setState({ userName: event.target.value });
  }
  setLoginPassword(event) {
    this.setState({ password: event.target.value });
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

  // Handles Modal Triggering
  toggleModal() {
    console.log(!this.state.modal);
    this.setState({ modal: !this.state.modal })
  }



  render() {
    let days = [];
    let months = [];
    let years = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    for (let i = 0; i <= 11; i++) {
      months.push(i);
    }
    for (let i = 1900; i <= (new Date()).getFullYear(); i++) {
      years.push(i);
    }
    return (
      <div className="wrapper fadeInDown" onSubmit={this.handleLogin}>
        <div id="formContent">
          <div className="wrapper-img fadeIn first">
            <img src="https://img.icons8.com/cute-clipart/256/000000/chat.png" id="icon" />
          </div>

          <form>
            <input type="text" id="login" className="fadeIn second" name="login" placeholder="Username" onChange={this.setLoginUserName} />
            <input type="password" id="password" className="fadeIn third" name="login" placeholder="Password" onChange={this.setLoginPassword} />
            <input type="submit" className="fadeIn fourth" value="Log In" />
          </form>

          <div id="formFooter">
            <a className="underlineHover" href="#">Forgot Password?</a>
          </div>
          <div id="formFooter">
            <button className="createAccount fadeIn fifth" onClick={this.toggleModal}>Create Account</button>
            {/* newAccount Modal */}
            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}><h3>Sign Up </h3></ModalHeader>
              <ModalBody>
                <form className="createAccount-form container">
                  <div className="createAccount-form-name">
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" onChange={this.setFirstName} />
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" onChange={this.setLastName} />
                  </div>
                  <div className="createAccount-form-email">
                    <input type="text" id="emailAddr" name="emailAddr" placeholder="Email Address" onChange={this.setEmailAddr} />
                  </div>
                  <div className="createAccount-form-password">
                    <input type="password" id="password1" name="password1" placeholder="Password" onChange={this.setEmailAddr} />
                    <input type="password" id="password2" name="password2" placeholder="Confirm" onChange={this.setEmailAddr} />
                  </div>
                  <div className="createAccount-form-dob-label">
                    <h6>Date Of Birth:</h6>
                  </div>
                  <div className="createAccount-form-dob">
                    <select name="dob-day" id="dob-day" className="dob-day">
                      {days.map((val, idx) => (
                        <option value={val}>{val}</option>
                      ))
                      }
                    </select>
                    <select name="dob-month" id="dob-month" className="dob-month">
                      {months.map((val, idx) => (
                        <option value={val}>{val}</option>
                      ))
                      }
                    </select>
                    <select name="dob-year" id="dob-year" className="dob-year">
                      {years.map((val, idx) => (
                        <option value={val}>{val}</option>
                      ))
                      }
                    </select>
                  </div>
                  <div className="createAccount-form-gender-label">
                    <h6>Gender:</h6>
                  </div>
                  <select name="gender" id="gender" className="createAccount-form-gender">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </form>
              </ModalBody>
              <ModalFooter>
                <button className="signUp" onClick={this.toggleModal}>Create Account</button>
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