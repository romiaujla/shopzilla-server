const express = require('express');
const UserRouter = express.Router();
const jsonParser = express.json();
const UserService = require('./users-service');
const {validation} = require('./users-validation');
const bcrypt = require('bcryptjs');

UserRouter
    .route('/')
    .post(jsonParser, validation,  (req, res, next) => {
        
        const db = req.app.get('db');
        const {
            username,
            password,
            user_type,
        } = req.body;

        let buyer = {};
        let shop = {};

        if(user_type === 'buyer'){
            buyer = {
                name: req.body.name,
            }
        }
        if(user_type === 'shop'){

            const {
                shop_name,
                address,
                description,
                start_date,
                end_date,
                opening_time,
                closing_time,
                service_type,
                image_url,
            } = req.body

            shop = {
                shop_name,
                address,
                description,
                start_date,
                end_date,
                opening_time,
                closing_time,
                service_type,
                image_url,
            }
        }

        const newUser = {
            user_type,
            username,
            password,
        }
        
        return UserService.hashPassword(password)
            .then((hashedPassword) => {
                const newUserWithHashedPassword = {
                    ...newUser,
                    password: hashedPassword
                }

                return UserService.insertUser(db, newUserWithHashedPassword)
                    .then(addedUser => {

                        // Adding a buyer when the user type is buyer
                        if(addedUser.user_type === 'buyer'){
                            buyer = {
                                ...buyer,
                                login_id: addedUser.id
                            }
                            return UserService.insertBuyer(db, buyer)
                                .then(addedBuyer => {
                                    return res.status(201).json({
                                        ...addedUser,
                                        ...addedBuyer,
                                        id: addedUser.id,
                                        buyer_id: addedBuyer.id,
                                    })
                                })
                                .catch(next);
                        }

                        // Adding a shop, when the user type is a shop
                        if(addedUser.user_type === 'shop'){
                            shop = {
                                ...shop,
                                login_id: addedUser.id
                            }
                            return UserService.insertShop(db, shop)
                                .then(addedShop => {
                                    return res.status(201).json({
                                        ...addedUser,
                                        ...addedShop,
                                        id: addedUser.id,
                                        shop_id: addedShop.id,
                                    })
                                })
                                .catch(next);
                        }
                    })
                    .catch(next);
            })
            .catch(next);
    })


module.exports = UserRouter;