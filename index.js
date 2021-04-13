'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const logger = require('./utilities/logger');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
require('./utilities/body-parser')(app);
require('./utilities/request-logger')(app);
require('./routes')(app);

const server = app.listen(port, () => {
  logger.info(`Test App API listening on port ${port}`);
});
