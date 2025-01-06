const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Profile = require('../../modals/Profile')
const User = require('../../modals/user')
const Post = require('../../modals/Post');
const { post } = require('request');


// Post api/posts
//create post
router.post('/', [auth,
    check('text', 'Text is required').not().isEmpty()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }


});
// GET api/posts
//Get all posts 
// Private because it needs to be logged in
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({
            //sort by latest
            date: -1
        })
        res.json(posts)


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

// Get post by ID
// api/post/:id
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        res.json(post)


    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error')
    }
})
// Delete Post api/post/:id
//Delete Post
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        // Check user
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        } else {
            await Post.deleteOne({ _id: req.params.id });
        }
        res.json({ msg: 'Post removed' })


    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error')
    }
})

// Put api/post/like/:id
// Like a post and it is private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'post already liked' })
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('Server error')
    }
})

// Unlike by id 

// Unlike a post
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post is not yet liked
        if (!post.likes.some(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post has not been liked' });
        }

        // Remove the like
        post.likes = post.likes.filter(like => like.user.toString() !== req.user.id);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server error');
    }
});


// Put api/post/comment/:id
// comment on a post and it is public
// Post api/posts
//create post
router.post('/comment/:id', [auth,
    check('text', 'text is required').not().isEmpty()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment);


        post.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }


});
// Delete Comment api/post/comment/:id/:comment_id
//Delete Comment
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' })
        }

        // Check user 
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        // Find index and delte
        const removeindex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeindex, 1)

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})
module.exports = router;