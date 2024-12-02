const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
    console.log('Middleware for all requests');
    next();
});

app.use('/add-product', (req, res, next) => {
    res.send(`
        <form action="/product" method="POST">
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

app.use('/product', (req, res, next) => {
    console.log('Form Data:', req.body); // Logs { title: 'value', size: 'value' }
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Hello, good evening!</h1>');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
