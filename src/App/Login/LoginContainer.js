import { connect } from 'react-redux';

// Component
import Login from './Login';

// Action
import { storeAccountDetails, storeTokenDetails } from './LoginActions';

const mapStateToProps = (state) => ({
  acc_details: state.AccountDetails
})
const mapDispatchToProps = (dispatch) => ({
  storeAccountDetails: (data) => dispatch(storeAccountDetails(data)),
  storeTokenDetails: (data) => dispatch(storeTokenDetails(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);