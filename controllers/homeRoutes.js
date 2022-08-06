const router = require('express').Router();
const { User, Videogame } = require('../models');
const withAuth = require('../utils/auth');
const asyncHandler = require('express-async-handler');
const toSlug = require("../utils/helpers");
const { Op } = require("sequelize");

router.get('/', asyncHandler(async (req, res) => {
    // res.json({ message: 'get request successful' })
    res.render('homepage');
}));

router.get('/:game', asyncHandler(async (req, res) => {
    try {
        // basic search route working with slugs
        const games = await Videogame.findAll({
            where: {
                slug: {
                    [Op.substring]: req.params.game,
                }
            },
            // include: [{
            //     attributes: ['name', 'platform', 'year_of_release', 'publisher', 'background_image', 'website']
            // }]

        })
        res.json(games);
        //will need to render results through handlebars
    } catch (error) {
        res.status(500).json({ message: 'not found' })
        res.json()
    }
}))

router.get('/login', asyncHandler(async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
}));

router.get('/signup', asyncHandler(async (req, res) => {
    res.render('signup');
}));

router.get('/dashboard', withAuth, asyncHandler(async (req, res) => {
    res.json({ message: 'get request successful' })
    // res.render('dashboard');
    // add withAuth
}));

router.post('/combine', asyncHandler(async (req, res) => {
    const videogames = await Videogame.findAll();
    const slugs = videogames.map(game => {
        const gamename = game.name;
        return {
            name: gamename,
            slug: toSlug(gamename),
        }
    });
    slugs.forEach(async (slug) => {
        try {
            await Videogame.update(
                { slug: slug.slug },
                {
                    where: {
                        // [Op.between]: [9001, 10000],
                        name: slug.name
                    },
                }
            )
        } catch (error) {
            console.error(error)
        }
    })
    res.json({ message: 'post request successful' });
}));

module.exports = router;