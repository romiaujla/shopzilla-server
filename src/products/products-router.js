const express = require("express");
const ProductRouter = express.Router;
const jsonParser = express.json();
const { jwtAuth } = require("../middleware/jwtAuth");
const { validation } = require("./products-validation");
const ProductService = require('./products-service');

ProductRouter
    .route("/products")
    .post(jwtAuth, jsonParser, validation, (req, res, next) => {
        const db = req.app.get('db');
        const {
            item,
            price = 0.00,
            description = '',
            image_url = 'product.png'
        } = req.body

        const newProduct = {
            item,
            price,
            description,
            image_url
        }

        return ProductService(db, newProduct)
            .then((addedproduct) => {
                if(!addedproduct){
                    return res
                        .status(400)
                        .json({
                            error: {
                                message: 'Could not add the new product'
                            }
                        })
                }

                return res.status(201).json(addedproduct);
            })
    });
