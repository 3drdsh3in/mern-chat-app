import { useState } from 'react';

import './TypingPopup.scss';

function TypingPopup({ users }) {

  const mapUsersToView = (users) => {
    let dispStr = '', maxIdx = 0;
    users.map((user, idx) => {
      if (idx <= 2) {
        if (idx < users.length - 1) { dispStr += `${user}, `; }
        else { dispStr += `${user} `; }
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
    users.length > 0
      ?
      <div className="t_popup" >
        <span>{mapUsersToView(users)}</span>
      </div>
      :
      null
  )
}

export default TypingPopup;