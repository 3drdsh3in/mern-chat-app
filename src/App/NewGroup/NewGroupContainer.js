import { connect } from 'react-redux';

import NewGroup from './NewGroup';

// Actions:
import { createNewGroup } from './NewGroupActions';

const mapStateToProps = (state) => ({
  AccountDetails: state.AccountDetails
})

const mapDispatchToProps = (dispatch) => ({
  createNewGroup: (data) => dispatch(createNewGroup(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);