const express = require("express");

const bodyParser =require('body-parser');
const app = express();

    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true }))

app.listen('8000', ()=>{
    console.log('server iniciado...')
})
const sequelize = require("./sequelize");
//middlewares
const authMiddleware = require("./middleware/auth"); 
const adminMiddleware = require("./middleware/auth_adm"); 
//routes
const productsRoutes = require('./routes/products')
app.use('/products',productsRoutes)

const authRoutes = require('./routes/auth')
app.use('/auth',authRoutes)

const ordersRoutes = require('./routes/orders')
app.use('/orders',ordersRoutes)
