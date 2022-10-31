require('dotenv').config();
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const routes = require('./index');

app.use(express.json())
app.use(cookieParser())
app.use('/', routes); 

app.listen(process.env.PORT, () => {
    console.log("서버를 가동합니다");
  });