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
        return db
            .from('shop_products as shprd')
    }
}

module.exports = ShopService;