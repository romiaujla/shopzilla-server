require('dotenv').config();
const {NODE_ENV, PORT} = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require ('cors');
const helmet = require('helmet');
const ShopRouter = require('./shop/shop-router');
const AuthRouter = require('./auth/auth-router');

const app = express();
const morganOptions = NODE_ENV === 'production' 
    ? 'tiny' 
    : 'common';
app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());

// seller endpoints
app.use(`/api/auth`, AuthRouter);
app.use(`/api/shops`, ShopRouter);


app.get(`/`, (_,res)=>{
    res.send(`Server listening at PORT:${PORT}`);
})

module.exports = app;