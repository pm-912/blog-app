const router = require('express').Router();
const { Post, Comment } = require('../../models');

// api call to update a post
// api call to update a comment
// call to delete a post
// call to delete a comment

//routes for api call to post a new post
router.post('/posts', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// api call to post a new comment to a specific post id
router.post('/post/:id', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;