import { connect } from 'react-redux';

// Component:
import TypingPopup from './TypingPopup';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails,
  TypingPopupDetails: state.TypingPopupDetails,
  SideBarDetails: state.SideBarDetails
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TypingPopup);