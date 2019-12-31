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

        beforeEach('insert users', () => {
            return db('users').insert(users);
        });

        beforeEach('insert shops', () => {
            return db('shop').insert(shops);
        });

        it('should create and return a new product when provided with valid data', () => {
            
            const newProduct = {
                "shop_id": "1",
                "item" : "Product 1", 
                "price" : "10.00", 
                "description": "Test Description for Product 1", 
                "image_url": "imageproduct1.png",
            }

            return request(app)
                .post('/api/products')
                .send(newProduct)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys('id', 'item', 'description', 'image_url');
                    expect(res.body.item).to.equal(newProduct.item);
                    expect(res.body.price).to.equal(newProduct.price);
                    expect(res.body.description).to.equal(newProduct.description);
                    expect(res.body.image_url).to.equal(newProduct.image_url);
                })
        })

    })
})