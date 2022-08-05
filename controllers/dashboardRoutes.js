const router = require('express').Router();
const { User, Videogame } = require('../models');
const withAuth = require('../utils/auth');
const asyncHandler = require('express-async-handler');

module.exports = router;