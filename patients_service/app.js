const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const apiRoutes = require('./routes/api');

app.use(bodyParser.json());

apiRoutes(app);

app.listen(config.get('app.port'), () => console.log(`Patient Service Working on http://127.0.0.1:${config.get('app.port')}`));
