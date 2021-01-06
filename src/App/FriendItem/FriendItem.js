import React, { useState, useEffect } from 'react';
import './FriendItem.scss';

function FriendItem(props) {

  const [interactionState, setInteractionState] = useState(props.friendStatus);
  // 28 DEC 12:06 AM:
  // FOR SOME REASON THE SEARCH ICON DOES NOT 
  // RERENDER UPON CHANGE THE SEARCH BAR'S REGEX SEARCH EXPRESSION

  // useEffect(() => {
  //   console.log(props.friendStatus);
  //   console.log(interactionState);
  //   if (props.friendStatus !== interactionState) {
  //     console.log('--SET!--');
  //     setInteractionState(props.friendStatus);
  //   }
  // })

  const sendFriendReq = () => {
    props.sendFriendReq({
      sender_id: props.AccountDetails.acc_data._id,
      reciever_id: props.acc_id
    });
    setInteractionState('SENT');
  }
  const deleteFriendReq = () => {
    props.deleteFriendReq({
      sender_id: props.AccountDetails.acc_data._id,
      reciever_id: props.acc_id
    });
    setInteractionState('UNSENT');
  }
  const removeFriend = async () => {
    props.removeFriend({
      sender_id: props.AccountDetails.acc_data._id,
      reciever_id: props.acc_id
    });
    setInteractionState('UNSENT');
  }

  return (
    <>
      <div className="frienditem">
        <div className="frienditem-header">
          <h6>{props.userName}</h6>
          <p>{props.fname}{" "}{props.lname}</p>
        </div>

        {
          <>
            {interactionState == 'UNSENT'
              ?
              <button key={props.AccountDetails.acc_data._id + '_1'} onClick={sendFriendReq} className="frienditem-icon">
                <i className="fas fa-user-plus"></i>
              </button>

              :
              (
                interactionState == 'SENT'
                  ?
                  <button key={props.AccountDetails.acc_data._id + '_2'} onClick={deleteFriendReq} className="frienditem-icon">
                    <i class="fas fa-user-minus"></i>
                  </button>
                  :
                  (
                    interactionState == 'FRIENDS'
                      ?
                      <button key={props.AccountDetails.acc_data._id + '_3'} onClick={removeFriend} className="frienditem-icon">
                        <i className="fas fa-check"></i>
                      </button>
                      :
                      null
                  )
              )
            }
          </>
        }
      </div>
    </>
  )
}

export default FriendItem;