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
}, {
    toJSON: {
        versionKey: false,
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

module.exports = model('User', UserSchema)