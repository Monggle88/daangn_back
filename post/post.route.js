const express = require('express');
const router = express.Router();

const PostController = require('./post.controller');
const Uploader = require('../middlewares/imageUploadMiddleware');
const postController = new PostController();
const s3 = new Uploader();

router.get('/', postController.getPost);

router.post('/test', s3.upload.single('img'), postController.test);

module.exports = router;
