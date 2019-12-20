const ShopService = {
    getSellers(db){
        return db('shop');
    }
}

module.exports = ShopService;