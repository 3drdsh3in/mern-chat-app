import React, { useState } from 'react';

import './NotificationItem.scss';

function NotificationItem(props) {

  const [notificationType, setNotificationType] = useState(props.notificationType);

  const acceptFriendRequest = () => {
    // Update the accepting user's redux store to correspond with the the database.
    props.addFriendToStore(props.senderData);
    props.acceptFriendRequest({
      reciever_id: props.AccountDetails.acc_data._id,
      sender_id: props.senderId
    });
    props.removeFriendReqFromStore({
      sender_id: props.senderId
    });
  }
  const rejectFriendRequest = () => {
    props.rejectFriendRequest({
      reciever_id: props.AccountDetails.acc_data._id,
      sender_id: props.senderId
    });
    props.removeFriendReqFromStore({
      sender_id: props.senderId
    });
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