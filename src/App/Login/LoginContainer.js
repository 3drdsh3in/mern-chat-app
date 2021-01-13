import { connect } from 'react-redux';

// Component
import Login from './Login';

// Action
import { storeAccountDetails, storeTokenDetails } from './LoginActions';
import { updateLogState } from '../_shared/actions/UpdateLogStateAction';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})
const mapDispatchToProps = (dispatch) => ({
  storeAccountDetails: (data) => dispatch(storeAccountDetails(data)),
  storeTokenDetails: (data) => dispatch(storeTokenDetails(data)),
  updateLogState: (data) => dispatch(updateLogState(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);