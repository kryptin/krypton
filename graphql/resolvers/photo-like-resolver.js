import PhotoLike from '../../models/photo-like';
import { requireAuth } from '../../services/auth';

export default {

    getPhotoLikes: async (_, args, {_id}, {user}) => {
        return await PhotoLike.find({ photo: args.photo});
    },

    addPhotoLike: async (_, args, { user }) => {
        try {
            // await requireAuth(user);
            const duserid = user? user._id: user;
            var photoLikes = await PhotoLike.findOne({user: duserid, photo:args.photo});

            if(photoLikes){
                await photoLikes.remove();
                return photoLikes
            }else{
                return PhotoLike.create({ ...args, user: duserid });
            }
        } catch (error) {
            throw error;
        }
    },


}