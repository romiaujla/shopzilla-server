const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const bcrypt = require('bcryptjs');

describe.only('Users Endpoint', () => {
    let db;

    const users = helpers.makeUsersArray();
    
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

        context(`Happy Path`, ()=> {

            it(`responds with 201, storing bcryped password`, () => {
                const newUser = {
                    username: 'testuser01',
                    password: 'testpassword01',
                    user_type: 'shop',
                }

                return request(app)
                    .post('/api/users')
                    .send(newUser)
                    .expect(201)
                    .expect(res => {
                        expect(res.body).to.have.property('id');
                        expect(res.body.username).to.equal(newUser.username);
                        expect(res.body.password).to.equal(newUser.password);
                        expect(res.body.user_type).to.equal(newUser.user_type);
                    })
                    .expect(res => {
                        db.from('users')
                            .where({id: res.body.id})
                            .first()
                            .then((row) => {
                                console.log(row.password);
                                expect(row.username).to.eql(newUser.username);
                                expect(row.password).to.eql(newUser.password);
                                expect(row.user_type).to.eql(newUser.user_type);
                                return bcrypt.compare(newUser.password, row.password)
                            })
                            .then(compareMatch => {
                                expect(compareMatch).to.be.true;
                            })
                    })
            })
        })
    })
})