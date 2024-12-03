const express = require('express');
const path = require('path');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', (req, res) => {
    res.send(`
        <form action="/admin/add-product" method="POST">
            <h1>Welcome to Add Product Page!</h1>
            <label>Product Title:</label>
            <input name="title" type="text" required />
            <br>
            <label>Product Size:</label>
            <input name="size" type="text" required />
            <br>
            <button type="submit">Submit</button>
        </form>
    `);
});

// /admin/add-product => POST
router.post('/add-product', (req, res) => {
    console.log('Form Data:', req.body); // Logs { title: 'value', size: 'value' }
    res.redirect('/shop');
});

module.exports = router;
