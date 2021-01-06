import './WelcomeBody.scss';

function WelcomeBody({ accountDetails }) {

  return (
    <div className="welcome-body">
      <h3>
        Hi {accountDetails.acc_data.acc_usrname}, Welcome to MERN Chat!
      </h3>
      <p>
        This is a simple full-stack app that
        I built with in React-Redux along with a
        Websockets and a lean REST API
        because I had nothing better to do with my spare time
        and wanted to learn more about OSI Layer protocols. :)
      </p>
      <p>
        <a href="https://3drdsh3in.github.io">Portfolio Link <i className="fas fa-caret-right"></i></a>
        <br />
        <a href="https://github.com/3drdsh3in">Github Link <i className="fas fa-caret-right"></i></a>
      </p>
    </div>
  )
}

export default WelcomeBody;