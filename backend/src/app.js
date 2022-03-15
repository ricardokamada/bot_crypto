const express = require('express');
const authMiddleware = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
const settingsController = require('./controllers/settingsController');





require('express-async-errors'); //captura erros asyncronos e joga para o midleware error !
const cors = require('cors');
const helmet = require('helmet');

const app = express(); //inicia o express

app.use(cors()); //cors permite q o front envie requisicoes para o back

app.use(helmet()); //helmet e um middlware que protege contra 11 ataques basicos

app.use(express.json()); // permite o body parse em varios formatos


app.post('/login', authController.doLogin);

app.get('/settings', authMiddleware, settingsController.getSettings);

app.post('/logout', authController.doLogout);

app.use(require('./middlewares/errorMiddleware'));

module.exports = app;



/**
app.use('/', (req, res, next) => {
    res.send("OLA MUNDO");
})
 tudo inicia em app, e todos irao ter requisicao req, resposta res, e next que e a proxima etapa do middware a ser executado. 



 app.use((error, req, res) => {
    console.error(error);
}) midlleware de erro !!! tem q ficar por ultimo
 **/
