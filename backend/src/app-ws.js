const Websockets = require('ws');
const jwt = require('jsonwebtoken');

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

function corsValidation(origin) {
    return process.env.CORS_ORIGIN.startsWith(origin);
}

function verifyClient(info, callback) {
    //cors
    if (!corsValidation(info.origin)) return callback(false, 401);

    return callback(true);
    //JWT
}

module.exports = (server) => {
    const wss = new Websockets.Server({
        server,
        verifyClient
    });

    wss.on('connection', onConnection);
    console.log(`App Web Socket Server is running !`);
    return wss;
}