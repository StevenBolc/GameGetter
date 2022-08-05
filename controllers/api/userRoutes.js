const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const asyncHandler = require('express-async-handler');

router.post('/', asyncHandler(async (req, res) => {
    const dbUserData = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    req.session.save(() => {
        req.session.logged_in = true;

        res.status(200).json(dbUserData);
    });
}));

router.post('/login', asyncHandler(async (req, res) => {

    const userData = await User.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (!userData) {
        res
            .status(400)
            .json({ message: 'No matching email' });
        return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect password.' });
        return;
    }

    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });
}));

router.post('/logout', asyncHandler(async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.json({ message: 'logout successful' })
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const updateUserOwned = await User.findOne({ where: { user_id: req.session.user_id } })
}))

module.exports = router;