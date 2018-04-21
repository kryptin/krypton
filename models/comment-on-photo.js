import mongoose, { Schema } from 'mongoose';


var photoCommentSchema = new Schema({
    photoID: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    text: {
        type: String,
        required: true
    }
});

export default mongoose.model('PhotoComment', photoCommentSchema);