const UserService = require('../services/users.service')

const getUser = async (request, response) => {
    const userId = request.params.userId;
    try {
        const user = await UserService.findById(userId);
        response.json(user);
    } catch (err) {
        const error = err.errorCode || 500;
        return response.status(error).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    getUser
};