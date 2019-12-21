const ShopService = {
    getShops(db){
        return db('shop');
    },
    getShopById(db, id){
        return db('shop')
            .where({ id })
            .first();
    },
    getProductsByShopId(db, id){
        return db('shop_products')
            .where(
                'id', 'shop_id'
            )
    }
}

module.exports = ShopService;