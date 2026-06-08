const express = require('express');
const router = express.Router();

const {
    getPosts,
    getPost,
    getMyPosts,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');

const { protect } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);

// Protected routes
router.get('/user/myposts', protect, getMyPosts);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
