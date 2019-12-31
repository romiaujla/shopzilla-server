const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

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
        helpers.cleanTables(db);
    })

    afterEach('cleanup', () => {
        helpers.cleanTables(db);
    })

    describe(`POST /api/users`, ()=>{
        context(`User Validation`, ()=>{
            beforeEach('insert users', ()=>{
                return db('users').insert(users);
            })

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
                            error: `Missing '${field}' in request body`,
                        })
                })
            })

        })
    })
})