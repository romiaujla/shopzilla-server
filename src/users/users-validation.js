function validation(req, res, next){
    for(const field of ['username', 'password', 'user_type']){
        if(!req.body[field]){
            return res.status(400)
                .json({
                    error: {
                        message: `Missing '${field}' in request body`
                    }
                })
        }
    }

    if(req.body.username.length < 6){
        return res.status(400).json({
            error: {
                message: 'Username must be longer than 6 characters'
            }
        })
    }

    if(req.body.password.length < 6){
        return res.status(400).json({
            error: {
                message: `Password must be longer than 6 characters`
            }
        })
    }

    if(!['shop', 'buyer'].includes(req.body.user_type)){
        return res.status(400).json({
            error: {
                message: 'Invalid user type, must be either shop or buyer'
            }
        })
    }

    if(req.body.user_type === 'buyer'){
         if(!req.body.hasOwnProperty('name')){
             return res.status(400).json({
                 error: {
                     message: 'Name is required for buyer'
                 }
             })
         }
    }

    next();
}

module.exports = {
    validation,
}