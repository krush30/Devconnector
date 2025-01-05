const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
//used to request something
const request = require('request')
const config = require('config')


const Profile = require('../../modals/Profile')
const User = require('../../modals/user')
const Post = require('../../modals/Post')



// endpoints api/profile/me
// get current users profile and it is private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({
                msg:
                    "There is no profile for this user"
            })
        }
        res.json(profile)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')

    }
});

// Post api/profile
// create or update user profile and it is private

router.post('/', [auth,
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty()], async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;


        // Build profile obj
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim());
        console.log(profileFields.skills);

        // Build social obj
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        console.log(req.body);

        //Update
        try {
            let profile = await Profile.findOne({ user: req.user.id })
            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate({ user: req.user.id },
                    { $set: profileFields },
                    { new: true })

                return res.json(profile);
            }
            console.log('Request body:', req.body);

            // Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');

        }

    })


// get api/profile
// Get all profile and it is publics
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']); // Fetch all profiles
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// get api/profile/user/user_id
// Get profile by user and it is publics
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.find({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
        if (!profile) return res.status(400).json({ msg: "there is not profile for this user" })
        res.json(profile)

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            res.status(400).json({ msg: "there is not profile for this user" })
        }
        res.status(500).send('server error')


    }
})

// Delete api/profile
//Delete profile , user and posts
// Private
router.delete('/', auth, async (req, res) => {

    try {
        // Remove User Posts
        await Post.deleteMany({ user: req.user.id })

        // Remove profile
        await Profile.findOneAndDelete({ user: req.user.id })
        // Remove User
        await User.findOneAndDelete({ _id: req.user.id })

        res.json({ msg: "User removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Put api/profile/experience
// Add Profile experience
router.put('/experience', [auth,
    check('title', 'title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'Fromdate is required').not().isEmpty(),


], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        title,
        company,
        location,
        from,
        to,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);

        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')


    }

})
// Delete api/profile/experience/:exp_id
// Delete Profile experience
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')


    }
})

// Put api/profile/education
// Add Profile education
router.put('/education', [auth,
    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('fieldofstudy', 'field of study is required').not().isEmpty(),
    check('from', 'from Date is required').not().isEmpty()


], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);

        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')


    }

})

// Put api/profile/education/:edu_id
// Add Profile education
router.delete('/education/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')


    }
})

// Put api/profile/github/:username
// Get user repositories from github
router.get('/github/:username', (req, res) => {
    try {

        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id${config.get('githubClientId')}&client_secret=${config.get('githubsecrete')}`,
            method: "GET",
            headers: { 'User-Agent': 'node.js' }
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No github profile found' })
            }

            res.json(JSON.parse(body))

        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})
module.exports = router;