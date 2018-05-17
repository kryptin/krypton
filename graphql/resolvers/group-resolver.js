import Group from '../../models/group';
import GroupMember from '../../models/group-member';
import { requireAuth } from '../../services/auth';

export default {

  getGroups: async (_, args, { user }) => {
    try {
      //await requireAuth(user);
        const duserid = user? user._id: user;
        return Group.find({user:duserid}).sort({ createdAt: -1 })
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

  // getGroup: async (_, { _id }, { user }) => {
  //     try {
  //         // await requireAuth(user);
  //         const group = await  Group.findById(_id);
  //         return Group.findById(_id);
  //     } catch (error) {
  //         throw error;
  //     }
  // },
  getGroupByUser: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Group.findOne({user:user._id})
    } catch (error) {
      throw error;
    }
  },

  addGroup: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      const duserid = user? user._id: user;

      var group = new Group({ ...args, user: duserid  });
      group.save(function (err) {
        if (err) return handleError(err);
        // saved!
      })
      GroupMember.create({ group: group._id, user: duserid, user_type:"Admin" });

      return group;
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