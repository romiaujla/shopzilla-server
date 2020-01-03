const knex  = require('knex');
const app = require('../src/app');
const {
    makeUsersArray,
    makeFavouriteProductsArray,
    makeBuyerArray,
    makeProductsArray,
    cleanTables,
} = require('./test-helpers');

describe.only(`Favourite Products Endpoint`, () => {

    let db;
    let users = makeUsersArray();
    let products = makeProductsArray();
    let buyers = makeBuyerArray();
    let favouriteProducts = makeFavouriteProductsArray();

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db);
    });

    before('cleanup', () => {
        return cleanTables(db);
    })

    beforeEach('add users', ()=>{
        return db('users')
            .insert(users);
    })

    beforeEach('add products', ()=>{
        return db('products')
            .insert(products);
    })

    beforeEach('add buyers', ()=>{
        return db('buyer')
            .insert(buyers);
    })

    afterEach('cleanup', () => {
        return cleanTables(db);
    })

    after('disconnect from the database', () => {
        return db.destroy();
    })


    describe(`GET /api/favourites/:buyer_id`, ()=>{
        context(`Happy Path`, () => {
            beforeEach('add favourites', ()=>{
                return db('favourite_products')
                    .insert(favouriteProducts);
            })
            
            it(`responds 200, returns correct favourite products for a buyer`, ()=>{
                const idOfBuyer = 2;
                return request(app)
                    .get(`api/favourites/${idOfBuyer}`)
                    .expect(200)
                    .then((res) => {
                        expect(res.body).to.be.an('array');
                        res.body.map(prod => {
                            expect(prod.buyer_id).to.eql(idOfBuyer);
                        })
                    })
            })
        })
    })

    describe(`POST /api/favourites`, () => {
        context(`Happy Path`, () => {

        })
    })

    describe(`DELETE /api/favourites/:buyer_id/:product_id`, () => {
        context(`Happy Path`, ()=>{
            
        })
    })

})