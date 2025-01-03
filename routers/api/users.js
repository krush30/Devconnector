const express = require('express');
const router = express.Router();
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const { check, validationResult } = require('express-validator')
//Bringing Model
const User = require('../../modals/user')


router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('email', 'Enter valid password').isLength({
        min: 6
    })
], async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        name, email, password
    } = req.body;

    try {
        //Check if user exists

        let user = await User.findOne({
            email

        })
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }

        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name, email, avatar, password
        })

        // Encrypt Password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save()


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