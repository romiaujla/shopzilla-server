const UserService = {
    insertUser(db, newUser){
        return db('users')
            .insert(newUser)
            .returning('*')
            .then(rows => rows[0]);
    }
}

module.exports = UserService;