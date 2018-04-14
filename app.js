'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const env = require('dotenvr').load('.env');

Object.assign(process.env, env);

const router = require('./routes');

const app = express();

//处理静态文件
let options = {
  //more options
};
app.use(express.static('public', options));

// 加载用于解析 cookie 的中间件
app.use(cookieParser());
// 加载body解释器
app.use(bodyParser());

//业务路由
app.use('/fcc-gateway', router);

//错误处理
//404
app.use((req, res, next) => {
  res.status(404).end();
});
//500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//listen
let port = process.env.PORT || 3000;
app.listen(port, (e, r) => {
  console.log(`listen on :${port}`);
});