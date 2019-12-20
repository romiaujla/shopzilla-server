const express = require('express');
const ShopRouter = express.Router();
const jsonParser = express.json();
const ShopService = require('./shop-service');

ShopRouter
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db');

        // gets all the sellers from the database
        return ShopService.getSellers(db)
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

ShopRouter
    .route('/')
    .patch(jsonParser, (req, res, next) => {
        
    })

module.exports = ShopRouter;