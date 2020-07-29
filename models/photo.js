import mongoose, { Schema } from 'mongoose';

const photoSchema = new Schema({
  image_url: {
      type: String,
      required: true
  },
  description: String,
  view: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
 
}, { timestamps: true });


export default mongoose.model('Photo', photoSchema);
