import { connect } from 'react-redux';

// Component:
import SideBar from './SideBar';

import {getChatData} from './SideBarActions';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails,
  chat_messages: state.chat_messages
})

const mapDispatchToProps = (dispatch) => ({
  getChatData: (url) => dispatch(getChatData(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);