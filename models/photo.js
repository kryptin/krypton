import mongoose, { Schema } from 'mongoose';

const photoSchema = new Schema({
  url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  likes: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },

 
}, { timestamps: true });



export default mongoose.model('Photo', photoSchema);
