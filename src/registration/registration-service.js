const RegistrationService = {
    checkUsername(db, username){
        return db('users')
            .where({username});
    }
}

module.exports = RegistrationService;