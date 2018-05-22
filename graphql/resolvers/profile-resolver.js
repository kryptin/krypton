import Profile from '../../models/profile';
import Group from '../../models/group';
import GroupMember from '../../models/group-member';
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

  addProfile: async (_, {input}, { user }) => {
    try {
      await requireAuth(user);
      const duserid = user? user._id: user;
      return Profile.create({ ...input, user: duserid });
    } catch (error) {
      throw error;
    }
  },
  
  updateProfile: async (_, args, { user }) => {
    try {
        await requireAuth(user);
        const duserid = user? user._id: user;
        return Profile.update({ ...args, user: duserid });
    } catch (error) {
      throw error;
    }
  },
 
};