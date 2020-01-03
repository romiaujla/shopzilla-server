function validation(req, res, next){
    
    const requireFields = ['review', 'rating']
    
    requireFields.forEach(field => {
        if(!req.body[`${field}`]){
            return res
                .status(400)
                .json({
                    error: {
                        message: `'${field}' is required`
                    }
                })
        }
    })

    next();
}

module.exports = {
    validation,
}