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
    },
    getShopsByName(db, shop_name){
        console.log(db('shop').where('shop_name', 'like', `*%${shop_name}%*`).toString());
        return db
            .from('shop')
            .where('shop_name', 'like', `%${shop_name}%`);
    }
}

module.exports = ShopService;