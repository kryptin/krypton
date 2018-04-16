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
  getGroup: async (_, { _id }, { user }) => {
    try {
     // await requireAuth(user);
      return Group.findById(_id);
    } catch (error) {
      throw error;
    }
  },

  addGroup: async (_, args, { user }) => {
    try {
      //await requireAuth(user);
      const duserid = user? user._id: user;
      return Group.create({ ...args, user: duserid });
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