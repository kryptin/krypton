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
    sex: {
        type: String,
        // required: true
    },date_of_birth: {
        type: String,
        //required: true
    },bio: {
        type: String,
        //required: true
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },  
    created_at: Date,
    updated_at: Date
});

profileSchema.pre('save', function (next) {

    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();

});
export default mongoose.model('Profile', profileSchema);
