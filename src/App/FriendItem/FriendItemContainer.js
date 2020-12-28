import { connect } from 'react-redux';

// Actions:
import { sendFriendReq, deleteFriendReq, removeFriend } from './FriendItemActions';

// Component:
import FriendItem from './FriendItem';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})

const mapDispatchToProps = (dispatch) => ({
  sendFriendReq: (data) => dispatch(sendFriendReq(data)),
  deleteFriendReq: (data) => dispatch(deleteFriendReq(data)),
  removeFriend: (data) => dispatch(removeFriend(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FriendItem);