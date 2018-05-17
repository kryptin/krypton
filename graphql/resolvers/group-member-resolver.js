import GroupMember from '../../models/group-member';
import { requireAuth } from '../../services/auth';

export default {

    addGroupMember: async (_, args, { user }) => {
        try {
          await requireAuth(user);
          return GroupMember.create({ ...args });
        } catch (error) {
          throw error;
        }
      },

    getUserGroups: async (_, { _id }, { user }) => {
        try {
            await requireAuth(user);
            //const duserid = user? user._id: user;
            return GroupMember.find({user});
        } catch (error) {
            throw error;
        }
    },
 
};