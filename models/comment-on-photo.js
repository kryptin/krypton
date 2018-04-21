import mongoose, { Schema } from 'mongoose';


var photoCommentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    },
});

export default mongoose.model('PhotoComment', photoCommentSchema);

