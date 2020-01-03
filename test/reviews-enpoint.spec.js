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

            const requiredFields = ['review', 'rating'];

            requiredFields.forEach(field => {
                const newReview = {
                    shop_id: 1,
                    buyer_id: 1,
                    rating: 5,
                    review: 'Test review'
                }
                
                it(`responds 400, when '${field}' missing`, ()=>{

                    delete newReview[field]
                    return request(app)
                        .post('/api/reviews')
                        .send(newReview)
                        .expect(400, {
                            error: {
                                message: `'${field}' is required`
                            }
                        })
                })

            })
        })

        context(`Happy Path`, ()=>{
            
            it('responds 201, and creates a new review with an id', () => {
                const newReview = reviews[0]
                return request(app)
                    .post('/api/reviews')
                    .send(newReview)
                    .expect(201)
                    .then((res) => {
                        expect(res.body).to.be.a('object');
                        expect(res.body.shop_id).to.eql(newReview.shop_id);
                        expect(res.body.buyer_id).to.eql(newReview.buyer_id);
                        expect(parseFloat(res.body.rating)).to.equal(parseFloat(newReview.rating));
                        expect(res.body).to.have.property('id');
                        expect(res.body.review).to.eql(newReview.review);
                    });
            })
        })
    })

    describe(`DELETE /api/reviews/:id`, ()=>{
        context(`Happy path`, ()=>{

            beforeEach('add reviews', ()=>{
                return db('reviews')
                    .insert(reviews);
            });

            it(`responds 204, deletes the correct review with the provided id`, () => {
                const idOfReviewToDelete = 1;
                return request('app')
                    .delete('/api/reviews/:id')
                    .expect(204)
                    .then(()=>{
                        return request('app')
                            .get('/api/reviews')
                            .expect(200)
                            .then((res) => {
                                res.body.map((review) => {
                                    expect(review.id).to.not.eql(idOfReviewToDelete);
                                })
                            })
                    })
            })
        })
    })
})