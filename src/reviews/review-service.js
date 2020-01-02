const ReviewService = {
    getReviewsByShopId(db, shop_id){
        return db('reviews')
            .where({shop_id});
    },    
}

module.exports = ReviewService;