const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const colors = require('colors')
const morgan = require('morgan')
const port = process.env.PORT || 5000;
const productRoutes = require('./api/routes/productRoutes');
const ordersRoutes = require('./api/routes/orderRoutes');
const errorHandler = require('./api/middleware/errorHandler');
const connectToDb = require('./api/config/db')
const cors = require('./api/middleware/corsMiddleware')
const userRoutes = require('./api/routes/userRoutes');
// connect to mongo
connectToDb();



// Middlewares
app.use(cors);
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', userRoutes);

// Error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Listening at port : ${port} ...`)
});