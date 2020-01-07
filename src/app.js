require('dotenv').config();
const {NODE_ENV, PORT} = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require ('cors');
const helmet = require('helmet');
const ShopRouter = require('./shop/shop-router');
const AuthRouter = require('./auth/auth-router');
const ProductRouter = require('./products/products-router');
const RegistrationRouter = require('./registration/registration-router');
const UserRouter = require('./users/users-router');
const ReviewRouter = require('./reviews/review-router');
const FavouriteRouter = require('./fav-prod/fav-prod-router');
const {errorHandler} = require('./errorHandler');

// Server configurations and middlewares used
const app = express();
const morganOptions = NODE_ENV === 'production' 
    ? 'tiny' 
    : 'common';
app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());

// Routers
app.use(`/api/auth`, AuthRouter);
app.use(`/api/shops`, ShopRouter);
app.use('/api/products', ProductRouter);
app.use('/api/register', RegistrationRouter);
app.use('/api/users', UserRouter);
app.use('/api/reviews', ReviewRouter);
app.use('/api/favourites', FavouriteRouter);

// Error handler middleware
app.use(errorHandler);

// Default test route to show that server has started 
app.get(`/`, (_,res)=>{
    res.send(`Server listening at PORT:${PORT}`);
})

module.exports = app;