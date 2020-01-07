const {NODE_ENV } = require('./config');

function errorHandler(error, req, res, next){
    console.log(error);
    let response = {};
    if(NODE_ENV === 'production'){
        response = {
            error: {
                message: `Server Error`
            }
        }
    }else{
        response = {error}
    }
    res.status(500).json(response);
}

module.exports = {
    errorHandler,
};