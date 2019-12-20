const express = require('express');
const SellerRouter = express.Router();
const jsonParser = express.json();
const SellerService = require('./sellers-service');

SellerRouter
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db');

        // gets all the sellers from the database
        return SellerService.getSellers(db)
            .then((sellers) => {
                if(!sellers){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Could not get sellers from the database`
                            }
                        })
                }

                return res
                    .status(200)
                    .json(sellers);
            })
            .catch(err => {
                next(err)
            });
    })

module.exports = SellerRouter;