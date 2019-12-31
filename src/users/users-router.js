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

        const newUser = {
            user_type,
            username,
            password: bcrypt.hash(password, 12),
        }
        
        return UserService.insertUser(db, newUser)
            .then((addedUser) => {
                res.status(201).json(addedUser);
            })
            .catch(next);
    })


module.exports = UserRouter;