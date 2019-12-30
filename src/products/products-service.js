const ProductService = {
    insertProduct(db, newProduct){
        return db('products')
            .insert(newProduct)
            .returning('*')
            .then((row) => rows[0]);
    },
    insertShopProduct(db, newShopProduct){
        return db('products')
            .insert(newShopProduct)
            .returning('*')
            .then((row) => rows[0]);
    },
}