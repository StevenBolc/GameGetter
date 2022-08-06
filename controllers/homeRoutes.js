const router = require('express').Router();
const { User, Videogame } = require('../models');
const withAuth = require('../utils/auth');
const asyncHandler = require('express-async-handler');
const toSlug = require("../utils/helpers");
const { Op } = require("sequelize");

router.get('/', asyncHandler(async (req, res) => {
    res.json({ message: 'get request successful' })
    // res.render('homepage');
}));

router.get('/login', asyncHandler(async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.json({ message: 'get request successful' })
    // res.render('login');
}));

router.get('/signup', asyncHandler(async (req, res) => {
    res.json({ message: 'get request successful' })
    // res.render('signup');
}));

router.get('/dashboard', asyncHandler(async (req, res) => {
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
                        [Op.between]: [9001, 10000],
                        name: slug.name
                    },
                }
            )
        } catch(error) {
            console.error(error)
        }
    })
    res.json({ message: 'post request successful' });
}));

module.exports = router;