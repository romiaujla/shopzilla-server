const ReviewService = {
    getReviewsByShopId(db, shop_id){
        return db('reviews')
            .where({shop_id});
    },
    insertReview(db, newReview){
        return db('review')
            .insert(newReview)
            .returning('*')
            .then((rows) => row[0]);
    }    
}

module.exports = ReviewService;