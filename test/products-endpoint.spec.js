const knex = require('knex');
const app = require('../src/app');
const {
    makeProductsArray, 
    makeShopsArray,
    makeUsersArray,
    cleanTables,
} = require('./test-helpers');

describe(`Product Endpoint`, () => {
    let db;
    let products = makeProductsArray();
    let shops = makeShopsArray();
    let users = makeUsersArray();

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

    afterEach('cleanup', () => {
        return cleanTables(db);
    })

    after('disconnect from the database', () => {
        return db.destroy();
    })

    describe(`POST /api/products`, () => { 

        beforeEach('add users', () => {
            return db('users').insert(users);
        })

        context(`Happy Path`, () => {
            it('respoinds 200, and inserts a new product with an id', () => {
                const newProduct = {
                    ...products[0],
                    shop_id: 1,
                };

                request(app)
                    .post('/api/products')
                    .send(newProduct)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.be.a('object');
                        expect(res.body).to.have.property('id');
                    })
            })
        })

    })
})