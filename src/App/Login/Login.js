import React from 'react';
import {
  Modal,
  Form,
  FormGroup,
  Input,
  FormFeedback
} from 'reactstrap';

// Child Components:
import NewAccount from '../NewAccount/NewAccount';

import 'bootstrap/dist/css/bootstrap.min.css';
import * as crypto from 'crypto';
import './Login.scss';
// require('crypto').randomBytes(64).toString('hex')
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Login
      userName: "",
      password: "",
      // Modal
      modal: false,
      loginInvalid: false
    };
    // SetOnChange (State Managing Callback)
    this.setOnChange = this.setOnChange.bind(this);
    // Guest Login Handler
    this.guestLoginHandler = this.guestLoginHandler.bind(this);
    // Login Request Handler
    this.handleLogin = this.handleLogin.bind(this);
    // Modal Trigger
    this.toggleModal = this.toggleModal.bind(this);
  }

  /*
  Future Refactors: handleLogin(event) should be done through TCP socket conenction
  as opposed to a HTTP Post handler to reduce incoming server traffic.
  */
  async handleLogin(event) {
    // 1. Verify the account username exists (/w the corresponding password).
    event.preventDefault();
    await fetch(`${window.location.protocol}//${window.location.host}/api/authenticate/login`, {
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
        // If Unsuccesfful:
        // Trigger Alert/Feedback
        if ('code' in data) {
          // Control FeedBack.
          this.setState({ loginInvalid: true })
        }
        // If Succesful:
        // Save account details to redux state.
        // Redirect to Messaging Page.
        else {
          // Should be a single account stored onto Redux Store.
          this.props.storeAccountDetails(data['account'][0]);
          this.props.storeTokenDetails({
            accessToken: data['accessToken'],
            refreshToken: data['refreshToken']
          });
          // Redirect Page To Other Main Page Component.
          this.props.updateLogState(true);
          this.props.setClientIdWrapper(crypto.randomBytes(32).toString('hex'));
        }
      })
  }

  // Create Account Handlers
  setOnChange(event) {
    if (this.state.loginInvalid) {
      this.setState({ loginInvalid: false });
    }
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

  // Handles Modal Triggering
  toggleModal() {
    this.setState({ modal: !this.state.modal })
  }

  //
  async guestLoginHandler(event) {
    let randStr = crypto.randomBytes(16).toString('hex');
    await fetch(`${window.location.protocol}//${window.location.host}/api/authenticate/newaccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        nafname: 'Guest',
        nalname: randStr,
        nausername: `Guest_${randStr}`,
        naemailaddr: `Guest_${randStr}`,
        napassword1: '',
        napassword2: '',
        nadobday: 30,
        nadobmonth: 12,
        nadobyear: 2020,
        nagender: 'N'
      })
    })

    // 1. Verify the account username exists (/w the corresponding password).
    event.preventDefault();
    await fetch(`${window.location.protocol}//${window.location.host}/api/authenticate/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: `Guest_${randStr}`,
        password: ''
      })
    })
      .then(res => res.json())
      .then(data => {
        // If Unsuccesfful:
        // Trigger Alert/Feedback
        if ('code' in data) {
          // Control FeedBack.
          this.setState({ loginInvalid: true })
        }
        // If Succesful:
        // Save account details to redux state.
        // Redirect to Messaging Page.
        else {
          // Should be a single account stored onto Redux Store.
          this.props.storeAccountDetails(data['account'][0]);
          this.props.storeTokenDetails({
            accessToken: data['accessToken'],
            refreshToken: data['refreshToken']
          });
          // Redirect Page To Other Main Page Component.
          this.props.updateLogState(true);
          // setClientIdWrapper prompts the redirect to /main indirectly with the
          // componentDidUpdate() lifecycle in App.js
          this.props.setClientIdWrapper(crypto.randomBytes(32).toString('hex'));
        }
      })
  }

  render() {
    return (
      <>
        <div className="wrapper fadeInDown" onSubmit={this.handleLogin}>
          <div id="formContent">
            <div className="wrapper-img fadeIn first">
              <img src="https://img.icons8.com/cute-clipart/256/000000/chat.png" id="icon" />
            </div>
            <Form>
              <FormGroup>
                {this.state.loginInvalid
                  ?
                  <>
                    <Input type="text" id="userName" className="fadeIn second" name="userName" placeholder="Username" onChange={this.setOnChange} invalid />
                    <Input type="password" id="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.setOnChange} invalid />
                  </>
                  :
                  <>
                    <Input type="text" id="userName" className="fadeIn second" name="userName" placeholder="Username" onChange={this.setOnChange} />
                    <Input type="password" id="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.setOnChange} />
                  </>
                }
                <FormFeedback invalid>Username or Password not found</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Input type="submit" className="fadeIn fourth" value="Log In" />
              </FormGroup>
            </Form>

            {/* Uncomment when you want to create nodemailer dependency with this app! */}
            <div className="formContent-guest-login">
              <button className="guest-login fadeIn fourth" onClick={this.guestLoginHandler}>Log In As Guest</button>
            </div>

            <div id="formFooter">
              <button className="createAccount fadeIn fifth" onClick={this.toggleModal}>Create Account</button>
              {/* newAccount Modal */}
              <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <NewAccount />
              </Modal>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Login;