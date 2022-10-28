require('dotenv').config();
const express = require("express");
const app = express();
const routes = require('./index');

app.use('/', routes); // 라우터 등록

app.listen(process.env.PORT, () => {
    console.log("서버를 가동합니다");
  });