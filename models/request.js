import mongoose, {Schema} from 'mongoose';

var requestSchema = new mongoose.Schema({
    senderUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    receiverUser: {
        type: String
    },
    url: {
        type: String
    },

    created_at: Date,
    updated_at: Date
});

requestSchema.pre('save', function (next) {

    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

export default mongoose.model('Request', requestSchema);
