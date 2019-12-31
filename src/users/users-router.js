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