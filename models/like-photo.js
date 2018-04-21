import mongoose, { Schema } from 'mongoose';


var likePhotoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    }
});

export default mongoose.model('Like',likePhotoSchema);