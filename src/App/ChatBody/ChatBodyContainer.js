import {connect} from 'react-redux';

// Actions
import {sendNewMessage} from './ChatBodyActions';

// Component
import ChatBody from './ChatBody';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})
const mapDispatchToProps = (dispatch) => ({
  sendNewMessage: (data) => dispatch(sendNewMessage(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(ChatBody);