const express = require('express');
const ShopRouter = express.Router();
const jsonParser = express.json();
const ShopService = require('./shop-service');
const {validation} = require('./shop-validation');

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

ShopRouter
    .route('/:id')
    .get((req, res, next) => {
        const db = req.app.get('db');
        const {id} = req.params;
        return ShopService.getShopById(db, id)
            .then((shop) => {
                if(!shop){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Shop by id:${id} could not be found`
                            }
                        })
                }

                return res.json(shop);
            })
            .catch(err => {
                next(err);
            })
    })  
    .patch(jsonParser, validation, (req, res, next) => {
        res.send(`Yeayyya`);
    })

ShopRouter
    .route('/:id/products')
    .get((req, res, next) => {
        const {id} = req.params;
        const db = req.app.get('db');

        
    })


ShopRouter
    .route(`/search/:name`)
    .get((req, res, next) => {
        const {name} = req.params;
        const db = req.app.get('db');

        return ShopService.getShopsByName(db, name.toLowerCase())
            .then(shops => {
                if(!shops){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Could not find any shops with name:${name}`
                            }
                        })
                }

                return res.json(shops);
            })
            .catch(err => {
                next(err);
            })
    })
module.exports = ShopRouter;