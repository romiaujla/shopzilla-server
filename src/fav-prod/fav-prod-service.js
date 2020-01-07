const FavouriteService = {
    getFavourites(db, buyer_id){
        return db('favourite_products')
            .where({buyer_id});
    }
}

module.exports = FavouriteService;