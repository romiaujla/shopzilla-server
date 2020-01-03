function validation(req, res, next){
    
    for (const field of ['review', 'rating']){
        if(!req.body[`${field}`]){
            return res
                .status(400)
                .json({
                    error: {
                        message: `'${field}' is required`
                    }
                })
        }
    }

    next();
}

module.exports = {
    validation,
}