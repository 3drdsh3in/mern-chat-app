import { connect } from 'react-redux';

// Actions:
import { leaveGroup, leaveGroupStore } from './ChatHeaderActions';

//Component:
import ChatHeader from './ChatHeader';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  leaveGroup: (data) => dispatch(leaveGroup(data)),
  leaveGroupStore: (data) => dispatch(leaveGroupStore(data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);