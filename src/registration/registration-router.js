const express = require('express');
const RegistrationRouter = express.Router();
const jsonParser = express.json();
const RegistrationService = require('./registration-service');

RegistrationRouter
    .route('/:username')
    .get((req, res, next) => {

        const db = req.app.get('db');
        const {username} = req.params;

        return RegistrationService.checkUsername(db, username)
            .then((user) => {
                if(!user){
                    return res
                        .status(404)
                        .json({
                            error: {
                                message: `Could not complete the request to check for username existance`
                            }
                        })
                }

                return res.json(user);
            })

    })


module.exports = RegistrationRouter;