import './FriendItem.scss';

function FriendItem({ userName, fname, lname, friendStatus }) {
  return (
    <>
      <div className="frienditem">
        <div className="frienditem-header">
          <h6>{userName}</h6>
          <p>{fname}{" "}{lname}</p>
        </div>
        <div className="frienditem-icon">
          {
            <>
              {friendStatus == 'UNSENT'
                ?
                <i className="fas fa-user-plus"></i>
                :
                (
                  friendStatus == 'PENDING'
                    ?
                    <i className="fas fa-check"></i>
                    :
                    (
                      friendStatus == 'ACCEPTED'
                        ?
                        <i class="fas fa-user-minus"></i>
                        :
                        null
                    )
                )
              }


            </>
          }
        </div>
      </div>
    </>
  )
}

export default FriendItem;