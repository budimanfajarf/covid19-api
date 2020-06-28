require('express-async-errors'); // it's for try catch automatically in async function
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const error = require('./middleware/error');

const mainRouter = require('./routes/main');
const countryRouter = require('./routes/countries');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/countries', countryRouter);
app.use(error)

module.exports = app;
