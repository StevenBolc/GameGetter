const router = require('express').Router();
const { User, Videogame } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.json({ message: 'get request successful' })
    // res.render('homepage');
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.json({ message: 'get request successful' })
    // res.render('login');
});

router.get('/signup', (req, res) => {
    res.json({ message: 'get request successful' })
    // res.render('signup');
});

router.get('/dashboard', (req, res) => {
    res.json({ message: 'get request successful' })
    // res.render('dashboard');
    // add withAuth
})

module.exports = router;