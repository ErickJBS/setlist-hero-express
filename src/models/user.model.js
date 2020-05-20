const { Schema, model } = require('mongoose')

const UserSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    password: {
        type: String
    },
    authProvider: {
        type: String,
        enum : ['google', 'facebook', 'email'],
        required: true
    }
})

module.exports = model('User', UserSchema)