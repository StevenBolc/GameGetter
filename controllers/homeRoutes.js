const router = require('express').Router();
const { User, Videogame } = require('../models');
const withAuth = require('../utils/auth');
const asyncHandler = require('express-async-handler');
const toSlug = require("../utils/helpers");
const { Op } = require("sequelize");
const { response } = require('express');
const sequelize = require('../config/connection');
const axios = require('axios').default;
require('dotenv').config();

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

// --We need to SELECT slug FROM videogames and store it in a variable we can access.
// --If done correctly, it should look like this:
// -- const allSlugs = { { slug: "wii-sports"}, { slug: "mario-party"} };
// --Using map or a loop, iterate over this object for each slug value. 
// DONE --> Plug that value into an axios request that grabs the description, background_image, and website. 
// DONE --> Test out if everything works by console.logging the results
// --If successful, we can drop these received results into a dummy table called apiResponses.
// --We will need to build a temporary model called apiResponse that has slug, description, background_image, and website inside with the appropriate DataTypes(should match Videogame.js).
// --Once the data is inserted into the table apiResponses, Tyler will convert that table data to a CSV, and copy and paste the three columns we want into our videogames.csv file's empty columns. 
// --When we have a complete CSV file that includes description, background_image, and website, we can import that data into videogames.
// --If successful, we are all done!

// router.get('/description', asyncHandler(async (req, res) => {
//     const allSlugs = Videogame.findAll();
//     const slugs = await allSlugs.map(game => {
//         const gameSlugs = game.slug;
//         return {
//             slug: gameSlugs,
//         }
//     });
//     slugs.forEach(async (slug) => {
let slug = "pokemon-red";
        axios
            .get(`http://api.rawg.io/api/games/${slug}?key=${process.env.RAWG_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
            .then((response) => console.log(response.data.description, response.data.background_image, response.data.website))
            .catch((error) => console.log(error));
//     },
//     )
// }));



module.exports = router;