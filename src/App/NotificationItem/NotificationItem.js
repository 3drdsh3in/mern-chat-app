import React, { useState } from 'react';

import './NotificationItem.scss';

function NotificationItem(props) {

  console.log(props);

  const [notificationType, setNotificationType] = useState(props.notificationType);

  const acceptFriendRequest = () => {

  }
  const rejectFriendRequest = () => {

  }

  return (
    <>
      {notificationType == 'FRIEND_REQUEST'
        ?
        <div className="notification-item">
          <div className="notification-item-header">
            <h6>{props.notificationTitle}</h6>
            <p>{props.notificationLabel}</p>
          </div>
          <div className="notification-item-icons">
            {/* Accept Friend Request */}
            <button onClick={acceptFriendRequest} className="notification-item-icons-item">
              <i className="fas fa-check-circle"></i>
            </button>
            {/* Delete Friend Request */}
            <button onClick={rejectFriendRequest} className="notification-item-icons-item">
              <i className="fas fa-times-circle"></i>
            </button>
          </div>
        </div>
        :
        null}
    </>
  )
}

export default NotificationItem;