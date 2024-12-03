// const express = require('express');
// const bodyParser = require('body-parser'); 

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/', (req, res, next) => {
//     console.log('Middleware for all requests');
//     next();
// });

// app.use('/add-product', (req, res, next) => {
//     res.send(`
//         <form action="/product" method="POST">
//             <h1>Welcome to Add Product Page!</h1>
//             <label>Product Title:</label>
//             <input name="title" type="text" required />
//             <br>
//             <label>Product Size:</label>
//             <input name="size" type="text" required />
//             <br>
//             <button type="submit">Submit</button>
//         </form>
//     `);
// });

// app.use('/product', (req, res, next) => {
//     console.log('Form Data:', req.body); // Logs { title: 'value', size: 'value' }
//     res.redirect('/');
// });

// app.use('/', (req, res, next) => {
//     res.send('<h1>Hello, good evening!</h1>');
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin'); // Admin routes
const shopRoutes = require('./routes/shop');   // Shop routes

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/admin', adminRoutes); // Filtered under /admin
app.use('/shop', shopRoutes);   // Filtered under /shop

// 404 Page Not Found
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
