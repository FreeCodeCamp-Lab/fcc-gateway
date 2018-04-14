'use strict';

const request = require('request-agent');

const channel = async (service, req) => {

  let resp = await request.init()
    .url(`${process.env['FCC_SERVICE']}/${service}`)
    .method(req.method)
    .headers(Object.assign(req.headers, { host: process.env['FCC_SERVICE'].replace('http://', '') }))
    .query(req.query)
    .body(req.body)
    .send();

  return request.toJson(resp);
};

const proxy = (req, res) => {
  let [, , ...rest] = req.path.split('/');
  if (!process.env.SERVICES.split(',').includes(rest[0])) {
    res.status(400).json({
      error: 'NOT SUPPORT SERVICE'
    });
    return;
  }

  channel(rest.join('/'), req).then((v) => {
    res.status(200).json(v);
  }).catch((e) => {
    res.status(401).json({ error: e.message || '' });
  });
};




module.exports = {
  proxy,
};
