const router = require('express').Router();
const { User, Videogame } = require('../models');
const withAuth = require('../utils/auth');
const asyncHandler = require('express-async-handler');
const Mygames = require('../models/Mygames');

router.get('/', async (req, res) => {
    // find all games in user owned 
    try {

        const myGames = await Mygames.findAll({
            where: {
                user_id: req.session.user_id
            },
            // attributes: [
            //     'name',
            //     'description',
            //     'platform',
            //     'background_image',
            //     'website',
            // ],
            include: [
                {
                    model: Videogame,
                    attributes: ['id', 'name', 'platform', 'year_of_release', 'genre', 'publisher', 'description', 'background_image', 'website'],
                    include: {
                        model: User,
                        attributes: ['id'],
                    },
                },
            ],
        });
        const games = myGames.map((game) => game.get({ plain: true }));
        console.log(games);
        res.render('myList', {
            layout: 'dashboard.handlebars',
            games,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }

    // res.json({ message: 'get successful' })
});

module.exports = router;