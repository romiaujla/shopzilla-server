const bcrypt = require('bcryptjs');

const UserService = {
    insertUser(db, newUser){
        return db('users')
            .insert(newUser)
            .returning('*')
            .then(rows => rows[0]);
    },
    hashPassword(password){
        return bcrypt.hash(password, 12);
    },
    insertBuyer(db, newBuyer){
        return db('buyer')
            .insert(newBuyer)
            .returning("*")
            .then(rows => rows[0]);
    }
}

module.exports = UserService;