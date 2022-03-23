const database = require('./db');
const app = require('./app');
const appWs = require('./app-ws');
const settingsRepository = require('./repositories/settingsRepository');
const appEM = require('./app-em'); //EM = EXCHANGE MONITOR
const { settings } = require('./app');

settingsRepository.getDefaultSettings()
    .then(settings => {
        

        const server = app.listen(process.env.PORT, () => {
            console.log("App is runnning at " + process.env.PORT);
        })
        const wss = appWs(server);

        appEM(settings, wss);

    })
    .catch(err => {
        console.error(err);
    })


