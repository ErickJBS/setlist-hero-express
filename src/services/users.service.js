const User = require('../models/user.model')
const RequestError = require('../errors/request.error')
const { removeNullAndUndefined } = require('../utils/object.utils')

class UserService {

    async create(user) {
        user = removeNullAndUndefined(user);
        const newUser = new User(user);
        return newUser.save();
    }

    async find({ filter, skip, limit, sort }) {
        return User.find(filter)
            .limit(limit).skip(skip).sort(sort);
    }

    async findById(id) {
        const user = User.findById(id);
        if (!user) {
            throw new RequestError(404, `Couldn't find User with id ${id}`);
        }

        return user;
    }

    async update(id, fields) {
        const user = User.findById(id);
        if (!user) {
            throw new RequestError(404, `Couldn't find User with id ${id}`);
        }

        fields = removeNullAndUndefined(fields);
        
        return User.findByIdAndUpdate(
            id, fields, {
                new: true,
                useFindAndModify: false
            }
        );
    }

    async delete(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new RequestError(404, `Couldn't find User with id ${id}`);
        }

        return User.deleteOne({ _id: id });
    }
}

module.exports = new UserService();