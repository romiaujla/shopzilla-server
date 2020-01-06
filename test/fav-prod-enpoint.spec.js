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

describe.only(`Favourite Products Endpoint`, ()=>{

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

    before('cleanup', () => {
        return cleanTables(db);
    })

    afterEach('cleanup', () => {
        return cleanTables(db);
    })

    after('disconnect from the database', () => {
        return db.destroy();
    })

    describe(`GET /api/favourites/:buyer_id`, () => {
        context(`Happy Path`, () => {
            it(`responds 200, get the all the favourites with product info and correct buyer id`, ()=> {
                expect(true).to.be.false;
            })
        })
    })

})