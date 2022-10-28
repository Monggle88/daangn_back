const express = require("express");
const app = express();
const port = 4000;
const env = require('./.env');
const routes = require('./index');

app.use('/', routes); // 라우터 등록

app.listen(port, () => {
    console.log("서버를 가동합니다");
  });