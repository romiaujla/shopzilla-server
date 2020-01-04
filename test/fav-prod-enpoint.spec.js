const knex  = require('knex');
const app = require('../src/app');
const {
    makeUsersArray,
    makeFavouriteProductsArray,
    makeShopProductArray,
    makeBuyerArray,
    makeProductsArray,
    makeShopsArray,
    cleanTables,
} = require('./test-helpers');

describe(`Favourite Products Endpoint`, ()=>{

    let db;
    const users = makeUsersArray();
    const shops = makeShopsArray();
    const products = makeProductsArray();
    const buyers = makeBuyerArray(); 
    const shopProducts = makeShopProductArray();
    const favouriteProducts = makeFavouriteProductsArray();

    before('make connection', ()=>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
    })

})