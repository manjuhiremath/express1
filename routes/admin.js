const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
// /admin/add-product => GET
router.get('/add-product', (req, res) => {
    res.status(200).sendFile(path.join(__dirname,'../','views','add-product.html'))
});

// /admin/add-product => POST
router.post('/add-product', (req, res) => {
    console.log('Form Data:', req.body); // Logs { title: 'value', size: 'value' }
    res.redirect('/shop');
});

module.exports = router;
