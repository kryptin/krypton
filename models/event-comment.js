import mongoose from 'mongoose';

var eventCommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

export default mongoose.model('EventComment', eventCommentSchema);