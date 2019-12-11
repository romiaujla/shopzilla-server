# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to clone the server:

1. Clone this repository to your local machine `git clone https://github.com/romiaujla/v-store-server.git`
2. `cd` into the cloned repository
4. Install the node dependencies `npm i`
5. For the first time, create a database user `createuser --interactive capstone-admin`
6. Don't set a password for the database.
7. Create the database `createdb -U capstone-admin v-store-db`
8. Create the test database `createdb -U capstone-admin v-store-test-db`
9. Run the migrations `npm run migrate`



## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Run the migrations `npm run migrate`

Run migrations for test database `npm run migrate:test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch
