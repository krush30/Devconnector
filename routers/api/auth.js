const express = require('express');
const router = express.Router();
//using custom middleware
const auth = require('../../middleware/auth')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const { check, validationResult } = require('express-validator')

const User = require('../../modals/user')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')

    }
});

//Authenticate user and get token
router.post('/', [

    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        email, password
    } = req.body;

    try {
        //Check user credentials

        let user = await User.findOne({
            email

        })
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })
        }

        //Check user password

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] })

        }

        //Return Jsonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            })




    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')

    }
});

module.exports = router;