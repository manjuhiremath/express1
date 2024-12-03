const express = require('express');
const path = require('path');

const router = express.Router();

// /shop/ => GET
router.get('/', (req, res) => {
    res.send('<h1>Welcome to the Shop!</h1>');
});

module.exports = router;
