import Like from '../../models/like-photo';
import { requireAuth } from '../../services/auth';

export default {

    getLikes: async (_, args, {_id}, {user}) => {
        const like = await Like.find({ $and: [{ photo: photo. _id},{ user: user._id} ]});
    }

}