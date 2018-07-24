import Profile from '../../models/profile';
import User from '../../models/user';
import { requireAuth } from '../../services/auth';

export default {

  getProfile: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const duserid = user? user._id: user;
      return Profile.findOne({user:user._id});
    } catch (error) {
      throw error;
    }
  },

  getPublicProfile: async (_, args) => {
        try {
            return Profile.findOne({user:args.user});
        } catch (error) {
            throw error;
        }
  },

  addProfile: async (_, {input}, { user }) => {
    try {
      await requireAuth(user);
      const duserid = user? user._id: user;
      return Profile.create({ ...input, user: duserid });
    } catch (error) {
      throw error;
    }
  },

    updateProfilePic: async (_, args, { user }) => {
        try {
            await requireAuth(user);
            const duserid = user? user._id: user;
            return await User.findByIdAndUpdate(duserid, {image_path:args.image_path}, {new: true});

        } catch (error) {
            throw error;
        }
    },
  
  updateProfile: async (_, args, { user }) => {
    try {
        await requireAuth(user);
        const duserid = user? user._id: user;
        return Profile.update({user: duserid}, args );
    } catch (error) {
      throw error;
    }
  },
 
};