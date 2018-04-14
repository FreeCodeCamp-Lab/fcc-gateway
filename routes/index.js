const express = require('express');

const authController = require('../controllers/auth_controller');
const proxyController = require('../controllers/proxy_controller');

const router = express.Router();



router.get('/', authController.auth);

router.all('/proxy/*', proxyController.proxy);

module.exports = router;