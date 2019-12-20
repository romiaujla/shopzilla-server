const ShopService = {
    getShops(db){
        return db('shop');
    }
}

module.exports = ShopService;