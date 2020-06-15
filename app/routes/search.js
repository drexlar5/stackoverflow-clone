const express = require('express');

const searchController = require('../controllers/search');

const router = express.Router();

router.get('/question/:queryString', searchController.searchQuestion);
router.get('/answer/:queryString', searchController.searchAnswer);
router.get('/user/:queryString', searchController.searchUser);

module.exports = router;
