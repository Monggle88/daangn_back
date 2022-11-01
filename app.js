require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const HTTPS = require('https');
const port = process.env.PORT;
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

try {
  const option = {
    ca: fs.readFileSync('/etc/letsencrypt/live/{myurl}/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/{myurl}/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/{myurl}/cert.pem'),
  };

  HTTPS.createServer(option, app).listen(port, () => {
    console.log('HTTPS 서버가 실행되었습니다. 포트 :: ' + port);
  });
} catch (error) {
  app.listen(port, () => {
    console.log('HTTP 서버가 실행되었습니다. 포트 :: ' + port);
  });
}
