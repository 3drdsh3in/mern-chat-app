import { connect } from 'react-redux';

// Components
import FriendSearch from './FriendSearch';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(FriendSearch);