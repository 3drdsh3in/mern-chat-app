import {connect} from 'react-redux';

// Components:
import ChatItem from './ChatItem';

const mapStateToProps = (state) => ({
  chat_messages: state.chat_messages
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(ChatItem);