const knex  = require('knex');
const app = require('../src/app');
const {
    makeUsersArray,
    makeShopsArray,
    makeBuyerArray,
    makeReviewsArray,
    cleanTables,
} = require('./test-helpers');

describe.only(`Reviews Endpoint`, () => {

    let db;
    let users = makeUsersArray();
    let shops = makeShopsArray();
    let buyers = makeBuyerArray();
    let reviews = makeReviewsArray();

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

    beforeEach('add shops', ()=>{
        return db('shop')
            .insert(shops);
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


    describe(`GET /api/reviews/:shop_id`, ()=>{
        context(`Happy Path`, () => {
            beforeEach('add reviews', ()=>{
                return db('reviews')
                    .insert(reviews);
            })
            
            it(`responds 200, returns correct reviews for shop id provided`, ()=>{
                const shop_id = 3;
                return request(app)
                    .get(`/api/reviews/${shop_id}`)
                    .expect(200)
                    .then((res) => {
                        expect(res.body).to.be.an('array');
                        res.body.map((review) => {
                            expect(review.shop_id).to.eql(shop_id);
                        })
                    });
            })
        })
    })

    describe(`POST /api/reviews`, () => {
        context(`Review Validation`, () => {

            it(`responds 400, when review is an empty text`, ()=>{
                const invalidReview = {
                    shop_id: 1,
                    buyer_id: 1,
                }
                return request(app)
                    .post('/api/reviews')
                    .send(invalidReview)
                    .expect(400, {
                        error: {
                            message: 'Review is missing'
                        }
                    })

            })

        })
    })
})