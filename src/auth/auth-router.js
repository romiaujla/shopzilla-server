const express = require('express');
const AuthRouter = express.Router();
const jsonParser = express.json();
const AuthService = require('./auth-service');

AuthRouter
    .post('/login', jsonParser, (req, res, next) => {
        const {username, password} = req.body;
        const loginUser = {
            username, 
            password
        }

        // Check if username and password are not empty fields
        for(const [key, value] of Object.entries(loginUser)){
            if(value == null){
                return res
                    .status(400)
                    .json({
                        error: {
                            message: `Missing ${key} in request body`
                        }
                    });
            }
        }

        AuthService.getUserWithUserName(
            req.app.get('db'),
            loginUser.username
        )
            .then((user) => {
                if(!user){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Incorrect Username`
                            }
                        })
                }

                return AuthService.comparePassword(
                    loginUser.password,
                    user.password   
                )
                    .then(compareMatch => {
                        if(!compareMatch){
                            return res
                                .status(400)
                                .json({
                                    error: {
                                        message: `Incorrect Password`
                                    }
                                })
                        }

                        const sub = user.username
                        const payload = {
                            carrier_id: user.id
                        }

                        res.send({
                            authToken: AuthService.createJwt(
                                sub,
                                payload
                            ),
                            userType: user.user_type,
                        })
                    })
            })
            .catch(next)
    });

module.exports = AuthRouter