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
                socket = io();

                console.log(storeAPI.getState());

                socket.on("message", (message) => {
                    storeAPI.dispatch({
                        // May need to check whether it is a new:
                        // 1. Message
                        // 2. Group
                        // 3. Friend
                        // (So I'm suspecting an extra field may be required)
                        type: "SOCKET_MESSAGE_RECEIVED",
                        payload: message
                    });
                });
                break;
            }
            // This endpoint can only be reached once LOGIN action is dispatched
            // to initialise the socket endpoint on the redux client.
            case "SEND_WEBSOCKET_MESSAGE": {
                socket.send(action.payload);
                return;
            }
        }

        return next(action);
    }
}


export default createSocketMiddleware;