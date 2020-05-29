const User = require('../models/user.model')
const BaseService = require('./base.service')

class UserService extends BaseService {
    constructor() {
        super(User);        
    }

    async findByEmail(email) {
        return User.findOne({ email });
    }
}

module.exports = new UserService();