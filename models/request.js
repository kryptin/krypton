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
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    },
    receiverUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    requestType: {
        type: String //Invite(owner invited you),Join(you tell owner u want to join)
    },
    status: {
        type: String //Pending,Accepted, Rejected
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
