const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
// get call for homepage

// home page will show header/nav bar and button option to login
router.get('/', async (req, res) => {
    try {
        res.render('homepage')
    } catch (err) {
        res.status(500).json(err);
    }
});

// get call for /posts page, this shows all posts
router.get('/posts', withAuth, async (req, res) => {
    try {
        const postData = await Post.findall({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        })
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('posts', { posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// single post page
router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id,
            { include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]});
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('posts', { posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get call for login page
router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }

        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;