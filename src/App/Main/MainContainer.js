import { connect } from "react-redux";

// Component
import Main from './Main';

// Actions
import { addClientToStore, emitAccountDetails, initializeClient } from "./MainActions";


const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails,
  SocketErrorDetails: state.SocketErrorDetails,
  SideBarDetails: state.SideBarDetails,
  ClientDetails: state.ClientDetails
})

const mapDispatchToProps = (dispatch) => ({
  emitAccountDetails: (data) => dispatch(emitAccountDetails(data)),
  initializeClient: () => dispatch(initializeClient()),
  addClientToStore: (data) => dispatch(addClientToStore(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);