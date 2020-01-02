const express = require('express');
const ReviewRouter = express.Router();
const ReviewService = require('./review-service');
const jsonParser = express.json();
const {jwtAuth} = require('../middleware/jwtAuth');
const {validation} = require('./review-validation');

ReviewRouter
    .route('/:shop_id')
    .get((req, res, next) => {
        const {shop_id} = req.params;
        const db = req.app.get('db');
        return ReviewService.getReviewsByShopId(db, shop_id)
            .then((reviews) => {
                if(!reviews){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Could not fetch reviews for shop with id:${shop_id}`
                            }
                        })
                }

                return res.json(reviews);
            })
    });

ReviewRouter
    .route('/')
    .post(jsonParser, validation, (req, res, next) => {
        res.send('ok');
    });

module.exports = ReviewRouter;