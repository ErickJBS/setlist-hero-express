const { Schema, model } = require('mongoose')

const SongSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    band: {
        type: Schema.Types.ObjectId,
        ref: 'Band',
        required: true
    },
    tags: [{
        type: String
    }],
    lyrics: {
        type: String,
        required: true
    },
    sheets: [{
        instrument: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }],
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

module.exports = model('Song', SongSchema)