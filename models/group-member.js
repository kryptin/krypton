import mongoose, { Schema } from 'mongoose';

var groupMemberSchema = new mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    
    user_type: String,
    created_at: Date,
    updated_at: Date
});

groupMemberSchema.pre('save', function(next) {

    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

export default mongoose.model('GroupMember', groupMemberSchema);