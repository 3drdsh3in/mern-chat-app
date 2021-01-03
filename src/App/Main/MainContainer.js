import { connect } from "react-redux";

// Component
import Main from './Main';

// Actions
import emitAccountDetails from "./MainActions";


const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails,
  SideBarDetails: state.SideBarDetails
})

const mapDispatchToProps = (dispatch) => ({
  emitAccountDetails: (data) => dispatch(emitAccountDetails(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);