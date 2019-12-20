const SellerService = {
    getSellers(db){
        return db('seller');
    }
}

module.exports = SellerService;