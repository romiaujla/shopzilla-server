const express = require('express');
const ShopRouter = express.Router();
const jsonParser = express.json();
const ShopService = require('./shop-service');
const {validation} = require('./shop-validation');
const {jwtAuth} = require('../middleware/jwtAuth');
const AuthService = require('../auth/auth-service');

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
    .patch(jwtAuth, jsonParser, validation, (req, res, next) => {
        const db = req.app.get('db');
        const {user} = req;
        return AuthService.getUserTypeId(db, user)
          .then(loggedInUserType => {
            if(!loggedInUserType){
                return res
                    .status(400)
                    .json({
                        error:{
                            message: `Could not find which users data to edit`
                        }
                    })
            }

            const id = loggedInUserType.id
            const newShopData = req.body;
            
            return ShopService.updateShop(db, newShopData, id)
                .then((updatedShop) => {
                    if(!updatedShop){
                        return res
                            .status(400)
                            .json({
                                error: {
                                    message: `Could not update the shop`
                                }
                            })
                    }

                    return res.status(201).end();
                })
                .catch(err => {
                    next(err);
                })

          })
          .catch(err => {
            next(err);
          });

        
    })

ShopRouter
    .route('/:id/products')
    .get((req, res, next) => {
        const {id} = req.params;
        const db = req.app.get('db');
        return ShopService.getProductsByShopId(db, id)
            .then((products) => {
                if(!products){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Could not get products for Shop id: ${id}`
                            }
                        })
                }

                return res.json(products);
            })
            .catch(err => {
                next(err);
            })
        
    })


// Get Shops by serivce name
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

ShopRouter
    .route('/service-type/:service_type')
    .get((req, res, next) => {
        const {service_type} = req.params;
        const db = req.app.get('db');

        return ShopService.getShopByServiceType(db, service_type.toLowerCase())
            .then((shops) => {
                if(!shops){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Could not find any shops with service type:${service_type}`
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