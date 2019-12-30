const ProductService = {
    insertProduct(db, newProduct){
        return db('products')
            .insert(newProduct)
            .returning('*')
            .then((rows) => rows[0]);
    },
    insertShopProduct(db, newShopProduct){
        return db('shop_products')
            .insert(newShopProduct)
            .returning('*')
            .then((rows) => rows[0]);
    },
}

module.exports = ProductService;