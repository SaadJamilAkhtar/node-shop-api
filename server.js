const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const colors = require('colors')
const morgan = require('morgan')
const port = process.env.PORT || 5000;
const productRoutes = require('./api/routes/productRoutes');
const ordersRoutes = require('./api/routes/orderRoutes');
const errorHandler = require('./api/middleware/errorHandler');

app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Listening at port : ${port} ...`)
});