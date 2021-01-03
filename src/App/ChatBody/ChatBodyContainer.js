import {connect} from 'react-redux';

// Component
import ChatBody from './ChatBody';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(ChatBody);