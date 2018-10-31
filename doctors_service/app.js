const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const apiRoutes = require('./routes/api');
const allowCORS = require('./middlewares/allowCORS');

app.use(bodyParser.json());
app.use(allowCORS);

apiRoutes(app);

app.listen(config.get('app.port'), () => console.log(`Doctors Service Working on http://127.0.0.1:${config.get('app.port')}`));
