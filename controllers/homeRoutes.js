const router = require('express').Router();
const { Videogame } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage');
})

module.exports = router;