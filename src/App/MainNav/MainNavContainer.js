import { connect } from 'react-redux';

// Component:
import MainNav from './MainNav';

// Actions:
import {reInitializeStore} from './MainNavActions';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})

const mapDispatchToProps = (dispatch) => ({
  // No data paramter/argument is needed for this
  reInitializeStore: () => dispatch(reInitializeStore())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);