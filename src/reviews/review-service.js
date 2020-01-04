const ReviewService = {
    getReviewsByShopId(db, shop_id){
        return db
            .from('reviews as rv')
            .select(
                'rv.review',
                'by.name',
                'rv.rating',
                'rv.buyer_id',
            )
            .join(
                'buyer as by',
                'rv.buyer_id',
                'by.id'
            )
            .where('rv.shop_id', shop_id);
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
    },
    getReviews(db){
        return db('reviews');
    },
    getBuyerNameWithId(db, id){
        return db('buyer')
            .select('name')
            .where({id})
            .first();
    }
}

module.exports = ReviewService;