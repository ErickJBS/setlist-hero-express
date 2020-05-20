const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const UserService = require('../services/users.service')
const RequestError = require('../errors/request.error')
const { comparePassword, hashPassword, getUsername } = require('../utils/auth.utils')

class AuthService {

    async loginSocialProvider({ email, displayName, userId, authProvider }) {
        let user = await User.findOne({ email });
        if (!user) {
            const username = getUsername(email);
            const data = {
                email, username, userId, displayName, authProvider
            };
            user = await UserService.create(data);
        }
        delete user.password;

        const payload = {
            user: {
                id: user._id,
                provider: authProvider
            }
        }

        const jwtSecret = process.env.JWT_SECRET;
        return {
            token: jwt.sign(payload, jwtSecret, { }),
            user
        };
    }

    async register({ email, displayName, password, username }) {
        const user = await User.findOne({ email });
        if (user) {
            throw new RequestError(403, `Email already registered (${user.authProvider})`);
        }

        password = await hashPassword(password);
        const authProvider = 'email';

        const data = {
            email, username, displayName, authProvider, password
        };

        return UserService.create(data);
    }

    async login(identifier, password) {
        let user = await User.findOne({ email: identifier });
        if (!user) {
            user = await User.findOne({ username: identifier });
        }
        if (!user) {
            throw new RequestError(404, `Email not found`);
        }

        if (user.authProvider != 'email') {
            const msg = `Auth provider for this user is ${user.authProvider}`;
            throw new RequestError(400, msg)
        }
        const match = await comparePassword(user.password, password);
        if (!match) {
            throw new RequestError(400, 'Wrong user password')
        }

        delete user.password;

        const payload = {
            user: {
                id: user._id,
                provider: user.authProvider
            }
        }

        const jwtSecret = process.env.JWT_SECRET;
        return {
            token: jwt.sign(payload, jwtSecret, { }),
            user
        };
    }
}

module.exports = new AuthService();