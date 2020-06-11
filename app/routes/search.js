const express = require('express');

const searchController = require('../controllers/search');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/question/:queryString', searchController.searchQuestion);
router.post('/answer/:queryString', searchController.searchAnswer);
router.post('/user/:queryString', searchController.searchUser);

module.exports = router;
