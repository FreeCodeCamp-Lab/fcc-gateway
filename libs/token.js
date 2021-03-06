'use strict';

const crypto = require('crypto');

const md5 = (data) => {
  let Buffer = require("buffer").Buffer;
  let buf = new Buffer(data);
  let str = buf.toString("binary");
  let md5sum = crypto.createHash('md5');
  md5sum.update(str);
  data = md5sum.digest('hex');
  return data;
};

module.exports = (user)=>{
  return md5(`${user.email}${Date.now()}`);
}