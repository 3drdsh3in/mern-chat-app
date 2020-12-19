import { connect } from 'react-redux';

// Component
import Login from './Login';

// Action
import LoginActions from './LoginActions';

const mapStateToProps = (state) => ({
  acc_details: state.AccountDetails
})
const mapDispatchToProps = (dispatch) => ({
  storeAccountDetails: (data) => dispatch(LoginActions(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);