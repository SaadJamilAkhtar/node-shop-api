const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const productRoutes = require('./api/routes/productRoutes');
const ordersRoutes = require('./api/routes/orderRoutes')


app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);





app.listen(port, ()=> {
    console.log(`Server Listening at port : ${port} ...`)
});