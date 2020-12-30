import io from 'socket.io-client';

// Invoke this function to return the corresponding socket-middleware.
const createSocketMiddleware = () => {
    let socket;
    // Socket Middleware
    // storeAPI has 'getState' and 'dispatch' as it's fields here.
    // (Could also use ({dispatch, getState}) in place of 'storeAPI' here)
    return storeAPI => next => action => {
        switch (action.type) {
            // Must dispatch 'LOGIN' action to instantiate socket endpoint.
            case "LOGIN": {
                // Connect with server.
                socket = io();
                /*
                START: Server => Client Endpoints:
                */
                socket.on("NEW_FRIEND_REQUEST", (message) => {
                    // Modify acc_data the way the server intends:
                    let state = storeAPI.getState();
                    let acc_data = state.AccountDetails.acc_data;
                    acc_data.acc_freqs.push(message.message);
                    // Dispatch to update Redux Store.
                    storeAPI.dispatch({
                        // May need to check whether it is a new:
                        // 1. Message
                        // 2. Group
                        // 3. Friend
                        // (So I'm suspecting an extra field may be required)
                        type: message.messageType,
                        payload: acc_data
                    });
                });

                socket.on("DELETE_FRIEND_REQUEST", (message) => {
                    // Modify acc_data the way the server intends:
                    let state = storeAPI.getState();
                    let acc_data = state.AccountDetails.acc_data;
                    acc_data.acc_freqs.splice(acc_data.acc_freqs.indexOf(message.message), 1);
                    // Dispatch to update Redux Store.
                    storeAPI.dispatch({
                        // May need to check whether it is a new:
                        // 1. Message
                        // 2. Group
                        // 3. Friend
                        // (So I'm suspecting an extra field may be required)
                        type: message.messageType,
                        payload: acc_data
                    });
                });

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
                console.log('REINIT CLIENT')
                socket.disconnect();
                // Move onto the next middleware or reducer to update state.
                return next(action);
            }
            // This endpoint can only be reached once LOGIN action is dispatched
            // to initialise the socket endpoint on the redux client.
            case "SEND_WEBSOCKET_MESSAGE": {
                console.log('SEND_WEBSOCKET_MESSAGE:', action)
                socket.emit(action.eventName, action.payload);
                // Do not move onto any further reducer actions.
                return;
            }
        }

        return next(action);
    }
}


export default createSocketMiddleware;