'use strict';

const request = require('request-agent');

const { FailGetTokenError } = require('../errors');

const CLIENT_ID = process.env.CLIENT_ID;

const CLIENT_SECRET = process.env.CLIENT_SECRET;

module.exports = {
  getAccessToken: async (code) => {
    let URL = 'https://github.com/login/oauth/access_token';
    let resp = await request.reset()
      .method('post')
      .url(URL)
      .headers({
        'accept': 'application/json'
      })
      .body({
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'code': code,
        'state': 'fcc_',
        'redirect_uri': process.env.REDIRECT_URL
      })
      .send();
    let body = request.toJson(resp)
    if (!body['access_token']) {

      throw new FailGetTokenError(`code: ${code}`);
    }
    return body['access_token'];
  },
  getUser: async (accessToken) => {
    let URL = `https://api.github.com/user?access_token=${accessToken}`;
    let resp = await request.reset()
      .url(URL)
      .method('get')
      .headers({
        'accept': 'application/json',
        'User-Agent':'fcc-app'
      })
      .send();
    return request.toJson(resp);
  }
};