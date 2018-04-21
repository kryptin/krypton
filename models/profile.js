import mongoose, { Schema } from 'mongoose';

var profileSchema = new mongoose.Schema({
    first_name: {
        type: String,
        // required: true
    },
    last_name: {
        type: String,
        // required: true
    },
    country: {
        type: String,
        //required: true
    },
    state: {
        type: String,
        //required: true
    },
    location: {
        type: String,
        //required: true
    },
    image_path: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },  
    created_at: Date,
    updated_at: Date
});

export default mongoose.model('Profile', profileSchema);
