function validation(req, res, next){
    
    if(!req.body.review){
        return res
            .status(400)
            .json({
                error: {
                    message: `Review is missing`
                }
            })
    }

    next();
}

module.exports = {
    validation,
}