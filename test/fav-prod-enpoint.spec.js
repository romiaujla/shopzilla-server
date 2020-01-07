const knex  = require('knex');
const app = require('../src/app');
const {
    makeUsersArray,
    makeFavouriteProductsArray,
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

        beforeEach(`add favourites`, () => {
            return db('favourite_products')
                .insert(favouriteProducts);
        })

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


    describe(`POST /api/favourites/`, () => {
        context(`Happy Path`, () => {
            it(`responds 201, adds the a row with the favourite product id and buyer id`, ()=> {    

                const newFavourite = {
                    buyer_id: 1,
                    product_id: 1,
                }

                return request(app)
                    .post(`/api/favourites/`)
                    .send(newFavourite)
                    .expect(201)
                    .then((res) => {
                        expect(res.body).to.be.a('object');
                        expect(res.body.buyer_id).to.eql(newFavourite.buyer_id);
                        expect(res.body.product_id).to.eql(newFavourite.product_id);
                    })
            });
        })
    })

    describe(`DELETE /api/favourites/:buyer_id/:product_id`, () => {
        context(`Happy Path`, () => {

            beforeEach(`add favourites`, () => {
                return db('favourite_products')
                    .insert(favouriteProducts);
            })

            it(`responds 204, and removes the correct product id from the table`, ()=> {    

                const buyer_id = 1;
                const product_id = 1;
                
                return request(app)
                    .delete(`/api/favourites/${buyer_id}/${product_id}`)
                    .expect(204)
                    .then(() => {
                        return request(app)
                            .get(`/api/favourites/${buyer_id}`)
                            .expect(200)
                            .then(res => {
                                res.body.map(fav => {
                                  if(fav.buyer_id === buyer_id) {
                                    // check if the deleted item is removed successfully
                                    expect(fav.product_id).to.not.eql(product_id);
                                  }
                                })
                            })
                    })
            });
        })
    })

})