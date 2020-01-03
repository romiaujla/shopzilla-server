const ReviewService = {
    getReviewsByShopId(db, shop_id){
        return db('reviews')
            .where({shop_id});
    },
    insertReview(db, newReview){
        return db('reviews')
            .insert(newReview)
            .returning('*')
            .then((rows) => rows[0]);
    },
    deleteReview(db,id){
        return db('reviews')
            .where({id})
            .delete();
    }
}

module.exports = ReviewService;