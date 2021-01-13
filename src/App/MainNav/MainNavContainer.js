import { connect } from 'react-redux';

// Component:
import MainNav from './MainNav';

// Actions:
import { resetClientStore } from './MainNavActions';
import { updateLogState } from '../_shared/actions/UpdateLogStateAction';
import { reInitializeStore } from '../_shared/actions/ReInitializeStoreAction';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})

const mapDispatchToProps = (dispatch) => ({
  // No data paramter/argument is needed for this
  reInitializeStore: () => dispatch(reInitializeStore()),
  updateLogState: (data) => dispatch(updateLogState(data)),
  resetClientStore: () => dispatch(resetClientStore())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);