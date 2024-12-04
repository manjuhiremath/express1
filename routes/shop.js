const express = require('express');
const path = require('path');

const router = express.Router();

// /shop/ => GET
router.get('/shop', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'../','views','shop.html'))
});

module.exports = router;
