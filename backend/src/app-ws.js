const Websockets = require('ws');

function onMessage(data) {
    console.log(`onMessage: ${data}`);
}

function onError(err) {
    console.error(`onError: ${err.message}`);
}

function onConnection(ws, req) {
    ws.on('message', onMessage);
    ws.on('error', onError);
    console.log('onConnection');
}

module.exports = (server) => {
    const wss = new Websockets.Server({
        server
    });

    wss.on('connection', onConnection);
    console.log(`App Web Socket Server is running !`);
    return wss;
}