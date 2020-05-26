const { Schema, model } = require('mongoose')

const BandSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    logo: {
        type: String
    },
    genres: [{
        type: String
    }],
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
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

module.exports = model('Band', BandSchema)