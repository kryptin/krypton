import PhotoComment from '../../models/comment-on-photo';
import { requireAuth } from '../../services/auth';

export default {

    getPhotoComments: async (_, args, { user }) => {
        try{
            await requireAuth(user);
            return PhotoComment.find({}).sort({ createdAt: -1 })
        } catch (error){
            throw error;
        }
    },

    addPhotoComment: async(_, args, { user }) => {
        try {
            await requireAuth(user);
            return PhotoComment.create({ ...args, user: user._id});
        }catch (error) {
            throw error;
        }
    },

    deletePhotoComment: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
        }
    }

}