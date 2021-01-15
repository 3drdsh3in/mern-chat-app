import { useState } from 'react';

import './TypingPopup.scss';

function TypingPopup({ AccountDetails, SideBarDetails, TypingPopupDetails }) {

  let client_grps = AccountDetails.acc_data.acc_grps;
  let selectedGroupIdx = SideBarDetails.selectedChatItem - 1;
  let selectedGrpId = client_grps[selectedGroupIdx]._id;

  let typingClients = TypingPopupDetails.typingClients;
  let viewedTypingClients = []
  typingClients.map((typingClient) => {
    console.log(typingClient.acc_id);
    console.log(AccountDetails.acc_data._id);
    if (typingClient.g_id == selectedGrpId && typingClient.acc_id !== AccountDetails.acc_data._id) {
      viewedTypingClients.push(typingClient);
    }
  })


  const mapUsersToView = (typingClients) => {
    let dispStr = '', maxIdx = 0;
    typingClients.map((user, idx) => {
      if (idx <= 2) {
        if (idx < typingClients.length - 1) { dispStr += `${user.emitter}, `; }
        else { dispStr += `${user.emitter} `; }
      }
      maxIdx = idx;
    })
    if (maxIdx === 0) {
      dispStr += 'is typing...';
    }
    else if (maxIdx >= 3) {
      dispStr += `and ${maxIdx - 2} others are typing...`;
    }
    else {
      dispStr += 'are typing...';
    }
    return dispStr;
  }

  return (
    viewedTypingClients
      ?
      (viewedTypingClients.length > 0
        ?
        <div className="t_popup" >
          <span>{mapUsersToView(viewedTypingClients)}</span>
        </div>
        :
        null)
      :
      null
  )
}

export default TypingPopup;