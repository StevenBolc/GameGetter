const router = require('express').Router();
const { User, Videogame } = require('../models');
const withAuth = require('../utils/auth');
const asyncHandler = require('express-async-handler');
const toSlug = require("../utils/helpers");
const { Op } = require("sequelize");
const sequelize = require('../config/connection');
const axios = require('axios').default;
require('dotenv').config();

router.get('/', asyncHandler(async (req, res) => {
    // res.json({ message: 'get request successful' })
    res.render('homepage');
}));

router.get('/gamesearch/:game', asyncHandler(async (req, res) => {
    try {
        // basic search route working with slugs
        const gamesData = await Videogame.findAll({
            where: {
                slug: {
                    [Op.substring]: req.params.game,
                }
            },
            // include: [{
            //     attributes: ['name', 'platform', 'year_of_release', 'publisher', 'background_image', 'website']
            // }]

        })
        const games = gamesData.map((games) => games.get({ plain: true }));
        console.log(games);
        if (games.length === 0) {
            res.render('notFound', {
                layout: '404.handlebars'
            });
        } else {
            // res.json(games);
            res.render('searchResults', {
                layout: 'search.handlebars',
                games
            })
        };
        //will need to render results through handlebars
    } catch (error) {
        res.status(500).json({ message: 'not found' })
        res.json()
    }
}))

router.get('/about', (req, res) => {
    res.render('aboutUs', {
        layout: 'contact.handlebars'
    })
    // res.json({ message: 'success' })
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('loginPage', {
        layout: 'main.handlebars'
    });
    // res.json({ message: 'welcome' })
});

router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.json({ message: 'logout successful' })
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/signup', asyncHandler(async (req, res) => {
    res.render('signupPage');
}));

// router.get('/dashboard', withAuth, asyncHandler(async (req, res) => {
//     res.json({ message: 'get request successful' })
// res.render('dashboard');
// add withAuth
// }));

router.get('/game/:id', asyncHandler(async (req, res) => {
    try {
        const gameData = await Videogame.findByPk(req.params.id, {
            where: {
                id: req.params.id
            },
            attributes: ['id', 'name', 'platform', 'year_of_release', 'description', 'genre', 'publisher', 'background_image', 'website']
        });
        const game = gameData.get({ plain: true });
        // res.json(game);
        res.render('game', {
            layout: 'gamepage.handlebars',
            game
        });
    } catch (err) {
        res.status(500).json(err);
    }
}));

router.post('/combine', asyncHandler(async (req, res) => {
    const videogames = await Videogame.findAll();  //used for data entry ---> { offset: int, limit: int }
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

                        name: slug.name,

                    },
                }
            )
        } catch (error) {
            console.error(error)
        }
    })
    res.json({ message: 'post request successful' });
}));

// Slugs all of the names in our local db
// router.get('/description', asyncHandler(async (req, res) => {
//     const allSlugs = Videogame.findAll();
//     const slugs = await allSlugs.map(game => {
//         const gameSlugs = game.slug;
//         return {
//             slug: gameSlugs,
//         }
//     });
// }));

// async function apiReqwithSlug() {
//     const allSlugs = await Videogame.findAll({
//         // offset: //int, limit: //int
//     });
//     const slugArr = allSlugs.map(eachSlug => {
//         const x = eachSlug.slug // Instead of slug: "wii-sports" it is logging "wii-sports"
//         console.log(x);
//         axios
//             .get(`http://api.rawg.io/api/games/${x}?key=${process.env.RAWG_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
//             .then((response) => {
//                 Videogame.update(
//                     {
//                         description: response.data.description,
//                         background_image: response.data.background_image,
//                         website: response.data.website
//                     },
//                     {
//                         where: {
//                             slug: x,
//                         }
//                     });
//             })
//             .then((response) => { console.log(response) })
//             .catch((error) => console.log(error));
//     })
// }
// apiReqwithSlug();

module.exports = router;

// router.get()