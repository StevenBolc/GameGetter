const router = require('express').Router();
const { User } = require('../../models');
const Mygames = require('../../models/Mygames');
const withAuth = require('../../utils/auth');
// const asyncHandler = require('express-async-handler');

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {

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
});

// router.post('/logout', async (req, res) => {
//     if (req.session.logged_in) {
//         req.session.destroy(() => {
//             res.json({ message: 'logout successful' })
//             res.status(204).end();
//         });
//     } else {
//         res.status(404).end();
//     }
// });

router.post('/mylist/:id', withAuth, async (req, res) => {
    try {
        // const userData = await User.findOne({
        //     where: {
        //         id: req.session.user_id,
        //     },
        // });
        console.log(req.session.user_id);
        const updateUserOwned = await Mygames.create({
            user_id: req.session.user_id,
            videogames_id: req.params.id,
        });
        // console.log(updateUserOwned);
        res.render('myList', {
            layout: 'dashboard.handlebars'
        });
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;