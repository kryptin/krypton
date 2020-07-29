import mongoose, { Schema } from 'mongoose';


var PhotoLikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    }
}, { timestamps: true });

export default mongoose.model('PhotoLike',PhotoLikeSchema);