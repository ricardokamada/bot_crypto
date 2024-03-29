const Binance = require('node-binance-api');

module.exports = (settings) => {

    if(!settings) throw new Error('The settings objects is required tp connect on exchamge.')

    const binance = new Binance({
        APIKEY: settings.accessKey,
        APISECRET: settings.secretKey,
        urls : {
            base: settings.apiUrl.endsWith('/') ? settings.apiUrl : settings.apiUrl + '/',
            stream: settings.streamUrl.endsWith('/') ? settings.streamUrl : settings.streamUrl + '/'
        }
    })

    function balance(){
        return binance.balance();
    }

    function exchangeInfo(){
        return binance.exchangeInfo();
    }

    function miniTickerStream(callback){
        binance.websockets.miniTicker(markets => callback(markets));
    }

    function bookStream(callback){
        binance.websockets.bookTickers(order => callback(order));
    }

    function userDataStream(ballanceCallback, executionCallback, ListStatusCallback){
        binance.websockets.userData(
            balance => ballanceCallback(balance),
            executionData => executionCallback(executionData),
            subscribeData => console.log(`userDataStream:subscribed: ${subscribeData}`),
            listStatusData => ListStatusCallback(listStatusData)
        )
    }

    return {
        exchangeInfo,
        miniTickerStream,
        bookStream,
        userDataStream,
        balance
    }
}