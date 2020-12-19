import React from 'react';

// Components:
import MainNav from '../MainNav/MainNavContainer';
import SideBar from '../SideBar/SideBar';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <MainNav />
        <SideBar />
      </>
    )
  }
}

export default Main;