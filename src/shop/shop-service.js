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
            .from('products as prd')
            .select(
                'prd.id',
                'prd.item',
                'prd.price',
                'prd.description',
                'prd.image_url',
            )
            .leftJoin(
                'shop_products as shprd',
                'shprd.product_id',
                'prd.id'
            )
            .where(
                'shprd.shop_id',
                id
            )
    },
    getShopsByName(db, shop_name){
        return db
            .from('shop')
            .where('shop_name', 'like', `%${shop_name}%`);
    },
    getShopByServiceType(db, service_type){
        return db
            .from('shop')
            .where({service_type});
    },
    updateShop(db, newShopData, id){
        return db('shop')
            .where({id})
            .update(newShopData);
    }
}

module.exports = ShopService;