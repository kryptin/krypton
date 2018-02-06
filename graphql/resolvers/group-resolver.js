import Group from '../../models/group';
import { requireAuth } from '../../services/auth';

export default {

  getGroups: async (_, args, { user }) => {
    try {
      //await requireAuth(user);
      return Group.find({}).sort({ createdAt: -1 })
    } catch (error) {
      throw error;
    }
  },
  addGroup: async (_, args, { user }) => {
    try {
      //await requireAuth(user);
      return Group.create({ ...args });
    } catch (error) {
      throw error;
    }
  },
 
  deleteGroup: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const group = await Group.findOne({ _id, user: user._id });

      if (!group) {
        throw new Error('Not found!');
      }
      await group.remove();
      return {
        message: 'Delete Success!'
      }
    } catch (error) {
      throw error;
    }
  }
};