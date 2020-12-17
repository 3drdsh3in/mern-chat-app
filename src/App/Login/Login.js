import React from 'react';
import './Login.scss';
import { Modal} from 'reactstrap';

// Child Components:
import NewAccount from '../NewAccount/NewAccount';

import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Login
      userName: "",
      password: "",

      // Modal
      modal: false,
    };
    // Login Request Handler
    this.handleLogin = this.handleLogin.bind(this);
    // Modal Trigger
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleLogin(event) {
    // 1. Verify the account username exists (/w the corresponding password).
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
        // If Succesful:
        // Save account details to redux state.

        // Redirect to Messaging Page.

        // If Unsuccesfful:
        // Trigger Alert/Feedback
      })
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

  // Handles Modal Triggering
  toggleModal() {
    console.log(!this.state.modal);
    this.setState({ modal: !this.state.modal })
  }

  render() {
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
                <NewAccount />
            </Modal>
          </div>
        </div>
      </div >
    )
  }
}

export default Login;