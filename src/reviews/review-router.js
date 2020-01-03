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
            .catch(next);
    });

ReviewRouter
    .route('/')
    .post(jsonParser, validation, (req, res, next) => {
        
        const {
            shop_id, 
            buyer_id, 
            review,
            rating = 0,
        } = req.body

        const newReview = {
            shop_id,
            buyer_id,
            review,
            rating,
        }

        const db = req.app.get('db');

        return ReviewService.insertReview(db, newReview)
            .then((addedReview) => {
                if(!addedReview){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: 'Could not add review'
                            }
                        })
                }

                return res.status(201).json(addedReview);
            })
            .catch(next);
    })
    .get((req, res, next) => {
        const db = req.app.get('db');
        return ReviewService.getReviews(db)
            .then((reviews) => {
                if(!reviews){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Could not get the reviews from the database`
                            }
                        })
                }

                return res.json(reviews);
            })
            .catch(next);
    });

ReviewRouter
    .route('/:id')
    .delete((req, res, next) => {
        const db = req.app.get('db');
        const {id} = req.params;
        return ReviewService.deleteReview(db, id)
            .then((response) => {
                if(!response){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: `Could not complete the deletion of review with id:${id}`
                            }
                        })
                }

                return res.status(204).end();
            })
            .catch(next);
    })

module.exports = ReviewRouter;