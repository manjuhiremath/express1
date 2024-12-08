const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const expenseRoutes = require('./routes/expense')
const app = express();

app.use(cors())
app.use(bodyParser.json({extended:false}))

app.use('/expense',expenseRoutes);

sequelize.sync().then((res)=>{
    app.listen(3000);
}).catch((err)=>{
    console.log(err);
})