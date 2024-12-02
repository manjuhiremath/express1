const express = require('express');

const app = express();

app.use('/',(req,res,next)=>{
    console.log('this is middleware');
    next();
})
app.use('/product',(req,res,next)=>{
    console.log('this is product');

    res.send('<h1>Hello This Welcome to product Page!</h1>');

})

app.use('/app-product',(req,res,next)=>{
    console.log('this is app-product');

    res.send('<h1>Hello This Welcome to product Page 1!</h1>');

})

app.use('/home',(req,res,next)=>{
    console.log('this is home');

    res.send('<h1>Hello good evening!</h1>');

})



app.listen(3000);