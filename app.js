require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/error-hander.middleware');
const routes = require('./index');

app.use(express.json());
app.use(cookieParser());
app.use('/', routes);
app.use(errorLogger);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log('서버를 가동합니다');
});
