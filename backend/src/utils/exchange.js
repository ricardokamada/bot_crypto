const Binance = require('node-binance-api');

module.exports = (settings) => {

    if(!settings) throw new Error('The settings objects is required tp connect on exchamge.')

    const binance = new Binance({
        APIKEY: settings.accessKey,
        APISECRET: settings.secretKey,
        urls : {
            base: settings.apiUrl.endsWith('/') ? settings.apiUrl : settings.apiUrl + '/'
        }
    })

    function exchangeInfo(){
        return binance.exchangeInfo();
    }

    return {
        exchangeInfo
    }
}