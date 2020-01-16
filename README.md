# Shopzilla Server
Shopzilla is an E-commerce application where people can showcase their business for everyone in their world. The user can either create a seller account or a buyer account. If the user is a seller, they can create their own shop page where they can display their products, store hours, location and more! The buyer user can browse the different shops available and save products to their wishlist.

###### ***Collaborators***
  [Jordan Duran](https://github.com/jordanduran) <br />
  [Chau Tran](https://github.com/ChauTran73) <br />
  [Raman Aujla](https://github.com/romiaujla)

## Links

[Live Link to App](https://shopzilla-client.netlify.com/) <br />  
[![Netlify Status](https://api.netlify.com/api/v1/badges/c7c7847e-c081-412c-a086-350db179d0e9/deploy-status)](https://shopzilla-client.netlify.com/)

Link to Client Repo
- [https://github.com/romiaujla/shopzilla-client-v2](https://github.com/romiaujla/shopzilla-client-v2)

Link to API Repo
- [https://github.com/romiaujla/shopzilla-server](https://github.com/romiaujla/shopzilla-server)

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


## Endpoints
- GET /api/favourites/:buyer_id
    - Returns the favourite products selected by the buyer

- POST /api/favourites
    - Adds a favourite product to the buyers favourite list

- DELETE /api/favourites/:buyer_id/:product_id
    - Removes the favourite item from the buyers favourite list

- GET /api/products
    - Returns all the prodcuts in the database

- GET /api/reviews/:shop_id
    - Returns all the reviews for the shop with the id provided

- GET /api/reviews/new/:id
    - Returns a single review with the review id provided, used to return a new review that is created as the response includes the name of the buyer who created the review.

- POST /api/reviews
    - Creates a new review 

- DELETE /api/reviews/:id
    - Deletes a review when the review id is provided in the params

- POST /api/users
    - Creates a new user once valid fields are provided

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Run the migrations `npm run migrate`

Run migrations for test database `npm run migrate:test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch
