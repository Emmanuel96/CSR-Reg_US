const express = require('express');
const router = express.Router();
const MediaController = require('../controllers/MediaController')

//Post routes
router.post('/api/media/upload/environment/:id', MediaController.media_upload_environment);

router.post('/api/media/upload/workplace/:id', MediaController.media_upload_workplace);

router.post('/api/media/upload/community/:id', MediaController.media_upload_community);

router.post('/api/media/upload/philanthropy/:id', MediaController.media_upload_philanthropy);

//router.post('/api/media/upload/further_information', MediaController.further_information)

// Get routes
router.get('/api/media/fetch/:id', MediaController.fetch_media);

//Delete routes
router.post('/api/media/delete/:id', MediaController.delete_media);

module.exports = router