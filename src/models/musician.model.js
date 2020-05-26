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
    email: {
        type: String,
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

MusicianSchema.virtual('user', {
    ref: 'User',
    localField: 'email',
    foreignField: 'email',
    justOne: true
});

module.exports = model('Musician', MusicianSchema)