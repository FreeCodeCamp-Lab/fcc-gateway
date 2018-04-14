'use strict';
const githubUtils = require('../libs/github_utils');
const token = require('../libs/token');

const auth = (req, res) => {
  (async () => {
    let accessToken = await githubUtils.getAccessToken(req.query.code);
    let user = await githubUtils.getUser(accessToken);
    return user;
  })().then((user) => {
    if (process.env['WHITE_LIST'].includes(user.email)) {
      res.status(200).json({ 'token': token(user) });
    } else {
      res.status(403).json({ error: 'HTTP_FORBIDDEN' });
    }
  }).catch((e) => {
    res.status(401).json({ error: e.message || '' });
  });
};

module.exports = {
  auth,
};