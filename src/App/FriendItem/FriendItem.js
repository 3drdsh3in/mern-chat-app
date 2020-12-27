import './FriendItem.scss';

function FriendItem({ userName, fname, lname, friendStatus }) {
  
  return (
    <>
      <div className="frienditem">
        <div className="frienditem-header">
          <h6>{userName}</h6>
          <p>{fname}{" "}{lname}</p>
        </div>
        <button className="frienditem-icon">
          {
            <>
              {friendStatus == 'UNSENT'
                ?
                <i className="fas fa-user-plus"></i>
                :
                (
                  friendStatus == 'SENT'
                    ?
                    <i className="fas fa-check"></i>
                    :
                    (
                      friendStatus == 'FRIENDS'
                        ?
                        <i class="fas fa-user-minus"></i>
                        :
                        null
                    )
                )
              }


            </>
          }
        </button>
      </div>
    </>
  )
}

export default FriendItem;