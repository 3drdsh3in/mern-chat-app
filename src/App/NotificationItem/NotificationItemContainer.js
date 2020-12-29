import { connect } from 'react-redux';

// Actions
import { acceptFriendRequest, rejectFriendRequest } from './NotificationItemActions';

// Components:
import NotificationItem from './NotificationItem';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})

const mapDispatchToProps = (dispatch) => ({
  acceptFriendRequest: (data) => dispatch(acceptFriendRequest(data)),
  rejectFriendRequest: (data) => dispatch(rejectFriendRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);