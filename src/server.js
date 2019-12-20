const app = require('./app');
const {PORT, DATABASE_URL} = require('./config');
const {errorhandler} = require('./errorHandler');

// Establishing the database connection
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL || DATABASE_URL,
});
app.set('db', db);

app.use(errorhandler);

app.listen(PORT, ()=> {
    console.log(`Sever listening at PORT:${PORT}`);
})