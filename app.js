require('express-async-errors'); // it's for try catch automatically in async function
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { notFound, errorHandler } = require('./middleware/error');

const mainRouter = require('./routes/main');
const v1Router = require('./routes/v1');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/v1', v1Router);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
