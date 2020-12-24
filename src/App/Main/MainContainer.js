import { connect } from "react-redux";

// Component
import Main from './Main';


const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Main);