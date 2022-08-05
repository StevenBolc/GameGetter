const router = require('express').Router();
const { User, Videogame } = require('../models');
const withAuth = require('../utils/auth');
const asyncHandler = require('express-async-handler');

router.get('/', withAuth, asyncHandler(async (req, res) => {
    // find all games in user owned 
    res.json({ message: 'get successful' })
}));

module.exports = router;