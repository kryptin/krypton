import PhotoComment from '../../models/photo-comment';
import { requireAuth } from '../../services/auth';

export default {

    getPhotoComments: async (_, args, { user }) => {
        try{
            await requireAuth(user);
            return PhotoComment.find({photo: args.photo})
        } catch (error){
            throw error;
        }
    },

    addPhotoComment: async (_, args, { user }) => {
        try {
         // await requireAuth(user);
          const duserid = user? user._id: user;
          return PhotoComment.create({ ...args, user: duserid });
        } catch (error) {
          throw error;
        }
      },

    deletePhotoComment: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            const comment = await PhotoComment.findOne({ _id, user: user._id});

            if(!comment){
                throw new Error('Comment Not found!');
            }
            await comment.remove();
            return {
                message: 'Deleted Successfully!'
            }
        } catch (error) {
            throw error;
        }
    }

}