const FavouriteService = {
    getFavourites(db, buyer_id){
        return db('favourite_products')
            .where({buyer_id});
    },
    insertFavourite(db, newFav){
        return db('favourite_products')
            .insert(newFav)
            .returning('*')
            .then(rows => rows[0]);
    }
}

module.exports = FavouriteService;