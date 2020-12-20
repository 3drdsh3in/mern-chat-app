import { connect } from 'react-redux';

// Component:
import SideBar from './SideBar';

// import { connect } from 'react-redux'; => Dont need to import as it is a child of 'connect' imported in MainContainer.js

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);