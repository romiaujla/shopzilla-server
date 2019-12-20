const express = require('express');
const ShopRouter = express.Router();
const jsonParser = express.json();
const ShopService = require('./shop-service');

ShopRouter
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db');

        // gets all the shops from the database
        return ShopService.getShops(db)
            .then((shops) => {
                if(!shops){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Could not get shops from the database`
                            }
                        })
                }

                return res
                    .status(200)
                    .json(shops);
            })
            .catch(err => {
                next(err)
            });
    })


    module.exports = ShopRouter;