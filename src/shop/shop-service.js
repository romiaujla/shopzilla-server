const ShopService = {
    getShops(db){
        return db('shop');
    },
    getShopById(db, id){
        return db('shop')
            .where({ id })
            .first();
    }
}

module.exports = ShopService;