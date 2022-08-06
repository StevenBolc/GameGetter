const router = require('express').Router();
const { User, Videogame } = require('../models');
const withAuth = require('../utils/auth');
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler(async (req, res) => {
    // find all games in user owned 
    try {

        const myGames = await Videogame.findAll({
            // where: {
            //     user_id: req.session.user_id
            // },
            attributes: [
                'name',
                'description',
                'platform',
                'background_image',
                'website',
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                },
            ],
        });
        const games = myGames.map((game) => game.get({ plain: true }));
        res.render('myList', {
            layout: 'dashboard.handlebars',
            games,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }

    // res.json({ message: 'get successful' })
}));

module.exports = router;