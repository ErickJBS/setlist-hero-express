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
        enum : ['Google', 'Facebook', 'Email', 'Twitter'],
        required: true
    }
})

module.exports = model('User', UserSchema)