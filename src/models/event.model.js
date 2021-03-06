const { Schema, model } = require('mongoose')

const EventSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        require: true
    },
    tour: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    band: {
        type: Schema.Types.ObjectId,
        ref: 'Band',
        required: true
    },
    designer: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    setlist: [{
        name: {
            type: String,
            required: true
        },
        songs: [{
            type: Schema.Types.ObjectId,
            ref: 'Song',
            required: true
        }]
    }]
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

EventSchema.virtual('organizer', {
    ref: 'User',
    localField: 'designer',
    foreignField: 'email',
    justOne: true
});

module.exports = model('Event', EventSchema)