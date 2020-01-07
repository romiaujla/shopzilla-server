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


module.exports = FavouriteRouter;