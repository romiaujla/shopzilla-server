const FavouriteService = {
    getFavourites(db, buyer_id){
        return db('favourite_products as fp')
            .select(
                'p.id',
                'p.item',
                'p.description',
                'p.price',
                'p.image_url'
            )
            .join(
                'products as p',
                'p.id',
                'fp.product_id'
            )
            .where('fp.buyer_id', buyer_id);
    },
    insertFavourite(db, newFav){
        return db('favourite_products')
            .insert(newFav)
            .returning('*')
            .then(rows => rows[0]);
    },
    deleteFavourite(db, buyer_id, product_id){
        return db('favourite_products')
            .where({buyer_id})
            .andWhere({product_id})
            .delete();
    }
}

module.exports = FavouriteService;