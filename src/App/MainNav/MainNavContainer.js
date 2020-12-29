import { connect } from 'react-redux';

// Component:
import MainNav from './MainNav';

// Actions:

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);