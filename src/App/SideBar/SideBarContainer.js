import { connect } from 'react-redux';

// Component:
import SideBar from './SideBar';

import { updateSelectedChatItem } from './SideBarActions';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails,
  chat_messages: state.chat_messages,
  SideBarDetails: state.SideBarDetails
})

const mapDispatchToProps = (dispatch) => ({
  updateSelectedChatItem: (data) => dispatch(updateSelectedChatItem(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);