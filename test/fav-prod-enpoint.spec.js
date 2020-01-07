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
    const favouriteProducts = makeFavouriteProductsArray();

    before('make connection', ()=>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db);
    })

    before('cleanup', () => {
        return cleanTables(db);
    })

    beforeEach('add users', ()=>{
        return db('users')
            .insert(users);
    })

    beforeEach('add shops', ()=>{
        return db('shop')
            .insert(shops);
    })

    beforeEach('add buyers', ()=>{
        return db('buyer')
            .insert(buyers);
    })

    beforeEach('add products' , () => {
        return db('products')
            .insert(products);
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
                const buyer_id = 0;
                return request(app)
                    .get(`/api/favourites/${buyer_id}`)
                    .expect(200)
                    .then((res) => {
                        expect(res.body).to.be.an('array');
                    })
            });
        })
    })

})