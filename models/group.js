import mongoose, { Schema } from 'mongoose';

var groupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    created_at: Date,
    updated_at: Date
});

groupSchema.pre('save', function(next) {

    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

export default mongoose.model('Group', groupSchema);