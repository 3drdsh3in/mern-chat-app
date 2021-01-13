import { connect } from 'react-redux';

import App from './App';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App);