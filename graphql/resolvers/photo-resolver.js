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
  getPhoto: async (_, { _id }, { user }) => {
    try {
     // await requireAuth(user);
      return Photo.findById(_id);
    } catch (error) {
      throw error;
    }
  },
  addPhoto: async (_, args, { user }) => {
    try {
      console.log(args);
      //await requireAuth(user);
      return Photo.create({ ...args/*, user: user._id*/ });
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