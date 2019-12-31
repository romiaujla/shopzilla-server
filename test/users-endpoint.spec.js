const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const bcrypt = require('bcryptjs');

describe('Users Endpoint', () => {
    let db;

    const users = helpers.makeUsersArray();
    const newShopUser = {
        username: 'testuser01',
        password: 'testpassword',
        user_type: 'shop',
        shop_name: 'test shop 1',
        address: 'test address',
        description: 'test descrription',
        start_date: new Date(),
        end_date: new Date(),
        opening_time: '11:00:00',
        closing_time: '11:10:00',
        service_type: 'food and drinks',
    }
    
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db);
    })

    after('disconnect from db', ()=>{
        return db.destroy();
    })

    before('cleanup', () => {
        return helpers.cleanTables(db);
    })

    afterEach('cleanup', () => {
        return helpers.cleanTables(db);
    })

    describe(`POST /api/users`, ()=>{
        context(`User Validation`, ()=>{
            // beforeEach('insert users', ()=>{
            //     return db('users').insert(users);
            // })

            const requiredFields = ['username', 'password', 'user_type']

            requiredFields.forEach(field => {
                const registerAttemptBody = {
                    username: 'test username',
                    password: 'test password',
                    user_type: 'shop',
                }

            it(`responds with 400 required error when ${field} is missing`, ()=>{
                delete registerAttemptBody[field]

                return request(app)
                    .post('/api/users')
                    .send(registerAttemptBody)
                    .expect(400, {
                        error: {
                            message: `Missing '${field}' in request body`,
                        }
                    })
            });

        })

        it(`responds 400 'Username must be longer than 6 characters', when smaller than 6 characters`, () => {
            const shortUsername = {
                username: '1234',
                password: '1234567',
                user_type: 'shop',
            }
            return request(app)
                .post('/api/users')
                .send(shortUsername)
                .expect(400, {
                    error: {
                        message: 'Username must be longer than 6 characters'
                    }
                })
        })

        it(`responds 400 'password must be longer than 6 characters' when empty password'`, () => {
            const userShortPassword = {
                username: 'test username',
                password: '12345',
                user_type: 'shop',
            }
            return request(app)
                .post('/api/users')
                .send(userShortPassword)
                .expect(400, {
                    error: {
                        message: `Password must be longer than 6 characters`
                    }
                })
        })
        
        it(`responds 400 'Invalid user type', when not one of shop or buyer`, () => {
                const invalidUserType = {
                    username: 'test username',
                    password: '12345687',
                    user_type: 'invalidType'
                }
                return request(app)
                    .post('/api/users')
                    .send(invalidUserType)
                    .expect(400, {
                        error: {
                            message: 'Invalid user type, must be either shop or buyer'
                        }
                    })
                })
        })

        context(`Buyer Validation`, () => {
            it(`responds 400 'Name required for buyer, when user_type = buyer`, () => {
                const buyerWithNoName = {
                    username: 'testuser01',
                    password: 'testpassword01',
                    user_type: 'buyer',
                }
                return request(app)
                    .post('/api/users')
                    .send(buyerWithNoName)
                    .expect(400, {
                        error: {
                            message: 'Name is required for buyer'
                        }
                    })
            })
        })

        context('Shop User Validation', () => {
            const requiredFields = ['shop_name', 'address', 'service_type']
            
            requiredFields.forEach(field => {
                const registerAttemptBody = {
                    ...newShopUser,
                }
                it(`responds 400 ' when ${field} is missing'`, ()=>{
                    delete registerAttemptBody[field]
                    return request(app)
                        .post('/api/users')
                        .send(registerAttemptBody)
                        .expect(400, {
                            error: {
                                message: `Missing '${field}' in request body`
                            }
                        })
                })
            })

            it(`responds 400, when service_type is not in the database enum`, () => {
                const serviceTypesInDB = [
                    'food and drinks',
                    'clothing and accessories',
                    'home and party decor',
                    'educational',
                    'body healing',
                    'tattoo and piercing',
                    'sports and hobbies',
                    'toys and leisure',
                    'bath and body'
                ]
                const shopWithInvalidServiceType = {
                    ...newShopUser,
                    service_type: 'invalid type',
                }
                return request(app)
                    .post('/api/users')
                    .send(shopWithInvalidServiceType)
                    .expect(400, {
                        error: {
                            message: `Serivce type '${shopWithInvalidServiceType.service_type}' does not exist in database`
                        }
                    })
            })

        })

        context(`Happy Path for Adding a Seller`, () => {
            it(`responds 201 by adding a shop with a bcryped password`, ()=>{
                return request(app)
                    .post('/api/users')
                    .send(newShopUser)
                    .expect(201)
                    .expect((res) => {
                        expect(res.body).to.have.property('id');
                        expect(res.body.username).to.equal(newShopUser.username);
                        expect(res.body.user_type).to.equal(newShopUser.user_type);
                    })
                    .expect(res => {
                        db.from('users')
                            .where({id: res.body.id})
                            .first()
                            .then((row) => {
                                expect(row.username).to.eql(newShopUser.username);
                                expect(row.user_type).to.eql(newShopUser.user_type);
                                return bcrypt.compare(newShopUser.password, row.password)
                            })
                            .then(compareMatch => {
                                expect(compareMatch).to.be.true;
                            })
                    })
                    .expect(res => {
                        if(res.body.user_type === 'shop'){
                            expect(res.body.shop_name).to.eql(newShopUser.shop_name);
                        }
                    })
            })
        })

        context(`Happy Path for Adding a Buyer`, ()=> {

            it(`responds with 201, storing bcryped password, when adding a buyer`, () => {
                const newUser = {
                    username: 'testuser01',
                    password: 'testpassword01',
                    user_type: 'buyer',
                    name: 'test buyer',
                }

                return request(app)
                    .post('/api/users')
                    .send(newUser)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.have.property('id');
                        expect(res.body.username).to.equal(newUser.username);
                        expect(res.body.user_type).to.equal(newUser.user_type);
                    })
                    .expect(res => {
                        db.from('users')
                            .where({id: res.body.id})
                            .first()
                            .then((row) => {
                                expect(row.username).to.eql(newUser.username);
                                expect(row.user_type).to.eql(newUser.user_type);
                                return bcrypt.compare(newUser.password, row.password)
                            })
                            .then(compareMatch => {
                                expect(compareMatch).to.be.true;
                            })
                    })
                    .expect(res => {
                        if(res.body.user_type === 'buyer'){
                            expect(res.body.name).to.eql(newUser.name);
                            db.from('buyer')
                                .where({name: res.body.name})
                                .first()
                                .then((row) => {
                                    expect(row.name).to.eql(newUser.name);
                                })
                        }
                    })
            })
        })
    })
})