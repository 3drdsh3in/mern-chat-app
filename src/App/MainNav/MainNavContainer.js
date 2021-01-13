import { connect } from 'react-redux';

// Component:
import MainNav from './MainNav';

// Actions:
import { updateLogState } from '../_shared/actions/UpdateLogStateAction';
import { reInitializeStore } from '../_shared/actions/ReInitializeStoreAction';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})

const mapDispatchToProps = (dispatch) => ({
  // No data paramter/argument is needed for this
  reInitializeStore: () => dispatch(reInitializeStore()),
  updateLogState: (data) => dispatch(updateLogState(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);