const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
const verifyJWT = require('../middleware/verifyJWT')
router.route('/')
    .get(postsController.getAllPosts)
    
router.route('/')
    .post( verifyJWT ,postsController.upload.single('image'),postsController.createNewPost)

router.route('/:id')
    .get(postsController.getPost)
    .delete( postsController.deletePost);

router.route('/update/:id')
    .put( verifyJWT ,postsController.upload.single('image'),postsController.updatePost)


module.exports = router;