const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthService = {
    getUserWithUserName(db, username){
        return db('users')
            .where({ username })
            .first();
    },
    comparePassword(password, hash){
        return bcrypt.compare(password, hash)
    },
    createJwt(subject, payload){
        return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            algorithm: 'HS256',
        })
    },
    verifyJwt(token){
        return jwt.verify(token, config.JWT_SECRET, {
            algorithms: ['HS256'],
        })
    },
    getUserTypeId(db, user, user_type){
        console.log(user_type);
        if(user_type === 'shop'){
            return db
            .select('id')
            .from('shop')
            .where('login_id', user.id)
            .first();
        }else{
            return db
            .select('id')
            .from('buyer')
            .where('login_id', user.id)
            .first();
        }
        
    }
}

module.exports = AuthService;