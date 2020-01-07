const express = require('express');
const FavouriteRouter = express.Router();
const jsonParser = express.json();
const FavouriteService = require('./fav-prod-service');

FavouriteRouter
    .route('/:buyer_id')
    .get((req, res, next) => {
        const db = req.app.get('db');
        const {buyer_id} = req.params;
        return FavouriteService.getFavourites(db, buyer_id)
            .then((favs) => {
                if(!favs){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Could not fetch favourites`
                            }
                        })
                }

                return res.json(favs);
            })
            .catch(next);
    })

FavouriteRouter
    .route('/')
    .post(jsonParser, (req, res, next) => {
        const db = req.app.get('db');
        const newFav = {
            buyer_id: req.body.buyer_id,
            product_id: req.body.product_id,
        }

        return FavouriteService.insertFavourite(db, newFav)
            .then((addedFav) => {
                if(!addedFav){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Could not add a favourite product`
                            }
                        })
                }

                return res.status(201).json(addedFav);
            })
            .catch(next);
    })

FavouriteRouter
    .route('/:buyer_id/:product_id')
    .delete(jsonParser, (req, res, next) => {
        const db = req.app.get('db');
        const {buyer_id, product_id} = req.params;
        return FavouriteService.deleteFavourite(db, buyer_id, product_id)
            .then((deleteSuccessfull) => {
                if(!deleteSuccessfull){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Delete was unsuccessful`
                            }
                        })
                }

                return res
                    .status(204)
                    .end();
            })
    })

module.exports = FavouriteRouter;