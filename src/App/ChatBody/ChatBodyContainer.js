import { connect } from 'react-redux';

// Actions
import { sendNewMessage, emitTyping, emitNotTyping } from './ChatBodyActions';

// Component
import ChatBody from './ChatBody';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails,
  SideBarDetails: state.SideBarDetails
})
const mapDispatchToProps = (dispatch) => ({
  sendNewMessage: (data) => dispatch(sendNewMessage(data)),
  // sendNewMessage: (data) => sendNewMessage(data),
  emitTyping: (data) => dispatch(emitTyping(data)),
  emitNotTyping: (data) => dispatch(emitNotTyping(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBody);