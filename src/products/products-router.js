const express = require('express');
const ProductRouter = express.Router();
const jsonParser = express.json();
const { jwtAuth } = require('../middleware/jwtAuth');
const { validation } = require('./products-validation');
const ProductService = require('./products-service');

ProductRouter.route('/')
  .post(jwtAuth, jsonParser, validation, (req, res, next) => {
    const db = req.app.get('db');
    const {
      shop_id,
      item,
      price = 0.0,
      description = '',
      image_url = 'product.png'
    } = req.body;

    const newProduct = {
      item,
      price,
      description,
      image_url
    };

    return ProductService.insertProduct(db, newProduct)
      .then(addedproduct => {
        if (!addedproduct) {
          return res.status(400).json({
            error: {
              message: 'Could not add the new product'
            }
          });
        }

        const newShopProduct = {
          shop_id,
          product_id: addedproduct.id
        };

        return ProductService.insertShopProduct(db, newShopProduct)
          .then(newShopProduct => {
            if (!newShopProduct) {
              return res.status(400).json({
                error: {
                  message: `Could not add the shop product relation`
                }
              });
            }

            return res.status(201).json(addedproduct);
          })
          .catch(next);
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.send('ok');
  });

ProductRouter.route('/:id').delete((req, res, next) => {
  const { id } = req.params;
  res.send(id);
});

module.exports = ProductRouter;
