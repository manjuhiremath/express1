
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin'); // Admin routes
const shopRoutes = require('./routes/shop');   // Shop routes

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes); 
app.use('/shop', shopRoutes); 

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
