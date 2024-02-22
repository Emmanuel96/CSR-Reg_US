const express = require('express');
const router = express.Router();
const MailController = require('../controllers/MailController')

router.post('/api/application/completed', MailController.notify_completion);

router.post('/api/application/updated', MailController.notify_update);

module.exports = router