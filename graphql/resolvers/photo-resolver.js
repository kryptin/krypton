import Photo from '../../models/photo';
import { requireAuth } from '../../services/auth';

export default {

  getPhotos: async (_, args, { user }) => {
    try {
      //await requireAuth(user);
      return Photo.find({}).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  getUserPhotos: async (_, args, { user }) => {
    try {
        console.log("user is: "+args.user);

      return Photo.find({user: args.user, event: args.event });
    } catch (error) {
      throw error;
    }
  },
  addPhoto: async (_, args, { user }) => {
    try {
        await requireAuth(user);
        const duserid = user? user._id: user;
        var photo = new Photo({ ...args, user: duserid});
        photo.save(function (err) {
            if (err) return handleError(err);
            // saved!
        });
        return photo;
    } catch (error) {
      throw error;
    }
  },

  updatePhoto: async (_, {_id}, {user}) =>{
    //await requireAuth(user);
    const photo = await Photo.findOne({ _id, user: user._id });
    if (!photo) {
      throw new Error('Not found!');
    }
  },
 
  deletePhoto: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const photo = await Photo.findOne({ _id, user: user._id });

      if (!photo) {
        throw new Error('Not found!');
      }
      await photo.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  }
};