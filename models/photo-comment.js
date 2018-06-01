import mongoose, { Schema } from 'mongoose';


var photoCommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    },
});

export default mongoose.model('PhotoComment', photoCommentSchema);

