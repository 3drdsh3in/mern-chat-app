import io from 'socket.io-client';

// Invoke this function to return the corresponding socket-middleware.
const createSocketMiddleware = () => {
    let socket;
    console.log(socket);    // Socket Middleware
    // storeAPI has 'getState' and 'dispatch' as it's fields here.
    // (Could also use ({dispatch, getState}) in place of 'storeAPI' here)
    return storeAPI => next => action => {
        switch (action.type) {
            // Must dispatch 'LOGIN' action to instantiate socket endpoint.
            case "INITIALIZE_CLIENT": {
                // Connect with server.
                socket = io();
                // Save socket id to redux store (to be persisted across different tabs for checking).
                socket.on("connect", () => {
                    storeAPI.dispatch({
                        type: 'ADD_CLIENT',
                        payload: socket.id
                    })
                })
                // Client connectivity ends:
                socket.on('disconnect', () => {
                    storeAPI.dispatch({
                        type: 'REMOVE_CLIENT',
                        payload: socket.id
                    })
                })
                socket.on('reconnect', () => {
                    storeAPI.dispatch({
                        type: 'ADD_CLIENT',
                        payload: socket.id
                    })
                })
                /*
                START: Server => Client Endpoints:
                */
                socket.on("NEW_FRIEND_REQUEST", (message) => {
                    let state = storeAPI.getState();
                    // Modify acc_data the way the server intends:
                    let acc_data = state.AccountDetails.acc_data;
                    acc_data.acc_freqs.push(message.message);
                    // Dispatch to update Redux Store.
                    storeAPI.dispatch({
                        type: message.messageType,
                        payload: acc_data
                    });
                });

                socket.on("DELETE_FRIEND_REQUEST", (message) => {
                    let state = storeAPI.getState();
                    // Modify acc_data the way the server intends:
                    let acc_data = state.AccountDetails.acc_data;
                    acc_data.acc_freqs.splice(acc_data.acc_freqs.indexOf(message.message), 1);
                    // Dispatch to update Redux Store.
                    storeAPI.dispatch({
                        type: message.messageType,
                        payload: acc_data
                    });
                });

                socket.on("FR_ACCEPT", (message) => {
                    let state = storeAPI.getState();
                    let acc_data = state.AccountDetails.acc_data;
                    acc_data.acc_friends.push(message.message.fr_reciever_id);
                    console.log(message);
                    console.log(acc_data);

                    storeAPI.dispatch({
                        type: message.messageType,
                        payload: acc_data
                    })
                })

                socket.on("DELETE_FRIEND", (message) => {
                    let { AccountDetails } = storeAPI.getState();
                    // Modify for data needs:
                    let acc_friends = AccountDetails.acc_data.acc_friends;
                    let removeIdx = null;
                    acc_friends.map((friend, idx) => {
                        if (friend._id == message.message) {
                            removeIdx = idx;
                        }
                    })
                    if (!null) {
                        acc_friends.splice(removeIdx, 1);
                    }
                    AccountDetails.acc_data.acc_friends = acc_friends;

                    storeAPI.dispatch({
                        type: 'UPDATE_ACCOUNT_DETAILS',
                        payload: AccountDetails.acc_data
                    })
                })

                // Chat Groups:

                socket.on("NEW_GROUP", (message) => {
                    console.log('NEW GROUP:', message);
                    let { AccountDetails } = storeAPI.getState();
                    let acc_grps = AccountDetails.acc_data.acc_grps;
                    acc_grps.push(message.message);
                    AccountDetails.acc_data._acc_grps = acc_grps;
                    storeAPI.dispatch({
                        type: 'UPDATE_ACCOUNT_DETAILS',
                        payload: AccountDetails.acc_data
                    })
                })

                socket.on("NEW_MESSAGE", (message) => {
                    let { AccountDetails } = storeAPI.getState();
                    let acc_grps = AccountDetails.acc_data.acc_grps;
                    acc_grps.map((grp, idx) => {
                        if (grp._id == message.message.g_id) {
                            grp.g_messages.push(message.message);
                        }
                    })
                    // console.log(acc_grps);
                    AccountDetails.acc_data.acc_grps = acc_grps;
                    storeAPI.dispatch({
                        type: 'UPDATE_ACCOUNT_DETAILS',
                        payload: AccountDetails.acc_data
                    })
                })

                /*
                END: Server => Client Endpoints
                */

                // Server => Client Endpoint for handling server errors.
                socket.on("ERROR_MESSAGE", (err_message) => {
                    storeAPI.dispatch({
                        type: "SOCKET_ERROR_RECEIVED",
                        payload: err_message
                    });
                });
                break;
            }
            // Action to Logout:
            case 'REINITIALIZE_CLIENT': {
                socket.disconnect();
                // Move onto the next middleware or reducer to update state.
                return next(action);
            }
            // This endpoint can only be reached once LOGIN action is dispatched
            // to initialise the socket endpoint on the redux client.
            case 'SEND_WEBSOCKET_MESSAGE': {
                let { AccountDetails } = storeAPI.getState();
                socket.emit('JWT_AUTH', AccountDetails.token_data);
                socket.off('JWT_AUTH_SUCCESS');
                socket.on('JWT_AUTH_SUCCESS', () => {
                    socket.emit(action.eventName, action.payload);
                })
                // Do not move onto any further reducer actions.
                return;
            }
        }

        return next(action);
    }
}


export default createSocketMiddleware;