const { Schema, model } = require('mongoose')

const MusicianSchema = new Schema({

    instrument: {
        type: String,
        required: true
    },
    band: {
        type: Schema.Types.ObjectId,
        ref: 'Band',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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

module.exports = model('Musician', MusicianSchema)