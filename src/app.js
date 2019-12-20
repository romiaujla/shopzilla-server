require('dotenv').config();
const {NODE_ENV} = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require ('cors');
const helmet = require('helmet');
const SellerRouter = require('./sellers/sellers-router');

const app = express();
const morganOptions = NODE_ENV === 'production' 
    ? 'tiny' 
    : 'common';
app.use(morgan(morganOptions));
app.use(helmet());
app.use(cors());

// seller endpoints
app.use(`/sellers`, SellerRouter);

app.get(`/`, (_,res)=>{
    res.json(`GET / endpoint reached`);
})

module.exports = app;