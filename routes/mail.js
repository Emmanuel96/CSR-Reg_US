const express = require('express');


const router = express.Router();
const MailController = require('../controllers/MailController')

router.post('/api/application/completed/:id', MailController.notify_completion);

router.post('/api/application/updated/:id', MailController.notify_update);

module.exports = router