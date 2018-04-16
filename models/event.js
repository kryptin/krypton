import mongoose, { Schema } from 'mongoose';

var eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },  
    status: {
        type: Number
    },
    created_at: Date,
    updated_at: Date
});

eventSchema.pre('save', function (next) {

    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

export default mongoose.model('Event', eventSchema);
